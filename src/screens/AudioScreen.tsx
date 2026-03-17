import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { darkColors } from '@/config/colors';

export const AudioScreen: React.FC = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Audio</Text>
            <Text style={styles.subtitle}>Audio content coming soon</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: darkColors.background,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
    },
    title: {
        color: darkColors.TextWhite,
        fontSize: 24,
        fontWeight: '600',
        marginBottom: 8,
    },
    subtitle: {
        color: darkColors.searchPlaceholder,
        fontSize: 16,
    },
});
