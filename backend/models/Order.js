const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    orderItems: [
        {
            title: { type: String, required: true },
            qty: { type: Number, required: true },
            imageUrl: { type: String, required: true },
            price: { type: Number, required: true },
            painting: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: 'Painting'
            },
        }
    ],
    shippingAddress: {
        address: { type: String, required: true },
        city: { type: String, required: true },
        postalCode: { type: String, required: true },
        country: { type: String, required: true },
    },
    paymentMethod: {
        type: String,
        required: true,
        default: 'Stripe'
    },
    paymentResult: {
        id: { type: String },
        status: { type: String },
        update_time: { type: String },
        email_address: { type: String },
    },
    totalPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    isPaid: {
        type: Boolean,
        required: true,
        default: false
    },
    paidAt: {
        type: Date
    },
    isDelivered: {
        type: Boolean,
        required: true,
        default: false
    },
    deliveredAt: {
        type: Date
    },
    deliveryPartner: {
        type: String,
        default: ''
    },
    trackingId: {
        type: String,
        default: ''
    },
    deliveryStatus: {
        type: String,
        enum: ['Order Placed', 'Processing', 'Packed', 'Shipped', 'Out for Delivery', 'Delivered', 'Cancelled'],
        default: 'Order Placed'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Order', orderSchema);
