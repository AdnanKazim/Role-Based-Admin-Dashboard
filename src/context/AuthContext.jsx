import React, { createContext, useContext, useEffect, useState } from 'react';
import { mockApi } from '@/services/mockApi';

const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const initAuth = async () => {
            const token = localStorage.getItem('auth_token');
            if (token) {
                try {
                    const user = await mockApi.getUser(token);
                    setUser(user);
                } catch (error) {
                    console.error('Failed to restore session:', error);
                    localStorage.removeItem('auth_token');
                }
            }
            setIsLoading(false);
        };
        initAuth();
    }, []);

    const login = async (email) => {
        setIsLoading(true);
        try {
            const response = await mockApi.login(email);
            localStorage.setItem('auth_token', response.token);
            setUser(response.user);
        } catch (error) {
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem('auth_token');
        setUser(null);
    };

    const hasRole = (role) => {
        return user?.role === role;
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, logout, hasRole }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
