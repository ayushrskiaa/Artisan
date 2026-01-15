import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('userInfo');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const login = async (email, password) => {
        const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/users/login`, { email, password });
        setUser(data);
        localStorage.setItem('userInfo', JSON.stringify(data));
    };

    const register = async (name, email, password) => {
        const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/users`, { name, email, password });
        setUser(data);
        localStorage.setItem('userInfo', JSON.stringify(data));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('userInfo');
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
