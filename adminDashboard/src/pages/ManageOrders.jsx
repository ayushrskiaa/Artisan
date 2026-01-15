import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Truck, CheckCircle, Clock, ExternalLink, PackageOpen, LayoutList } from 'lucide-react';

const ManageOrders = () => {
    const [orders, setOrders] = useState([]);
    const { user } = useAuth();
    const API_URL = import.meta.env.VITE_API_URL;

    const fetchOrders = async () => {
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            const { data } = await axios.get(`${API_URL}/orders`, config);
            setOrders(data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, [user]);

    const deliverHandler = async (id) => {
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            await axios.put(`${API_URL}/orders/${id}/deliver`, {}, config);
            fetchOrders();
        } catch (error) {
            alert('Status update failed');
        }
    };

    const payHandler = async (id) => {
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            await axios.put(`${API_URL}/orders/${id}/pay`, { status: 'Manual' }, config);
            fetchOrders();
        } catch (error) {
            alert('Payment update failed');
        }
    };

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="mb-12">
                <h1 className="text-4xl font-bold title-font text-white mb-2">Acquisition <span className="text-accent italic">Logs</span></h1>
                <p className="text-neutral-500 text-sm tracking-wide uppercase font-bold">Comprehensive Registry of {orders.length} Transactions</p>
            </div>

            <div className="glass rounded-[2rem] overflow-hidden border border-white/5 shadow-2xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-white/5 text-neutral-500 text-[10px] font-bold uppercase tracking-[0.2em] border-b border-white/5">
                                <th className="px-8 py-6">Reference</th>
                                <th className="px-8 py-6">Patron Details</th>
                                <th className="px-8 py-6">Transaction</th>
                                <th className="px-8 py-6">Fulfillment</th>
                                <th className="px-8 py-6 text-right">Logistical Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {orders.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="px-8 py-20 text-center text-neutral-600 italic">No acquisitions recorded yet</td>
                                </tr>
                            ) : (
                                orders.map((order) => (
                                    <tr key={order._id} className="hover:bg-white/[0.02] transition-colors group">
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 bg-white/5 rounded-lg border border-white/10">
                                                    <PackageOpen className="w-4 h-4 text-neutral-500" />
                                                </div>
                                                <span className="font-mono text-[11px] text-neutral-500 tracking-tighter group-hover:text-neutral-300 transition-colors">
                                                    {order._id.toUpperCase()}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="font-bold text-white mb-1">{order.user?.name || 'Anonymous Guest'}</div>
                                            <div className="text-[10px] text-neutral-600 font-mono italic uppercase tracking-widest">{new Date(order.createdAt).toLocaleString()}</div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex flex-col gap-1">
                                                <div className="font-bold text-accent text-lg">₹{order.totalPrice.toLocaleString()}</div>
                                                <div className="flex items-center gap-2">
                                                    {order.isPaid ? (
                                                        <div className="flex items-center gap-1.5 text-green-500 font-bold text-[9px] uppercase tracking-widest bg-green-500/10 px-2 py-0.5 rounded-full border border-green-500/20">
                                                            <CheckCircle className="w-2.5 h-2.5" /> Settled
                                                        </div>
                                                    ) : (
                                                        <button
                                                            onClick={() => payHandler(order._id)}
                                                            className="flex items-center gap-1.5 text-yellow-500 hover:text-green-500 transition-colors font-bold text-[9px] uppercase tracking-widest bg-yellow-500/10 px-2 py-0.5 rounded-full border border-yellow-500/20 cursor-pointer"
                                                        >
                                                            <Clock className="w-2.5 h-2.5" /> Pending
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 font-bold text-sm">
                                            {order.isDelivered ? (
                                                <div className="flex items-center gap-2 text-green-500">
                                                    <LayoutList className="w-4 h-4 opacity-70" />
                                                    <span className="text-[10px] uppercase tracking-widest">Delivered</span>
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-2 text-neutral-600 italic">
                                                    <Truck className="w-4 h-4 opacity-40 group-hover:translate-x-1 transition-transform" />
                                                    <span className="text-[10px] uppercase tracking-widest">Processing Acquisition</span>
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <div className="flex justify-end items-center gap-4">
                                                {!order.isDelivered && (
                                                    <button
                                                        onClick={() => deliverHandler(order._id)}
                                                        className="relative bg-white text-black font-bold text-[10px] uppercase tracking-[0.2em] px-6 py-3 rounded-full hover:bg-accent hover:text-black transition-all shadow-lg active:scale-95 cursor-pointer"
                                                    >
                                                        Dispatch Art
                                                    </button>
                                                )}
                                                <button className="p-3 text-neutral-600 hover:text-white transition-colors cursor-pointer" title="Detailed View">
                                                    <ExternalLink className="w-4 h-4" />
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

export default ManageOrders;
