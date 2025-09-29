import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet, ViewStyle } from 'react-native';
import { darkColors } from '@/config/colors';
import { metrics } from '@/utils/metrics';

export interface CheckboxProps {
    checked: boolean;
    onToggle: () => void;
    containerStyle?: ViewStyle;
}

export const Checkbox: React.FC<CheckboxProps> = ({ checked, onToggle, containerStyle }) => {
    return (
        <TouchableOpacity
            style={[styles.container, containerStyle]}
            onPress={onToggle}
            activeOpacity={0.8}
        >
            <View style={[styles.checkbox, checked && styles.checkboxChecked]}>
                {checked && <Text style={styles.checkmark}>✓</Text>}
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkbox: {
        width: metrics.width(18),
        height: metrics.width(18),
        borderWidth: 1,
        borderColor: darkColors.TextWhite,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkboxChecked: {
        borderColor: darkColors.TextWhite,
    },
    checkmark: {
        color: darkColors.primaryColor,
        fontSize: metrics.width(10),
        fontWeight: 'bold',
    },
});
