import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Upload, ArrowLeft, Loader2, Save, Sparkles, X, Trophy } from 'lucide-react';

const EditPainting = () => {
    const { id } = useParams();
    const isNew = !id;
    const navigate = useNavigate();
    const { user } = useAuth();
    const API_URL = import.meta.env.VITE_API_URL;

    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(false);
    const [imageFile, setImageFile] = useState(null);
    const [preview, setPreview] = useState('');

    const [form, setForm] = useState({
        title: '',
        artist: '',
        price: '',
        category: 'Abstract',
        description: '',
        isFeatured: false,
        isMasterpiece: false,
        discount: 0
    });

    useEffect(() => {
        if (!isNew) {
            const fetchPainting = async () => {
                setFetching(true);
                try {
                    const { data } = await axios.get(`${API_URL}/paintings/${id}`);
                    setForm({
                        title: data.title,
                        artist: data.artist,
                        price: data.price,
                        category: data.category,
                        description: data.description || '',
                        isFeatured: data.isFeatured,
                        isMasterpiece: data.isMasterpiece || false,
                        discount: data.discount || 0
                    });
                    setPreview(data.imageUrl);
                } catch (error) {
                    console.error('Error fetching painting details:', error);
                } finally {
                    setFetching(false);
                }
            };
            fetchPainting();
        }
    }, [id, isNew]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        Object.keys(form).forEach(key => formData.append(key, form[key]));
        if (imageFile) {
            formData.append('image', imageFile);
        }

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${user.token}`
                }
            };

            if (isNew) {
                await axios.post(`${API_URL}/paintings`, formData, config);
            } else {
                await axios.put(`${API_URL}/paintings/${id}`, formData, config);
            }
            navigate('/paintings');
        } catch (error) {
            alert('Operation failed. Please verify submission data.');
        } finally {
            setLoading(false);
        }
    };

    if (fetching) return <div className="h-screen flex items-center justify-center text-accent italic font-bold">Connecting to archive...</div>;

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-5xl mx-auto">
            <div className="flex items-center gap-6 mb-12">
                <Link to="/paintings" className="p-4 bg-white/5 rounded-2xl hover:bg-white/10 transition-colors">
                    <ArrowLeft className="w-6 h-6" />
                </Link>
                <h1 className="text-4xl font-bold title-font text-white">
                    {isNew ? (
                        <>New <span className="text-accent italic">Entry</span></>
                    ) : (
                        <>Edit <span className="text-accent italic">Exhibition</span></>
                    )}
                </h1>
            </div>

            <form onSubmit={submitHandler} className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
                {/* Image Section */}
                <div className="md:col-span-4 space-y-4">
                    <div className="glass rounded-[2rem] overflow-hidden aspect-[3/4] border-2 border-dashed border-white/10 relative group hover:border-accent/40 transition-all">
                        {preview ? (
                            <img src={preview} alt="Form preview" className="w-full h-full object-cover" />
                        ) : (
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-neutral-600 gap-4">
                                <Upload className="w-12 h-12" />
                                <span className="text-xs font-bold uppercase tracking-[0.2em]">Upload Canvas</span>
                            </div>
                        )}
                        <input
                            type="file"
                            onChange={handleImageChange}
                            required={isNew}
                            className="absolute inset-0 opacity-0 cursor-pointer z-20"
                        />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-10">
                            <span className="text-xs font-bold uppercase tracking-[0.2em] text-white">Change Visual</span>
                        </div>
                    </div>
                    <div className="p-6 glass rounded-2xl border-white/5 bg-accent/5">
                        <h4 className="text-[10px] font-bold uppercase text-accent tracking-widest mb-1">Curation Policy</h4>
                        <p className="text-[11px] text-neutral-500 leading-relaxed italic">
                            High-resolution images ensure maximum visibility. Please use high-quality portrait shots of the original artwork.
                        </p>
                    </div>
                </div>

                {/* Form Data Section */}
                <div className="md:col-span-8 glass p-10 rounded-[2rem] border border-white/5 space-y-8 shadow-2xl">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        <div>
                            <label className="block text-[10px] font-bold uppercase tracking-widest text-neutral-600 mb-3">Artwork Title</label>
                            <input
                                type="text"
                                required
                                placeholder="Golden Horizon..."
                                className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 focus:border-accent focus:outline-none transition-all placeholder:text-neutral-700"
                                value={form.title} onChange={e => setForm({ ...form, title: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold uppercase tracking-widest text-neutral-600 mb-3">Artist Name</label>
                            <input
                                type="text"
                                required
                                placeholder="Vincent..."
                                className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 focus:border-accent focus:outline-none transition-all placeholder:text-neutral-700"
                                value={form.artist} onChange={e => setForm({ ...form, artist: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                        <div>
                            <label className="block text-[10px] font-bold uppercase tracking-widest text-neutral-600 mb-3">Valuation (₹)</label>
                            <input
                                type="number"
                                required
                                placeholder="5000"
                                className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 focus:border-accent focus:outline-none transition-all font-bold text-accent placeholder:text-neutral-700/50"
                                value={form.price} onChange={e => setForm({ ...form, price: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold uppercase tracking-widest text-neutral-600 mb-3">Discount (%)</label>
                            <input
                                type="number"
                                min="0"
                                max="100"
                                placeholder="0"
                                className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 focus:border-accent focus:outline-none transition-all font-bold text-red-400 placeholder:text-neutral-700/50"
                                value={form.discount} onChange={e => setForm({ ...form, discount: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold uppercase tracking-widest text-neutral-600 mb-3">Category</label>
                            <select
                                className="w-full bg-[#111] border border-white/10 rounded-2xl px-5 py-4 focus:border-accent focus:outline-none transition-all cursor-pointer font-bold"
                                value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}
                            >
                                <option>Abstract</option>
                                <option>Landscape</option>
                                <option>Portrait</option>
                                <option>Contemporary</option>
                                <option>Still Life</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-[10px] font-bold uppercase tracking-widest text-neutral-600 mb-3">Provenance / Description</label>
                        <textarea
                            rows="4"
                            placeholder="Briefly describe the soul of this piece..."
                            className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 focus:border-accent focus:outline-none transition-all resize-none placeholder:text-neutral-700 leading-relaxed"
                            value={form.description} onChange={e => setForm({ ...form, description: e.target.value })}
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="flex items-center gap-4 bg-white/5 p-6 rounded-2xl border border-white/5 group">
                            <div className="relative">
                                <input
                                    type="checkbox"
                                    className="peer appearance-none w-6 h-6 border-2 border-white/10 rounded-lg checked:bg-accent checked:border-accent transition-all cursor-pointer"
                                    checked={form.isFeatured}
                                    id="isFeatured"
                                    onChange={e => setForm({ ...form, isFeatured: e.target.checked })}
                                />
                                <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-0 peer-checked:opacity-100 transition-opacity">
                                    <Save className="w-3 h-3 text-black" />
                                </div>
                            </div>
                            <label htmlFor="isFeatured" className="text-sm font-bold tracking-wide cursor-pointer flex items-center gap-2 text-neutral-400 group-hover:text-white transition-colors">
                                <Sparkles className="w-4 h-4 text-accent" /> Featured List
                            </label>
                        </div>

                        <div className="flex items-center gap-4 bg-accent/5 p-6 rounded-2xl border border-accent/20 group hover:border-accent/40 transition-all">
                            <div className="relative">
                                <input
                                    type="checkbox"
                                    className="peer appearance-none w-6 h-6 border-2 border-accent/20 rounded-lg checked:bg-accent checked:border-accent transition-all cursor-pointer"
                                    checked={form.isMasterpiece}
                                    id="isMasterpiece"
                                    onChange={e => setForm({ ...form, isMasterpiece: e.target.checked })}
                                />
                                <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-0 peer-checked:opacity-100 transition-opacity">
                                    <Trophy className="w-3 h-3 text-black" />
                                </div>
                            </div>
                            <label htmlFor="isMasterpiece" className="text-sm font-bold tracking-wide cursor-pointer flex items-center gap-2 text-accent group-hover:brightness-125 transition-all">
                                <Trophy className="w-4 h-4" /> Masterpiece of Month
                            </label>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-accent text-neutral-900 font-bold py-5 rounded-2xl flex items-center justify-center gap-3 hover:bg-accent/90 transition-all disabled:opacity-50 shadow-xl text-lg uppercase tracking-widest"
                    >
                        {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Save className="w-6 h-6" />}
                        {isNew ? 'Publish to Collection' : 'Confirm Refinements'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditPainting;
