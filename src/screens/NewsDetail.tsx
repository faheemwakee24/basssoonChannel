import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking, ImageBackground } from 'react-native';
import { metrics } from '@/utils/metrics';
import { darkColors } from '@/config/colors';
import { Svgs } from '@/assets/icons/Svgs';
import { Header2 } from '@/components';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';

export const NewsDetail: React.FC<any> = ({ route }: any) => {
    const item = route?.params?.item ?? {
        title: 'Klaus Thunemann has passed away',
        content: `It is with great sadness that we learn of the passing of world-renowned bassoonist Klaus Thunemann, who influenced the music world and countless generations of bassoonists...\n It is with great sadness that we learn of the passing of world-renowned bassoonist Klaus Thunemann, who influenced the music world and countless generations of bassoonists...\n\n It is with great sadness that we learn of the passing of world-renowned bassoonist Klaus Thunemann, who influenced the music world and countless generations of bassoonists...`,
        url: 'https://www.figma.com/design/5vgSRLhBafRmu9TyQJSfXU/Figma--Copy-?node-id=33511-412&t=Y4LIldbCuAQJe1XJ-0',
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
            <Header2 />
            <ScrollView contentContainerStyle={styles.scroll}>
                <ImageBackground source={require('../assets/images/TempImage.png')} style={styles.hero}>
                    <LinearGradient colors={['transparent', 'rgba(0,0,0,0.7)']} style={styles.gradient} />
                    <Text style={styles.title}>{item.title}</Text>
                </ImageBackground>
                <View style={styles.contentWrap}>
                    <Text style={styles.bodyText}>{item.content}</Text>
                    <TouchableOpacity style={styles.linkRow} onPress={() => openLink(item.url)}>
                        <View style={styles.rowww}>
                            <View style={styles.margin}>
                                <Svgs.WebIcon height={metrics.width(18)} width={metrics.width(18)} />
                            </View>
                            <View style={styles.linkTextWrap}>
                                <View style={styles.row2}>
                                    <Text style={styles.webLabel}>Web</Text>
                                    <Svgs.ArrowRight height={metrics.width(18)} width={metrics.width(18)} />
                                </View>
                                <Text style={styles.linkText} >{item.url}</Text>
                            </View>
                        </View>

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
        margin: 10
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
