import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Svgs } from '@/assets/icons/Svgs';
import { metrics } from '@/utils/metrics';
import { navigate } from '@/navigation/navigationService';
import { SCREEN_NAMES } from '@/config/constants';
import { useAppSelector } from '@/store';
import { darkColors } from '@/config/colors';
import { useGetNotificationsQuery } from '@/api/notificationsApi';

const isNotificationRead = (item: { is_read?: boolean; read?: boolean; read_at?: string | null }) =>
    item.is_read === true || item.read === true || Boolean(item.read_at);

export interface HeaderProps {
    showNotifications?: boolean;
    showProfile?: boolean;
    style?: any;
}

export const Header: React.FC<HeaderProps> = ({ showNotifications = true, showProfile = true, style }) => {
    const insets = useSafeAreaInsets();
    const isAuthenticated = useAppSelector((s) => s.auth.isAuthenticated);
    const { data } = useGetNotificationsQuery(undefined, {
        skip: !isAuthenticated || !showNotifications,
    });
    const notifications = data?.data?.notifications ?? [];
    const unreadCount = notifications.filter((item) => !isNotificationRead(item)).length;

    return (
        <View style={[styles.safe, { marginTop: insets.top }]}>
            <View style={[styles.header, style]}>
                <TouchableOpacity
                    style={styles.logoContainer}
                    onPress={() => navigate('MainTabs', { screen: 'Home' } as any)}
                    activeOpacity={0.7}
                >
                    <Svgs.BassoonLogo height={metrics.width(50)} width={metrics.width(120)} />
                </TouchableOpacity>
                <View style={styles.headerIcons}>
                    {isAuthenticated && showNotifications && (
                        <TouchableOpacity style={styles.headerIcon} onPress={() => navigate(SCREEN_NAMES.Notifications)}>
                            <Svgs.NotificationIcon height={metrics.width(23)} width={metrics.width(23)} />
                            {unreadCount > 0 ? (
                                <View style={styles.badge}>
                                    <Text style={styles.badgeText}>
                                        {unreadCount > 99 ? '99+' : unreadCount}
                                    </Text>
                                </View>
                            ) : null}
                        </TouchableOpacity>
                    )}
                    {isAuthenticated && (
                        <TouchableOpacity style={styles.headerIcon} onPress={() => navigate(SCREEN_NAMES.Bookmarks)}>
                            <Svgs.BookmarkOutline height={metrics.width(23)} width={metrics.width(23)} />
                        </TouchableOpacity>
                    )}
                    {showProfile && (
                        <TouchableOpacity style={styles.headerIcon} onPress={() => navigate(isAuthenticated ? SCREEN_NAMES.ProfileMenu : 'Login' as any)}>
                            <Svgs.ProfileIcon height={metrics.width(26)} width={metrics.width(26)} />
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingTop: 20,
        paddingBottom: 10,
    },
    logoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerIcons: {
        flexDirection: 'row',
        gap: 5,
    },
    headerIcon: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: metrics.width(5),
        position: 'relative',
    },
    badge: {
        position: 'absolute',
        top: -2,
        right: -2,
        minWidth: metrics.width(16),
        height: metrics.width(16),
        borderRadius: metrics.width(8),
        backgroundColor: darkColors.primaryColor,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: metrics.width(4),
    },
    badgeText: {
        color: darkColors.TextWhite,
        fontSize: metrics.width(9),
        fontWeight: '700',
    },
    safe: {
        backgroundColor: 'transparent',
    },
});
