import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
    useAppDispatch,
    useAppSelector,
    setUser,
    setAuthLoading,
    showSnackbar,
} from '../store';

/**
 * Example component showing how to use Redux with Redux Toolkit
 * 
 * Usage patterns:
 * 1. useAppDispatch - Type-safe dispatch hook
 * 2. useAppSelector - Type-safe selector hook
 * 3. Actions from slices
 */

export const ReduxExample = () => {
    const dispatch = useAppDispatch();

    // Selectors - pick only the data you need
    const user = useAppSelector(state => state.auth.user);
    const isLoading = useAppSelector(state => state.auth.isLoading);
    const error = useAppSelector(state => state.auth.error);

    // UI state
    const uiLoading = useAppSelector(state => state.ui.isLoading);
    const snackbar = useAppSelector(state => state.ui.snackbar);
    const theme = useAppSelector(state => state.ui.theme);

    useEffect(() => {
        // Example: Setting user on component mount
        dispatch(setUser({
            id: '123',
            email: 'user@example.com',
            name: 'John Doe',
        }));

        // Example: Show snackbar
        dispatch(showSnackbar({
            message: 'User logged in successfully!',
            type: 'success',
        }));
    }, [dispatch]);

    const handleLogout = () => {
        dispatch(setAuthLoading(true));

        // Simulate async operation
        setTimeout(() => {
            dispatch(setAuthLoading(false));
            dispatch(showSnackbar({
                message: 'Logged out',
                type: 'info',
            }));
        }, 1000);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Redux Example</Text>

            {isLoading ? (
                <Text>Loading...</Text>
            ) : (
                <>
                    {user && (
                        <>
                            <Text style={styles.label}>User: {user.name}</Text>
                            <Text style={styles.label}>Email: {user.email}</Text>
                        </>
                    )}

                    {error && <Text style={styles.error}>{error}</Text>}

                    {snackbar.visible && (
                        <Text style={[styles.snackbar, styles[`snackbar${snackbar.type}`]]}>
                            {snackbar.message}
                        </Text>
                    )}

                    <Text style={styles.label}>Theme: {theme}</Text>
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#fff',
        borderRadius: 8,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 12,
    },
    label: {
        fontSize: 14,
        marginVertical: 8,
    },
    error: {
        fontSize: 14,
        color: 'red',
        marginVertical: 8,
    },
    snackbar: {
        padding: 8,
        borderRadius: 4,
        marginVertical: 8,
        fontWeight: 'bold',
    },
    snackbarsuccess: {
        backgroundColor: '#4CAF50',
        color: '#fff',
    },
    snackbarerror: {
        backgroundColor: '#f44336',
        color: '#fff',
    },
    snackbarinfo: {
        backgroundColor: '#2196F3',
        color: '#fff',
    },
    snackbarwarning: {
        backgroundColor: '#ff9800',
        color: '#fff',
    },
});
