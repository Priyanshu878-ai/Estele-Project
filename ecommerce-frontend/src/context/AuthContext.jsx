import { createContext, useContext, useState } from 'react';
import api from '../services/api';

// ye context poore app ko batayega "kaun login h abhi"
const AuthContext = createContext();

export function AuthProvider({ children }) {
    // agar pehle se localStorage me user data pada h, to usi se start kr denge
    const [user, setUser] = useState(() => {
        const saved = localStorage.getItem('user');
        return saved ? JSON.parse(saved) : null;
    });

    // register krne ka function
    const register = async (name, email, password) => {
        const res = await api.post('/register', { name, email, password });
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user));
        setUser(res.data.user);
    };

    // login krne ka function
    const login = async (email, password) => {
        const res = await api.post('/login', { email, password });
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user));
        setUser(res.data.user);
    };

    // logout krne ka function
    const logout = async () => {
        await api.post('/logout');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, register, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

// ye chhota helper h - isse hume baar baar useContext(AuthContext) nahi likhna padega
export function useAuth() {
    return useContext(AuthContext);
}