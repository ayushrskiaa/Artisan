const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const { protect, admin } = require('../middleware/authMiddleware');

// @desc    Create new order
router.post('/', protect, async (req, res) => {
    try {
        console.log('=== ORDER CREATION REQUEST ===');
        console.log('User:', req.user);
        console.log('Request Body:', JSON.stringify(req.body, null, 2));
        
        const { orderItems, shippingAddress, paymentMethod, totalPrice } = req.body;

        if (orderItems && orderItems.length === 0) {
            console.log('ERROR: No order items');
            res.status(400).json({ message: 'No order items' });
            return;
        }

        console.log('Creating order object...');
        const order = new Order({
            user: req.user._id,
            orderItems,
            shippingAddress,
            paymentMethod,
            totalPrice
        });

        console.log('Saving order to database...');
        const createdOrder = await order.save();
        console.log('Order created successfully:', createdOrder._id);
        res.status(201).json(createdOrder);
    } catch (error) {
        console.error('=== ORDER CREATION ERROR ===');
        console.error('Error message:', error.message);
        console.error('Error stack:', error.stack);
        console.error('Full error:', error);
        res.status(500).json({ message: error.message, details: error });
    }
});

// @desc    Get all orders (Admin only)
// @route   GET /api/orders
router.get('/', protect, admin, async (req, res) => {
    try {
        const orders = await Order.find({}).populate('user', 'id name').sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
router.get('/myorders', protect, async (req, res) => {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
});

// @desc    Update order to paid
// @route   PUT /api/orders/:id/pay
router.put('/:id/pay', protect, admin, async (req, res) => {
    const order = await Order.findById(req.params.id);

    if (order) {
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.email_address,
        };

        const updatedOrder = await order.save();
        res.json(updatedOrder);
    } else {
        res.status(404).json({ message: 'Order not found' });
    }
});

// @desc    Update order to delivered
// @route   PUT /api/orders/:id/deliver
router.put('/:id/deliver', protect, admin, async (req, res) => {
    const order = await Order.findById(req.params.id);

    if (order) {
        order.isDelivered = true;
        order.deliveredAt = Date.now();

        const updatedOrder = await order.save();
        res.json(updatedOrder);
    } else {
        res.status(404).json({ message: 'Order not found' });
    }
});

// @desc    Update order tracking information
// @route   PUT /api/orders/:id/tracking
router.put('/:id/tracking', protect, admin, async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (order) {
            const { deliveryPartner, trackingId, deliveryStatus } = req.body;
            
            if (deliveryPartner !== undefined) order.deliveryPartner = deliveryPartner;
            if (trackingId !== undefined) order.trackingId = trackingId;
            if (deliveryStatus !== undefined) order.deliveryStatus = deliveryStatus;
            
            // Auto-mark as delivered if status is "Delivered"
            if (deliveryStatus === 'Delivered' && !order.isDelivered) {
                order.isDelivered = true;
                order.deliveredAt = Date.now();
            }

            const updatedOrder = await order.save();
            res.json(updatedOrder);
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Get order by ID
// @route   GET /api/orders/:id
router.get('/:id', protect, async (req, res) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email');

    if (order) {
        res.json(order);
    } else {
        res.status(404).json({ message: 'Order not found' });
    }
});

module.exports = router;
