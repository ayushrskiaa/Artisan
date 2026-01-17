import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Ticket, Plus, Edit2, Trash2, X, Save } from 'lucide-react';

const ManageCoupons = () => {
    const [coupons, setCoupons] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editingCoupon, setEditingCoupon] = useState(null);
    const { user } = useAuth();
    const API_URL = import.meta.env.VITE_API_URL;

    const [formData, setFormData] = useState({
        code: '',
        discountType: 'percentage',
        discountValue: '',
        minPurchaseAmount: 0,
        maxDiscountAmount: '',
        usageLimit: '',
        validFrom: '',
        validUntil: '',
        isActive: true,
        description: ''
    });

    const fetchCoupons = async () => {
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            const { data } = await axios.get(`${API_URL}/coupons`, config);
            setCoupons(data);
        } catch (error) {
            console.error('Error fetching coupons:', error);
        }
    };

    useEffect(() => {
        fetchCoupons();
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };

            const couponData = {
                ...formData,
                maxDiscountAmount: formData.maxDiscountAmount || null,
                usageLimit: formData.usageLimit || null
            };

            if (editingCoupon) {
                await axios.put(`${API_URL}/coupons/${editingCoupon._id}`, couponData, config);
            } else {
                await axios.post(`${API_URL}/coupons`, couponData, config);
            }

            fetchCoupons();
            closeModal();
        } catch (error) {
            alert('Error saving coupon: ' + error.response?.data?.message);
        }
    };

    const deleteCoupon = async (id) => {
        if (window.confirm('Are you sure you want to delete this coupon?')) {
            try {
                const config = { headers: { Authorization: `Bearer ${user.token}` } };
                await axios.delete(`${API_URL}/coupons/${id}`, config);
                fetchCoupons();
            } catch (error) {
                alert('Error deleting coupon');
            }
        }
    };

    const openModal = (coupon = null) => {
        if (coupon) {
            setEditingCoupon(coupon);
            setFormData({
                code: coupon.code,
                discountType: coupon.discountType,
                discountValue: coupon.discountValue,
                minPurchaseAmount: coupon.minPurchaseAmount,
                maxDiscountAmount: coupon.maxDiscountAmount || '',
                usageLimit: coupon.usageLimit || '',
                validFrom: coupon.validFrom?.split('T')[0],
                validUntil: coupon.validUntil?.split('T')[0],
                isActive: coupon.isActive,
                description: coupon.description || ''
            });
        } else {
            setEditingCoupon(null);
            setFormData({
                code: '',
                discountType: 'percentage',
                discountValue: '',
                minPurchaseAmount: 0,
                maxDiscountAmount: '',
                usageLimit: '',
                validFrom: '',
                validUntil: '',
                isActive: true,
                description: ''
            });
        }
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setEditingCoupon(null);
    };

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="mb-12 flex justify-between items-center">
                <div>
                    <h1 className="text-4xl font-bold title-font text-white mb-2">Coupon <span className="text-accent italic">Management</span></h1>
                    <p className="text-neutral-500 text-sm tracking-wide uppercase font-bold">Manage discount codes and promotions</p>
                </div>
                <button
                    onClick={() => openModal()}
                    className="bg-accent text-black px-6 py-3 rounded-full font-bold hover:bg-accent/90 flex items-center gap-2"
                >
                    <Plus className="w-5 h-5" />
                    Create Coupon
                </button>
            </div>

            <div className="glass rounded-[2rem] overflow-hidden border border-white/5 shadow-2xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-white/5 text-neutral-500 text-[10px] font-bold uppercase tracking-[0.2em] border-b border-white/5">
                                <th className="px-8 py-6">Code</th>
                                <th className="px-8 py-6">Discount</th>
                                <th className="px-8 py-6">Usage</th>
                                <th className="px-8 py-6">Validity</th>
                                <th className="px-8 py-6">Status</th>
                                <th className="px-8 py-6 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {coupons.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="px-8 py-20 text-center text-neutral-600 italic">No coupons created yet</td>
                                </tr>
                            ) : (
                                coupons.map((coupon) => (
                                    <tr key={coupon._id} className="hover:bg-white/[0.02] transition-colors group">
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-3">
                                                <Ticket className="w-5 h-5 text-accent" />
                                                <span className="font-mono font-bold text-white">{coupon.code}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="font-bold text-accent">
                                                {coupon.discountType === 'percentage'
                                                    ? `${coupon.discountValue}% OFF`
                                                    : `₹${coupon.discountValue} OFF`}
                                            </div>
                                            {coupon.minPurchaseAmount > 0 && (
                                                <div className="text-xs text-neutral-500 mt-1">
                                                    Min: ₹{coupon.minPurchaseAmount}
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="text-sm">
                                                {coupon.usedCount} / {coupon.usageLimit || '∞'}
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="text-xs text-neutral-400">
                                                <div>{new Date(coupon.validFrom).toLocaleDateString()}</div>
                                                <div>to {new Date(coupon.validUntil).toLocaleDateString()}</div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${coupon.isActive
                                                    ? 'bg-green-500/10 text-green-500 border border-green-500/20'
                                                    : 'bg-red-500/10 text-red-500 border border-red-500/20'
                                                }`}>
                                                {coupon.isActive ? 'Active' : 'Inactive'}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <div className="flex justify-end gap-2">
                                                <button
                                                    onClick={() => openModal(coupon)}
                                                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                                                >
                                                    <Edit2 className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => deleteCoupon(coupon._id)}
                                                    className="p-2 hover:bg-red-500/20 text-red-500 rounded-lg transition-colors"
                                                >
                                                    <Trash2 className="w-4 h-4" />
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

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="glass rounded-3xl p-8 max-w-2xl w-full border border-white/10 shadow-2xl max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-white">{editingCoupon ? 'Edit' : 'Create'} Coupon</h2>
                            <button onClick={closeModal} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold mb-2 text-neutral-400">Coupon Code</label>
                                    <input
                                        type="text"
                                        value={formData.code}
                                        onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-accent font-mono"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold mb-2 text-neutral-400">Discount Type</label>
                                    <select
                                        value={formData.discountType}
                                        onChange={(e) => setFormData({ ...formData, discountType: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-accent"
                                    >
                                        <option value="percentage">Percentage</option>
                                        <option value="fixed">Fixed Amount</option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold mb-2 text-neutral-400">Discount Value</label>
                                    <input
                                        type="number"
                                        value={formData.discountValue}
                                        onChange={(e) => setFormData({ ...formData, discountValue: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-accent"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold mb-2 text-neutral-400">Min Purchase (₹)</label>
                                    <input
                                        type="number"
                                        value={formData.minPurchaseAmount}
                                        onChange={(e) => setFormData({ ...formData, minPurchaseAmount: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-accent"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold mb-2 text-neutral-400">Max Discount (₹) - Optional</label>
                                    <input
                                        type="number"
                                        value={formData.maxDiscountAmount}
                                        onChange={(e) => setFormData({ ...formData, maxDiscountAmount: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-accent"
                                        placeholder="Unlimited"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold mb-2 text-neutral-400">Usage Limit - Optional</label>
                                    <input
                                        type="number"
                                        value={formData.usageLimit}
                                        onChange={(e) => setFormData({ ...formData, usageLimit: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-accent"
                                        placeholder="Unlimited"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold mb-2 text-neutral-400">Valid From</label>
                                    <input
                                        type="date"
                                        value={formData.validFrom}
                                        onChange={(e) => setFormData({ ...formData, validFrom: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-accent"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold mb-2 text-neutral-400">Valid Until</label>
                                    <input
                                        type="date"
                                        value={formData.validUntil}
                                        onChange={(e) => setFormData({ ...formData, validUntil: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-accent"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold mb-2 text-neutral-400">Description</label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-accent"
                                    rows="3"
                                />
                            </div>

                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={formData.isActive}
                                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                                    className="w-4 h-4"
                                />
                                <label className="text-sm font-bold text-neutral-400">Active</label>
                            </div>

                            <div className="flex gap-4 mt-8">
                                <button
                                    type="submit"
                                    className="flex-1 bg-accent text-black font-bold py-3 rounded-xl hover:bg-accent/90 transition-all flex items-center justify-center gap-2"
                                >
                                    <Save className="w-4 h-4" />
                                    {editingCoupon ? 'Update' : 'Create'} Coupon
                                </button>
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="px-6 bg-white/5 text-white font-bold py-3 rounded-xl hover:bg-white/10 transition-all"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageCoupons;
