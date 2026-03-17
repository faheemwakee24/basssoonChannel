import React, { useState, useMemo } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';
import { metrics } from '@/utils/metrics';
import { darkColors } from '@/config/colors';
import { Svgs } from '@/assets/icons/Svgs';
import { useGetBookmarksQuery } from '@/api/bookmarksApi';
import { ImageWithShimmer, Header2 } from '@/components';
import { CATEGORY_ITEMS_BASE_Image_URL } from '@/constants/api';
import { navigate } from '@/navigation/navigationService';
import { SCREEN_NAMES } from '@/config/constants';

const FALLBACK_IMAGE = require('@/assets/images/TempImage.png');

const BookmarksScreen: React.FC = () => {
    const [query, setQuery] = useState('');
    const { data, isLoading, error, refetch } = useGetBookmarksQuery();

    const bookmarks = data?.data?.bookmarks ?? [];

    const filteredBookmarks = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return bookmarks;
        return bookmarks.filter((bm) =>
            bm.item.name.toLowerCase().includes(q) ||
            bm.item.authors.toLowerCase().includes(q)
        );
    }, [bookmarks, query]);

    const handleItemPress = (bm: any) => {
        const { item } = bm;
        navigate(SCREEN_NAMES.CategoryItemDetail as any, { item });
    };

    if (isLoading) {
        return (
            <View style={styles.container}>
                <Header2 title="Bookmarks" />
                <View style={styles.loadingWrap}>
                    <ActivityIndicator size="large" color={darkColors.primaryColor} />
                </View>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Header2 title="Bookmarks" />

            <View style={styles.searchWrap}>
                <View style={styles.searchPill}>
                    <TextInput
                        placeholder="Search bookmarks"
                        placeholderTextColor={darkColors.searchPlaceholder}
                        style={styles.searchInput}
                        value={query}
                        onChangeText={setQuery}
                    />
                    <TouchableOpacity style={styles.searchIcon}>
                        <Svgs.Search />
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                {filteredBookmarks.length === 0 ? (
                    <View style={styles.emptyWrap}>
                        <Text style={styles.emptyText}>
                            {query ? 'No bookmarks match your search.' : 'You have no bookmarks yet.'}
                        </Text>
                    </View>
                ) : (
                    <View style={styles.grid}>
                        {filteredBookmarks.map((bm) => (
                            <TouchableOpacity
                                key={bm.id}
                                style={styles.card}
                                onPress={() => handleItemPress(bm)}
                            >
                                <ImageWithShimmer
                                    source={bm.item.image ? { uri: `${CATEGORY_ITEMS_BASE_Image_URL}${bm.item.image}` } : FALLBACK_IMAGE}
                                    style={styles.cardImage}
                                    resizeMode="cover"
                                />
                                <View style={styles.cardInfo}>
                                    <Text style={styles.itemType}>{bm.item.type}</Text>
                                    <Text style={styles.itemName} numberOfLines={2}>{bm.item.name}</Text>
                                    <Text style={styles.itemAuthor} numberOfLines={1}>{bm.item.authors}</Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                )}
            </ScrollView>
        </View>
    );
};

export default BookmarksScreen;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: darkColors.background },
    loadingWrap: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    searchWrap: {
        paddingHorizontal: metrics.width(16),
        paddingVertical: metrics.height(12),
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
    searchInput: {
        flex: 1,
        height: '100%',
        color: darkColors.TextWhite,
        paddingVertical: 0,
    },
    searchIcon: { paddingLeft: metrics.width(8) },
    scrollContent: { paddingHorizontal: metrics.width(16), paddingBottom: metrics.height(40) },
    emptyWrap: { marginTop: metrics.height(100), alignItems: 'center' },
    emptyText: { color: darkColors.TextWhite, fontSize: metrics.width(16), opacity: 0.7 },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: metrics.width(12),
    },
    card: {
        width: (metrics.screenWidth - metrics.width(44)) / 1,
        backgroundColor: darkColors.searchBg,

        overflow: 'hidden',
        flexDirection: 'row',
        marginBottom: metrics.height(12),
        gap: metrics.width(12),
    },
    cardImage: {
        width: (metrics.width(150)),
        height: metrics.height(100),
        borderRadius: 12,
        overflow: 'hidden'
    },
    cardInfo: {
        padding: metrics.width(8),
    },
    itemType: {
        color: darkColors.primaryColor,
        fontSize: metrics.width(10),
        fontWeight: 'bold',
        marginBottom: metrics.height(2),
    },
    itemName: {
        color: darkColors.TextWhite,
        fontSize: metrics.width(14),
        fontWeight: '600',
        lineHeight: 18,
    },
    itemAuthor: {
        color: darkColors.TextWhite,
        fontSize: metrics.width(12),
        opacity: 0.6,
        marginTop: metrics.height(4),
    },
});
