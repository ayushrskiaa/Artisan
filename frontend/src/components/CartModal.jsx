import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, CreditCard, MapPin, Loader2, Banknote } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CartModal = ({ isOpen, onClose }) => {
    const { cartItems, removeFromCart, cartTotal, clearCart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [showAddress, setShowAddress] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('');

    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [country, setCountry] = useState('');

    const handleCheckoutClick = () => {
        if (!user) {
            onClose();
            navigate('/login');
            return;
        }
        setShowAddress(true);
    };

    const processOrder = async (e) => {
        e.preventDefault();

        if (!paymentMethod) {
            alert('Please select a payment method');
            return;
        }

        setLoading(true);

        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`
                }
            };

            const orderData = {
                orderItems: cartItems.map(item => ({
                    title: item.title,
                    qty: 1,
                    imageUrl: item.imageUrl,
                    price: item.discount > 0
                        ? (item.price - (item.price * item.discount / 100))
                        : item.price,
                    painting: item._id
                })),
                shippingAddress: { address, city, postalCode, country },
                paymentMethod: paymentMethod,
                totalPrice: cartTotal
            };

            console.log('Order Data:', orderData);

            if (paymentMethod === 'COD') {
                // Create Order in Backend for COD
                const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/orders`, orderData, config);
                clearCart();
                onClose();
                navigate('/success');
            } else if (paymentMethod === 'Razorpay') {
                // Razorpay Payment
                // First create Razorpay order
                const { data: razorpayOrder } = await axios.post(
                    `${import.meta.env.VITE_API_URL}/razorpay/create-order`,
                    { amount: cartTotal, receipt: `order_${Date.now()}` },
                    config
                );

                // Initialize Razorpay checkout
                const options = {
                    key: razorpayOrder.key_id,
                    amount: razorpayOrder.amount,
                    currency: razorpayOrder.currency,
                    name: 'Rskiaa Gallery',
                    description: 'Purchase Artwork',
                    order_id: razorpayOrder.order_id,
                    handler: async function (response) {
                        try {
                            // Verify payment
                            const verifyResponse = await axios.post(
                                `${import.meta.env.VITE_API_URL}/razorpay/verify-payment`,
                                {
                                    razorpay_order_id: response.razorpay_order_id,
                                    razorpay_payment_id: response.razorpay_payment_id,
                                    razorpay_signature: response.razorpay_signature
                                },
                                config
                            );

                            if (verifyResponse.data.success) {
                                // Create order in backend after successful payment
                                const orderDataWithPayment = {
                                    ...orderData,
                                    paymentResult: {
                                        id: response.razorpay_payment_id,
                                        status: 'paid',
                                        update_time: new Date().toISOString()
                                    },
                                    isPaid: true,
                                    paidAt: new Date()
                                };

                                await axios.post(`${import.meta.env.VITE_API_URL}/orders`, orderDataWithPayment, config);

                                clearCart();
                                onClose();
                                navigate('/success');
                            }
                        } catch (error) {
                            console.error('Payment verification error:', error);
                            alert('Payment verification failed. Please contact support.');
                        }
                    },
                    prefill: {
                        name: user.name,
                        email: user.email
                    },
                    theme: {
                        color: '#d4af37'
                    }
                };

                const rzp = new window.Razorpay(options);
                rzp.on('payment.failed', function (response) {
                    alert('Payment failed! Please try again.');
                    console.error('Payment failed:', response.error);
                });
                rzp.open();
                setLoading(false);
            }

        } catch (error) {
            console.error('Checkout error:', error);
            alert('Checkout failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
                    />
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed right-0 top-0 h-full w-full max-w-md bg-zinc-900 z-[70] shadow-2xl border-l border-white/10 flex flex-col"
                    >
                        <div className="p-6 border-b border-white/10 flex justify-between items-center">
                            <h2 className="text-2xl font-bold title-font">{showAddress ? 'Shipping Details' : 'Your Collection'}</h2>
                            <button onClick={() => showAddress ? setShowAddress(false) : onClose()} className="p-2 hover:bg-white/5 rounded-full transition-colors cursor-pointer">
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="flex-grow overflow-y-auto p-6">
                            {!showAddress ? (
                                <div className="space-y-6">
                                    {cartItems.length === 0 ? (
                                        <div className="h-full py-20 flex flex-col items-center justify-center text-neutral-500 space-y-4">
                                            <Trash2 className="w-12 h-12 opacity-20" />
                                            <p className="italic">Your collection is empty</p>
                                        </div>
                                    ) : (
                                        cartItems.map((item) => (
                                            <div key={item._id} className="flex gap-4 group">
                                                <div className="w-20 h-24 bg-white/5 rounded-lg overflow-hidden flex-shrink-0 border border-white/5">
                                                    <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                                                </div>
                                                <div className="flex-grow">
                                                    <h3 className="font-bold text-sm tracking-wide">{item.title}</h3>
                                                    <p className="text-xs text-neutral-400 italic mt-1">{item.artist}</p>
                                                    <p className="text-accent font-bold mt-2">
                                                        ₹{(item.discount > 0
                                                            ? (item.price - (item.price * item.discount / 100))
                                                            : item.price
                                                        ).toLocaleString()}
                                                    </p>
                                                </div>
                                                <button
                                                    onClick={() => removeFromCart(item._id)}
                                                    className="text-neutral-600 hover:text-red-400 p-2 transition-colors self-start cursor-pointer"
                                                >
                                                    <Trash2 className="w-5 h-5" />
                                                </button>
                                            </div>
                                        ))
                                    )}
                                </div>
                            ) : (
                                <form id="address-form" onSubmit={processOrder} className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                                    <div className="flex items-center gap-2 mb-6 text-accent">
                                        <MapPin className="w-5 h-5" />
                                        <span className="text-sm font-bold uppercase tracking-widest">Delivery Address</span>
                                    </div>
                                    <div>
                                        <input
                                            placeholder="Street Address"
                                            required
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-accent"
                                            value={address} onChange={(e) => setAddress(e.target.value)}
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <input
                                            placeholder="City"
                                            required
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-accent"
                                            value={city} onChange={(e) => setCity(e.target.value)}
                                        />
                                        <input
                                            placeholder="Postal Code"
                                            required
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-accent"
                                            value={postalCode} onChange={(e) => setPostalCode(e.target.value)}
                                        />
                                    </div>
                                    <input
                                        placeholder="Country"
                                        required
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-accent"
                                        value={country} onChange={(e) => setCountry(e.target.value)}
                                    />

                                    {/* Payment Method Selection */}
                                    <div className="pt-4 border-t border-white/10">
                                        <div className="flex items-center gap-2 mb-4 text-accent">
                                            <CreditCard className="w-5 h-5" />
                                            <span className="text-sm font-bold uppercase tracking-widest">Payment Method</span>
                                        </div>
                                        <div className="grid grid-cols-2 gap-3">
                                            <button
                                                type="button"
                                                onClick={() => setPaymentMethod('Razorpay')}
                                                className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all cursor-pointer ${paymentMethod === 'Razorpay'
                                                    ? 'border-accent bg-accent/10 text-accent'
                                                    : 'border-white/10 bg-white/5 text-neutral-400 hover:border-white/30'
                                                    }`}
                                            >
                                                <CreditCard className="w-6 h-6" />
                                                <span className="text-xs font-bold">Razorpay</span>
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setPaymentMethod('COD')}
                                                className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all cursor-pointer ${paymentMethod === 'COD'
                                                    ? 'border-accent bg-accent/10 text-accent'
                                                    : 'border-white/10 bg-white/5 text-neutral-400 hover:border-white/30'
                                                    }`}
                                            >
                                                <Banknote className="w-6 h-6" />
                                                <span className="text-xs font-bold">Cash on Delivery</span>
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            )}
                        </div>

                        {cartItems.length > 0 && (
                            <div className="p-6 border-t border-white/10 space-y-4 bg-zinc-950/50 backdrop-blur-xl">
                                <div className="flex justify-between items-center">
                                    <span className="text-neutral-400 uppercase text-xs tracking-[0.2em]">Total Amount</span>
                                    <span className="text-2xl font-bold">₹{cartTotal.toLocaleString()}</span>
                                </div>

                                {!showAddress ? (
                                    <button
                                        onClick={handleCheckoutClick}
                                        className="w-full bg-accent hover:bg-accent/90 text-neutral-900 font-bold py-4 rounded-full flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(192,160,128,0.2)]"
                                    >
                                        <CreditCard className="w-5 h-5" />
                                        Proceed to Checkout
                                    </button>
                                ) : (
                                    <button
                                        form="address-form"
                                        disabled={loading}
                                        className="w-full bg-accent hover:bg-accent/90 text-neutral-900 font-bold py-4 rounded-full flex items-center justify-center gap-2 transition-all disabled:opacity-50 cursor-pointer"
                                    >
                                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                                            <>
                                                {paymentMethod === 'COD' ? <Banknote className="w-5 h-5" /> : <CreditCard className="w-5 h-5" />}
                                                {paymentMethod === 'COD' ? 'Place Order (COD)' : 'Pay Now'}
                                            </>
                                        )}
                                    </button>
                                )}

                                <p className="text-center text-[10px] text-neutral-500 uppercase tracking-widest pt-2">
                                    Secure 256-bit SSL Encrypted Payment
                                </p>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default CartModal;
