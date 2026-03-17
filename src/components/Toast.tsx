import React, { useEffect, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Animated,
    TouchableOpacity,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { hideSnackbar } from '../store/slices/uiSlice';
import type { AppDispatch } from '../store/store';

const TOAST_DURATION = 3000;

interface ToastState {
    visible: boolean;
    message: string;
    type: 'success' | 'error' | 'info' | 'warning';
}

export const Toast: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const uiState = useSelector((state: any) => state.ui);
    const snackbar = uiState?.snackbar as ToastState;
    const animatedValue = useRef(new Animated.Value(0)).current;

    const getBackgroundColor = () => {
        switch (snackbar.type) {
            case 'success':
                return '#4CAF50';
            case 'error':
                return '#F44336';
            case 'warning':
                return '#FF9800';
            case 'info':
            default:
                return '#2196F3';
        }
    };

    const getIcon = () => {
        switch (snackbar.type) {
            case 'success':
                return '✓';
            case 'error':
                return '✕';
            case 'warning':
                return '⚠';
            case 'info':
            default:
                return 'ℹ';
        }
    };

    useEffect(() => {
        if (snackbar.visible) {
            // Animate in
            Animated.timing(animatedValue, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }).start();

            // Auto-hide after duration
            const timer = setTimeout(() => {
                Animated.timing(animatedValue, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true,
                }).start(() => {
                    dispatch(hideSnackbar());
                });
            }, TOAST_DURATION);

            return () => clearTimeout(timer);
        }
    }, [snackbar.visible, animatedValue, dispatch]);

    if (!snackbar?.visible) {
        return null;
    }

    const translateY = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [100, 0],
    });

    const opacity = animatedValue.interpolate({
        inputRange: [0, 0.1, 1],
        outputRange: [0, 1, 1],
    });

    return (
        <Animated.View
            style={[
                styles.container,
                {
                    transform: [{ translateY }],
                    opacity,
                },
            ]}
        >
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => dispatch(hideSnackbar())}
            >
                <View
                    style={[
                        styles.toast,
                        {
                            backgroundColor: getBackgroundColor(),
                        },
                    ]}
                >
                    <View style={styles.iconContainer}>
                        <Text style={styles.icon}>{getIcon()}</Text>
                    </View>
                    <Text style={styles.message} numberOfLines={2}>
                        {snackbar.message}
                    </Text>
                    <TouchableOpacity
                        onPress={() => dispatch(hideSnackbar())}
                        style={styles.closeButton}
                    >
                        <Text style={styles.closeIcon}>✕</Text>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 20,
        left: 16,
        right: 16,
        zIndex: 9999,
    },
    toast: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    iconContainer: {
        marginRight: 12,
        width: 24,
        height: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
    message: {
        flex: 1,
        color: '#fff',
        fontSize: 14,
        fontWeight: '500',
        lineHeight: 20,
    },
    closeButton: {
        marginLeft: 12,
        padding: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeIcon: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
    },
});
