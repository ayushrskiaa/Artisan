import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import AdminLayout from './components/AdminLayout';

// Pages
import Dashboard from './pages/Dashboard';
import ManagePaintings from './pages/ManagePaintings';
import EditPainting from './pages/EditPainting';
import ManageOrders from './pages/ManageOrders';
import ManageCoupons from './pages/ManageCoupons';
import Login from './pages/Login';

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    {/* Public Authentication */}
                    <Route path="/login" element={<Login />} />

                    {/* Secure Admin Routes */}
                    <Route path="/" element={
                        <ProtectedRoute>
                            <AdminLayout>
                                <Dashboard />
                            </AdminLayout>
                        </ProtectedRoute>
                    } />

                    <Route path="/paintings" element={
                        <ProtectedRoute>
                            <AdminLayout>
                                <ManagePaintings />
                            </AdminLayout>
                        </ProtectedRoute>
                    } />

                    <Route path="/paintings/new" element={
                        <ProtectedRoute>
                            <AdminLayout>
                                <EditPainting />
                            </AdminLayout>
                        </ProtectedRoute>
                    } />

                    <Route path="/paintings/:id/edit" element={
                        <ProtectedRoute>
                            <AdminLayout>
                                <EditPainting />
                            </AdminLayout>
                        </ProtectedRoute>
                    } />

                    <Route path="/orders" element={
                        <ProtectedRoute>
                            <AdminLayout>
                                <ManageOrders />
                            </AdminLayout>
                        </ProtectedRoute>
                    } />

                    <Route path="/coupons" element={
                        <ProtectedRoute>
                            <AdminLayout>
                                <ManageCoupons />
                            </AdminLayout>
                        </ProtectedRoute>
                    } />

                    {/* Fallback */}
                    <Route path="*" element={<div className="h-screen flex items-center justify-center text-accent italic">Lost in the gallery? Return to Dashboard.</div>} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
