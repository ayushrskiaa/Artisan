import React, { useState } from 'react';
import { ShoppingCart, Menu, X, Palette, User, LogOut, Package, LayoutDashboard } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import CartModal from './CartModal';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const { cartItems } = useCart();
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
        setIsUserMenuOpen(false);
    };

    return (
        <>
            <nav className="fixed w-full z-50 glass border-b border-white/10 top-0">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-20 items-center">
                        <Link to="/" className="flex items-center space-x-2 group">
                            <Palette className="w-8 h-8 text-accent group-hover:rotate-12 transition-transform" />
                            <span className="text-2xl title-font font-bold tracking-wider">Rskiaa</span>
                        </Link>

                        {/* Desktop Links */}
                        <div className="hidden md:flex items-center space-x-8">
                            <Link to="/" className="text-neutral-300 hover:text-white transition-colors font-medium">Home</Link>
                            <Link to="/gallery" className="text-neutral-300 hover:text-white transition-colors font-medium">Gallery</Link>
                            {user?.isAdmin && (
                                <a href="http://localhost:5174" className="text-accent hover:text-white transition-colors font-bold flex items-center gap-2">
                                    <LayoutDashboard className="w-4 h-4" /> Dashboard
                                </a>
                            )}

                            <div className="flex items-center gap-6 border-l border-white/10 pl-8">
                                <button
                                    onClick={() => setIsCartOpen(true)}
                                    className="relative p-2 text-neutral-300 hover:text-white transition-colors cursor-pointer"
                                >
                                    <ShoppingCart className="w-6 h-6" />
                                    {cartItems.length > 0 && (
                                        <span className="absolute top-0 right-0 bg-accent text-neutral-900 text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center animate-bounce">
                                            {cartItems.length}
                                        </span>
                                    )}
                                </button>

                                {user ? (
                                    <div className="relative">
                                        <button
                                            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                            className="flex items-center gap-2 p-2 rounded-full border border-white/10 hover:border-accent/40 bg-white/5 transition-all text-neutral-300 hover:text-white cursor-pointer"
                                        >
                                            <User className="w-5 h-5" />
                                            <span className="text-sm font-bold tracking-wide">{user.name.split(' ')[0]}</span>
                                        </button>

                                        {isUserMenuOpen && (
                                            <div className="absolute right-0 mt-3 w-48 glass rounded-xl border border-white/10 overflow-hidden shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200">
                                                {user.isAdmin && (
                                                    <a href="http://localhost:5174" className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-accent/20 text-accent transition-colors">
                                                        <LayoutDashboard className="w-4 h-4" /> Seller Dash
                                                    </a>
                                                )}
                                                <Link to="/orders" onClick={() => setIsUserMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-white/10 transition-colors">
                                                    <Package className="w-4 h-4" /> My Orders
                                                </Link>
                                                <button
                                                    onClick={handleLogout}
                                                    className="w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-red-500/20 text-red-400 transition-colors border-t border-white/5 cursor-pointer"
                                                >
                                                    <LogOut className="w-4 h-4" /> Logout
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <Link to="/login" className="text-accent border border-accent/20 hover:bg-accent/10 hover:border-accent/40 px-6 py-2 rounded-full text-sm font-bold transition-all">
                                        Sign In
                                    </Link>
                                )}
                            </div>
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="md:hidden flex items-center gap-4">
                            <button
                                onClick={() => setIsCartOpen(true)}
                                className="relative p-2 text-neutral-300 cursor-pointer"
                            >
                                <ShoppingCart className="w-6 h-6" />
                                {cartItems.length > 0 && (
                                    <span className="absolute top-0 right-0 bg-accent text-neutral-900 text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                                        {cartItems.length}
                                    </span>
                                )}
                            </button>
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="text-neutral-300 hover:text-white p-2 cursor-pointer"
                            >
                                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <div className="md:hidden glass border-t border-white/10 animate-in slide-in-from-top duration-300">
                        <div className="px-4 pt-2 pb-6 space-y-4">
                            <Link to="/" onClick={() => setIsOpen(false)} className="block py-2 text-neutral-300 hover:text-white border-b border-white/5">Home</Link>
                            <Link to="/gallery" onClick={() => setIsOpen(false)} className="block py-2 text-neutral-300 hover:text-white border-b border-white/5">Gallery</Link>
                            {user?.isAdmin && (
                                <a href="http://localhost:5174" className="block py-2 text-accent font-bold border-b border-white/5">Seller Dashboard</a>
                            )}
                            {user ? (
                                <>
                                    <Link to="/orders" onClick={() => setIsOpen(false)} className="block py-2 text-neutral-300 hover:text-white border-b border-white/5">My Orders</Link>
                                    <button onClick={handleLogout} className="block w-full text-left py-2 text-red-400 cursor-pointer">Logout</button>
                                </>
                            ) : (
                                <Link to="/login" onClick={() => setIsOpen(false)} className="block py-2 text-accent font-bold">Sign In</Link>
                            )}
                        </div>
                    </div>
                )}
            </nav>

            <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </>
    );
};

export default Navbar;
