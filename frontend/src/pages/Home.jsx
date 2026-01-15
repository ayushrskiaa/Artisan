import React, { useEffect, useState } from 'react';
import Hero from '../components/Hero';
import PaintingCard from '../components/PaintingCard';
import { motion } from 'framer-motion';
import axios from 'axios';
import { Trophy, Star, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
    const [featuredPaintings, setFeaturedPaintings] = useState([]);
    const [masterpiece, setMasterpiece] = useState(null);

    useEffect(() => {
        const fetchArt = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/paintings');
                console.log('All paintings:', response.data);
                setFeaturedPaintings(response.data.filter(p => p.isFeatured));
                const foundMasterpiece = response.data.find(p => p.isMasterpiece);
                console.log('Found Masterpiece:', foundMasterpiece);
                setMasterpiece(foundMasterpiece);
            } catch (error) {
                console.error('Error fetching paintings:', error);
            }
        };
        fetchArt();
    }, []);

    return (
        <div className="min-h-screen">
            <Hero masterpiece={masterpiece} />

            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h2 className="text-sm font-bold text-accent uppercase tracking-[0.3em] mb-4">Curated Selection</h2>
                        <h3 className="text-4xl md:text-5xl font-bold title-font">Featured Artworks</h3>
                    </div>
                    <Link to="/gallery" className="text-accent border-b border-accent hover:text-white hover:border-white transition-colors pb-1 uppercase text-sm font-bold tracking-widest hidden sm:block">
                        Explore Full Gallery
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {featuredPaintings.map((painting) => (
                        <PaintingCard key={painting._id} painting={painting} />
                    ))}
                </div>
            </section>

            <section className="bg-neutral-900 py-32 border-y border-white/5 relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-accent/5 blur-[120px] rounded-full" />
                <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
                    <h2 className="text-4xl md:text-6xl font-bold title-font mb-8">Elevate Your Living Space With Authentic Art</h2>
                    <p className="text-xl text-neutral-400 mb-12">Join 10,000+ art lovers who have found their perfect piece at Artisan Gallery.</p>
                    <Link to="/gallery" className="bg-white text-neutral-900 px-10 py-4 rounded-full font-bold hover:bg-accent transition-colors inline-block">
                        Start Your Collection
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Home;
