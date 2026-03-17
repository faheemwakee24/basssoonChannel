import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { metrics } from '@/utils/metrics';
import { darkColors } from '@/config/colors';
import { Header2, ImageWithShimmer, NewsCardShimmer } from '@/components';
import LinearGradient from 'react-native-linear-gradient';
import { navigate } from '@/navigation/navigationService';
import { SCREEN_NAMES } from '@/config/constants';
import { useGetCategoryItemsQuery } from '@/api/categoriesApi';
import { CATEGORY_ITEMS_BASE_Image_URL } from '@/constants/api';
import type { CategoryItem } from '@/api/categoriesApi';

const FALLBACK_IMAGE = require('@/assets/images/Music.png');

const getItemImageSource = (image: string | null) =>
    image ? `${CATEGORY_ITEMS_BASE_Image_URL}${image}` : null;

const stripHtml = (html: string | null): string => {
    if (!html) return '';
    return html.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim();
};

type CategoryItemsRoute = {
    CategoryItems: {
        categorySlug: string;
        subcategorySlug: string;
        type: string;
        subcategoryName?: string;
    };
};

const Sep = () => <View style={styles.sep} />;

export const CategoryItemsScreen: React.FC = () => {
    const route = useRoute<RouteProp<CategoryItemsRoute, 'CategoryItems'>>();
    const { categorySlug, subcategorySlug, type, subcategoryName } = route?.params ?? {};

    const { data, isLoading, error } = useGetCategoryItemsQuery(
        { categorySlug: categorySlug ?? '', subcategorySlug: subcategorySlug ?? '', type: type ?? 'Audio' },
        { skip: !categorySlug || !subcategorySlug || !type }
    );

    const title = subcategoryName ?? data?.data?.sub_category?.name ?? 'Items';
    const items = data?.data?.items ?? [];

    const renderItem = ({ item }: { item: CategoryItem }) => {
        const source = getItemImageSource(item.image);
        const description = stripHtml(item.description);
        return (
            <TouchableOpacity
                style={styles.cardRow}
                activeOpacity={0.8}
                onPress={() => navigate(SCREEN_NAMES.CategoryItemDetail as any, { item })}
            >
                <View style={styles.thumbWrap}>
                    <ImageWithShimmer
                        source={source ?? FALLBACK_IMAGE}
                        style={styles.thumb}
                        shimmerStyle={styles.thumbShimmer}
                        fallbackSource={FALLBACK_IMAGE}
                        resizeMode="cover"
                    />
                </View>
                <View style={styles.cardBody}>
                    <Text style={styles.cardLabel} numberOfLines={2}>
                        {item.name}
                    </Text>
                    {description ? (
                        <Text style={styles.description} numberOfLines={3}>
                            {description}
                        </Text>
                    ) : null}
                </View>
            </TouchableOpacity>
        );
    };

    if (!categorySlug || !subcategorySlug || !type) {
        return (
            <LinearGradient
                colors={[darkColors.background, darkColors.primaryColor]}
                style={styles.container}
            >
                <Header2 title="Items" titleStyle={styles.headerTitle} />
                <View style={styles.emptyWrap}>
                    <Text style={styles.emptyText}>
                        Missing category data. Go back and select a subcategory.
                    </Text>
                </View>
            </LinearGradient>
        );
    }

    if (isLoading) {
        return (
            <LinearGradient
                colors={[darkColors.background, darkColors.primaryColor]}
                style={styles.container}
            >
                <Header2 title={title} titleStyle={styles.headerTitle} />
                <ScrollView contentContainerStyle={styles.list}>
                    <NewsCardShimmer count={6} />
                </ScrollView>
            </LinearGradient>
        );
    }

    if (error) {
        return (
            <LinearGradient
                colors={[darkColors.background, darkColors.primaryColor]}
                style={styles.container}
            >
                <Header2 title={title} titleStyle={styles.headerTitle} />
                <View style={styles.emptyWrap}>
                    <Text style={styles.emptyText}>
                        Failed to load items. Please try again.
                    </Text>
                </View>
            </LinearGradient>
        );
    }
    console.log('items', items)
    return (
        <LinearGradient
            colors={[darkColors.background, darkColors.primaryColor]}
            style={styles.container}
        >
            <Header2 title={title} titleStyle={styles.headerTitle} />
            <FlatList
                data={items}
                keyExtractor={(item) => String(item.id)}
                contentContainerStyle={styles.list}
                renderItem={renderItem}
                ItemSeparatorComponent={Sep}
                ListEmptyComponent={
                    <View style={styles.emptyWrap}>
                        <Text style={styles.emptyText}>No items.</Text>
                    </View>
                }
            />
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: darkColors.background },
    list: { padding: metrics.width(16) },
    cardRow: { flexDirection: 'row', flex: 1 },
    thumbWrap: {
        width: metrics.width(130),
        height: metrics.width(80),
        borderRadius: 12,
        overflow: 'hidden',
        backgroundColor: darkColors.TextWhite,
    },
    thumb: { width: '100%', height: '100%', borderRadius: 12 },
    thumbShimmer: { borderRadius: 12 },
    cardBody: { flex: 1, marginLeft: metrics.width(23), justifyContent: 'center' },
    cardLabel: {
        color: darkColors.TextWhite,
        fontSize: metrics.width(14),
        flex: 1,
    },
    description: {
        color: darkColors.TextWhite,
        fontSize: metrics.width(12),
        opacity: 0.85,
    },
    sep: { height: 10 },
    headerTitle: { fontSize: metrics.width(20), color: darkColors.primaryColor },
    emptyWrap: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: metrics.width(24),
    },
    emptyText: {
        color: darkColors.TextWhite,
        fontSize: metrics.width(14),
        textAlign: 'center',
    },
});

export default CategoryItemsScreen;
