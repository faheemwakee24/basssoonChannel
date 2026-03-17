import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
} from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { metrics } from '@/utils/metrics';
import { darkColors } from '@/config/colors';
import { Header2, ImageWithShimmer } from '@/components';
import LinearGradient from 'react-native-linear-gradient';
import { navigate } from '@/navigation/navigationService';
import { SCREEN_NAMES } from '@/config/constants';
import { CATEGORIES_BASE_Image_URL } from '@/constants/api';
import type { AudioCategory, AudioSubcategory } from '@/api/categoriesApi';

const FALLBACK_IMAGE = require('@/assets/images/Music.png');

const getSubcategorySource = (image: string | null) =>
    image ? `${CATEGORIES_BASE_Image_URL}${image}` : null;

const chunk = <T,>(arr: T[], size: number): T[][] => {
    const out: T[][] = [];
    for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
    return out;
};

const NUM_COLUMNS = 2;
const ROW_GAP = 12;
const CARD_GAP = 12;

type AudioSubcattegoriesRoute = {
    AudioSubcattegories: { section: AudioCategory };
};

export const AudioSubcattegories: React.FC = () => {
    const route = useRoute<RouteProp<AudioSubcattegoriesRoute, 'AudioSubcattegories'>>();
    const section = route?.params?.section;

    const title = section?.name ?? 'Subcategories';
    const subcategories = section?.subcategories ?? [];

    const rows = React.useMemo(
        () => chunk(subcategories, NUM_COLUMNS),
        [subcategories]
    );

    const renderCard = (item: AudioSubcategory) => {
        const source = getSubcategorySource(item.image);
        return (
            <TouchableOpacity
                key={item.id}
                onPress={() =>
                    navigate(SCREEN_NAMES.CategoryItems as any, {
                        categorySlug: section!.slug,
                        subcategorySlug: item.slug,
                        type: 'Audio',
                        subcategoryName: item.name,
                    })
                }
                style={styles.card}
                activeOpacity={0.8}
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
            </TouchableOpacity>
        );
    };

    const renderRow = ({ item: row }: { item: AudioSubcategory[] }) => (
        <View style={styles.row}>
            {row.map(renderCard)}
            {row.length < NUM_COLUMNS ? (
                <View style={styles.cardSpacer} />
            ) : null}
        </View>
    );

    if (!section) {
        return (
            <LinearGradient
                colors={[darkColors.background, darkColors.primaryColor]}
                style={styles.container}
            >
                <Header2 title={title} titleStyle={styles.headerTitle} />
                <View style={styles.emptyWrap}>
                    <Text style={styles.emptyText}>
                        No section data. Go back and select a category.
                    </Text>
                </View>
            </LinearGradient>
        );
    }

    return (
        <LinearGradient
            colors={[darkColors.background, darkColors.primaryColor]}
            style={styles.container}
        >
            <Header2 title={title} titleStyle={styles.headerTitle} />
            <FlatList
                data={rows}
                keyExtractor={(_, i) => `row-${i}`}
                contentContainerStyle={styles.list}
                renderItem={renderRow}
                ListEmptyComponent={
                    <View style={styles.emptyWrap}>
                        <Text style={styles.emptyText}>No subcategories.</Text>
                    </View>
                }
            />
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: darkColors.background },
    list: { padding: metrics.width(16), paddingBottom: metrics.height(80) },
    row: {
        flexDirection: 'row',
        marginBottom: ROW_GAP,
        gap: CARD_GAP,
    },
    card: { flex: 1 },
    cardSpacer: { flex: 1 },
    thumbWrap: {
        width: '100%',
        aspectRatio: 130 / 80,
        borderRadius: 12,
        overflow: 'hidden',
        backgroundColor: darkColors.TextWhite,
    },
    thumb: { width: '100%', height: '100%', borderRadius: 12 },
    thumbShimmer: { borderRadius: 12 },
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

export default AudioSubcattegories;
