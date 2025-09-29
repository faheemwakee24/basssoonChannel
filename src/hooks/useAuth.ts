import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../config/constants';

export interface User {
    id: string;
    email: string;
    name: string;
    avatar?: string;
}

export interface AuthState {
    user: User | null;
    token: string | null;
    isLoading: boolean;
    isAuthenticated: boolean;
}

export interface AuthActions {
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string, name: string) => Promise<void>;
    logout: () => Promise<void>;
    updateUser: (userData: Partial<User>) => Promise<void>;
    refreshToken: () => Promise<void>;
}

export const useAuth = (): AuthState & AuthActions => {
    const [state, setState] = useState<AuthState>({
        user: null,
        token: null,
        isLoading: true,
        isAuthenticated: false,
    });

    // Initialize auth state from storage
    useEffect(() => {
        initializeAuth();
    }, []);

    const initializeAuth = async () => {
        try {
            const [token, userData] = await Promise.all([
                AsyncStorage.getItem(STORAGE_KEYS.AUTH_TOKEN),
                AsyncStorage.getItem(STORAGE_KEYS.USER_DATA),
            ]);

            if (token && userData) {
                setState({
                    user: JSON.parse(userData),
                    token,
                    isLoading: false,
                    isAuthenticated: true,
                });
            } else {
                setState(prev => ({ ...prev, isLoading: false }));
            }
        } catch (error) {
            console.error('Error initializing auth:', error);
            setState(prev => ({ ...prev, isLoading: false }));
        }
    };

    const login = useCallback(async (email: string, password: string) => {
        setState(prev => ({ ...prev, isLoading: true }));

        try {
            // TODO: Replace with actual API call
            // const response = await authAPI.login(email, password);

            // Mock response for now
            const mockUser: User = {
                id: '1',
                email,
                name: 'John Doe',
            };
            const mockToken = 'mock-jwt-token';

            await Promise.all([
                AsyncStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, mockToken),
                AsyncStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(mockUser)),
            ]);

            setState({
                user: mockUser,
                token: mockToken,
                isLoading: false,
                isAuthenticated: true,
            });
        } catch (error) {
            setState(prev => ({ ...prev, isLoading: false }));
            throw error;
        }
    }, []);

    const register = useCallback(async (email: string, password: string, name: string) => {
        setState(prev => ({ ...prev, isLoading: true }));

        try {
            // TODO: Replace with actual API call
            // const response = await authAPI.register(email, password, name);

            // Mock response for now
            const mockUser: User = {
                id: '1',
                email,
                name,
            };
            const mockToken = 'mock-jwt-token';

            await Promise.all([
                AsyncStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, mockToken),
                AsyncStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(mockUser)),
            ]);

            setState({
                user: mockUser,
                token: mockToken,
                isLoading: false,
                isAuthenticated: true,
            });
        } catch (error) {
            setState(prev => ({ ...prev, isLoading: false }));
            throw error;
        }
    }, []);

    const logout = useCallback(async () => {
        setState(prev => ({ ...prev, isLoading: true }));

        try {
            await Promise.all([
                AsyncStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN),
                AsyncStorage.removeItem(STORAGE_KEYS.USER_DATA),
            ]);

            setState({
                user: null,
                token: null,
                isLoading: false,
                isAuthenticated: false,
            });
        } catch (error) {
            console.error('Error during logout:', error);
            setState(prev => ({ ...prev, isLoading: false }));
        }
    }, []);

    const updateUser = useCallback(async (userData: Partial<User>) => {
        if (!state.user) return;

        try {
            const updatedUser = { ...state.user, ...userData };
            await AsyncStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(updatedUser));

            setState(prev => ({
                ...prev,
                user: updatedUser,
            }));
        } catch (error) {
            console.error('Error updating user:', error);
            throw error;
        }
    }, [state.user]);

    const refreshToken = useCallback(async () => {
        if (!state.token) return;

        try {
            // TODO: Replace with actual API call
            // const response = await authAPI.refreshToken(state.token);
            // const newToken = response.token;

            // For now, just keep the existing token
            console.log('Token refresh requested');
        } catch (error) {
            console.error('Error refreshing token:', error);
            // If refresh fails, logout the user
            await logout();
        }
    }, [state.token, logout]);

    return {
        ...state,
        login,
        register,
        logout,
        updateUser,
        refreshToken,
    };
};
