import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import { metrics } from '@/utils/metrics';
import { darkColors } from '@/config/colors';
import { Svgs } from '@/assets/icons/Svgs';
import { useGetAudioCategoriesQuery } from '@/api/categoriesApi';
import { ExploreShimmer, ImageWithShimmer } from '@/components';
import {
    CATEGORIES_BASE_Image_URL,
    BANNER_BASE_Image_URL,
} from '@/constants/api';
import type { AudioCategory, AudioSubcategory } from '@/api/categoriesApi';
import { navigate } from '@/navigation/navigationService';
import { SCREEN_NAMES } from '@/config/constants';

const FALLBACK_IMAGE = require('@/assets/images/TempImage.png');

const getSubcategorySource = (image: string | null) =>
    image ? `${CATEGORIES_BASE_Image_URL}${image}` : null;
const getBannerSource = (image: string | null) =>
    image ? `${BANNER_BASE_Image_URL}${image}` : null;

const getErrorMessage = (error: unknown) => {
    if (!error || typeof error !== 'object') {
        return 'Failed to load categories. Please try again.';
    }

    const err = error as {
        data?: { message?: string };
        message?: string;
    };

    if (err.data?.message) {
        return err.data.message;
    }

    if (err.message) {
        return err.message;
    }

    return 'Failed to load categories. Please try again.';
};

