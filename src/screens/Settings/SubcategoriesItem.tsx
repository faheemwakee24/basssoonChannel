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
import type { AudioCategory, AudioSubcategory, SubcategorySection } from '@/api/categoriesApi';

const FALLBACK_IMAGE = require('@/assets/images/Music.png');

const getSubcategorySource = (image: string | null) =>
    image ? `${CATEGORIES_BASE_Image_URL}${image}` : null;

const Sep = () => <View style={styles.sep} />;

type SubcategoriesItemRoute = {
    AudioSubcategoriesItem: { section: SubcategorySection, category: AudioCategory };
};

export const AudioSubcategoriesItem: React.FC = () => {
    const route = useRoute<RouteProp<SubcategoriesItemRoute, 'AudioSubcategoriesItem'>>();
    const section = route?.params?.section;
    const category = route?.params?.category;
    console.log('section', JSON.stringify(section));
    console.log('category', JSON.stringify(category));

    const title = section?.name ?? 'Subcategories';
    const subcategories = category ?? [];

    const renderItem = ({ item }: { item: AudioSubcategory }) => {
        const source = getSubcategorySource(item.image);
        return (
            <TouchableOpacity
                onPress={() =>
                    navigate(SCREEN_NAMES.MusicDetail as any, { slug: item.slug })
                }
                style={styles.cardRow}
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
                </View>
            </TouchableOpacity>
        );
    };

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
                data={subcategories}
                keyExtractor={(item) => String(item.id)}
                contentContainerStyle={styles.list}
                renderItem={renderItem}
                ItemSeparatorComponent={Sep}
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
    list: { padding: metrics.width(16) },
    cardRow: { flexDirection: 'row', flex: 1 },
    thumbWrap: {
        width: metrics.width(130),
        height: metrics.width(80),
        borderRadius: 12,
        overflow: 'hidden',
        backgroundColor: darkColors.TextWhite,
    },
    thumb: {
        width: '100%',
        height: '100%',
        borderRadius: 12,
    },
    thumbShimmer: { borderRadius: 12 },
    cardLabel: {
        color: darkColors.TextWhite,
        fontSize: metrics.width(14),
        flex: 1,
    },
    sep: { height: 10 },
    headerTitle: { fontSize: metrics.width(20), color: darkColors.primaryColor },
    cardBody: { flex: 1, marginLeft: metrics.width(23), justifyContent: 'center' },
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

export default AudioSubcategoriesItem;
