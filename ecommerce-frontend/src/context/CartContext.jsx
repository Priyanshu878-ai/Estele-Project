import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
    // ab cart ek array hoga, har item me { product, quantity }
    const [items, setItems] = useState([]);

    const addToCart = (product, quantity = 1) => {
        setItems((prev) => {
            // check karenge ye product pehle se cart me h ya nahi
            const existing = prev.find((item) => item.product.id === product.id);

            if (existing) {
                // pehle se h, to bas quantity badha denge
                return prev.map((item) =>
                    item.product.id === product.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }

            // naya product h, list me add kr denge
            return [...prev, { product, quantity }];
        });
    };

    const removeFromCart = (productId) => {
        setItems((prev) => prev.filter((item) => item.product.id !== productId));
    };

    const clearCart = () => {
        setItems([]);
    };

    // total items count (navbar me dikhane ke liye)
    const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <CartContext.Provider value={{ items, addToCart, removeFromCart, clearCart, totalQuantity }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}