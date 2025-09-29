import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '../../hooks/useTheme';
import { Button } from '../../components/Button';

export const ProfileScreen: React.FC = () => {
    const { theme } = useTheme();
    const { user, logout } = useAuth();
    const styles = createStyles(theme);

    const handleLogout = () => {
        logout();
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.header}>
                    <View style={styles.avatar}>
                        <Text style={styles.avatarText}>
                            {user?.name?.charAt(0).toUpperCase() || 'U'}
                        </Text>
                    </View>
                    <Text style={styles.name}>{user?.name || 'User'}</Text>
                    <Text style={styles.email}>{user?.email || 'user@example.com'}</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Account Information</Text>

                    <TouchableOpacity style={styles.menuItem}>
                        <Text style={styles.menuItemText}>Personal Information</Text>
                        <Text style={styles.menuItemArrow}>›</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.menuItem}>
                        <Text style={styles.menuItemText}>Security Settings</Text>
                        <Text style={styles.menuItemArrow}>›</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.menuItem}>
                        <Text style={styles.menuItemText}>Privacy Settings</Text>
                        <Text style={styles.menuItemArrow}>›</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Preferences</Text>

                    <TouchableOpacity style={styles.menuItem}>
                        <Text style={styles.menuItemText}>Notifications</Text>
                        <Text style={styles.menuItemArrow}>›</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.menuItem}>
                        <Text style={styles.menuItemText}>Language</Text>
                        <Text style={styles.menuItemArrow}>›</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.menuItem}>
                        <Text style={styles.menuItemText}>Theme</Text>
                        <Text style={styles.menuItemArrow}>›</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.logoutSection}>
                    <Button
                        title="Sign Out"
                        onPress={handleLogout}
                        variant="outline"
                        fullWidth
                        style={styles.logoutButton}
                    />
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
    header: {
        alignItems: 'center',
        marginBottom: theme.spacing.xxl,
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: theme.colors.primary[500],
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: theme.spacing.md,
    },
    avatarText: {
        fontSize: theme.fontSize.xxxl,
        fontWeight: theme.fontWeight.bold,
        color: theme.colors.neutral.white,
    },
    name: {
        fontSize: theme.fontSize.xl,
        fontWeight: theme.fontWeight.semibold,
        color: theme.colors.text.primary,
        marginBottom: theme.spacing.xs,
    },
    email: {
        fontSize: theme.fontSize.md,
        color: theme.colors.text.secondary,
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
    },
    menuItemArrow: {
        fontSize: theme.fontSize.lg,
        color: theme.colors.text.secondary,
    },
    logoutSection: {
        marginTop: theme.spacing.xl,
    },
    logoutButton: {
        borderColor: theme.colors.error,
    },
});
