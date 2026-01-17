import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    Palette,
    ShoppingBag,
    Ticket,
    LogOut,
    Menu,
    X,
    Palette as BrandIcon,
    Settings,
    ArrowLeft
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const AdminLayout = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { logout, user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const menuItems = [
        { path: '/', icon: LayoutDashboard, label: 'Overview' },
        { path: '/paintings', icon: Palette, label: 'Inventory' },
        { path: '/orders', icon: ShoppingBag, label: 'Orders' },
        { path: '/coupons', icon: Ticket, label: 'Coupons' },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <div className="flex h-screen bg-[#050505] text-white overflow-hidden font-inter">
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] lg:hidden cursor-pointer"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            <aside className={`
                fixed inset-y-0 left-0 z-[101] w-72 bg-[#0a0a0a] border-r border-white/5 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0
                ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
`}>
                <div className="flex flex-col h-full">
                    <div className="p-8 flex items-center gap-3">
                        <div className="p-2 bg-accent rounded-xl">
                            <BrandIcon className="w-6 h-6 text-black" />
                        </div>
                        <span className="text-xl font-bold title-font tracking-tight">Artisan <span className="text-accent underline decoration-1 underline-offset-4">Pro</span></span>
                    </div>

                    <nav className="flex-grow px-4 space-y-2 py-4">
                        {menuItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                onClick={() => setSidebarOpen(false)}
                                className={`
                                    flex items-center gap-3 px-6 py-4 rounded-2xl transition-all duration-200 group
                                    ${isActive(item.path)
                                        ? 'bg-accent text-black font-bold shadow-[0_0_20px_rgba(192,160,128,0.3)]'
                                        : 'text-neutral-500 hover:bg-white/5 hover:text-white'
                                    }
`}
                            >
                                <item.icon className={`w-5 h-5 ${isActive(item.path) ? 'text-black' : 'group-hover:scale-110 transition-transform'}`} />
                                <span className="tracking-wide text-sm">{item.label}</span>
                            </Link>
                        ))}
                    </nav>

                    <div className="p-6 border-t border-white/5 space-y-4">
                        <div className="flex items-center gap-3 px-4 py-3 bg-white/5 rounded-2xl">
                            <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center text-accent font-bold">
                                {user?.name?.charAt(0)}
                            </div>
                            <div className="overflow-hidden">
                                <p className="text-sm font-bold truncate">{user?.name}</p>
                                <p className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold">Admin Account</p>
                            </div>
                        </div>

                        <a href="http://localhost:5173" className="flex items-center gap-3 px-6 py-3 text-sm text-neutral-400 hover:text-white transition-colors">
                            <ArrowLeft className="w-4 h-4" /> Exit to Store
                        </a>

                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-6 py-4 text-sm text-red-500 hover:bg-red-500/10 rounded-2xl transition-all font-bold cursor-pointer"
                        >
                            <LogOut className="w-5 h-5" /> Logout
                        </button>
                    </div>
                </div>
            </aside>

            <main className="flex-grow flex flex-col min-w-0 overflow-hidden">
                <header className="h-20 lg:h-24 flex items-center justify-between px-6 lg:px-12 border-b border-white/5 bg-[#0a0a0a]/50 backdrop-blur-xl shrink-0">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="p-3 lg:hidden text-neutral-400 hover:text-white bg-white/5 rounded-xl transition-colors cursor-pointer"
                    >
                        <Menu className="w-6 h-6" />
                    </button>

                    <div className="hidden lg:block">
                        <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-neutral-600">
                            Dashboard / <span className="text-neutral-300">{menuItems.find(m => isActive(m.path))?.label || 'General'}</span>
                        </h2>
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="p-3 text-neutral-400 hover:text-white transition-colors relative cursor-pointer">
                            <Settings className="w-5 h-5" />
                        </button>
                    </div>
                </header>

                <div className="flex-grow overflow-y-auto p-6 lg:p-12">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
