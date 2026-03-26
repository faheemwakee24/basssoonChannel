import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    TouchableOpacity,
    StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { AuthStackParamList } from '@/navigation/AuthNavigator';
import { BassoonInput } from '../../components/BassoonInput';
import { Checkbox, PrimaryButton } from '@/components';
import { VALIDATION_RULES } from '../../config/constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import { metrics } from '@/utils/metrics';
import { darkColors } from '@/config/colors';
import { useAppDispatch, setUser, showSnackbar } from '../../store';
import { useRegisterMutation, type AuthResponse } from '../../api/authApi';
import { navigate } from '@/navigation/navigationService';

type RegisterScreenNav = StackNavigationProp<AuthStackParamList, 'JoinNow'>;

export const JoinNow: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigation = useNavigation<any>();
    const [register, { isLoading }] = useRegisterMutation();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        agree_terms: false,
        agree_policy: false,
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

        if (!formData.password_confirmation) {
            newErrors.password_confirmation = 'Please confirm your password';
        } else if (formData.password_confirmation !== formData.password) {
            newErrors.password_confirmation = 'Passwords do not match';
        }

        if (!formData.agree_terms) {
            newErrors.agree_terms = 'You must agree to the Terms & Conditions';
        }

        if (!formData.agree_policy) {
            newErrors.agree_policy = 'You must agree to the Privacy Policy';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleRegister = async () => {
        try {
            if (!validateForm()) return;


            const response = await register({
                name: formData.name,
                email: formData.email,
                password: formData.password,
                password_confirmation: formData.password_confirmation,
                agree_terms: formData.agree_terms ? 1 : 0,
                agree_policy: formData.agree_policy ? 1 : 0,
            }).unwrap();
            console.log('response---', response);

            navigate('VerifyOtp', { email: formData.email });
            // OTP flow: API returns { success, message, data: { user_id, message } } — navigate to Verify OTP
            // const payload = response as { success?: boolean; data?: { user_id?: number }; message?: string };
            if (true) {

                navigate('VerifyOtp', { email: formData.email });
                return;
            }

        } catch (error: any) {
            // Extract error message from RTK Query error structure
            const errorMessage =
                error?.data?.message ||
                error?.data?.error ||
                error?.message ||
                error?.error ||
                'Registration failed. Please try again.';

            console.log('[RegisterScreen] Registration error:', error);
            dispatch(showSnackbar({
                message: errorMessage,
                type: 'error',
            }));
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
                            value={formData.password_confirmation}
                            onChangeText={(value) => handleInputChange('password_confirmation', value)}
                            placeholder="Confirm password"
                            secureTextEntry
                            variant="dark"
                            size="medium"
                            error={errors.password_confirmation}
                            containerStyle={styles.inputContainer}
                        />
                        <View style={styles.signupContainer}>
                            <Text style={styles.signupText}>Already have account?</Text>
                            <TouchableOpacity onPress={() => navigation.navigate('Login' as any)}>
                                <Text style={styles.joinText}>Login</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.checkboxLabelContainer}>
                            <Text style={styles.smallText}>
                                <Checkbox checked={formData.agree_policy} onToggle={() => setFormData(prev => ({ ...prev, agree_policy: !prev.agree_policy }))} />
                                {' '} I agree to receive the newsletter about products, offerings, and other news. I understand that I can unsubscribe at any time.</Text>
                        </View>
                        <View style={styles.checkboxLabelContainer}>
                            <Text style={styles.smallText}>
                                <Checkbox checked={formData.agree_terms} onToggle={() => setFormData(prev => ({ ...prev, agree_terms: !prev.agree_terms }))} />
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
