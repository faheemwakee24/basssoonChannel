import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, ViewStyle, TextStyle } from 'react-native';
import { darkColors } from '@/config/colors';
import { metrics } from '@/utils/metrics';

export interface PrimaryButtonProps {
    title: string;
    onPress: () => void;
    disabled?: boolean;
    loading?: boolean;
    style?: ViewStyle;
    textStyle?: TextStyle;
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({ title, onPress, disabled = false, loading = false, style, textStyle }) => {
    return (
        <TouchableOpacity
            style={[styles.button, disabled || loading ? styles.disabled : null, style]}
            onPress={onPress}
            disabled={disabled || loading}
            activeOpacity={0.8}
        >
            {loading ? (
                <ActivityIndicator color={darkColors.TextWhite} />
            ) : (
                <Text style={[styles.text, textStyle]}>{title}</Text>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        width: '100%',
        backgroundColor: darkColors.primaryColor,
        paddingVertical: metrics.width(12),
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: darkColors.TextWhite,
        fontSize: 14,
        fontWeight: 'bold',
    },
    disabled: {
        opacity: 0.6,
    },
});
