// Redux store and hooks
export { store } from './store';
export { useAppDispatch, useAppSelector } from './hooks';
export type { RootState, AppDispatch } from './store';

// Redux auth slice
export {
    setLoading as setAuthLoading,
    setUser,
    setError as setAuthError,
    logout,
    clearError,
} from './slices/authSlice';
export type { User as ReduxUser, AuthState as ReduxAuthState } from './slices/authSlice';

// Redux UI slice
export {
    setLoading as setUILoading,
    showSnackbar,
    hideSnackbar,
    setTheme,
} from './slices/uiSlice';
export type { UIState } from './slices/uiSlice';

// Original exports
export { useAuth } from '../hooks/useAuth';
export { useTheme } from '../hooks/useTheme';
export { useNetwork } from '../hooks/useNetwork';

// Re-export types for convenience
export type { User, AuthState, AuthActions } from '../hooks/useAuth';
export type { Theme } from '../config/theme';
export type { ColorScheme } from '../config/colors';
export type { NetworkState } from '../hooks/useNetwork';
