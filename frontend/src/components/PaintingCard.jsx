import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Eye, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const PaintingCard = ({ painting }) => {
    const { addToCart, isInCart } = useCart();
    const inCart = isInCart(painting._id);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group"
        >
            <div className="relative aspect-[4/5] rounded-xl overflow-hidden mb-4 border border-white/5 shadow-lg group-hover:border-accent/30 transition-all duration-500">
                <img
                    src={painting.imageUrl}
                    alt={painting.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            if (!inCart) addToCart(painting);
                        }}
                        disabled={inCart}
                        className={`p-3 rounded-full transition-colors shadow-xl ${inCart
                                ? 'bg-neutral-600 text-neutral-400 cursor-not-allowed'
                                : 'bg-white text-neutral-900 hover:bg-accent'
                            }`}
                        title={inCart ? "Already in Cart" : "Add to Cart"}
                    >
                        {inCart ? <Check className="w-5 h-5" /> : <ShoppingCart className="w-5 h-5" />}
                    </button>
                    <Link
                        to={`/painting/${painting._id}`}
                        className="p-3 bg-white text-neutral-900 rounded-full hover:bg-accent transition-colors shadow-xl"
                        title="View Details"
                    >
                        <Eye className="w-5 h-5" />
                    </Link>
                </div>
                {painting.discount > 0 && (
                    <div className="absolute top-4 left-4 bg-red-500 text-white text-[10px] font-black px-3 py-1 rounded-full shadow-lg uppercase tracking-widest animate-pulse">
                        Offer -{painting.discount}%
                    </div>
                )}
                <div className="absolute top-4 right-4 bg-accent/90 backdrop-blur-md text-neutral-900 text-xs font-bold px-3 py-1 rounded-full shadow-lg flex flex-col items-end">
                    {painting.discount > 0 ? (
                        <>
                            <span className="line-through opacity-50 text-[10px] leading-none mb-1">₹{painting.price.toLocaleString()}</span>
                            <span>₹{(painting.price - (painting.price * painting.discount / 100)).toLocaleString()}</span>
                        </>
                    ) : (
                        <span>₹{painting.price.toLocaleString()}</span>
                    )}
                </div>
            </div>
            <div>
                <Link to={`/painting/${painting._id}`}>
                    <h3 className="text-lg font-bold mb-1 group-hover:text-accent transition-colors">{painting.title}</h3>
                </Link>
                <p className="text-neutral-400 text-sm italic mb-2">by {painting.artist}</p>
                <div className="flex gap-2">
                    <span className="text-[10px] uppercase tracking-tighter border border-white/10 px-2 py-0.5 rounded text-neutral-500 font-bold">{painting.category}</span>
                </div>
            </div>
        </motion.div>
    );
};

export default PaintingCard;
