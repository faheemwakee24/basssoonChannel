import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { metrics } from '@/utils/metrics';
import { darkColors } from '@/config/colors';

type TitleTileProps = {
    label: string;
    icon: React.ReactNode;
    onPress?: () => void;
    style?: ViewStyle;
    labelStyle?: TextStyle;
    disabled?: boolean;
};

export const TitleTile: React.FC<TitleTileProps> = ({ label, icon, onPress, style, labelStyle, disabled }) => {
    return (
        <TouchableOpacity activeOpacity={0.8} onPress={onPress} style={[styles.tile, style]} disabled={disabled}>
            <LinearGradient colors={[darkColors.background, darkColors.primaryColor]} style={styles.gradient}>
                <View style={styles.iconWrap}>{icon}</View>
                <Text style={[styles.label, labelStyle]} numberOfLines={2}>{label}</Text>
            </LinearGradient>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    tile: {
        width: '31%',
        aspectRatio: 1,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: darkColors.TextWhite,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        overflow: 'hidden',
    },
    gradient: {
        flex: 1,
        width: '100%',
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 11,
    },
    iconWrap: { marginBottom: metrics.height(4) },
    label: { color: darkColors.TextWhite, textAlign: 'center', fontSize: metrics.width(10) },
});

export default TitleTile;
