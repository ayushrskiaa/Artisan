import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Package, Clock, CheckCircle } from 'lucide-react';

const OrderHistory = () => {
    const [orders, setOrders] = useState([]);
    const { user } = useAuth();

    useEffect(() => {
        const fetchOrders = async () => {
            if (user) {
                try {
                    const config = {
                        headers: {
                            Authorization: `Bearer ${user.token}`
                        }
                    };
                    const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/orders/myorders`, config);
                    setOrders(data);
                } catch (error) {
                    console.error('Error fetching orders:', error);
                }
            }
        };
        fetchOrders();
    }, [user]);

    return (
        <div className="pt-32 pb-20 px-4 max-w-7xl mx-auto min-h-screen">
            <h1 className="text-4xl font-bold title-font mb-10">Order <span className="text-accent italic">History</span></h1>

            {orders.length === 0 ? (
                <div className="glass p-12 rounded-2xl text-center text-neutral-500">
                    <p className="italic text-lg">You haven't placed any orders yet.</p>
                </div>
            ) : (
                <div className="space-y-6">
                    {orders.map((order) => (
                        <div key={order._id} className="glass p-6 rounded-2xl border border-white/5 hover:border-accent/20 transition-all">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 pb-6 border-b border-white/5">
                                <div>
                                    <p className="text-xs text-neutral-500 uppercase tracking-widest mb-1">Order ID</p>
                                    <p className="font-mono text-sm">{order._id}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-neutral-500 uppercase tracking-widest mb-1">Date</p>
                                    <p>{new Date(order.createdAt).toLocaleDateString()}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-neutral-500 uppercase tracking-widest mb-1">Total</p>
                                    <p className="font-bold text-accent">₹{order.totalPrice.toLocaleString()}</p>
                                </div>
                                <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/5">
                                    {order.isPaid ? (
                                        <><CheckCircle className="w-4 h-4 text-green-500" /> <span className="text-xs font-bold uppercase">Paid</span></>
                                    ) : (
                                        <><Clock className="w-4 h-4 text-yellow-500" /> <span className="text-xs font-bold uppercase">Pending</span></>
                                    )}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    {order.orderItems.map((item, idx) => (
                                        <div key={idx} className="flex gap-4">
                                            <div className="w-16 h-20 rounded overflow-hidden">
                                                <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                                            </div>
                                            <div>
                                                <p className="font-bold">{item.title}</p>
                                                <p className="text-sm text-neutral-400 font-bold">₹{item.price.toLocaleString()}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                                    <h4 className="text-xs font-bold uppercase text-accent tracking-widest mb-3">Delivery Status</h4>
                                    <div className="flex items-center gap-3">
                                        <Package className={`w-5 h-5 ${order.isDelivered ? 'text-green-500' : 'text-neutral-500'}`} />
                                        <span className="text-sm">{order.isDelivered ? `Delivered on ${new Date(order.deliveredAt).toLocaleDateString()}` : 'Processing Shipment'}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default OrderHistory;
