require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const paintingRoutes = require('./routes/paintingRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');
const razorpayRoutes = require('./routes/razorpayRoutes');

connectDB();

const app = express();

const allowedOrigins = process.env.ALLOWED_ORIGINS 
    ? process.env.ALLOWED_ORIGINS.split(',').map(origin => origin.trim().replace(/\/$/, "")) 
    : ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:3000'];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));
app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: 'Artisan API is running...', status: 'Healthy 🎨' });
});

app.use('/api/paintings', paintingRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/razorpay', razorpayRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
