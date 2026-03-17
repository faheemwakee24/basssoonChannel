import React from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { Header2 } from '@/components/Header2';
import { BassoonInput } from '@/components/BassoonInput';
import { PrimaryButton } from '@/components/PrimaryButton';
import { metrics } from '@/utils/metrics';
import { darkColors } from '@/config/colors';
import { VALIDATION_RULES } from '@/config/constants';
import { useChangePasswordMutation } from '@/api/userApi';
import { useAppDispatch } from '@/store';
import { showSnackbar } from '@/store';

export const ChangePassword: React.FC<any> = ({ navigation }: any) => {
    const dispatch = useAppDispatch();
    const [changePassword, { isLoading: isChanging }] = useChangePasswordMutation();
    const [currentPassword, setCurrentPassword] = React.useState('');
    const [newPassword, setNewPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [errors, setErrors] = React.useState<{ current?: string; new?: string; confirm?: string }>({});

    const validate = () => {
        const e: any = {};
        if (!currentPassword) e.current = 'Current password is required';
        if (!newPassword) e.new = 'New password is required';
        else if (newPassword.length < VALIDATION_RULES.PASSWORD_MIN_LENGTH) e.new = `Password must be at least ${VALIDATION_RULES.PASSWORD_MIN_LENGTH} characters`;
        if (!confirmPassword) e.confirm = 'Confirm your new password';
        else if (newPassword && confirmPassword !== newPassword) e.confirm = 'Passwords do not match';
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const onSave = async () => {
        if (!validate()) return;

        try {
            const result = await changePassword({
                current_password: currentPassword,
                password: newPassword,
                password_confirmation: confirmPassword,
            }).unwrap();

            if (result.success) {
                dispatch(
                    showSnackbar({
                        message: result.message || 'Your password has been changed successfully',
                        type: 'success',
                    })
                );
                // Clear form and navigate back after a short delay
                setCurrentPassword('');
                setNewPassword('');
                setConfirmPassword('');
                setTimeout(() => {
                    navigation.goBack();
                }, 500);
            } else {
                console.log('Failed to change password:', result);
                dispatch(
                    showSnackbar({
                        message: result.message || 'Failed to change password',
                        type: 'error',
                    })
                );
            }
        } catch (error: any) {
            console.error('Error changing password:', error);
            // Map API validation errors to form fields (supports current_password, password/new_password, password_confirmation)
            if (error?.data?.errors) {
                const apiErrors = error.data.errors as Record<string, string | string[]>;
                const newErrors: { current?: string; new?: string; confirm?: string } = {};
                if (apiErrors.current_password) {
                    newErrors.current = Array.isArray(apiErrors.current_password)
                        ? apiErrors.current_password[0]
                        : apiErrors.current_password;
                }
                const newPasswordError = apiErrors.password ?? apiErrors.new_password;
                if (newPasswordError) {
                    newErrors.new = Array.isArray(newPasswordError) ? newPasswordError[0] : newPasswordError;
                }
                if (apiErrors.password_confirmation) {
                    newErrors.confirm = Array.isArray(apiErrors.password_confirmation)
                        ? apiErrors.password_confirmation[0]
                        : apiErrors.password_confirmation;
                }
                if (Object.keys(newErrors).length > 0) setErrors(newErrors);
            }
            dispatch(
                showSnackbar({
                    message: error?.data?.message || error?.message || 'Failed to change password. Please try again.',
                    type: 'error',
                })
            );
        }
    };

    return (
        <View style={styles.container}>
            <Header2 title="Change Password" titleStyle={styles.headerTitle} />

            <ScrollView contentContainerStyle={styles.content}>
                <BassoonInput
                    placeholder="Current password"
                    value={currentPassword}
                    onChangeText={setCurrentPassword}
                    containerStyle={styles.inputWrap}
                    secureTextEntry
                    showPasswordToggle
                    error={errors.current}
                />

                <BassoonInput
                    placeholder="New password"
                    value={newPassword}
                    onChangeText={setNewPassword}
                    containerStyle={styles.inputWrap}
                    secureTextEntry
                    showPasswordToggle
                    error={errors.new}
                />

                <BassoonInput
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    containerStyle={styles.inputWrap}
                    secureTextEntry
                    showPasswordToggle
                    error={errors.confirm}
                />

                <View style={styles.saveWrap}>
                    <PrimaryButton
                        title="SAVE"
                        onPress={onSave}
                        disabled={isChanging}
                        loading={isChanging}
                    />
                </View>

                <Text style={styles.cancel} onPress={() => navigation.goBack()}>
                    Cancel
                </Text>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: darkColors.background },
    content: { padding: metrics.width(16), paddingBottom: metrics.height(40) },
    inputWrap: { marginBottom: metrics.height(12) },
    saveWrap: { marginTop: metrics.height(18) },
    cancel: { color: darkColors.primaryColor, textAlign: 'center', marginTop: metrics.height(12) },
    headerTitle: { fontSize: metrics.width(20), color: darkColors.primaryColor },
});

export default ChangePassword;
