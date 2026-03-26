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
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { BassoonInput } from '../../components/BassoonInput';
import { PrimaryButton } from '@/components';
import { metrics } from '@/utils/metrics';
import { darkColors } from '@/config/colors';
import { useAppDispatch, setUser, showSnackbar } from '../../store';
import { useVerifyOtpMutation, useVerifyResetOtpMutation, useResendOtpMutation, useForgotPasswordMutation } from '../../api/authApi';
import type { AuthStackParamList } from '@/navigation/AuthNavigator';

type VerifyOtpScreenNav = StackNavigationProp<AuthStackParamList, 'VerifyOtp'>;

const OTP_LENGTH = 6;

export const VerifyOtpScreen: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigation = useNavigation<any>();
    const route = useRoute<RouteProp<AuthStackParamList, 'VerifyOtp'>>();
    const email = route.params?.email ?? '';
    const flow = route.params?.flow ?? 'register';
    const isResetFlow = flow === 'reset';

    const [otp, setOtp] = useState('');
    const [errors, setErrors] = useState<Record<string, string>>({});

    const [verifyOtp, { isLoading: isVerifyingOtp }] = useVerifyOtpMutation();
    const [verifyResetOtp, { isLoading: isVerifyingReset }] = useVerifyResetOtpMutation();
    const [resendOtp, { isLoading: isResendingOtp }] = useResendOtpMutation();
    const [forgotPassword, { isLoading: isResendingReset }] = useForgotPasswordMutation();
    const isVerifying = isVerifyingOtp || isVerifyingReset;
    const isResending = isResetFlow ? isResendingReset : isResendingOtp;

    const validateOtp = () => {
        const trimmed = otp.trim();
        if (!trimmed) {
            setErrors({ otp: 'Please enter the OTP code' });
            return false;
        }
        if (trimmed.length !== OTP_LENGTH || !/^\d+$/.test(trimmed)) {
            setErrors({ otp: `Please enter a valid ${OTP_LENGTH}-digit code` });
            return false;
        }
        setErrors({});
        return true;
    };

    const handleVerify = async () => {
        if (!validateOtp() || !email) return;

        try {
            if (isResetFlow) {
                const response = await verifyResetOtp({ email, otp: otp.trim() }).unwrap();
                const reset_token = response.data?.reset_token;
                
                if (!reset_token) {
                    throw new Error('Reset token not received. Please try again.');
                }

                dispatch(showSnackbar({
                    message: response.message || 'OTP verified. You can now set a new password.',
                    type: 'success',
                }));
                navigation.navigate('ResetPassword', { email, reset_token });
                return;
            }

            const response = await verifyOtp({ email, otp: otp.trim() }).unwrap();
            if (response?.data?.user) {
                dispatch(setUser(response.data.user));
                navigation.navigate('Home' as any);
                dispatch(showSnackbar({
                    message: response.message || 'Email verified successfully!',
                    type: 'success',
                }));
            } else {
                dispatch(showSnackbar({
                    message: response.message || 'Email verified. You can now log in.',
                    type: 'success',
                }));
                navigation.navigate('Login' as any);
            }
        } catch (error: any) {
            const errorMessage =
                error?.data?.message ||
                error?.data?.error ||
                error?.message ||
                error?.error ||
                (isResetFlow ? 'Invalid or expired OTP. Please try again.' : 'Verification failed. Please check the code and try again.');
            dispatch(showSnackbar({ message: errorMessage, type: 'error' }));
        }
    };

    const handleResendOtp = async () => {
        if (!email) return;

        try {
            if (isResetFlow) {
                const response = await forgotPassword({ email }).unwrap();
                dispatch(showSnackbar({
                    message: response.message || 'Password reset OTP has been sent to your email.',
                    type: 'success',
                }));
            } else {
                const response = await resendOtp({ email }).unwrap();
                dispatch(showSnackbar({
                    message: response.message || 'OTP sent to your email.',
                    type: 'success',
                }));
            }
        } catch (error: any) {
            const errorMessage =
                error?.data?.message ||
                error?.data?.error ||
                error?.message ||
                error?.error ||
                'Failed to resend OTP. Please try again.';
            dispatch(showSnackbar({ message: errorMessage, type: 'error' }));
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={darkColors.background} />
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardView}
            >
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    keyboardShouldPersistTaps="handled"
                >
                    <View style={styles.form}>
                        <Text style={styles.title}>
                            {isResetFlow ? 'Verify reset code' : 'Verify your email'}
                        </Text>
                        <Text style={styles.subtitle}>
                            We sent a {OTP_LENGTH}-digit code to your email.{' '}
                            {email ? (
                                <Text style={styles.email} numberOfLines={2}>
                                    {email}
                                </Text>
                            ) : null}
                            {' '}Check your inbox or SPAM folder.
                        </Text>



                        <BassoonInput
                            value={otp}
                            onChangeText={(value) => {
                                setOtp(value.replace(/\D/g, '').slice(0, OTP_LENGTH));
                                if (errors.otp) setErrors((prev) => ({ ...prev, otp: '' }));
                            }}
                            placeholder={`Enter ${OTP_LENGTH}-digit code`}
                            keyboardType="number-pad"
                            maxLength={OTP_LENGTH}
                            variant="dark"
                            size="medium"
                            error={errors.otp}
                            containerStyle={styles.inputContainer}
                        />

                        <PrimaryButton
                            title="VERIFY"
                            onPress={handleVerify}
                            disabled={isVerifying}
                            loading={isVerifying}
                        />

                        <TouchableOpacity
                            onPress={handleResendOtp}
                            disabled={isResending}
                            style={styles.resendTouchable}
                        >
                          <Text style={styles.subtitle}>Didn't receive the code? {' '}
                            <Text style={[styles.resendText, isResending && styles.resendDisabled]}>
                                {isResending ? 'Sending…' : "Resend OTP"}
                            </Text>
                            </Text>
                        </TouchableOpacity>

                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: darkColors.background,
    },
    keyboardView: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        paddingHorizontal: metrics.width(24),
        paddingTop: metrics.height(32),
        paddingBottom: metrics.height(40),
    },
    form: {
        width: '100%',
        alignItems: 'center',
        gap: metrics.height(10),
    },
    title: {
        fontSize: metrics.width(35),
        fontWeight: 'bold',
        color: darkColors.primaryColor,
        marginBottom: metrics.height(12),
    },
    subtitle: {
        fontSize: metrics.width(15),
        color: darkColors.TextWhite,
        textAlign: 'left',
        lineHeight: 22,
        maxWidth: '90%',
    },
    email: {
        fontSize: metrics.width(14),
        fontWeight: '600',
        color: darkColors.primaryColor,
        textAlign: 'center',
        marginTop: metrics.height(4),
        paddingHorizontal: metrics.width(16),
    },
    subtitleHint: {
        fontSize: metrics.width(14),
        color: darkColors.TextWhite,
        textAlign: 'center',
        marginTop: metrics.height(4),
        opacity: 0.9,
    },
    inputContainer: {
        width: '100%',
        marginTop: metrics.height(8),
    },
    resendTouchable: {

    },
    resendText: {
        color: darkColors.primaryColor,
        fontSize: 14,
        fontWeight: '600',
    },
    resendDisabled: {
        opacity: 0.6,
    },
    backRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        marginTop: metrics.height(16),
    },
    backLabel: {
        color: darkColors.TextWhite,
        fontSize: metrics.width(15),
        fontWeight: 'bold',
    },
    backLink: {
        color: darkColors.primaryColor,
        fontSize: 14,
        fontWeight: 'bold',
    },
});
