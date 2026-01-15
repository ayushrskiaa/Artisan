const express = require('express');
const router = express.Router();
const stripeApiKey = process.env.STRIPE_SECRET_KEY;
if (!stripeApiKey) {
    console.warn('STRIPE_SECRET_KEY is missing from environment variables.');
}
const stripe = require('stripe')(stripeApiKey || 'sk_test_placeholder');

router.post('/create-checkout-session', async (req, res) => {
    const { items } = req.body;

    const line_items = items.map((item) => {
        const finalPrice = item.discount > 0 
            ? (item.price - (item.price * item.discount / 100)) 
            : item.price;
            
        return {
            price_data: {
                currency: 'inr',
                product_data: {
                    name: item.title,
                    images: [item.imageUrl],
                },
                unit_amount: Math.round(finalPrice * 100), // Stripe expects amount in paise
            },
            quantity: 1,
        };
    });

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items,
            mode: 'payment',
            success_url: `${process.env.FRONTEND_URL}/success`,
            cancel_url: `${process.env.FRONTEND_URL}/cancel`,
        });

        res.json({ id: session.id });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
