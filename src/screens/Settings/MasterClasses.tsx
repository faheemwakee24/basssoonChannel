import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import { metrics } from '@/utils/metrics';
import { darkColors } from '@/config/colors';
import { Header2, NewsCardShimmer, ImageWithShimmer } from '@/components';
import LinearGradient from 'react-native-linear-gradient';
import { navigate } from '@/navigation/navigationService';
import { SCREEN_NAMES } from '@/config/constants';
import { useGetLevelItemsQuery } from '@/api/levelsApi';
import type { LevelItemRow, LevelItemsParams } from '@/api/levelsApi';
import { LEVEL_ITEMS_BASE_Additional_Image_URL } from '@/constants/api';

const PLACEHOLDER_IMAGE = require('@/assets/images/NO-Image.png');

const FALLBACK_DATA = [
    { id: '1', label: 'taking place B Flat 1', description: 'The 38th Schleswig-Holstein Music Festival, taking place from July 1 to August 27, 20 ...', image: require('@/assets/images/Music.png') },
];

const Sep = () => <View style={styles.sep} />;

type MasterClassesParams = {
    title?: string;
    slug1?: string;
    slug2?: string;
    slug3?: string;
    data?: typeof FALLBACK_DATA;
};

function buildLevelItemsParams(params: MasterClassesParams): LevelItemsParams | null {
    const slug1 = params?.slug1;
    if (!slug1) return null;
    const slug2 = params?.slug2;
    const slug3 = params?.slug3;
    if (slug3 && slug2) return { slug1, slug2, slug3 };
    if (slug2) return { slug1, slug2 };
    return { slug1 };
}

function isApiItem(item: LevelItemRow | (typeof FALLBACK_DATA)[0]): item is LevelItemRow {
    return 'slug' in item && typeof (item as LevelItemRow).slug === 'string';
}

export const MasterClasses: React.FC<any> = ({ route, _navigation }: any) => {
    const params = (route?.params ?? {}) as MasterClassesParams;
    const levelItemsParams = buildLevelItemsParams(params);

    const { data: levelItemsData, isLoading, isError } = useGetLevelItemsQuery(
        levelItemsParams!,
        { skip: !levelItemsParams }
    );

    const title =
        (levelItemsParams ? levelItemsData?.data?.page_title ?? levelItemsData?.data?.title : null) ??
        params?.title ??
        'MasterClasses';

    const rawItems = levelItemsParams
        ? levelItemsData?.data?.items ?? []
        : (params?.data ?? FALLBACK_DATA);

    const renderItem = ({ item }: { item: LevelItemRow | (typeof FALLBACK_DATA)[0] }) => {
        const isApi = isApiItem(item);
        const label = isApi ? item.name : item.label;
        const description = isApi ? (item.description ?? '') : item.description;
        const imageSource = isApi
            ? item.image
                ? { uri: `${LEVEL_ITEMS_BASE_Additional_Image_URL}${item.image}` }
                : PLACEHOLDER_IMAGE
            : item.image;
        return (
            <TouchableOpacity
                onPress={() =>
                    navigate(
                        isApi
                            ? (SCREEN_NAMES.LevelItemDetail as any)
                            : SCREEN_NAMES.MusicDetail,
                        isApi ? { item: item as LevelItemRow } : undefined
                    )
                }
                style={styles.cardRow}
            >
                <ImageWithShimmer
                    source={imageSource}
                    style={styles.thumb}
                    fallbackSource={PLACEHOLDER_IMAGE}
                    shimmerStyle={styles.thumbShimmer}
                    resizeMode="stretch"
                />
                <View style={styles.cardBody}>
                    <Text style={styles.cardLabel}>{label}</Text>
                    <Text style={styles.description} numberOfLines={3}>
                        {description}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    };

    if (levelItemsParams && isLoading) {
        return (
            <LinearGradient colors={[darkColors.background, darkColors.primaryColor]} style={styles.container}>
                <Header2 title={title} titleStyle={styles.headerTitle} />
                <ScrollView contentContainerStyle={styles.loadingWrap}>
                    <NewsCardShimmer count={6} />
                </ScrollView>
            </LinearGradient>
        );
    }

    if (levelItemsParams && isError) {
        return (
            <LinearGradient colors={[darkColors.background, darkColors.primaryColor]} style={styles.container}>
                <Header2 title={title} titleStyle={styles.headerTitle} />
                <View style={styles.loadingWrap}>
                    <Text style={styles.errorText}>Unable to load items.</Text>
                </View>
            </LinearGradient>
        );
    }

    return (
        <LinearGradient colors={[darkColors.background, darkColors.primaryColor]} style={styles.container}>
            <Header2 title={title} titleStyle={styles.headerTitle} />
            <FlatList
                data={rawItems}
                keyExtractor={(i) => String(i.id)}
                contentContainerStyle={styles.list}
                renderItem={renderItem}
                ItemSeparatorComponent={Sep}
            />
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: darkColors.background },
    list: { padding: metrics.width(16) },
    cardRow: { flexDirection: 'row', flex: 1 },
    thumb: {
        width: metrics.width(130),
        height: metrics.width(80),
        borderRadius: 12,
        backgroundColor: darkColors.TextWhite,
        overflow: 'hidden',
    },
    thumbShimmer: {
        borderRadius: 12,
    },
    cardLabel: { color: darkColors.TextWhite, fontSize: metrics.width(14) },
    sep: { height: 10 },
    headerTitle: { fontSize: metrics.width(20), color: darkColors.primaryColor },
    description: { color: darkColors.TextWhite, fontSize: metrics.width(12), flex: 1, flexWrap: 'wrap' },
    screenDescription: {
        color: darkColors.TextWhite,
        fontSize: metrics.width(14),
        paddingHorizontal: metrics.width(16),
        paddingTop: metrics.height(8),
    },
    cardBody: { flex: 1, marginLeft: metrics.width(23) },
    loadingWrap: { paddingHorizontal: metrics.width(16), paddingTop: metrics.height(8), paddingBottom: metrics.height(40) },
    errorText: { color: darkColors.TextWhite, fontSize: metrics.width(14) },
});

export default MasterClasses;
