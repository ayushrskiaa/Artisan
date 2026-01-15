import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Edit, Trash2, Plus, Sparkles, Image as ImageIcon, Loader2, Trophy } from 'lucide-react';

const ManagePaintings = () => {
    const [paintings, setPaintings] = useState([]);
    const [toggling, setToggling] = useState(null);
    const { user } = useAuth();
    const API_URL = 'http://localhost:5000/api';

    const fetchPaintings = async () => {
        try {
            const { data } = await axios.get(`${API_URL}/paintings`);
            setPaintings(data);
        } catch (error) {
            console.error('Error fetching paintings:', error);
        }
    };

    useEffect(() => {
        fetchPaintings();
    }, []);

    const toggleFeatured = async (painting) => {
        setToggling(painting._id);
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            await axios.put(`${API_URL}/paintings/${painting._id}`, {
                isFeatured: !painting.isFeatured
            }, config);
            await fetchPaintings();
        } catch (error) {
            alert('Cloud update failed');
        } finally {
            setToggling(null);
        }
    };

    const setAsMasterpiece = async (painting) => {
        setToggling('m-' + painting._id);
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            await axios.put(`${API_URL}/paintings/${painting._id}`, {
                isMasterpiece: true
            }, config);
            await fetchPaintings();
        } catch (error) {
            alert('Masterpiece selection failed');
        } finally {
            setToggling(null);
        }
    };

    const deleteHandler = async (id) => {
        if (window.confirm('Delete this masterpiece from existence?')) {
            try {
                const config = { headers: { Authorization: `Bearer ${user.token}` } };
                await axios.delete(`${API_URL}/paintings/${id}`, config);
                fetchPaintings();
            } catch (error) {
                alert('Deletion failed');
            }
        }
    };

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-12">
                <div>
                    <h1 className="text-4xl font-bold title-font text-white mb-2">Curated <span className="text-accent italic">Inventory</span></h1>
                    <p className="text-neutral-500 text-sm tracking-wide uppercase font-bold">Catalogue of {paintings.length} Artworks</p>
                </div>
                <Link to="/paintings/new" className="bg-accent text-neutral-900 px-8 py-4 rounded-2xl font-bold flex items-center gap-3 hover:bg-accent/90 transition-all shadow-xl">
                    <Plus className="w-5 h-5" /> Register Artwork
                </Link>
            </div>

            <div className="glass rounded-[2rem] overflow-hidden border border-white/5 shadow-2xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-white/5 text-neutral-500 text-[10px] font-bold uppercase tracking-[0.2em] border-b border-white/5">
                                <th className="px-8 py-6">Exhibit</th>
                                <th className="px-8 py-6">Information</th>
                                <th className="px-8 py-6">Category</th>
                                <th className="px-8 py-6">Valuation</th>
                                <th className="px-8 py-6">Status</th>
                                <th className="px-8 py-6 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {paintings.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="px-8 py-20 text-center text-neutral-600 italic">No works currently in storage</td>
                                </tr>
                            ) : (
                                paintings.map((painting) => (
                                    <tr key={painting._id} className="hover:bg-white/[0.02] transition-colors group">
                                        <td className="px-8 py-6">
                                            <div className="w-14 h-20 bg-neutral-900 rounded-xl overflow-hidden border border-white/10 group-hover:border-accent/40 transition-all relative">
                                                {painting.imageUrl ? (
                                                    <img src={painting.imageUrl} alt={painting.title} className="w-full h-full object-cover" />
                                                ) : (
                                                    <div className="absolute inset-0 flex items-center justify-center">
                                                        <ImageIcon className="w-4 h-4 opacity-20" />
                                                    </div>
                                                )}
                                                {painting.isMasterpiece && (
                                                    <div className="absolute top-1 right-1 bg-accent text-black p-0.5 rounded-sm">
                                                        <Trophy className="w-2 h-2" />
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="font-bold text-lg text-white mb-1 flex items-center gap-2">
                                                {painting.title}
                                                {painting.isMasterpiece && <span className="text-[10px] bg-accent/20 text-accent px-2 py-0.5 rounded-full border border-accent/20">MONTHLY MASTERPIECE</span>}
                                            </div>
                                            <div className="text-xs text-neutral-500 italic flex items-center gap-2">
                                                Artist: <span className="text-neutral-300 not-italic font-bold tracking-wide">{painting.artist}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 bg-white/5 rounded-full border border-white/5 text-neutral-400">
                                                {painting.category}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex flex-col">
                                                <div className="font-bold text-accent text-lg">
                                                    ₹{painting.discount > 0
                                                        ? (painting.price - (painting.price * painting.discount / 100)).toLocaleString()
                                                        : painting.price.toLocaleString()}
                                                </div>
                                                {painting.discount > 0 && (
                                                    <div className="text-[10px] text-neutral-500 line-through">₹{painting.price.toLocaleString()}</div>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex flex-col gap-2">
                                                <button
                                                    onClick={() => toggleFeatured(painting)}
                                                    disabled={toggling === painting._id}
                                                    className={`flex items-center gap-2 font-bold text-[9px] uppercase tracking-widest px-3 py-1.5 rounded-full transition-all border w-fit ${painting.isFeatured
                                                        ? 'bg-accent/10 border-accent/40 text-accent'
                                                        : 'bg-white/5 border-white/10 text-neutral-600 hover:text-white hover:border-white/30'
                                                        }`}
                                                >
                                                    {toggling === painting._id ? (
                                                        <Loader2 className="w-2.5 h-2.5 animate-spin" />
                                                    ) : (
                                                        <Sparkles className={`w-2.5 h-2.5 ${painting.isFeatured ? 'fill-accent/40' : ''}`} />
                                                    )}
                                                    Featured
                                                </button>

                                                <button
                                                    onClick={() => setAsMasterpiece(painting)}
                                                    disabled={painting.isMasterpiece || toggling === ('m-' + painting._id)}
                                                    className={`flex items-center gap-2 font-bold text-[9px] uppercase tracking-widest px-3 py-1.5 rounded-full transition-all border w-fit ${painting.isMasterpiece
                                                        ? 'bg-white text-black border-white'
                                                        : 'bg-white/5 border-white/10 text-neutral-600 hover:text-white hover:border-accent/40'
                                                        }`}
                                                >
                                                    {toggling === ('m-' + painting._id) ? (
                                                        <Loader2 className="w-2.5 h-2.5 animate-spin" />
                                                    ) : (
                                                        <Trophy className={`w-2.5 h-2.5 ${painting.isMasterpiece ? 'fill-black' : ''}`} />
                                                    )}
                                                    {painting.isMasterpiece ? 'The Masterpiece' : 'Set Masterpiece'}
                                                </button>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Link
                                                    to={`/paintings/${painting._id}/edit`}
                                                    className="p-3 bg-white/5 hover:bg-accent hover:text-black rounded-xl text-white transition-all"
                                                    title="Refine"
                                                >
                                                    <Edit className="w-5 h-5" />
                                                </Link>
                                                <button
                                                    onClick={() => deleteHandler(painting._id)}
                                                    className="p-3 bg-white/5 hover:bg-red-500/20 rounded-xl text-red-400 transition-all"
                                                    title="Expunge"
                                                >
                                                    <Trash2 className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManagePaintings;
