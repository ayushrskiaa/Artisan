import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserPlus } from 'lucide-react';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(name, email, password);
            navigate('/');
        } catch (error) {
            alert('Registration failed. Email might already be in use.');
        }
    };

    return (
        <div className="pt-40 pb-20 px-4 flex justify-center items-center min-h-screen">
            <div className="glass p-8 rounded-2xl w-full max-w-md">
                <div className="flex justify-center mb-6">
                    <div className="p-4 bg-accent/20 rounded-full">
                        <UserPlus className="w-8 h-8 text-accent" />
                    </div>
                </div>
                <h2 className="text-3xl font-bold title-font text-center mb-8">Join the Gallery</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-neutral-400 mb-2">Full Name</label>
                        <input
                            type="text"
                            required
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-accent transition-colors"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
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
                        Create Account
                    </button>
                </form>
                <p className="mt-8 text-center text-neutral-500">
                    Already have an account? <Link to="/login" className="text-accent hover:underline">Sign In</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
