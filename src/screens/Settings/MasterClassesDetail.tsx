import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking, ImageBackground } from 'react-native';
import { metrics } from '@/utils/metrics';
import { darkColors } from '@/config/colors';
import { Svgs } from '@/assets/icons/Svgs';
import { Header2 } from '@/components';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';

export const MasterClassesDetail: React.FC<any> = ({ route }: any) => {
    const item = React.useMemo(() => route?.params?.item ?? {
        title: 'Orchestra Professional orcestra orchestra',
        content: `It is with great sadness that we learn of the passing of world-renowned bassoonist Klaus Thunemann, who influenced the music world and countless generations of bassoonists...`,
        Phone: '+39 0121 321040, +39393 9062821',
        email: 'laura.richaud@accademiadimusica.it',
        map: 'Viale Giolitti, 7/a 10064 Pinerolo (TO) -Italy',
        web: 'https://accademiadimusica.it/en/progetto/orchestra-professionals/',
    }, [route?.params?.item]);

    const openLink = async (url: string) => {
        try {
            await Linking.openURL(url);
        } catch (e) {
            console.warn('Failed to open URL', e);
        }
    };
    const contactList = React.useMemo(() => [
        { id: 'phone', label: 'Phone', Icon: Svgs.Phone, value: item.Phone, url: item.url },
        { id: 'email', label: 'Email', Icon: Svgs.Email, value: item.email, url: item.url },
        { id: 'web', label: 'Web', Icon: Svgs.WebIcon, value: item.web, url: item.url },
        { id: 'map', label: 'Map', Icon: Svgs.WebIcon, value: item.map, url: item.url },
    ], [item]);

    return (
        <SafeAreaView style={styles.container}>
            <Header2 />
            <ScrollView contentContainerStyle={styles.scroll}>
                <ImageBackground source={require('@/assets/images/TempImage.png')} style={styles.hero}>
                    <LinearGradient colors={['transparent', 'rgba(0,0,0,0.7)']} style={styles.gradient} />
                    <Text style={styles.title}>{item.title}</Text>
                </ImageBackground>
                <View style={styles.contentWrap}>
                    <Text style={styles.bodyText}>{item.content}</Text>
                    {contactList.map((it) => {
                        const Icon = it.Icon;
                        return (
                            <TouchableOpacity key={it.id} style={styles.linkRow} onPress={() => openLink(it.url)}>
                                <View style={styles.rowww}>
                                    <View style={styles.margin}>
                                        <Icon height={metrics.width(18)} width={metrics.width(18)} />
                                    </View>
                                    <View style={styles.linkTextWrap}>
                                        <View style={styles.row2}>
                                            <Text style={styles.webLabel}>{it.label}</Text>
                                            <Svgs.ArrowRight height={metrics.width(18)} width={metrics.width(18)} />
                                        </View>
                                        <Text style={styles.linkText} >{it.value}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: darkColors.background },
    scroll: { paddingBottom: metrics.height(40) },
    hero: {
        height: metrics.height(300),
        position: 'relative',
        justifyContent: 'flex-end',
    },
    gradient: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'flex-end',
        height: '100%',
        borderRadius: 0,
    },
    title: {
        color: darkColors.TextWhite,
        fontSize: metrics.width(18),
        fontWeight: 'bold',
        margin: 10,
        maxWidth: '80%'
    },
    contentWrap: {
        paddingHorizontal: metrics.width(16),
        paddingTop: metrics.height(18),
    },
    bodyText: {
        color: '#d1d1d1',
        fontSize: metrics.width(14),
        lineHeight: metrics.height(22),
        marginBottom: metrics.height(18),
    },
    linkRow: {
        gap: metrics.width(8),
        marginBottom: metrics.height(18)
    },
    webLabel: {
        color: darkColors.TextWhite,
        fontWeight: 'bold',
        marginRight: metrics.width(8),
    },
    linkTextWrap: { flex: 1, marginRight: metrics.width(8) },
    linkText: { color: darkColors.primaryColor, fontSize: metrics.width(12) },
    rowww: {
        flexDirection: 'row', gap: metrics.width(4)
    },
    margin: {
        marginTop: metrics.width(3)
    },
    row2: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
    }
});
