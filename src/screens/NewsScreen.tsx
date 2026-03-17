import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { metrics } from '@/utils/metrics';
import { darkColors } from '@/config/colors';
import { useGetNewsListQuery } from '@/api/newsApi';
import { navigate } from '@/navigation/navigationService';
import { NEWS_BASE_Image_URL } from '@/constants/api';
import { NewsCardShimmer, ImageWithShimmer } from '@/components';

const PLACEHOLDER_IMAGE = require('../assets/images/TempImage.png');

const getImageSource = (imageName: string | null) => {
    if (!imageName) return PLACEHOLDER_IMAGE;
    return { uri: `${NEWS_BASE_Image_URL}${imageName}` };
};

// Helper function to strip HTML tags and get plain text
const stripHtml = (html: string): string => {
    return html.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim();
};

export const NewsScreen: React.FC = () => {
    const { data, isLoading, error } = useGetNewsListQuery();
    console.log('data', data);

    const renderItem = ({ item }: any) => {
        const imageSource = getImageSource(item.image);
        const excerpt = stripHtml(item.description || '').substring(0, 150);

        return (
            <TouchableOpacity
                style={styles.card}
                activeOpacity={0.8}
                onPress={() => navigate('NewsDetail' as any, { slug: item.slug })}
            >
                <ImageWithShimmer
                    source={imageSource}
                    style={styles.thumb}
                    fallbackSource={PLACEHOLDER_IMAGE}
                    shimmerStyle={styles.thumbShimmer}
                />
                <View style={styles.cardBody}>
                    <Text style={styles.cardTitle} numberOfLines={1} ellipsizeMode='tail'>{item.name}</Text>
                    <Text style={styles.cardExcerpt}
                        ellipsizeMode='tail'
                        numberOfLines={3}
                    >{excerpt}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    if (isLoading) {
        return (
            <View style={styles.container}>
                <Text style={styles.loginTitle}>News</Text>
                <ScrollView
                    contentContainerStyle={styles.list}
                    showsVerticalScrollIndicator={false}
                >
                    <NewsCardShimmer count={8} />
                </ScrollView>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.container}>
                <Text style={styles.loginTitle}>News</Text>
                <View style={styles.loadingContainer}>
                    <Text style={styles.errorText}>Failed to load news. Please try again.</Text>
                </View>
            </View>
        );
    }

    const newsData = data?.data?.news || [];

    return (
        <View style={styles.container}>
            <Text style={styles.loginTitle}>News</Text>
            <FlatList
                data={newsData}

                keyExtractor={item => String(item.id)}
                renderItem={renderItem}
                contentContainerStyle={styles.list}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    <View style={styles.loadingContainer}>
                        <Text style={styles.errorText}>No news available</Text>
                    </View>
                }
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: darkColors.background,

    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: metrics.height(14),
    },
    headerTitle: {
        color: darkColors.primaryColor,
        fontSize: metrics.width(18),
        fontWeight: 'bold',
    },
    headerIcons: {
        flexDirection: 'row',
        gap: metrics.width(12),
        alignItems: 'center',
    },
    list: {
        paddingBottom: metrics.height(40),
        marginHorizontal: metrics.width(20)
    },
    card: {
        flexDirection: 'row',
        marginBottom: metrics.height(12),
        alignItems: 'flex-start'
    },
    thumb: {
        width: metrics.width(85),
        height: metrics.width(85),
        borderRadius: 8,
        marginRight: metrics.width(20),
    },
    thumbShimmer: {
        borderRadius: 8,
    },
    cardBody: {
        flex: 1,
        color: darkColors.TextWhite,
        fontSize: metrics.width(14),
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },
    cardTitle: {
        color: darkColors.TextWhite,
        fontSize: metrics.width(14),
        fontWeight: 'bold',
    },
    cardExcerpt: {
        fontSize: metrics.width(12),
        color: darkColors.TextWhite,
    },
    loginTitle: {
        fontSize: metrics.width(25),
        fontWeight: 'bold',
        color: darkColors.primaryColor,
        marginBottom: metrics.height(20),
        textAlign: 'center',
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
