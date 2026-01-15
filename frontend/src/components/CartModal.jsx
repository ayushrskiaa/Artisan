import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, CreditCard, MapPin, Loader2 } from 'lucide-react';
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
                    price: item.price,
                    painting: item._id
                })),
                shippingAddress: { address, city, postalCode, country },
                paymentMethod: 'Stripe',
                totalPrice: cartTotal
            };

            // 1. Create Order in Backend
            const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/orders`, orderData, config);

            // 2. Initiate Stripe Payment (Simulated for this demo, or call real stripe)
            // For now, let's redirect to success since we don't have real keys configured
            alert('Order placed successfully! Redirecting to payment...');

            clearCart();
            onClose();
            navigate('/success');

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
                                                    <p className="text-accent font-bold mt-2">₹{item.price.toLocaleString()}</p>
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
                                        className="w-full bg-accent hover:bg-accent/90 text-neutral-900 font-bold py-4 rounded-full flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                                    >
                                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><CreditCard className="w-5 h-5" /> Pay Now</>}
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
