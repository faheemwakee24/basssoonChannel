import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { BassoonInput } from './BassoonInput';
import { useColors } from '../hooks/useColors';

/**
 * Example component demonstrating the BassoonInput component usage
 * This shows different variants, sizes, and features
 */
export const BassoonInputExample: React.FC = () => {
    const colors = useColors('dark');
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: '',
        phone: '',
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        // Clear error when user starts typing
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    return (
        <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
            <Text style={[styles.title, { color: colors.text }]}>BassoonInput Examples</Text>

            {/* Dark Theme Examples */}
            <View style={styles.section}>
                <Text style={[styles.sectionTitle, { color: colors.accent }]}>Dark Theme (Default)</Text>

                <BassoonInput
                    label="Email Address"
                    value={formData.email}
                    onChangeText={(value) => handleInputChange('email', value)}
                    placeholder="Enter your email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    variant="dark"
                    size="medium"
                    error={errors.email}
                />

                <BassoonInput
                    label="Password"
                    value={formData.password}
                    onChangeText={(value) => handleInputChange('password', value)}
                    placeholder="Enter your password"
                    secureTextEntry
                    showPasswordToggle
                    variant="dark"
                    size="medium"
                    error={errors.password}
                />

                <BassoonInput
                    label="Full Name"
                    value={formData.name}
                    onChangeText={(value) => handleInputChange('name', value)}
                    placeholder="Enter your full name"
                    variant="dark"
                    size="large"
                />
            </View>

            {/* Light Theme Examples */}
            <View style={styles.section}>
                <Text style={[styles.sectionTitle, { color: colors.accent }]}>Light Theme</Text>

                <BassoonInput
                    label="Phone Number"
                    value={formData.phone}
                    onChangeText={(value) => handleInputChange('phone', value)}
                    placeholder="Enter your phone number"
                    keyboardType="phone-pad"
                    variant="light"
                    size="medium"
                />

                <BassoonInput
                    label="Search"
                    placeholder="Search for something..."
                    variant="light"
                    size="small"
                    rightIcon={<Text>🔍</Text>}
                />
            </View>

            {/* Different Sizes */}
            <View style={styles.section}>
                <Text style={[styles.sectionTitle, { color: colors.accent }]}>Different Sizes</Text>

                <BassoonInput
                    placeholder="Small input"
                    variant="dark"
                    size="small"
                />

                <BassoonInput
                    placeholder="Medium input (default)"
                    variant="dark"
                    size="medium"
                />

                <BassoonInput
                    placeholder="Large input"
                    variant="dark"
                    size="large"
                />
            </View>

            {/* With Icons */}
            <View style={styles.section}>
                <Text style={[styles.sectionTitle, { color: colors.accent }]}>With Icons</Text>

                <BassoonInput
                    placeholder="Email with icon"
                    variant="dark"
                    leftIcon={<Text>📧</Text>}
                />

                <BassoonInput
                    placeholder="Password with toggle"
                    variant="dark"
                    secureTextEntry
                    showPasswordToggle
                />
            </View>

            {/* Error States */}
            <View style={styles.section}>
                <Text style={[styles.sectionTitle, { color: colors.accent }]}>Error States</Text>

                <BassoonInput
                    label="Email with Error"
                    placeholder="Enter email"
                    variant="dark"
                    error="Please enter a valid email address"
                />

                <BassoonInput
                    label="Password with Error"
                    placeholder="Enter password"
                    variant="dark"
                    secureTextEntry
                    error="Password must be at least 8 characters"
                />
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
});
