import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = ({ masterpiece }) => {
    return (
        <div className="relative min-h-[95vh] flex items-center pt-28 pb-12 overflow-hidden">
            {/* Background Abstract shapes */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/10 rounded-full blur-3xl -z-10 animate-pulse" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary-700/10 rounded-full blur-3xl -z-10" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-4xl md:text-6xl font-bold title-font leading-tight mb-6">
                            Capturing <span className="text-accent italic">Emotions</span> Through Every Stroke
                        </h1>
                        <p className="text-lg text-neutral-400 mb-8 max-w-lg">
                            {masterpiece
                                ? masterpiece.description
                                : "Explore an exclusive collection of contemporary paintings crafted by master artists. Modern art that speaks to your soul and transforms your space."}
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link
                                to="/gallery"
                                className="bg-accent hover:bg-accent/90 text-neutral-900 px-8 py-4 rounded-full font-bold flex items-center group transition-all"
                            >
                                View Collection
                                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            {masterpiece && (
                                <Link to={`/painting/${masterpiece._id}`} className="border border-white/20 hover:border-white/40 px-8 py-4 rounded-full font-bold transition-all">
                                    View Masterpiece
                                </Link>
                            )}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative"
                    >
                        <div className="aspect-[3/2] rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative group">
                            <img
                                src={masterpiece?.imageUrl || "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=1000&auto=format&fit=crop"}
                                alt={masterpiece?.title || "Main Art"}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                            />
                            <div className="absolute bottom-6 left-6 right-6 p-6 glass rounded-xl translate-y-2 group-hover:translate-y-0 transition-transform">
                                <p className="text-sm font-semibold text-accent uppercase tracking-widest mb-1">
                                    {masterpiece ? "Masterpiece of the Month" : "Exclusive"}
                                </p>
                                <h3 className="text-xl font-bold mb-1">{masterpiece?.title || "Midnight Serenity"}</h3>
                                <p className="text-neutral-400 text-sm italic">By {masterpiece?.artist || "Alexander Thorne"}</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
