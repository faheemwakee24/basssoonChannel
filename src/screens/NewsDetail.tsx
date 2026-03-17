import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking, ImageBackground } from 'react-native';
import { metrics } from '@/utils/metrics';
import { darkColors } from '@/config/colors';
import { Svgs } from '@/assets/icons/Svgs';
import { Header2, NewsDetailShimmer } from '@/components';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { useGetNewsDetailQuery } from '@/api/newsApi';
import { API_BASE_URL, NEWS_BASE_Image_URL } from '@/constants/api';

// Helper function to get image URL
const getImageUrl = (imageName: string | null): any => {
    if (!imageName) {
        return require('../assets/images/TempImage.png');
    }
    return { uri: `${NEWS_BASE_Image_URL}${imageName}` };
};

// Helper function to strip HTML tags
const stripHtml = (html: string): string => {
    return html.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').replace(/&rsquo;/g, "'").replace(/&mdash;/g, '—').replace(/&ndash;/g, '–').trim();
};

export const NewsDetail: React.FC<any> = ({ route }: any) => {
    const slug = route?.params?.slug;
    const { data, isLoading, error } = useGetNewsDetailQuery(slug || '', { skip: !slug });

    const openLink = async (url: string) => {
        if (!url) return;
        try {
            await Linking.openURL(url);
        } catch (e) {
            console.warn('Failed to open URL', e);
        }
    };

    if (isLoading) {
        return (
            <View style={styles.container}>
                <Header2 />
                <ScrollView contentContainerStyle={styles.scroll}>
                    <NewsDetailShimmer />
                </ScrollView>
            </View>
        );
    }

    if (error || !data?.data?.news) {
        return (
            <View style={styles.container}>
                <Header2 />
                <View style={styles.loadingContainer}>
                    <Text style={styles.errorText}>Failed to load news details. Please try again.</Text>
                </View>
            </View>
        );
    }

    const item = data.data.news;
    const imageSource = getImageUrl(item.image);
    const content = stripHtml(item.description || '');

    return (
        <View style={styles.container}>
            <Header2 />
            <ScrollView contentContainerStyle={styles.scroll}>
                <ImageBackground source={imageSource} style={styles.hero} defaultSource={getImageUrl(item?.image)}>
                    <LinearGradient colors={['transparent', 'rgba(0,0,0,0.7)']} style={styles.gradient} />
                    <Text style={styles.title}>{item.name}</Text>
                </ImageBackground>
                <View style={styles.contentWrap}>
                    <Text style={styles.bodyText}>{content}</Text>
                    {item.website && (
                        <TouchableOpacity style={styles.linkRow} onPress={() => openLink(item.website || '')}>
                            <View style={styles.rowww}>
                                <View style={styles.margin}>
                                    <Svgs.WebIcon height={metrics.width(18)} width={metrics.width(18)} />
                                </View>
                                <View style={styles.linkTextWrap}>
                                    <View style={styles.row2}>
                                        <Text style={styles.webLabel}>Web</Text>
                                        <Svgs.ArrowRight height={metrics.width(18)} width={metrics.width(18)} />
                                    </View>
                                    <Text style={styles.linkText} numberOfLines={1} ellipsizeMode="tail">{item.website}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )}
                </View>
            </ScrollView>
        </View>
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
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: metrics.height(40),
    },
    errorText: {
        color: darkColors.TextWhite,
        fontSize: metrics.width(14),
        textAlign: 'center',
    },
});
