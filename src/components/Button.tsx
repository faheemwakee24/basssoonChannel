import React from 'react';
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    ActivityIndicator,
    ViewStyle,
    TextStyle,
} from 'react-native';
import { useTheme } from '../hooks/useTheme';

export interface ButtonProps {
    title: string;
    onPress: () => void;
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'small' | 'medium' | 'large';
    disabled?: boolean;
    loading?: boolean;
    style?: ViewStyle;
    textStyle?: TextStyle;
    fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
    title,
    onPress,
    variant = 'primary',
    size = 'medium',
    disabled = false,
    loading = false,
    style,
    textStyle,
    fullWidth = false,
}) => {
    const { theme } = useTheme();
    const styles = createStyles(theme);

    const getButtonStyle = () => {
        const baseStyle = [styles.button, styles[`${size}Button`]];

        if (fullWidth) {
            baseStyle.push(styles.fullWidth);
        }

        if (disabled || loading) {
            baseStyle.push(styles.disabled);
        }

        baseStyle.push(styles[`${variant}Button`]);

        return baseStyle;
    };

    const getTextStyle = () => {
        const baseTextStyle = [styles.text, styles[`${size}Text`]];

        if (disabled || loading) {
            baseTextStyle.push(styles.disabledText);
        }

        baseTextStyle.push(styles[`${variant}Text`]);

        return baseTextStyle;
    };

    return (
        <TouchableOpacity
            style={[getButtonStyle(), style]}
            onPress={onPress}
            disabled={disabled || loading}
            activeOpacity={0.7}
        >
            {loading ? (
                <ActivityIndicator
                    color={variant === 'primary' ? theme.colors.neutral.white : theme.colors.primary[500]}
                    size="small"
                />
            ) : (
                <Text style={[getTextStyle(), textStyle]}>{title}</Text>
            )}
        </TouchableOpacity>
    );
};

const createStyles = (theme: any) => StyleSheet.create({
    button: {
        borderRadius: theme.borderRadius.md,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },

    // Size variants
    smallButton: {
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.sm,
        minHeight: 36,
    },
    mediumButton: {
        paddingHorizontal: theme.spacing.lg,
        paddingVertical: theme.spacing.md,
        minHeight: 44,
    },
    largeButton: {
        paddingHorizontal: theme.spacing.xl,
        paddingVertical: theme.spacing.lg,
        minHeight: 52,
    },

    // Color variants
    primaryButton: {
        backgroundColor: theme.colors.primary[500],
    },
    secondaryButton: {
        backgroundColor: theme.colors.secondary[500],
    },
    outlineButton: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: theme.colors.primary[500],
    },
    ghostButton: {
        backgroundColor: 'transparent',
    },

    // Text styles
    text: {
        fontWeight: theme.fontWeight.medium,
        textAlign: 'center',
    },
    smallText: {
        fontSize: theme.fontSize.sm,
    },
    mediumText: {
        fontSize: theme.fontSize.md,
    },
    largeText: {
        fontSize: theme.fontSize.lg,
    },

    // Text color variants
    primaryText: {
        color: theme.colors.neutral.white,
    },
    secondaryText: {
        color: theme.colors.neutral.white,
    },
    outlineText: {
        color: theme.colors.primary[500],
    },
    ghostText: {
        color: theme.colors.primary[500],
    },

    // States
    disabled: {
        opacity: 0.5,
    },
    disabledText: {
        opacity: 0.7,
    },
    fullWidth: {
        width: '100%',
    },
});
