import { Svgs } from '@/assets/icons/Svgs';
import { darkColors } from '@/config/colors';
import React, { useState } from 'react';
import {
    TextInput,
    View,
    Text,
    StyleSheet,
    TextInputProps,
    ViewStyle,
    TextStyle,
    TouchableOpacity,
} from 'react-native';
export interface BassoonInputProps extends TextInputProps {
    label?: string;
    error?: string;
    helperText?: string;
    variant?: 'dark' | 'light';
    size?: 'small' | 'medium' | 'large';
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    showPasswordToggle?: boolean;
    containerStyle?: ViewStyle;
    inputStyle?: TextStyle;
    labelStyle?: TextStyle;
    errorStyle?: TextStyle;
    helperStyle?: TextStyle;
}

export const BassoonInput: React.FC<BassoonInputProps> = ({
    label,
    error,
    helperText,
    size = 'medium',
    leftIcon,
    rightIcon,
    showPasswordToggle = false,
    containerStyle,
    inputStyle,
    labelStyle,
    errorStyle,
    helperStyle,
    onFocus,
    onBlur,
    secureTextEntry,
    ...props
}) => {
    const [isFocused, setIsFocused] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const handleFocus = (e: any) => {
        setIsFocused(true);
        onFocus?.(e);
    };

    const handleBlur = (e: any) => {
        setIsFocused(false);
        onBlur?.(e);
    };

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    const shouldShowPassword = showPasswordToggle && secureTextEntry;
    const finalSecureTextEntry = shouldShowPassword ? !isPasswordVisible : secureTextEntry;


    const getContainerStyle = () => {
        const baseStyle: any[] = [
            styles.container,

        ];

        if (isFocused) {
            baseStyle.push(styles.focused);
        }

        if (error) {
            baseStyle.push(styles.error);
        }

        return baseStyle;
    };

    const getInputStyle = () => {
        const baseStyle: any[] = [
            styles.input,
            styles[`${size}Input`],
        ];

        if (leftIcon) {
            baseStyle.push(styles.inputWithLeftIcon);
        }

        if (rightIcon || showPasswordToggle) {
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
                    placeholderTextColor={darkColors.borderColor}
                    secureTextEntry={finalSecureTextEntry}
                    {...props}
                />

                {showPasswordToggle && secureTextEntry && (
                    <TouchableOpacity
                        style={styles.rightIcon}
                        onPress={togglePasswordVisibility}
                    >
                        {isPasswordVisible ? <Svgs.OpenEye /> : <Svgs.CloseEye />}
                    </TouchableOpacity>
                )}

                {rightIcon && !showPasswordToggle && (
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



const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 8,
        borderWidth: 1,
        backgroundColor: 'transparent',
        borderColor: darkColors.borderColor,
        paddingVertical: 4
    },

    // Size variants
    smallContainer: {
        height: 40,
    },
    mediumContainer: {
        height: 50,
    },
    largeContainer: {
        height: 56,
    },

    // States
    focused: {
        borderColor: darkColors.borderColor,
        borderWidth: 1,
    },
    error: {
        borderColor: darkColors.error,
        borderWidth: 1,
    },

    // Input styles
    input: {
        flex: 1,
        fontSize: 16,
        paddingHorizontal: 16,
        color: darkColors.TextWhite,
    },
    smallInput: {
        fontSize: 14,
        paddingHorizontal: 12,
    },
    mediumInput: {
        fontSize: 16,
        paddingHorizontal: 16,
    },
    largeInput: {
        fontSize: 18,
        paddingHorizontal: 20,
    },

    // Icon styles
    leftIcon: {
        paddingLeft: 16,
        paddingRight: 8,
    },
    rightIcon: {
        paddingRight: 16,
        paddingLeft: 8,
    },
    inputWithLeftIcon: {
        paddingLeft: 8,
    },
    inputWithRightIcon: {
        paddingRight: 8,
    },

    // Text styles
    label: {
        fontSize: 14,
        fontWeight: '500',
        color: darkColors.TextWhite,
        marginBottom: 8,
    },
    errorText: {
        fontSize: 12,
        color: darkColors.error,
        marginTop: 4,
    },
    helperText: {
        fontSize: 12,
        color: darkColors.TextWhite,
        marginTop: 4,
    },

    // Password toggle
    passwordToggleIcon: {
        fontSize: 18,
        color: darkColors.TextWhite,
    },
});
