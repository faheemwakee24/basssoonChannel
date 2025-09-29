import React from 'react';
import {
    View,
    ActivityIndicator,
    Text,
    StyleSheet,
    ViewStyle,
    TextStyle,
} from 'react-native';
import { useTheme } from '../hooks/useTheme';

export interface LoaderProps {
    size?: 'small' | 'large';
    color?: string;
    text?: string;
    overlay?: boolean;
    style?: ViewStyle;
    textStyle?: TextStyle;
}

export const Loader: React.FC<LoaderProps> = ({
    size = 'large',
    color,
    text,
    overlay = false,
    style,
    textStyle,
}) => {
    const { theme } = useTheme();
    const styles = createStyles(theme);

    const loaderColor = color || theme.colors.primary[500];

    const containerStyle = [
        styles.container,
        overlay && styles.overlay,
        style,
    ];

    return (
        <View style={containerStyle}>
            <ActivityIndicator size={size} color={loaderColor} />
            {text && (
                <Text style={[styles.text, textStyle]}>{text}</Text>
            )}
        </View>
    );
};

export const FullScreenLoader: React.FC<Omit<LoaderProps, 'overlay'>> = (props) => {
    return <Loader {...props} overlay />;
};

const createStyles = (theme: any) => StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: theme.spacing.lg,
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        zIndex: 1000,
    },
    text: {
        marginTop: theme.spacing.md,
        fontSize: theme.fontSize.md,
        color: theme.colors.text.secondary,
        textAlign: 'center',
    },
});
