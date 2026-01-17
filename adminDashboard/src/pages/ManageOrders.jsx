import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Truck, CheckCircle, Clock, ExternalLink, PackageOpen, LayoutList, MapPin, Package, X, Save } from 'lucide-react';

const ManageOrders = () => {
    const [orders, setOrders] = useState([]);
    const [editingOrder, setEditingOrder] = useState(null);
    const [trackingData, setTrackingData] = useState({
        deliveryPartner: '',
        trackingId: '',
        deliveryStatus: 'Order Placed'
    });
    const { user } = useAuth();
    const API_URL = import.meta.env.VITE_API_URL;

    const deliveryStatuses = [
        'Order Placed',
        'Processing',
        'Packed',
        'Shipped',
        'Out for Delivery',
        'Delivered',
        'Cancelled'
    ];

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

    const openTrackingModal = (order) => {
        setEditingOrder(order._id);
        setTrackingData({
            deliveryPartner: order.deliveryPartner || '',
            trackingId: order.trackingId || '',
            deliveryStatus: order.deliveryStatus || 'Order Placed'
        });
    };

    const closeTrackingModal = () => {
        setEditingOrder(null);
        setTrackingData({
            deliveryPartner: '',
            trackingId: '',
            deliveryStatus: 'Order Placed'
        });
    };

    const updateTracking = async () => {
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            await axios.put(`${API_URL}/orders/${editingOrder}/tracking`, trackingData, config);
            fetchOrders();
            closeTrackingModal();
        } catch (error) {
            alert('Tracking update failed');
        }
    };

    const getStatusColor = (status) => {
        const colors = {
            'Order Placed': 'text-blue-500 bg-blue-500/10 border-blue-500/20',
            'Processing': 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20',
            'Packed': 'text-purple-500 bg-purple-500/10 border-purple-500/20',
            'Shipped': 'text-indigo-500 bg-indigo-500/10 border-indigo-500/20',
            'Out for Delivery': 'text-orange-500 bg-orange-500/10 border-orange-500/20',
            'Delivered': 'text-green-500 bg-green-500/10 border-green-500/20',
            'Cancelled': 'text-red-500 bg-red-500/10 border-red-500/20'
        };
        return colors[status] || 'text-neutral-500 bg-neutral-500/10 border-neutral-500/20';
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
                                <th className="px-8 py-6">Shipping Address</th>
                                <th className="px-8 py-6">Transaction</th>
                                <th className="px-8 py-6">Delivery Status</th>
                                <th className="px-8 py-6 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {orders.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="px-8 py-20 text-center text-neutral-600 italic">No acquisitions recorded yet</td>
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
                                            <div className="flex items-start gap-2 max-w-xs">
                                                <MapPin className="w-3.5 h-3.5 text-accent mt-0.5 flex-shrink-0" />
                                                <div className="text-xs text-neutral-400 leading-relaxed">
                                                    <div className="font-semibold text-white">{order.shippingAddress?.address}</div>
                                                    <div>{order.shippingAddress?.city}, {order.shippingAddress?.postalCode}</div>
                                                    <div className="text-neutral-500">{order.shippingAddress?.country}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex flex-col gap-1">
                                                <div className="font-bold text-accent text-lg">₹{order.totalPrice.toLocaleString()}</div>
                                                <div className="flex items-center gap-2">
                                                    {order.isPaid || order.paymentMethod === 'Razorpay' ? (
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
                                                    <span className="text-[8px] text-neutral-600 uppercase tracking-wider">
                                                        {order.paymentMethod === 'Razorpay' ? '💳 Razorpay' : order.paymentMethod === 'COD' ? '💵 COD' : order.paymentMethod}
                                                    </span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex flex-col gap-2">
                                                <div className={`flex items-center gap-1.5 font-bold text-[9px] uppercase tracking-widest px-2 py-1 rounded-full border w-fit ${getStatusColor(order.deliveryStatus)}`}>
                                                    <Package className="w-2.5 h-2.5" />
                                                    {order.deliveryStatus}
                                                </div>
                                                {order.deliveryPartner && (
                                                    <div className="text-[10px] text-neutral-500">
                                                        <span className="font-semibold">Partner:</span> {order.deliveryPartner}
                                                    </div>
                                                )}
                                                {order.trackingId && (
                                                    <div className="text-[10px] text-neutral-500 font-mono">
                                                        <span className="font-semibold">Tracking:</span> {order.trackingId}
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <div className="flex justify-end items-center gap-4">
                                                <button
                                                    onClick={() => openTrackingModal(order)}
                                                    className="relative bg-accent text-black font-bold text-[10px] uppercase tracking-[0.2em] px-6 py-3 rounded-full hover:bg-accent/90 transition-all shadow-lg active:scale-95 cursor-pointer"
                                                >
                                                    Update Tracking
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

            {/* Tracking Modal */}
            {editingOrder && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="glass rounded-3xl p-8 max-w-lg w-full border border-white/10 shadow-2xl">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-white">Update Tracking Info</h2>
                            <button onClick={closeTrackingModal} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold mb-2 text-neutral-400">Delivery Partner</label>
                                <input
                                    type="text"
                                    value={trackingData.deliveryPartner}
                                    onChange={(e) => setTrackingData({ ...trackingData, deliveryPartner: e.target.value })}
                                    placeholder="e.g., Blue Dart, Delhivery, FedEx"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-accent transition-colors"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold mb-2 text-neutral-400">Tracking ID</label>
                                <input
                                    type="text"
                                    value={trackingData.trackingId}
                                    onChange={(e) => setTrackingData({ ...trackingData, trackingId: e.target.value })}
                                    placeholder="e.g., 1234567890"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-accent transition-colors font-mono"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold mb-2 text-neutral-400">Delivery Status</label>
                                <select
                                    value={trackingData.deliveryStatus}
                                    onChange={(e) => setTrackingData({ ...trackingData, deliveryStatus: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-accent transition-colors cursor-pointer"
                                >
                                    {deliveryStatuses.map((status) => (
                                        <option key={status} value={status} className="bg-neutral-900">
                                            {status}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="flex gap-4 mt-8">
                            <button
                                onClick={updateTracking}
                                className="flex-1 bg-accent text-black font-bold py-3 rounded-xl hover:bg-accent/90 transition-all flex items-center justify-center gap-2"
                            >
                                <Save className="w-4 h-4" />
                                Save Changes
                            </button>
                            <button
                                onClick={closeTrackingModal}
                                className="px-6 bg-white/5 text-white font-bold py-3 rounded-xl hover:bg-white/10 transition-all"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageOrders;
