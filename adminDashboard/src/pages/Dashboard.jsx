import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Palette, ShoppingBag, TrendingUp, Users, ArrowRight } from 'lucide-react';

const Dashboard = () => {
    const [stats, setStats] = useState({
        totalPaintings: 0,
        totalOrders: 0,
        totalRevenue: 0
    });
    const { user } = useAuth();
    const API_URL = 'http://localhost:5000/api';

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const config = { headers: { Authorization: `Bearer ${user.token}` } };
                const [paintings, orders] = await Promise.all([
                    axios.get(`${API_URL}/paintings`),
                    axios.get(`${API_URL}/orders`, config)
                ]);

                const revenue = orders.data.reduce((acc, order) => order.isPaid ? acc + order.totalPrice : acc, 0);

                setStats({
                    totalPaintings: paintings.data.length,
                    totalOrders: orders.data.length,
                    totalRevenue: revenue
                });
            } catch (error) {
                console.error('Error fetching admin stats:', error);
            }
        };
        fetchStats();
    }, [user]);

    const statCards = [
        { title: 'Paintings', value: stats.totalPaintings, icon: Palette, color: 'text-accent', bg: 'bg-accent/10', link: '/paintings' },
        { title: 'Orders', value: stats.totalOrders, icon: ShoppingBag, color: 'text-blue-400', bg: 'bg-blue-400/10', link: '/orders' },
        { title: 'Net Revenue', value: `$${stats.totalRevenue}`, icon: TrendingUp, color: 'text-green-400', bg: 'bg-green-400/10', link: '/orders' },
    ];

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="mb-12">
                <h1 className="text-5xl font-bold title-font mb-4">Gallery <span className="text-accent italic">Overview</span></h1>
                <p className="text-neutral-500 max-w-2xl text-lg leading-relaxed">Welcome back, {user?.name}. Here is an overview of your collection, sales performance, and recent activity across the platform.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                {statCards.map((stat, idx) => (
                    <Link key={idx} to={stat.link} className="glass p-8 rounded-3xl border border-white/5 hover:border-accent/20 transition-all group relative overflow-hidden">
                        <div className="flex justify-between items-start mb-10">
                            <div className={`p-4 ${stat.bg} rounded-2xl`}>
                                <stat.icon className={`w-8 h-8 ${stat.color}`} />
                            </div>
                            <div className="p-2 bg-white/5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                                <ArrowRight className="w-4 h-4 text-accent" />
                            </div>
                        </div>
                        <h3 className="text-neutral-500 text-xs font-bold uppercase tracking-[0.2em] mb-2">{stat.title}</h3>
                        <p className="text-5xl font-bold text-white group-hover:text-accent transition-colors">{stat.value}</p>
                    </Link>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="glass p-10 rounded-3xl border border-white/5 flex flex-col justify-center">
                    <h2 className="text-2xl font-bold title-font mb-8">Business Actions</h2>
                    <div className="space-y-4">
                        <Link to="/paintings/new" className="w-full bg-accent text-neutral-900 font-bold py-5 rounded-2xl text-center hover:bg-accent/90 transition-all flex items-center justify-center gap-3">
                            <Palette className="w-5 h-5" /> Add New Specimen
                        </Link>
                        <Link to="/orders" className="w-full bg-white/5 border border-white/10 text-white font-bold py-5 rounded-2xl text-center hover:bg-white/10 transition-all flex items-center justify-center gap-3">
                            <ShoppingBag className="w-5 h-5 text-neutral-400" /> Review All Orders
                        </Link>
                    </div>
                </div>

                <div className="glass p-10 rounded-3xl border border-white/5 text-center flex flex-col items-center justify-center">
                    <div className="p-6 bg-white/5 rounded-full mb-6">
                        <Users className="w-12 h-12 text-neutral-700" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Customer Relations</h3>
                    <p className="text-neutral-500 italic max-w-xs text-sm">Customer analytics and direct messaging features are currently in development.</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
