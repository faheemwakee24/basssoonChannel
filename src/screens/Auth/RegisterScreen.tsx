import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Alert,
    KeyboardAvoidingView,
    Platform,
    TouchableOpacity,
    StatusBar,
} from 'react-native';
import { useAuth } from '../../hooks/useAuth';
import { BassoonInput } from '../../components/BassoonInput';
import { Checkbox, PrimaryButton } from '@/components';
import { VALIDATION_RULES } from '../../config/constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '@/components';
import { metrics } from '@/utils/metrics';
import { darkColors } from '@/config/colors';

export const JoinNow: React.FC = () => {
    const { register, isLoading } = useAuth();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        newsletter: false,
        acceptTerms: false,
    });
    const [errors, setErrors] = useState<Record<string, string>>({});


    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.name) {
            newErrors.name = 'Name is required';
        }

        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!VALIDATION_RULES.EMAIL_REGEX.test(formData.email)) {
            newErrors.email = 'Please enter a valid email';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < VALIDATION_RULES.PASSWORD_MIN_LENGTH) {
            newErrors.password = `Password must be at least ${VALIDATION_RULES.PASSWORD_MIN_LENGTH} characters`;
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Please confirm your password';
        } else if (formData.confirmPassword !== formData.password) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleRegister = async () => {
        if (!validateForm()) return;

        try {
            await register(formData.email, formData.password, formData.name);
        } catch (error) {
            Alert.alert('Registration Failed', 'Please check your details and try again.');
        }
    };

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        // Clear error when user starts typing
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={darkColors.background} />
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardView}
            >
                <Header />

                <ScrollView contentContainerStyle={styles.content}>
                    <View style={styles.form}>
                        <Text style={styles.loginTitle}>Join Now</Text>
                        <BassoonInput
                            value={formData.name}
                            onChangeText={(value) => handleInputChange('name', value)}
                            placeholder="Full name"
                            autoCapitalize="words"
                            autoCorrect={false}
                            variant="dark"
                            size="medium"
                            error={errors.name}
                            containerStyle={styles.inputContainer}
                        />

                        <BassoonInput
                            value={formData.email}
                            onChangeText={(value) => handleInputChange('email', value)}
                            placeholder="Enter your email"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            autoCorrect={false}
                            variant="dark"
                            size="medium"
                            error={errors.email}
                            containerStyle={styles.inputContainer}
                        />

                        <BassoonInput
                            value={formData.password}
                            onChangeText={(value) => handleInputChange('password', value)}
                            placeholder="Password"
                            secureTextEntry
                            showPasswordToggle
                            variant="dark"
                            size="medium"
                            error={errors.password}
                            containerStyle={styles.inputContainer}
                        />

                        <BassoonInput
                            value={formData.confirmPassword}
                            onChangeText={(value) => handleInputChange('confirmPassword', value)}
                            placeholder="Confirm password"
                            secureTextEntry
                            variant="dark"
                            size="medium"
                            error={errors.confirmPassword}
                            containerStyle={styles.inputContainer}
                        />
                        <View style={styles.signupContainer}>
                            <Text style={styles.signupText}>Already have account?</Text>
                            <TouchableOpacity>
                                <Text style={styles.joinText}>Login</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.checkboxLabelContainer}>
                            <Text style={styles.smallText}>
                                <Checkbox checked={formData.newsletter} onToggle={() => setFormData(prev => ({ ...prev, newsletter: !prev.newsletter }))} />
                                {' '} I agree to receive the newsletter about products, offerings, and other news. I understand that I can unsubscribe at any time.</Text>
                        </View>
                        <View style={styles.checkboxLabelContainer}>
                            <Text style={styles.smallText}>
                                <Checkbox checked={formData.acceptTerms} onToggle={() => setFormData(prev => ({ ...prev, acceptTerms: !prev.acceptTerms }))} />
                                {' '} By creating an account, I fully agree to the
                                <Text style={styles.linkText}>{'  '}Terms & Conditions{'  '}</Text>
                                and have read and acknowledge the
                                <Text style={styles.linkText}>{' '}Privacy Policy</Text>
                            </Text>
                        </View>

                        <PrimaryButton title="CREATE ACCOUNT" onPress={handleRegister} disabled={isLoading} loading={isLoading} />
                    </View>
                </ScrollView>

            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: darkColors.background,
    },
    keyboardView: {
        flex: 1,
    },
    content: {
        paddingHorizontal: metrics.width(24),
    },
    logoTextContainer: {
        flexDirection: 'column',
    },
    logoTextMain: {
        fontSize: 18,
        fontWeight: 'bold',
        color: darkColors.primaryColor,
    },
    logoTextSub: {
        fontSize: 12,
        color: darkColors.primaryColor,
    },
    headerIcons: {
        flexDirection: 'row',
        gap: 5,
    },
    headerIcon: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: metrics.width(5),
    },
    iconText: {
        fontSize: 20,
        color: darkColors.primaryColor,
    },
    keyIcon: {
        width: 40,
        height: 40,
        backgroundColor: darkColors.background,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    form: {
        flex: 1,
        alignItems: 'center',
        gap: metrics.height(20),
    },
    loginTitle: {
        fontSize: metrics.width(35),
        fontWeight: 'bold',
        color: darkColors.primaryColor,
        marginBottom: metrics.height(35),
    },
    inputContainer: {
        width: '100%',
    },
    rememberMeText: {
        color: darkColors.TextWhite,
        fontSize: 14,
    },
    forgotPasswordText: {
        color: darkColors.primaryColor,
        fontWeight: 'bold',
        fontSize: 14,
    },
    signupContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 8,
    },
    signupText: {
        color: darkColors.TextWhite,
        fontSize: metrics.width(15),
        fontWeight: 'bold'

    },
    checkboxRow: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: metrics.width(8)
    },
    checkboxLabelContainer: {
        flex: 1,
    },
    smallText: {
        color: darkColors.TextWhite,
        fontSize: metrics.width(15),
        fontWeight: 'bold'
    },
    linkText: {
        color: darkColors.primaryColor,

    },
    joinText: {
        color: darkColors.primaryColor,
        fontSize: 14,
        fontWeight: 'bold',
    }
});
