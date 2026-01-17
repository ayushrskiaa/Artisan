import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { user } = useAuth();

    if (!user) {
        return <Navigate to="/login" />;
    }

    if (!user.isAdmin) {
        return <div className="h-screen flex items-center justify-center text-center p-10">
            <div>
                <h1 className="text-4xl font-bold mb-4">Access Denied</h1>
                <p className="text-neutral-500">This area is reserved for authorized sellers only.</p>
                <a href={import.meta.env.VITE_STORE_URL} className="text-accent mt-4 block underline">Return to Shop</a>
            </div>
        </div>;
    }

    return children;
};

export default ProtectedRoute;
