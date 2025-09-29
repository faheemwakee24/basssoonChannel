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
import { BassoonInput } from '../../components/BassoonInput';
import { PrimaryButton } from '@/components';
import { VALIDATION_RULES } from '../../config/constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '@/components';
import { metrics } from '@/utils/metrics';
import { darkColors } from '@/config/colors';

export const ForgotPassword: React.FC = () => {
    const [formData, setFormData] = useState({
        email: '',
    });
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

    const handleRegister = async () => {
        if (!validateForm()) return;

        try {

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

                        <PrimaryButton title="CREATE ACCOUNT" onPress={handleRegister} />
                        <View style={styles.signupContainer}>
                            <Text style={styles.signupText}>Remember Password?</Text>
                            <TouchableOpacity>
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
