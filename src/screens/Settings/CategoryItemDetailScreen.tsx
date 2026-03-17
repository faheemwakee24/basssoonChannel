import React, { useMemo, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    useWindowDimensions,
    ActivityIndicator,
} from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';
import { metrics } from '@/utils/metrics';
import { darkColors } from '@/config/colors';
import { Header2 } from '@/components';
import { Svgs } from '@/assets/icons/Svgs';
import LinearGradient from 'react-native-linear-gradient';
import { useToggleBookmarkMutation } from '@/api/bookmarksApi';
import type { CategoryItem } from '@/api/categoriesApi';
import { useGetItemDetailQuery } from '@/api/categoriesApi';
import { useAppDispatch, showSnackbar } from '@/store';
import { CategoryItemDetailShimmer } from '@/components/Shimmer';

const stripHtml = (html: string | null): string => {
    if (!html) return '';
    return html.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim();
};

function extractEmbedUrl(embedCode: string | null): string | null {
    if (!embedCode) return null;
    const m = embedCode.match(/"embedUrl"\s*:\s*"([^"]+)"/);
    return m ? m[1] : null;
}

type CategoryItemDetailRoute = {
    CategoryItemDetail: { item?: CategoryItem; slug?: string };
};

const EMBED_HTML = (embedUrl: string) => `
<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    html, body { width: 100%; height: 100%; background: #000; }
    iframe { width: 100%; height: 100%; border: 0; }
  </style>
</head>
<body>
  <iframe src="${embedUrl}" allowfullscreen allow="autoplay; encrypted-media"></iframe>
</body>
</html>
`;