const AudioCategoryScreen: React.FC = () => {
    const [query, setQuery] = React.useState('');
    const { data, isLoading, error } = useGetAudioCategoriesQuery();
    const errorMessage = React.useMemo(() => getErrorMessage(error), [error]);


    const categories = data?.data?.categories ?? [];
    const banners = data?.data?.banners ?? [];
    const heroBanner = banners[0];

    const filteredCategories = React.useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return categories;
        return categories
            .map((cat) => {
                const catMatches = cat.name.toLowerCase().includes(q);
                const subcategories = catMatches
                    ? cat.subcategories
                    : cat.subcategories.filter((sub) =>
                        sub.name.toLowerCase().includes(q)
                    );
                return { ...cat, subcategories };
            })
            .filter((cat) => cat.subcategories.length > 0);
    }, [categories, query]);

    if (isLoading) {
        return (
            <View style={styles.container}>
                <View style={styles.searchWrap2}>
                    <View style={styles.searchPill}>
                        <TextInput
                            placeholder="Find"
                            placeholderTextColor={darkColors.searchPlaceholder}
                            style={styles.searchInput2}
                            underlineColorAndroid="transparent"
                            value={query}
                            onChangeText={setQuery}
                            editable={false}
                        />
                        <TouchableOpacity style={styles.searchIcon} activeOpacity={0.7}>
                            <Svgs.Search />
                        </TouchableOpacity>
                    </View>
                </View>
                <ExploreShimmer />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.container}>
                <View style={styles.searchWrap2}>
                    <View style={styles.searchPill}>
                        <TextInput
                            placeholder="Find"
                            placeholderTextColor={darkColors.searchPlaceholder}
                            style={styles.searchInput2}
                            underlineColorAndroid="transparent"
                            value={query}
                            onChangeText={setQuery}
                        />
                        <TouchableOpacity style={styles.searchIcon} activeOpacity={0.7}>
                            <Svgs.Search />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.errorWrap}>
                    <Text style={styles.errorText}>
                        {errorMessage}
                    </Text>
                </View>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.searchWrap2}>
                <View style={styles.searchPill}>
                    <TextInput
                        placeholder="Find"
                        placeholderTextColor={darkColors.searchPlaceholder}
                        style={styles.searchInput2}
                        underlineColorAndroid="transparent"
                        value={query}
                        onChangeText={setQuery}
                    />
                    <TouchableOpacity style={styles.searchIcon} activeOpacity={0.7}>
                        <Svgs.Search />
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.searchWrap}>
                    <ImageWithShimmer
                        source={getBannerSource(heroBanner?.image ?? null) ?? FALLBACK_IMAGE}
                        style={styles.hero}
                        shimmerStyle={styles.heroShimmer}
                        fallbackSource={FALLBACK_IMAGE}
                        resizeMode="cover"
                    />
                </View>
                {filteredCategories.map((section: AudioCategory) => (
                    <View key={section.id} style={styles.section}>
                        <TouchableOpacity onPress={() => {
                            console.log('section', section);
                            navigate(SCREEN_NAMES.AudioSubcattegories, { section: section, type: 'Audio' });
                        }} style={styles.row2}>
                            <Text style={styles.sectionTitle} numberOfLines={1}>
                                {section.name}
                            </Text>
                            <Svgs.ArrowRight
                                height={metrics.width(16)}
                                width={metrics.width(16)}
                                color={darkColors.TextWhite}
                            />
                        </TouchableOpacity>
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={styles.row}
                            style={styles.scrollContainer}
                        >
                            {(() => {
                                const subcats = section.subcategories;
                                const itemsToDisplay = (subcats.length > 0 && subcats.length < 5)
                                    ? Array.from({ length: 5 }, (_, i) => subcats[i % subcats.length])
                                    : subcats;

                                return itemsToDisplay.map((item: AudioSubcategory, index: number) => (
                                    <TouchableOpacity onPress={() => {
                                        navigate(SCREEN_NAMES.CategoryItems as any, {
                                            categorySlug: section!.slug,
                                            subcategorySlug: item.slug,
                                            type: 'Audio',
                                            subcategoryName: item.name,
                                        })
                                    }} key={`${item.id}-${index}`} style={styles.card}>
                                        <ImageWithShimmer
                                            source={getSubcategorySource(item.image) ?? FALLBACK_IMAGE}
                                            style={styles.cardBg}
                                            shimmerStyle={styles.cardShimmer}
                                            fallbackSource={FALLBACK_IMAGE}
                                            resizeMode="cover"
                                        />
                                    </TouchableOpacity>
                                ));
                            })()}
                            <View style={styles.spacer} />
                        </ScrollView>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

export default AudioCategoryScreen;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: darkColors.background },
    content: { paddingBottom: metrics.height(80) },
    searchWrap: {
        marginBottom: metrics.height(12),
        marginHorizontal: metrics.width(12),
    },
    hero: {
        height: metrics.height(170),
        borderRadius: 12,
        width: '100%',
    },
    heroShimmer: { borderRadius: 12 },
    section: { marginBottom: metrics.height(18) },
    sectionTitle: {
        color: darkColors.TextWhite,
        fontSize: metrics.width(16),
        marginBottom: metrics.height(8),
        marginHorizontal: metrics.width(12),
        flex: 1,
    },
    row: { alignItems: 'center' },
    card: {
        width: metrics.width(140),
        height: metrics.height(80),
        marginRight: metrics.width(12),
        borderRadius: 8,
        overflow: 'hidden',
    },
    cardBg: {
        height: '100%',
        width: '100%',
        borderRadius: 8,
        overflow: 'hidden',
    },
    cardShimmer: { borderRadius: 8 },
    searchWrap2: {
        paddingHorizontal: metrics.width(16),
        paddingBottom: metrics.height(8),
    },
    searchPill: {
        height: metrics.height(46),
        borderRadius: 999,
        borderWidth: 1,
        borderColor: darkColors.searchBorder,
        backgroundColor: darkColors.searchBg,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: metrics.width(12),
    },
    searchInput2: {
        flex: 1,
        height: '100%',
        color: darkColors.TextWhite,
        fontStyle: 'italic',
        paddingVertical: 0,
        paddingRight: metrics.width(8),
    },
    searchIcon: {
        paddingLeft: metrics.width(8),
        paddingVertical: metrics.height(6),
    },
    scrollContainer: {
        paddingHorizontal: metrics.width(12),
        paddingRight: metrics.width(30),
    },
    spacer: { height: metrics.width(10), width: metrics.width(10) },
    row2: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: metrics.height(8),
        marginHorizontal: metrics.width(12),
    },
    errorWrap: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: metrics.width(24),
    },
    errorText: {
        color: darkColors.TextWhite,
        fontSize: metrics.width(16),
        textAlign: 'center',
    },
});
