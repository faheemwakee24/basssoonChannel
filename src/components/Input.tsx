import React, { useState } from 'react';
import {
    TextInput,
    View,
    Text,
    StyleSheet,
    TextInputProps,
    ViewStyle,
    TextStyle,
} from 'react-native';
import { useTheme } from '../hooks/useTheme';

export interface InputProps extends TextInputProps {
    label?: string;
    error?: string;
    helperText?: string;
    variant?: 'outlined' | 'filled' | 'underlined';
    size?: 'small' | 'medium' | 'large';
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    containerStyle?: ViewStyle;
    inputStyle?: TextStyle;
    labelStyle?: TextStyle;
    errorStyle?: TextStyle;
    helperStyle?: TextStyle;
}

export const Input: React.FC<InputProps> = ({
    label,
    error,
    helperText,
    variant = 'outlined',
    size = 'medium',
    leftIcon,
    rightIcon,
    containerStyle,
    inputStyle,
    labelStyle,
    errorStyle,
    helperStyle,
    onFocus,
    onBlur,
    ...props
}) => {
    const { theme } = useTheme();
    const [isFocused, setIsFocused] = useState(false);
    const styles = createStyles(theme);

    const handleFocus = (e: any) => {
        setIsFocused(true);
        onFocus?.(e);
    };

    const handleBlur = (e: any) => {
        setIsFocused(false);
        onBlur?.(e);
    };

    const getContainerStyle = () => {
        const baseStyle = [styles.container, styles[`${variant}Container`]];

        if (isFocused) {
            baseStyle.push(styles.focused);
        }

        if (error) {
            baseStyle.push(styles.error);
        }

        return baseStyle;
    };

    const getInputStyle = () => {
        const baseStyle = [styles.input, styles[`${size}Input`]];

        if (leftIcon) {
            baseStyle.push(styles.inputWithLeftIcon);
        }

        if (rightIcon) {
            baseStyle.push(styles.inputWithRightIcon);
        }

        return baseStyle;
    };

    return (
        <View style={[containerStyle]}>
            {label && (
                <Text style={[styles.label, labelStyle]}>{label}</Text>
            )}

            <View style={getContainerStyle()}>
                {leftIcon && (
                    <View style={styles.leftIcon}>
                        {leftIcon}
                    </View>
                )}

                <TextInput
                    style={[getInputStyle(), inputStyle]}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    placeholderTextColor={theme.colors.text.tertiary}
                    {...props}
                />

                {rightIcon && (
                    <View style={styles.rightIcon}>
                        {rightIcon}
                    </View>
                )}
            </View>

            {error && (
                <Text style={[styles.errorText, errorStyle]}>{error}</Text>
            )}

            {helperText && !error && (
                <Text style={[styles.helperText, helperStyle]}>{helperText}</Text>
            )}
        </View>
    );
};

const createStyles = (theme: any) => StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: theme.borderRadius.md,
    },

    // Variant styles
    outlinedContainer: {
        borderWidth: 1,
        borderColor: theme.colors.border.medium,
        backgroundColor: theme.colors.background.primary,
    },
    filledContainer: {
        backgroundColor: theme.colors.background.secondary,
        borderWidth: 0,
    },
    underlinedContainer: {
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border.medium,
        backgroundColor: 'transparent',
        borderRadius: 0,
    },

    // States
    focused: {
        borderColor: theme.colors.primary[500],
        borderWidth: 2,
    },
    error: {
        borderColor: theme.colors.error,
    },

    // Input styles
    input: {
        flex: 1,
        color: theme.colors.text.primary,
        fontSize: theme.fontSize.md,
    },
    smallInput: {
        paddingVertical: theme.spacing.sm,
        paddingHorizontal: theme.spacing.md,
        fontSize: theme.fontSize.sm,
    },
    mediumInput: {
        paddingVertical: theme.spacing.md,
        paddingHorizontal: theme.spacing.lg,
        fontSize: theme.fontSize.md,
    },
    largeInput: {
        paddingVertical: theme.spacing.lg,
        paddingHorizontal: theme.spacing.xl,
        fontSize: theme.fontSize.lg,
    },

    // Icon styles
    leftIcon: {
        paddingLeft: theme.spacing.md,
    },
    rightIcon: {
        paddingRight: theme.spacing.md,
    },
    inputWithLeftIcon: {
        paddingLeft: theme.spacing.sm,
    },
    inputWithRightIcon: {
        paddingRight: theme.spacing.sm,
    },

    // Label and helper text
    label: {
        fontSize: theme.fontSize.sm,
        fontWeight: theme.fontWeight.medium,
        color: theme.colors.text.primary,
        marginBottom: theme.spacing.xs,
    },
    errorText: {
        fontSize: theme.fontSize.xs,
        color: theme.colors.error,
        marginTop: theme.spacing.xs,
    },
    helperText: {
        fontSize: theme.fontSize.xs,
        color: theme.colors.text.secondary,
        marginTop: theme.spacing.xs,
    },
});