export const CategoryItemDetailScreen: React.FC = () => {
    const route = useRoute<RouteProp<CategoryItemDetailRoute, 'CategoryItemDetail'>>();
    const slug = route?.params?.slug || route?.params?.item?.slug;
    const { data, isLoading, error } = useGetItemDetailQuery(slug || '', { skip: !slug });
    console.log("data", data);
    console.log("error", error);
    console.log("slug", slug);
    const item = data?.data?.item;
    const { width } = useWindowDimensions();
    const insets = useSafeAreaInsets();
    const playerHeight = width * (16 / 9); // Adjusted ratio for better video display

    const dispatch = useAppDispatch();
    const [toggleBookmark, { isLoading: isToggling }] = useToggleBookmarkMutation();
    const [bookmarked, setBookmarked] = useState(false);

    React.useEffect(() => {
        if (data?.success) {
            setBookmarked(data.data.is_bookmarked);
        }
    }, [data]);
    const embedUrl = useMemo(() => extractEmbedUrl(item?.embed_code ?? null), [item?.embed_code]);
    const description = useMemo(() => stripHtml(item?.description ?? null), [item?.description]);
    const play_url = item?.play_url || '';
    const handleBookmarkPress = async () => {
        console.log('itemmmmm',item)
        if (!item?.id || isToggling) return;
        const next = !bookmarked;
        setBookmarked(next);
        try {
            const res = await toggleBookmark({ item_id: item.id }).unwrap();
            const final = typeof res?.data?.bookmarked === 'boolean' ? res.data.bookmarked : next;
            setBookmarked(final);
            dispatch(
                showSnackbar({
                    message: final ? 'Bookmark added' : 'Bookmark removed',
                    type: 'success',
                })
            );
        } catch (error) {
            console.log('error', error);
            dispatch(
                showSnackbar({
                    message: 'Failed to toggle bookmark',
                    type: 'error',
                })
            );
            setBookmarked(!next);
        }
    };

    if (isLoading) {
        return <CategoryItemDetailShimmer />;
    }

    if (error || !item) {
        return (
            <LinearGradient
                colors={[darkColors.background, darkColors.primaryColor]}
                style={styles.container}
            >
                <Header2 title="Detail" titleStyle={styles.headerTitle} />
                <View style={styles.emptyWrap}>
                    <Text style={styles.emptyText}>
                        {error ? 'Failed to load data.' : 'No item data.'}
                    </Text>
                </View>
            </LinearGradient>
        );
    }

    return (
        <View

            style={styles.container}
        >
            <Header2 title={item.name} titleStyle={styles.headerTitle} />
            <ScrollView
                style={styles.scroll}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator
            >
                <View style={[styles.playerWrap, { height: playerHeight }]}>
                    {play_url ? (
                        <WebView
                            source={{ uri: play_url }}
                            style={styles.webview}
                            scrollEnabled={false}
                            originWhitelist={['*']}
                            allowsInlineMediaPlayback
                            mediaPlaybackRequiresUserAction={false}
                            startInLoadingState
                            scalesPageToFit
                            renderLoading={() => (
                                <View style={styles.playerLoading}>
                                    <ActivityIndicator size="large" color={darkColors.TextWhite} />
                                </View>
                            )}
                        />
                    ) : (
                        <View style={styles.playerPlaceholder}>
                            <Text style={styles.placeholderText}>No media available</Text>
                        </View>
                    )}
                </View>

                <View style={styles.content}>
                    {item.authors ? (
                        <Text style={styles.artistLabel}>Artist : {item.authors}</Text>
                    ) : null}
                    {description ? (
                        <Text style={styles.description}>{description}</Text>
                    ) : null}
                </View>
                <View style={[styles.footer, { paddingBottom: Math.max(metrics.height(16), insets.bottom) }]}>
                    {!bookmarked && (
                        <TouchableOpacity
                            style={[styles.bookmarkBtn, bookmarked && styles.bookmarkBtnActive]}
                            onPress={handleBookmarkPress}
                            disabled={isToggling}
                            activeOpacity={0.8}
                        >
                            {isToggling ? (
                                <ActivityIndicator size="small" color={darkColors.TextWhite} />
                            ) : (
                                <Svgs.Bookmark
                                    width={metrics.width(20)}
                                    height={metrics.width(20)}
                                    color={darkColors.TextWhite}
                                />
                            )}
                            <Text style={styles.bookmarkLabel}>Bookmark</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </ScrollView>


        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: darkColors.background },
    headerTitle: { fontSize: metrics.width(20), color: darkColors.primaryColor },
    scroll: { flex: 1 },
    scrollContent: { paddingBottom: metrics.height(100) },
    playerWrap: {
        width: '100%',
        backgroundColor: '#000',
        overflow: 'hidden',
    },
    webview: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: '#000',
        overflow: 'hidden',
    },
    playerLoading: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
    },
    playerPlaceholder: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
    },
    placeholderText: {
        color: darkColors.TextWhite,
        fontSize: metrics.width(14),
        opacity: 0.6,
    },
    content: {
        paddingHorizontal: metrics.width(16),
        paddingTop: metrics.height(20),
    },
    artistLabel: {
        color: darkColors.TextWhite,
        fontSize: metrics.width(16),
        fontWeight: '700',
        marginBottom: metrics.height(12),
    },
    description: {
        color: darkColors.TextWhite,
        fontSize: metrics.width(14),
        lineHeight: metrics.width(22),
        opacity: 0.95,
    },
    footer: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        paddingHorizontal: metrics.width(16),
        paddingTop: metrics.height(16),
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    bookmarkBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: metrics.width(8),
        paddingVertical: metrics.height(14),
        paddingHorizontal: metrics.width(32),
        backgroundColor: '#2a2a2a',
        borderRadius: 12,
        minWidth: metrics.width(200),
    },
    bookmarkBtnActive: {
        backgroundColor: darkColors.primaryColor,
    },
    bookmarkLabel: {
        color: darkColors.TextWhite,
        fontSize: metrics.width(16),
        fontWeight: '600',
    },
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
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: darkColors.background,
    },
});

export default CategoryItemDetailScreen;
