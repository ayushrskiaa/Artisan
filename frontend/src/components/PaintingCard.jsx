import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Eye } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const PaintingCard = ({ painting }) => {
    const { addToCart } = useCart();

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
                            addToCart(painting);
                        }}
                        className="p-3 bg-white text-neutral-900 rounded-full hover:bg-accent transition-colors shadow-xl"
                        title="Add to Cart"
                    >
                        <ShoppingCart className="w-5 h-5" />
                    </button>
                    <Link
                        to={`/painting/${painting._id}`}
                        className="p-3 bg-white text-neutral-900 rounded-full hover:bg-accent transition-colors shadow-xl"
                        title="View Details"
                    >
                        <Eye className="w-5 h-5" />
                    </Link>
                </div>
                <div className="absolute top-4 right-4 bg-accent text-neutral-900 text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                    ${painting.price}
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
