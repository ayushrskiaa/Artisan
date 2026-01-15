import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { ShoppingCart, ArrowLeft, ShieldCheck, Truck } from 'lucide-react';
import { motion } from 'framer-motion';

const PaintingDetail = () => {
    const { id } = useParams();
    const [painting, setPainting] = useState(null);
    const { addToCart } = useCart();

    useEffect(() => {
        const fetchPainting = async () => {
            try {
                const { data } = await axios.get(`http://localhost:5000/api/paintings/${id}`);
                setPainting(data);
            } catch (error) {
                console.error('Error fetching painting:', error);
            }
        };
        fetchPainting();
    }, [id]);

    if (!painting) return <div className="pt-40 text-center min-h-screen">Loading masterpiece...</div>;

    return (
        <div className="pt-32 pb-20 px-4 max-w-7xl mx-auto min-h-screen">
            <Link to="/gallery" className="inline-flex items-center text-neutral-400 hover:text-white mb-10 transition-colors">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Gallery
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
                >
                    <img src={painting.imageUrl} alt={painting.title} className="w-full h-auto object-cover" />
                </motion.div>

                <div className="space-y-8">
                    <div>
                        <p className="text-accent uppercase tracking-[0.3em] font-bold text-sm mb-4">{painting.category}</p>
                        <h1 className="text-4xl md:text-6xl font-bold title-font mb-4">{painting.title}</h1>
                        <p className="text-2xl italic text-neutral-400">by {painting.artist}</p>
                    </div>

                    <p className="text-xl text-neutral-300 leading-relaxed">
                        {painting.description || "A breathtaking contemporary piece that explores the boundaries of emotion and technique. Each brushstroke is carefully placed to create a harmonious yet striking composition that commands attention in any space."}
                    </p>

                    <div className="text-4xl font-bold text-accent">
                        ${painting.price}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <button
                            onClick={() => addToCart(painting)}
                            className="bg-accent text-neutral-900 px-10 py-5 rounded-full font-bold flex items-center justify-center gap-3 hover:bg-accent/90 transition-all flex-grow text-lg"
                        >
                            <ShoppingCart className="w-6 h-6" />
                            Add to Collection
                        </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-10 border-t border-white/10">
                        <div className="flex gap-4 items-center">
                            <div className="p-3 bg-white/5 rounded-full border border-white/5">
                                <ShieldCheck className="w-6 h-6 text-accent" />
                            </div>
                            <div>
                                <p className="font-bold text-sm">Authenticated</p>
                                <p className="text-xs text-neutral-500">Certificate of Authenticity</p>
                            </div>
                        </div>
                        <div className="flex gap-4 items-center">
                            <div className="p-3 bg-white/5 rounded-full border border-white/5">
                                <Truck className="w-6 h-6 text-accent" />
                            </div>
                            <div>
                                <p className="font-bold text-sm">Global Shipping</p>
                                <p className="text-xs text-neutral-500">Secured & Insured Delivery</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaintingDetail;
