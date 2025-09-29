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
import { navigate } from '@/navigation/navigationService';
import { useNavigation } from '@react-navigation/native';

export const LoginScreen: React.FC = () => {
    const { login, isLoading } = useAuth();
    const navigation = useNavigation();
    // navigation hook removed - using navigationService.navigate for type-safety in this codebase
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false,
    });
    const [errors, setErrors] = useState<Record<string, string>>({});


    const validateForm = () => {
        const newErrors: Record<string, string> = {};

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
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    const handleLogin = async () => {
        if (!validateForm()) return;
        try {
            await login(formData.email, formData.password);
        } catch (error) {
            Alert.alert('Login Failed', 'Please check your credentials and try again.');
        }
    };
    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };
    const toggleRememberMe = () => {
        setFormData(prev => ({ ...prev, rememberMe: !prev.rememberMe }));
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
                        <Text style={styles.loginTitle}>Login</Text>
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

                        <View style={styles.optionsRow}>
                            <View style={styles.rememberMeContainer}>
                                <Checkbox checked={formData.rememberMe} onToggle={toggleRememberMe} />
                                <Text style={styles.rememberMeText}>Remember me</Text>
                            </View>
                            <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
                                <Text style={styles.forgotPasswordText}>forgot password</Text>
                            </TouchableOpacity>
                        </View>
                        <PrimaryButton title="LOGIN" onPress={handleLogin} disabled={isLoading} loading={isLoading} />
                        <View style={styles.signupContainer}>
                            <Text style={styles.signupText}>Don't have an account yet?</Text>
                            <TouchableOpacity onPress={() => navigation.navigate('JoinNow')}>
                                <Text style={styles.joinText}>Join Now</Text>
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

    // Header Styles
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingTop: 20,
        paddingBottom: 20,
    },
    logoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    logoIcon: {
        width: 40,
        height: 40,
        marginRight: 12,
        position: 'relative',
    },
    logoWave: {
        position: 'absolute',
        width: 20,
        height: 20,
        borderWidth: 2,
        borderColor: darkColors.primaryColor,
        borderRadius: 10,
        top: 10,
        left: 10,
    },
    logoWave2: {
        width: 16,
        height: 16,
        top: 12,
        left: 12,
    },
    logoWave3: {
        width: 12,
        height: 12,
        top: 14,
        left: 14,
    },
    logoTextContainer: {
        flexDirection: 'column',
    },
    logoTextMain: {
        fontSize: 18,
        fontWeight: 'bold',
        color: darkColors.primaryColor,
        lineHeight: 20,
    },
    logoTextSub: {
        fontSize: 12,
        color: darkColors.primaryColor,
        lineHeight: 14,
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


    // Form Styles
    form: {
        flex: 1,
        alignItems: 'center',
    },
    loginTitle: {
        fontSize: metrics.width(35),
        fontWeight: 'bold',
        color: darkColors.primaryColor,
        marginBottom: metrics.height(35),
    },
    inputContainer: {
        width: '100%',
        marginBottom: 20,
    },
    optionsRow: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 30,
    },
    rememberMeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: metrics.width(4)
    },
    checkbox: {
        width: 20,
        height: 20,
        borderWidth: 1,
        borderColor: darkColors.TextWhite,
        borderRadius: 4,
        marginRight: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkboxChecked: {
        borderColor: darkColors.TextWhite,
    },
    checkmark: {
        color: darkColors.primaryColor,
        fontSize: 12,
        fontWeight: 'bold',
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
    loginButton: {
        width: '100%',
        backgroundColor: darkColors.primaryColor,
        paddingVertical: metrics.width(12),
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30,
    },
    loginButtonText: {
        color: darkColors.TextWhite,
        fontSize: 14,
        fontWeight: 'bold',
    },
    signupContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 8,
        marginBottom: 8,
        marginTop: metrics.width(13)
    },
    signupText: {
        color: darkColors.TextWhite,
        fontSize: 14,

    },
    signupLink: {
        color: darkColors.primaryColor,
        fontSize: 14,
        fontWeight: 'bold',
    },

    // Bottom Navigation
    bottomNavigation: {
        flexDirection: 'row',
        backgroundColor: darkColors.primaryColor,
        paddingVertical: 16,
        paddingHorizontal: 24,
        borderTopWidth: 1,
        borderTopColor: darkColors.primaryColor,
    },
    navItem: {
        flex: 1,
        alignItems: 'center',
        gap: 4,
    },
    navIcon: {
        fontSize: 20,
        color: darkColors.primaryColor,
    },
    navLabel: {
        fontSize: 12,
        color: darkColors.primaryColor,
    },
    joinText: {
        color: darkColors.primaryColor,
        fontSize: 14,
        fontWeight: 'bold',
    }
});
