import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Svgs } from '@/assets/icons/Svgs';
import { metrics } from '@/utils/metrics';

export interface HeaderProps {
    showNotifications?: boolean;
    showProfile?: boolean;
    style?: any;
}

export const Header: React.FC<HeaderProps> = ({ showNotifications = true, showProfile = true, style }) => {
    return (
        <View style={[styles.header, style]}>
            <View style={styles.logoContainer}>
                <Svgs.BassoonLogo height={metrics.width(50)} width={metrics.width(120)} />
            </View>
            <View style={styles.headerIcons}>
                {showNotifications && (
                    <TouchableOpacity style={styles.headerIcon}>
                        <Svgs.NotificationIcon height={metrics.width(23)} width={metrics.width(23)} />
                    </TouchableOpacity>
                )}
                {showProfile && (
                    <TouchableOpacity style={styles.headerIcon}>
                        <Svgs.ProfileIcon height={metrics.width(26)} width={metrics.width(26)} />
                    </TouchableOpacity>
                )}
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
        paddingBottom: 20,
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
});
