const express = require('express');
const router = express.Router();
const Razorpay = require('razorpay');
const crypto = require('crypto');
const { protect } = require('../middleware/authMiddleware');

// Initialize Razorpay instance
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

// @desc    Create Razorpay order
// @route   POST /api/razorpay/create-order
// @access  Private
router.post('/create-order', protect, async (req, res) => {
    try {
        const { amount, currency = 'INR', receipt } = req.body;

        // Validate API keys
        if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
            console.error('Razorpay API keys are not configured');
            return res.status(500).json({ 
                success: false, 
                message: 'Razorpay API keys are not configured properly'
            });
        }

        // Validate amount
        if (!amount || amount <= 0) {
            return res.status(400).json({ 
                success: false, 
                message: 'Invalid amount provided'
            });
        }

        console.log('Creating Razorpay order with:', { amount, currency, receipt });

        const options = {
            amount: amount * 100, // Razorpay expects amount in paise
            currency,
            receipt: receipt || `receipt_${Date.now()}`,
            payment_capture: 1
        };

        const order = await razorpay.orders.create(options);
        
        console.log('Razorpay order created successfully:', order.id);
        
        res.json({
            success: true,
            order_id: order.id,
            amount: order.amount,
            currency: order.currency,
            key_id: process.env.RAZORPAY_KEY_ID
        });
    } catch (error) {
        console.error('Razorpay order creation error:', error);
        console.error('Error details:', {
            message: error.message,
            description: error.error?.description,
            code: error.error?.code,
            statusCode: error.statusCode
        });
        res.status(500).json({ 
            success: false, 
            message: 'Failed to create Razorpay order',
            error: error.message,
            details: error.error?.description || 'Please check your Razorpay API keys and account status'
        });
    }
});

// @desc    Verify Razorpay payment
// @route   POST /api/razorpay/verify-payment
// @access  Private
router.post('/verify-payment', protect, async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

        // Create signature
        const sign = razorpay_order_id + '|' + razorpay_payment_id;
        const expectedSign = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(sign.toString())
            .digest('hex');

        // Verify signature
        if (razorpay_signature === expectedSign) {
            res.json({
                success: true,
                message: 'Payment verified successfully',
                payment_id: razorpay_payment_id,
                order_id: razorpay_order_id
            });
        } else {
            res.status(400).json({
                success: false,
                message: 'Invalid payment signature'
            });
        }
    } catch (error) {
        console.error('Payment verification error:', error);
        res.status(500).json({
            success: false,
            message: 'Payment verification failed',
            error: error.message
        });
    }
});

// @desc    Get payment details
// @route   GET /api/razorpay/payment/:paymentId
// @access  Private
router.get('/payment/:paymentId', protect, async (req, res) => {
    try {
        const payment = await razorpay.payments.fetch(req.params.paymentId);
        res.json({ success: true, payment });
    } catch (error) {
        console.error('Fetch payment error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch payment details',
            error: error.message
        });
    }
});

module.exports = router;
