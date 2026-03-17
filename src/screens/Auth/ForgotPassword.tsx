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
import { BassoonInput } from '../../components/BassoonInput';
import { PrimaryButton } from '@/components';
import { VALIDATION_RULES } from '../../config/constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import { metrics } from '@/utils/metrics';
import { darkColors } from '@/config/colors';
import { useAppDispatch, showSnackbar } from '@/store';
import { useForgotPasswordMutation } from '@/api/authApi';
import type { AuthStackParamList } from '@/navigation/AuthNavigator';

type ForgotPasswordNav = StackNavigationProp<AuthStackParamList, 'ForgotPassword'>;

export const ForgotPassword: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigation = useNavigation<ForgotPasswordNav>();
    const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
    const [formData, setFormData] = useState({ email: '' });
    const [errors, setErrors] = useState<Record<string, string>>({});

    const validateForm = () => {
        const newErrors: Record<string, string> = {};
        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!VALIDATION_RULES.EMAIL_REGEX.test(formData.email)) {
            newErrors.email = 'Please enter a valid email';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validateForm()) return;
        try {
            const result = await forgotPassword({ email: formData.email }).unwrap();
            dispatch(
                showSnackbar({
                    message: result.message || 'Password reset OTP has been sent to your email address.',
                    type: 'success',
                })
            );
            navigation.navigate('VerifyOtp', { email: formData.email, flow: 'reset' });
        } catch (error: any) {
            dispatch(
                showSnackbar({
                    message: error?.data?.message || error?.message || 'Failed to send reset OTP. Please try again.',
                    type: 'error',
                })
            );
        }
    };

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
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
                        <Text style={styles.loginTitle}>Forgot Password</Text>


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

                        <PrimaryButton
                            title={isLoading ? 'SENDING…' : 'SEND RESET OTP'}
                            onPress={handleSubmit}
                            disabled={isLoading}
                            loading={isLoading}
                        />
                        <View style={styles.signupContainer}>
                            <Text style={styles.signupText}>Remember Password?</Text>
                            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                                <Text style={styles.joinText}>Login Now</Text>
                            </TouchableOpacity>
                        </View>
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
        gap: metrics.height(50),
    },
    loginTitle: {
        fontSize: metrics.width(35),
        fontWeight: 'bold',
        color: darkColors.primaryColor,
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
