import React, { useState, useEffect } from 'react';
import PaintingCard from '../components/PaintingCard';
import { Search, Filter } from 'lucide-react';
import axios from 'axios';

const Gallery = () => {
    const [paintings, setPaintings] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    const categories = ['All', 'Abstract', 'Landscape', 'Portrait', 'Contemporary', 'Still Life'];

    useEffect(() => {
        const fetchPaintings = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/paintings`);
                setPaintings(response.data);
            } catch (error) {
                console.error('Error fetching paintings:', error);
                // Fallback
                const mockData = [
                    { _id: '1', title: 'Crimson Whisper', artist: 'Elena Rossi', price: 1200, imageUrl: 'https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=800&auto=format&fit=crop', category: 'Abstract' },
                    { _id: '2', title: 'The Gilded Path', artist: 'Marcus Vance', price: 3500, imageUrl: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=800&auto=format&fit=crop', category: 'Landscape' },
                    { _id: '3', title: 'Fragments of Time', artist: 'Sarah Jenkins', price: 2800, imageUrl: 'https://images.unsplash.com/photo-1574169208507-84376144848b?q=80&w=800&auto=format&fit=crop', category: 'Contemporary' },
                    { _id: '4', title: 'Azure Dream', artist: 'Dimitri Volkov', price: 1950, imageUrl: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=800&auto=format&fit=crop', category: 'Abstract' },
                    { _id: '5', title: 'Golden Hour', artist: 'Elena Rossi', price: 1500, imageUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=800&auto=format&fit=crop', category: 'Landscape' },
                    { _id: '6', title: 'Silent Night', artist: 'Marcus Vance', price: 4200, imageUrl: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?q=80&w=800&auto=format&fit=crop', category: 'Still Life' }
                ];
                setPaintings(mockData);
            }
        };
        fetchPaintings();
    }, []);

    const filteredPaintings = paintings.filter(p => {
        const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.artist.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="pt-32 min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
            <div className="mb-12">
                <h1 className="text-4xl md:text-6xl font-bold title-font mb-6">Explore Our <span className="text-accent italic">Gallery</span></h1>
                <p className="text-neutral-400 max-w-2xl">Discover unique pieces from talented artists around the globe. Filter by style, price, or artist to find the perfect addition to your collection.</p>
            </div>

            <div className="flex flex-col md:flex-row gap-6 mb-12">
                <div className="relative flex-grow">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search by title or artist..."
                        className="w-full bg-white/5 border border-white/10 rounded-full py-4 pl-12 pr-6 focus:outline-none focus:border-accent transition-colors"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`whitespace-nowrap px-6 py-4 rounded-full font-bold text-sm transition-all border ${selectedCategory === cat
                                ? 'bg-accent text-neutral-900 border-accent'
                                : 'border-white/10 text-neutral-400 hover:border-white/30'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {filteredPaintings.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {filteredPaintings.map(painting => (
                        <PaintingCard key={painting._id} painting={painting} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20">
                    <p className="text-neutral-500 italic text-xl">No paintings found matching your criteria.</p>
                </div>
            )}
        </div>
    );
};

export default Gallery;
