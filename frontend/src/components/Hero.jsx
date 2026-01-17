import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Hero = ({ masterpiece }) => {
    const { addToCart, cartItems } = useCart();
    const isInCart = masterpiece ? cartItems.some(item => item._id === masterpiece._id) : false;

    return (
        <div className="relative min-h-[95vh] flex items-center pt-28 pb-12 overflow-hidden canvas-texture">
            {/* Artistic Background Elements */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px] -z-10 animate-pulse" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-yellow-500/5 rounded-full blur-[100px] -z-10" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/3 rounded-full blur-[150px] -z-10" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="slide-up"
                    >
                        <div className="inline-block mb-4 px-4 py-2 glass rounded-full">
                            <span className="text-accent text-sm font-bold uppercase tracking-[0.3em]">Curated Collection</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold title-font leading-[1.1] mb-6">
                            Capturing <span className="gradient-text italic">Emotions</span>
                            <br />
                            <span className="brush-underline inline-block">Through Art</span>
                        </h1>
                        <p className="text-xl text-neutral-300 mb-10 max-w-lg leading-relaxed">
                            {masterpiece
                                ? masterpiece.description
                                : "Explore an exclusive collection of contemporary paintings crafted by master artists. Modern art that speaks to your soul and transforms your space."}
                        </p>
                        <div className="flex flex-wrap gap-4">
                            {!masterpiece ? (
                                <>
                                    <Link
                                        to="/gallery"
                                        className="bg-accent hover:bg-accent/90 text-neutral-900 px-10 py-5 rounded-full font-bold flex items-center group transition-all shadow-lg hover:shadow-accent/20 glow-accent cursor-pointer"
                                    >
                                        View Collection
                                        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform" />
                                    </Link>
                                    <Link to="/gallery" className="glass px-10 py-5 rounded-full font-bold transition-all hover:bg-white/10 cursor-pointer">
                                        Explore Gallery
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <button
                                        onClick={() => addToCart(masterpiece)}
                                        disabled={isInCart}
                                        className={`px-8 py-4 rounded-full font-bold flex items-center gap-3 transition-all ${isInCart
                                            ? 'bg-neutral-800 text-neutral-500 cursor-not-allowed border border-white/5'
                                            : 'bg-accent hover:bg-accent/90 text-neutral-900 shadow-[0_0_20px_rgba(212,175,55,0.3)]'
                                            }`}
                                    >
                                        <ShoppingBag className="w-5 h-5" />
                                        {isInCart ? 'In Your Collection' : 'Buy Now'}
                                    </button>
                                    <Link
                                        to={`/painting/${masterpiece._id}`}
                                        className="border border-white/20 hover:border-white/40 px-8 py-4 rounded-full font-bold transition-all hover:bg-white/5"
                                    >
                                        Details
                                    </Link>
                                </>
                            )}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative"
                    >
                        {/* Ornate Picture Frame */}
                        <div className="relative p-8 bg-gradient-to-br from-neutral-800 via-neutral-900 to-black rounded-3xl shadow-2xl">
                            {/* Outer Frame Border - Golden */}
                            <div className="absolute inset-0 rounded-3xl border-8 border-double border-accent/40 shadow-[inset_0_0_30px_rgba(212,175,55,0.2)]"></div>

                            {/* Decorative Corner Ornaments */}
                            <div className="absolute top-4 left-4 w-8 h-8 border-t-4 border-l-4 border-accent/60 rounded-tl-lg"></div>
                            <div className="absolute top-4 right-4 w-8 h-8 border-t-4 border-r-4 border-accent/60 rounded-tr-lg"></div>
                            <div className="absolute bottom-4 left-4 w-8 h-8 border-b-4 border-l-4 border-accent/60 rounded-bl-lg"></div>
                            <div className="absolute bottom-4 right-4 w-8 h-8 border-b-4 border-r-4 border-accent/60 rounded-br-lg"></div>

                            {/* Inner Matting */}
                            <div className="relative p-4 bg-gradient-to-br from-neutral-900 to-black rounded-2xl shadow-inner">
                                {/* Inner Frame Line */}
                                <div className="absolute inset-0 rounded-2xl border-2 border-accent/20"></div>

                                {/* The Artwork */}
                                <Link to={`/painting/${masterpiece?._id}`} className="block aspect-[5/4] rounded-xl overflow-hidden shadow-2xl relative group bg-black cursor-pointer">
                                    <img
                                        src={masterpiece?.imageUrl || "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=1000&auto=format&fit=crop"}
                                        alt={masterpiece?.title || "Main Art"}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                                    />
                                </Link>
                            </div>

                            {/* Artwork Info Box - Below Image */}
                            <div className="mt-2 p-4 glass rounded-xl backdrop-blur-xl border border-accent/20">
                                {/* Row 1: Badge and Title */}
                                <div className="flex items-center justify-between mb-2">
                                    <p className="text-xs font-semibold text-accent uppercase tracking-widest flex items-center gap-2">
                                        <span className="w-2 h-2 bg-accent rounded-full animate-pulse"></span>
                                        {masterpiece ? "Masterpiece of the Month" : "Exclusive"}
                                    </p>
                                    <h3 className="text-lg font-bold title-font">{masterpiece?.title || "Midnight Serenity"}</h3>
                                </div>

                                {/* Row 2: Price and Artist */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        {masterpiece?.discount > 0 ? (
                                            <>
                                                <span className="text-accent font-bold text-md">₹{(masterpiece.price - (masterpiece.price * masterpiece.discount / 100)).toLocaleString()}</span>
                                                <span className="text-neutral-500 line-through text-xs font-bold">₹{masterpiece.price.toLocaleString()}</span>
                                                <span className="bg-gradient-to-r from-red-500 to-red-600 text-white text-[9px] px-2 py-0.5 rounded-full font-black animate-pulse glow-accent">-{masterpiece.discount}% OFF</span>
                                            </>
                                        ) : (
                                            <span className="text-accent font-bold text-md">₹{masterpiece?.price.toLocaleString() || "4,500"}</span>
                                        )}
                                    </div>
                                    <p className="text-neutral-300 text-sm italic">By {masterpiece?.artist || "Alexander Thorne"}</p>
                                </div>
                            </div>

                            {/* Frame Shadow Effect */}
                            <div className="absolute -inset-4 bg-gradient-to-br from-accent/5 to-transparent rounded-3xl blur-2xl -z-10"></div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
