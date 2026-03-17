import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Svgs } from '@/assets/icons/Svgs';
import { metrics } from '@/utils/metrics';
import { navigate } from '@/navigation/navigationService';
import { SCREEN_NAMES } from '@/config/constants';
import { useAppSelector } from '@/store';

export interface HeaderProps {
    showNotifications?: boolean;
    showProfile?: boolean;
    style?: any;
}

export const Header: React.FC<HeaderProps> = ({ showNotifications = true, showProfile = true, style }) => {
    const insets = useSafeAreaInsets();
    const isAuthenticated = useAppSelector((s) => s.auth.isAuthenticated);

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
                        </TouchableOpacity>
                    )}
                    {isAuthenticated && showProfile && (
                        <TouchableOpacity style={styles.headerIcon} onPress={() => navigate(SCREEN_NAMES.ProfileMenu)}>
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
    },
    safe: {
        backgroundColor: 'transparent',
    },
});
