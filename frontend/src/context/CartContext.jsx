import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (product) => {
        setCartItems((prevItems) => {
            const existingItem = prevItems.find((item) => item._id === product._id);
            if (existingItem) {
                return prevItems;
            }
            return [...prevItems, product];
        });
    };

    const removeFromCart = (id) => {
        setCartItems((prevItems) => prevItems.filter((item) => item._id !== id));
    };

    const clearCart = () => setCartItems([]);

    const cartTotal = cartItems.reduce((total, item) => total + item.price, 0);

    const isInCart = (productId) => {
        return cartItems.some((item) => item._id === productId);
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, cartTotal, isInCart }}>
            {children}
        </CartContext.Provider>
    );
};
