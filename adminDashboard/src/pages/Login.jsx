import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogIn, Palette } from 'lucide-react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await login(email, password);
            if (data.isAdmin) {
                navigate('/');
            } else {
                alert('Access restricted to sellers only.');
            }
        } catch (error) {
            alert('Invalid credentials');
        }
    };

    return (
        <div className="h-screen flex items-center justify-center bg-[#050505] px-4">
            <div className="glass p-10 rounded-3xl w-full max-w-md border-white/5 shadow-2xl">
                <div className="flex justify-center mb-8">
                    <div className="p-4 bg-accent rounded-2xl shadow-[0_0_30px_rgba(192,160,128,0.3)]">
                        <Palette className="w-8 h-8 text-black" />
                    </div>
                </div>
                <h1 className="text-3xl font-bold title-font text-center mb-2">Seller Portal</h1>
                <p className="text-neutral-500 text-center mb-10 text-sm italic">Manage your gallery & collection</p>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-neutral-500 mb-2">Admin Email</label>
                        <input
                            type="email"
                            required
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 focus:border-accent focus:outline-none transition-all"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-neutral-500 mb-2">Password</label>
                        <input
                            type="password"
                            required
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 focus:border-accent focus:outline-none transition-all"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="w-full bg-accent text-neutral-900 font-bold py-5 rounded-xl hover:bg-accent/90 transition-all flex items-center justify-center gap-3 shadow-lg">
                        <LogIn className="w-5 h-5" /> Sign In to Portal
                    </button>
                </form>

                <div className="mt-10 pt-10 border-t border-white/5 text-center">
                    <a href={import.meta.env.VITE_STORE_URL} className="text-neutral-500 hover:text-white transition-colors text-sm underline decoration-1 underline-offset-4">
                        Return to Public Shop
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Login;
