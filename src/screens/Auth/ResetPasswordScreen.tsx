import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { BassoonInput } from '../../components/BassoonInput';
import { PrimaryButton } from '@/components';
import { metrics } from '@/utils/metrics';
import { darkColors } from '@/config/colors';
import { useAppDispatch, showSnackbar } from '../../store';
import { useResetPasswordMutation } from '../../api/authApi';
import type { AuthStackParamList } from '@/navigation/AuthNavigator';

type ResetPasswordScreenNav = StackNavigationProp<AuthStackParamList, 'ResetPassword'>;

export const ResetPasswordScreen: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigation = useNavigation<ResetPasswordScreenNav>();
    const route = useRoute<RouteProp<AuthStackParamList, 'ResetPassword'>>();
    const { email, reset_token } = route.params;

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState<Record<string, string>>({});

    const [resetPassword, { isLoading }] = useResetPasswordMutation();

    const validateForm = () => {
        const newErrors: Record<string, string> = {};
        if (!password) {
            newErrors.password = 'Password is required';
        } else if (password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters';
        }

        if (!confirmPassword) {
            newErrors.confirmPassword = 'Please confirm your password';
        } else if (password !== confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleReset = async () => {
        if (!validateForm()) return;

        try {
            const response = await resetPassword({
                reset_token,
                password,
                password_confirmation: confirmPassword,
            }).unwrap();

            dispatch(showSnackbar({
                message: response.message || 'Password reset successfully. Please login.',
                type: 'success',
            }));
            navigation.navigate('Login');
        } catch (error: any) {
            const errorMessage =
                error?.data?.message ||
                error?.message ||
                'Failed to reset password. Please try again.';
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
                        <Text style={styles.title}>New Password</Text>
                        <Text style={styles.subtitle}>
                            Set a new password for your account associated with <Text style={styles.email}>{email}</Text>
                        </Text>

                        <BassoonInput
                            value={password}
                            onChangeText={(value) => {
                                setPassword(value);
                                if (errors.password) setErrors((prev) => ({ ...prev, password: '' }));
                            }}
                            placeholder="New Password"
                            secureTextEntry
                            variant="dark"
                            size="medium"
                            error={errors.password}
                            containerStyle={styles.inputContainer}
                        />

                        <BassoonInput
                            value={confirmPassword}
                            onChangeText={(value) => {
                                setConfirmPassword(value);
                                if (errors.confirmPassword) setErrors((prev) => ({ ...prev, confirmPassword: '' }));
                            }}
                            placeholder="Confirm Password"
                            secureTextEntry
                            variant="dark"
                            size="medium"
                            error={errors.confirmPassword}
                            containerStyle={styles.inputContainer}
                        />

                        <PrimaryButton
                            title="RESET PASSWORD"
                            onPress={handleReset}
                            disabled={isLoading}
                            loading={isLoading}
                        />
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
        gap: metrics.height(20),
    },
    title: {
        fontSize: metrics.width(35),
        fontWeight: 'bold',
        color: darkColors.primaryColor,
        marginBottom: metrics.height(12),
        textAlign: 'center',
    },
    subtitle: {
        fontSize: metrics.width(15),
        color: darkColors.TextWhite,
        textAlign: 'center',
        lineHeight: 22,
        marginBottom: metrics.height(10),
    },
    email: {
        fontWeight: 'bold',
        color: darkColors.primaryColor,
    },
    inputContainer: {
        width: '100%',
    },
});
