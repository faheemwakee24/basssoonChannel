import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { Header2 } from '@/components/Header2';
import { metrics } from '@/utils/metrics';
import { darkColors } from '@/config/colors';
import { Svgs } from '@/assets/icons/Svgs';
import TitleTile from '@/components/TitleTile';
import { SCREEN_NAMES } from '@/config/constants';
import { navigate } from '@/navigation/navigationService';
const MyProfile: React.FC<any> = () => {
    const user = {
        name: 'Malte Refardt',
        email: 'refardt@me.com',
    };

    return (
        <View style={styles.container}>
            <Header2 />

            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.profileRow}>
                    <View style={styles.avatarWrap}>
                        <Image source={require('@/assets/images/NoImage.png')} style={styles.avatar} resizeMode="cover" />
                    </View>

                    <View style={styles.infoWrap}>
                        <Text style={styles.name}>{user.name}</Text>
                        <Text style={styles.email}>{user.email}</Text>
                    </View>
                </View>

                <View style={styles.grid}>
                    <TitleTile icon={<Svgs.SettingIcon height={metrics.width(65)} />} label="Settings" onPress={() => navigate(SCREEN_NAMES.ProfileSetting)} />
                    <TitleTile icon={<Svgs.SubscriptionIcon height={metrics.width(65)} />} label="Subscriptions" onPress={() => navigate(SCREEN_NAMES.Subscriptions)} />
                    <TitleTile icon={<Svgs.Notification height={metrics.width(70)} />} label="Notifications" onPress={() => navigate(SCREEN_NAMES.Notifications)} />
                    <TitleTile icon={<Svgs.Bookmark height={metrics.width(70)} />} label="Bookmarks" onPress={() => { }} />
                    <TitleTile icon={<Svgs.ChangePassoword height={metrics.width(60)} />} label="Change Password" onPress={() => navigate(SCREEN_NAMES.ChangePassword)} />
                    <TitleTile icon={<Svgs.Logout />} label="Logout" onPress={() => { }} />
                </View>
            </ScrollView>
        </View>
    );
};

export default MyProfile;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: darkColors.background },
    content: { padding: metrics.width(16), },
    profileRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: metrics.height(24) },
    avatarWrap: {
        width: metrics.width(150),
        height: metrics.width(150),
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
    },
    avatar: { width: '100%', height: '100%' },
    noImagePlaceholder: { position: 'absolute', alignItems: 'center', justifyContent: 'center' },
    infoWrap: { flex: 1, paddingLeft: metrics.width(16) },
    name: { color: darkColors.TextWhite, fontSize: metrics.width(18), fontWeight: '700' },
    email: { color: darkColors.TextWhite, marginTop: metrics.height(2), fontSize: metrics.width(17) },
    grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', gap: metrics.width(8) },
    tile: {
        aspectRatio: 1,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: darkColors.borderColor20,
        marginBottom: metrics.height(12),
        alignItems: 'center',
        justifyContent: 'center',
        padding: metrics.width(8),
        backgroundColor: 'transparent',
    },
    iconWrap: { marginBottom: metrics.height(8) },
    tileLabel: { color: darkColors.TextWhite, textAlign: 'center' },
});
