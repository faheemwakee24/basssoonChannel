import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    Switch,
} from 'react-native';
import { useTheme } from '../../hooks/useTheme';

export const SettingsScreen: React.FC = () => {
    const { theme } = useTheme();
    const styles = createStyles(theme);

    const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
    const [darkModeEnabled, setDarkModeEnabled] = React.useState(false);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>General</Text>

                    <TouchableOpacity style={styles.menuItem}>
                        <Text style={styles.menuItemText}>Language</Text>
                        <Text style={styles.menuItemValue}>English</Text>
                        <Text style={styles.menuItemArrow}>›</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.menuItem}>
                        <Text style={styles.menuItemText}>Currency</Text>
                        <Text style={styles.menuItemValue}>USD</Text>
                        <Text style={styles.menuItemArrow}>›</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Appearance</Text>

                    <View style={styles.menuItem}>
                        <Text style={styles.menuItemText}>Dark Mode</Text>
                        <Switch
                            value={darkModeEnabled}
                            onValueChange={setDarkModeEnabled}
                            trackColor={{ false: theme.colors.border.light, true: theme.colors.primary[500] }}
                            thumbColor={darkModeEnabled ? theme.colors.neutral.white : theme.colors.neutral.white}
                        />
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Notifications</Text>

                    <View style={styles.menuItem}>
                        <Text style={styles.menuItemText}>Push Notifications</Text>
                        <Switch
                            value={notificationsEnabled}
                            onValueChange={setNotificationsEnabled}
                            trackColor={{ false: theme.colors.border.light, true: theme.colors.primary[500] }}
                            thumbColor={notificationsEnabled ? theme.colors.neutral.white : theme.colors.neutral.white}
                        />
                    </View>

                    <TouchableOpacity style={styles.menuItem}>
                        <Text style={styles.menuItemText}>Notification Settings</Text>
                        <Text style={styles.menuItemArrow}>›</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Security</Text>

                    <TouchableOpacity style={styles.menuItem}>
                        <Text style={styles.menuItemText}>Change Password</Text>
                        <Text style={styles.menuItemArrow}>›</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.menuItem}>
                        <Text style={styles.menuItemText}>Two-Factor Authentication</Text>
                        <Text style={styles.menuItemValue}>Off</Text>
                        <Text style={styles.menuItemArrow}>›</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.menuItem}>
                        <Text style={styles.menuItemText}>Biometric Login</Text>
                        <Text style={styles.menuItemValue}>Off</Text>
                        <Text style={styles.menuItemArrow}>›</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Support</Text>

                    <TouchableOpacity style={styles.menuItem}>
                        <Text style={styles.menuItemText}>Help Center</Text>
                        <Text style={styles.menuItemArrow}>›</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.menuItem}>
                        <Text style={styles.menuItemText}>Contact Support</Text>
                        <Text style={styles.menuItemArrow}>›</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.menuItem}>
                        <Text style={styles.menuItemText}>About</Text>
                        <Text style={styles.menuItemValue}>v1.0.0</Text>
                        <Text style={styles.menuItemArrow}>›</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const createStyles = (theme: any) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background.primary,
    },
    content: {
        padding: theme.spacing.lg,
    },
    section: {
        marginBottom: theme.spacing.xxl,
    },
    sectionTitle: {
        fontSize: theme.fontSize.lg,
        fontWeight: theme.fontWeight.semibold,
        color: theme.colors.text.primary,
        marginBottom: theme.spacing.md,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: theme.spacing.md,
        paddingHorizontal: theme.spacing.lg,
        backgroundColor: theme.colors.background.secondary,
        borderRadius: theme.borderRadius.md,
        marginBottom: theme.spacing.sm,
    },
    menuItemText: {
        fontSize: theme.fontSize.md,
        color: theme.colors.text.primary,
        flex: 1,
    },
    menuItemValue: {
        fontSize: theme.fontSize.sm,
        color: theme.colors.text.secondary,
        marginRight: theme.spacing.sm,
    },
    menuItemArrow: {
        fontSize: theme.fontSize.lg,
        color: theme.colors.text.secondary,
    },
});
