import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Linking,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { metrics } from '@/utils/metrics';
import { darkColors } from '@/config/colors';
import { Svgs } from '@/assets/icons/Svgs';
import { navigate } from '@/navigation/navigationService';
import { SCREEN_NAMES } from '@/config/constants';
import { useAppDispatch } from '@/store';
import { showSnackbar } from '@/store';
import { useLogoutMutation } from '@/api/authApi';
import { Header2 } from '@/components';

type MenuItem = { id: string; title: string; onPress: () => void; underlined?: boolean };

export const ProfileMenuScreen: React.FC = () => {
    const navigation = useNavigation();
    const insets = useSafeAreaInsets();
    const dispatch = useAppDispatch();
    const [logout, { isLoading: isLoggingOut }] = useLogoutMutation();

    const handleLogout = async () => {
        try {
            await logout().unwrap();
            dispatch(showSnackbar({ message: 'Logged out successfully', type: 'success' }));
            // Root stack resets to Auth (Login) when isAuthenticated becomes false
            setTimeout(() => navigate('Auth' as any), 0);
        } catch (err: any) {
            dispatch(showSnackbar({ message: err?.data?.message || 'Logged out locally', type: 'info' }));
            setTimeout(() => navigate('Auth' as any), 0);
        }
    };

    const items: MenuItem[] = [
        { id: 'my-profile', title: 'My Profile', onPress: () => navigate(SCREEN_NAMES.MyProfile), underlined: true },
        { id: 'subscriptions', title: 'Subscriptions', onPress: () => navigate(SCREEN_NAMES.SubscriptionPlanDetail) },
        { id: 'about-us', title: 'About Us', onPress: () => navigate(SCREEN_NAMES.AboutUs) },
        { id: 'partners', title: 'Partners', onPress: () => navigate(SCREEN_NAMES.Partners) },
        { id: 'faq', title: 'FAQ', onPress: () => navigate(SCREEN_NAMES.FAQ) },
        { id: 'feedback', title: 'Give Us Feedback!', onPress: () => Linking.openURL('https://us1.list-manage.com/survey?u=42cd84c3a677bb44bc1b9c6f9&id=13b4ea25bf') },
        { id: 'legal', title: 'Legal Area', onPress: () => navigate(SCREEN_NAMES.LegalArea) },
        { id: 'logout', title: 'Logout', onPress: handleLogout },
    ];

    return (
        <View style={[styles.container,]}>
            {/* Header */}

            <Header2
                title="Profile Menu"
                titleStyle={styles.titleText}
            />
            {/* Menu list */}
            <ScrollView contentContainerStyle={styles.list} showsVerticalScrollIndicator={false}>
                {items.map((it) => (
                    <TouchableOpacity
                        key={it.id}
                        style={styles.listItem}
                        onPress={it.id === 'logout' && isLoggingOut ? undefined : it.onPress}
                        disabled={it.id === 'logout' && isLoggingOut}
                        activeOpacity={0.7}
                    >
                        <Text
                            style={[
                                styles.listItemText,
                                it.underlined && styles.listItemTextUnderline,
                            ]}
                        >
                            {it.id === 'logout' && isLoggingOut ? 'Logging out…' : it.title}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: darkColors.background },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: metrics.width(16),
        paddingVertical: metrics.height(12),
        borderBottomWidth: 1,
        borderBottomColor: darkColors.listDivider,
    },
    backBtn: { padding: metrics.width(4) },
    logoWrap: { flex: 1, alignItems: 'center' },
    headerRight: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: metrics.width(8),
    },
    subscribeBtn: {
        backgroundColor: darkColors.primaryColor,
        paddingHorizontal: metrics.width(12),
        paddingVertical: metrics.height(6),
        borderRadius: 4,
    },
    subscribeText: {
        color: darkColors.TextWhite,
        fontSize: metrics.width(12),
        fontWeight: '600',
    },
    headerIcon: { padding: metrics.width(4) },
    list: { paddingHorizontal: metrics.width(16), paddingBottom: metrics.height(40), paddingTop: metrics.height(16) },
    listItem: {
        paddingVertical: metrics.width(14),
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: darkColors.listDivider,
    },
    listItemText: {
        color: darkColors.TextWhite,
        fontSize: metrics.width(16),
        textAlign: 'center',
    },
    listItemTextUnderline: { textDecorationLine: 'underline' },
    titleText:{
        color: darkColors.primaryColor,
        fontSize: metrics.width(16),
        fontWeight: '600',
    }
});

export default ProfileMenuScreen;
