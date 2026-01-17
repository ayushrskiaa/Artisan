const express = require('express');
const router = express.Router();
const Coupon = require('../models/Coupon');
const { protect, admin } = require('../middleware/authMiddleware');

// @desc    Validate and apply coupon
// @route   POST /api/coupons/validate
// @access  Private
router.post('/validate', protect, async (req, res) => {
    try {
        const { code, cartTotal } = req.body;

        const coupon = await Coupon.findOne({ 
            code: code.toUpperCase(),
            isActive: true
        });

        if (!coupon) {
            return res.status(404).json({ 
                success: false, 
                message: 'Invalid coupon code' 
            });
        }

        // Check if coupon is expired
        const now = new Date();
        if (now < coupon.validFrom || now > coupon.validUntil) {
            return res.status(400).json({ 
                success: false, 
                message: 'Coupon has expired or not yet valid' 
            });
        }

        // Check usage limit
        if (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit) {
            return res.status(400).json({ 
                success: false, 
                message: 'Coupon usage limit reached' 
            });
        }

        // Check minimum purchase amount
        if (cartTotal < coupon.minPurchaseAmount) {
            return res.status(400).json({ 
                success: false, 
                message: `Minimum purchase amount of ₹${coupon.minPurchaseAmount} required` 
            });
        }

        // Calculate discount
        let discountAmount = 0;
        if (coupon.discountType === 'percentage') {
            discountAmount = (cartTotal * coupon.discountValue) / 100;
            if (coupon.maxDiscountAmount) {
                discountAmount = Math.min(discountAmount, coupon.maxDiscountAmount);
            }
        } else {
            discountAmount = coupon.discountValue;
        }

        const finalAmount = Math.max(0, cartTotal - discountAmount);

        res.json({
            success: true,
            coupon: {
                code: coupon.code,
                discountType: coupon.discountType,
                discountValue: coupon.discountValue,
                discountAmount: Math.round(discountAmount),
                finalAmount: Math.round(finalAmount)
            }
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: error.message 
        });
    }
});

// @desc    Increment coupon usage count
// @route   POST /api/coupons/use/:code
// @access  Private
router.post('/use/:code', protect, async (req, res) => {
    try {
        const coupon = await Coupon.findOne({ code: req.params.code.toUpperCase() });
        if (coupon) {
            coupon.usedCount += 1;
            await coupon.save();
            res.json({ success: true });
        } else {
            res.status(404).json({ success: false, message: 'Coupon not found' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// @desc    Create new coupon (Admin)
// @route   POST /api/coupons
// @access  Private/Admin
router.post('/', protect, admin, async (req, res) => {
    try {
        const coupon = new Coupon(req.body);
        const createdCoupon = await coupon.save();
        res.status(201).json(createdCoupon);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Get all coupons (Admin)
// @route   GET /api/coupons
// @access  Private/Admin
router.get('/', protect, admin, async (req, res) => {
    try {
        const coupons = await Coupon.find({}).sort({ createdAt: -1 });
        res.json(coupons);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Update coupon (Admin)
// @route   PUT /api/coupons/:id
// @access  Private/Admin
router.put('/:id', protect, admin, async (req, res) => {
    try {
        const coupon = await Coupon.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(coupon);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Delete coupon (Admin)
// @route   DELETE /api/coupons/:id
// @access  Private/Admin
router.delete('/:id', protect, admin, async (req, res) => {
    try {
        await Coupon.findByIdAndDelete(req.params.id);
        res.json({ message: 'Coupon deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
