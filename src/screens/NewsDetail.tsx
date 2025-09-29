import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking, ImageBackground } from 'react-native';
import { metrics } from '@/utils/metrics';
import { darkColors } from '@/config/colors';
import { Svgs } from '@/assets/icons/Svgs';
import { Header } from '@/components';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';

export const NewsDetail: React.FC<any> = ({ route }: any) => {
    const item = route?.params?.item ?? {
        title: 'Klaus Thunemann has passed away',
        content: `It is with great sadness that we learn of the passing of world-renowned bassoonist Klaus Thunemann, who influenced the music world and countless generations of bassoonists...`,
        url: 'https://www.ndr.de/kultur/musik',
    };

    const openLink = async (url: string) => {
        try {
            await Linking.openURL(url);
        } catch (e) {
            console.warn('Failed to open URL', e);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Header />
            <ScrollView contentContainerStyle={styles.scroll}>
                <ImageBackground source={require('../assets/images/TempImage.png')} style={styles.hero}>
                    <LinearGradient colors={['transparent', 'rgba(0,0,0,0.7)']} style={styles.gradient} />
                    <Text style={styles.title}>{item.title}</Text>

                </ImageBackground>

                <View style={styles.contentWrap}>
                    <Text style={styles.bodyText}>{item.content}</Text>

                    <TouchableOpacity style={styles.linkRow} onPress={() => openLink(item.url)}>
                        <Text style={styles.webLabel}>Web</Text>
                        <View style={styles.linkTextWrap}>
                            <Text style={styles.linkText} numberOfLines={2}>{item.url}</Text>
                        </View>
                        <Svgs.OpenEye height={16} width={16} />
                    </TouchableOpacity>
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
        flexDirection: 'row',
        alignItems: 'center',
        gap: metrics.width(8),
        paddingVertical: metrics.height(8),
    },
    webLabel: {
        color: darkColors.TextWhite,
        fontWeight: 'bold',
        marginRight: metrics.width(8),
    },
    linkTextWrap: { flex: 1 },
    linkText: { color: darkColors.primaryColor, fontSize: metrics.width(12) },
});
