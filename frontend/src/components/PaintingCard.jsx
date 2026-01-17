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
            className="group artistic-reveal"
        >
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden mb-4 border border-white/5 shadow-2xl art-card paint-splatter ink-blot watercolor-bg">
                <Link to={`/painting/${painting._id}`} className="block w-full h-full">
                    <img
                        src={painting.imageUrl}
                        alt={painting.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                </Link>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 pointer-events-none">
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            if (!inCart) addToCart(painting);
                        }}
                        disabled={inCart}
                        className={`p-4 rounded-full transition-all shadow-2xl transform hover:scale-110 pointer-events-auto ${inCart
                            ? 'bg-neutral-600 text-neutral-400 cursor-not-allowed'
                            : 'bg-white text-neutral-900 hover:bg-accent hover:shadow-accent/50'
                            }`}
                        title={inCart ? "Already in Cart" : "Add to Cart"}
                    >
                        {inCart ? <Check className="w-5 h-5" /> : <ShoppingCart className="w-5 h-5" />}
                    </button>
                    <Link
                        to={`/painting/${painting._id}`}
                        className="p-4 bg-white text-neutral-900 rounded-full hover:bg-accent transition-all shadow-2xl transform hover:scale-110 hover:shadow-accent/50 pointer-events-auto"
                        title="View Details"
                    >
                        <Eye className="w-5 h-5" />
                    </Link>
                </div>
                {painting.discount > 0 && (
                    <div className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-red-600 text-white text-[10px] font-black px-4 py-2 rounded-full shadow-2xl uppercase tracking-widest animate-pulse glow-accent pointer-events-none">
                        Offer -{painting.discount}%
                    </div>
                )}
                <div className="absolute top-4 right-4 glass text-white text-xs font-bold px-4 py-2 rounded-full shadow-2xl flex flex-col items-end backdrop-blur-xl pointer-events-none">
                    {painting.discount > 0 ? (
                        <>
                            <span className="line-through opacity-50 text-[10px] leading-none mb-1">₹{painting.price.toLocaleString()}</span>
                            <span className="text-accent">₹{(painting.price - (painting.price * painting.discount / 100)).toLocaleString()}</span>
                        </>
                    ) : (
                        <span className="text-accent">₹{painting.price.toLocaleString()}</span>
                    )}
                </div>
            </div>
            <div className="floating-particles">
                <Link to={`/painting/${painting._id}`}>
                    <h3 className="text-lg font-bold mb-1 group-hover:text-accent transition-colors brush-underline">{painting.title}</h3>
                </Link>
                <p className="text-neutral-400 text-sm italic mb-2">by {painting.artist}</p>
                <div className="flex gap-2">
                    <span className="text-[10px] uppercase tracking-tighter glass px-3 py-1 rounded-full text-neutral-400 font-bold">{painting.category}</span>
                </div>
            </div>
        </motion.div>
    );
};

export default PaintingCard;
