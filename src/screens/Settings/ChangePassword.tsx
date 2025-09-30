import React from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { Header2 } from '@/components/Header2';
import { BassoonInput } from '@/components/BassoonInput';
import { PrimaryButton } from '@/components/PrimaryButton';
import { metrics } from '@/utils/metrics';
import { darkColors } from '@/config/colors';
import { VALIDATION_RULES } from '@/config/constants';

export const ChangePassword: React.FC<any> = ({ navigation }: any) => {
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

    const onSave = () => {
        if (!validate()) return;

        // Placeholder: call API to change password
        // For now show success and go back
        Alert.alert('Success', 'Your password has been changed', [{ text: 'OK', onPress: () => navigation.goBack() }]);
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
                    <PrimaryButton title="SAVE" onPress={onSave} />
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
