import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogIn } from 'lucide-react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            navigate('/');
        } catch (error) {
            alert('Invalid credentials');
        }
    };

    return (
        <div className="pt-40 pb-20 px-4 flex justify-center items-center min-h-screen">
            <div className="glass p-8 rounded-2xl w-full max-w-md">
                <div className="flex justify-center mb-6">
                    <div className="p-4 bg-accent/20 rounded-full">
                        <LogIn className="w-8 h-8 text-accent" />
                    </div>
                </div>
                <h2 className="text-3xl font-bold title-font text-center mb-8">Welcome Back</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-neutral-400 mb-2">Email Address</label>
                        <input
                            type="email"
                            required
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-accent transition-colors"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-neutral-400 mb-2">Password</label>
                        <input
                            type="password"
                            required
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-accent transition-colors"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="w-full bg-accent text-neutral-900 font-bold py-4 rounded-xl hover:bg-accent/90 transition-all uppercase tracking-widest text-sm">
                        Sign In
                    </button>
                </form>
                <p className="mt-8 text-center text-neutral-500">
                    New to Artisan? <Link to="/register" className="text-accent hover:underline">Create an account</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
