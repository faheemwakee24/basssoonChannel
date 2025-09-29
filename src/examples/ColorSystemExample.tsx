import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useColors, useBassoonColors, useThemeColors } from '../hooks/useColors';

/**
 * Example component demonstrating the centralized color system
 * Shows how to use colors throughout the app
 */
export const ColorSystemExample: React.FC = () => {
    const colors = useColors('dark');
    const bassoonColors = useBassoonColors();
    const themeColors = useThemeColors('dark');

    return (
        <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
            <Text style={[styles.title, { color: colors.text }]}>Color System Examples</Text>

            {/* Theme Colors */}
            <View style={styles.section}>
                <Text style={[styles.sectionTitle, { color: colors.accent }]}>Theme Colors</Text>

                <View style={[styles.colorBox, { backgroundColor: colors.background }]}>
                    <Text style={[styles.colorText, { color: colors.text }]}>Background</Text>
                </View>

                <View style={[styles.colorBox, { backgroundColor: colors.text }]}>
                    <Text style={[styles.colorText, { color: colors.background }]}>Text</Text>
                </View>

                <View style={[styles.colorBox, { backgroundColor: colors.border, borderWidth: 1, borderColor: colors.text }]}>
                    <Text style={[styles.colorText, { color: colors.text }]}>Border</Text>
                </View>
            </View>

            {/* Bassoon Colors */}
            <View style={styles.section}>
                <Text style={[styles.sectionTitle, { color: colors.accent }]}>Bassoon Colors</Text>

                <View style={[styles.colorBox, { backgroundColor: colors.bassoonRed }]}>
                    <Text style={[styles.colorText, { color: colors.text }]}>Bassoon Red</Text>
                </View>

                <View style={[styles.colorBox, { backgroundColor: colors.bassoonLightGreen }]}>
                    <Text style={[styles.colorText, { color: colors.background }]}>Bassoon Light Green</Text>
                </View>
            </View>

            {/* Semantic Colors */}
            <View style={styles.section}>
                <Text style={[styles.sectionTitle, { color: colors.accent }]}>Semantic Colors</Text>

                <View style={[styles.colorBox, { backgroundColor: colors.success }]}>
                    <Text style={[styles.colorText, { color: colors.text }]}>Success</Text>
                </View>

                <View style={[styles.colorBox, { backgroundColor: colors.error }]}>
                    <Text style={[styles.colorText, { color: colors.text }]}>Error</Text>
                </View>

                <View style={[styles.colorBox, { backgroundColor: colors.warning }]}>
                    <Text style={[styles.colorText, { color: colors.text }]}>Warning</Text>
                </View>

                <View style={[styles.colorBox, { backgroundColor: colors.info }]}>
                    <Text style={[styles.colorText, { color: colors.text }]}>Info</Text>
                </View>
            </View>

            {/* Usage Examples */}
            <View style={styles.section}>
                <Text style={[styles.sectionTitle, { color: colors.accent }]}>Usage Examples</Text>

                <Text style={[styles.exampleText, { color: colors.text }]}>
                    const colors = useColors('dark');
                </Text>
                <Text style={[styles.exampleText, { color: colors.text }]}>
                    const bassoonColors = useBassoonColors();
                </Text>
                <Text style={[styles.exampleText, { color: colors.text }]}>
                    const themeColors = useThemeColors('dark');
                </Text>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    section: {
        marginBottom: 30,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 15,
    },
    colorBox: {
        height: 50,
        marginBottom: 10,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    colorText: {
        fontSize: 16,
        fontWeight: '500',
    },
    exampleText: {
        fontSize: 14,
        fontFamily: 'monospace',
        marginBottom: 8,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        padding: 8,
        borderRadius: 4,
    },
});
