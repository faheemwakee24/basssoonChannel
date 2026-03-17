import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { metrics } from '@/utils/metrics';
import { darkColors } from '@/config/colors';
import { Header2, FingeringDetailShimmer, ImageWithShimmer } from '@/components';
import { navigate } from '@/navigation/navigationService';
import { SCREEN_NAMES } from '@/config/constants';
import { useGetFingeringDetailQuery } from '@/api/fingeringsApi';
import { FINGERINGS_BASE_Image_URL } from '@/constants/api';

const PLACEHOLDER_IMAGE = require('@/assets/images/Music.png');

const getImageSource = (imageName: string | null) => {
    if (!imageName) return PLACEHOLDER_IMAGE;
    return { uri: `${FINGERINGS_BASE_Image_URL}${imageName}` };
};

const Sep = () => <View style={styles.sep} />;

export const FingeringDetail: React.FC<any> = ({ route, _navigation }: any) => {
    const slug = route?.params?.slug;
    const fallbackTitle = route?.params?.title || 'Standard Bassoon Fingerings';
    const { data, isLoading, error } = useGetFingeringDetailQuery(slug || '', { skip: !slug });

    const categoryName = data?.data?.category?.name || fallbackTitle;
    const fingerings = data?.data?.fingerings || [];

    const renderItem = ({ item }: any) => {
        const imageSource = getImageSource(item.image);
        return (
            <TouchableOpacity
                onPress={() => navigate(SCREEN_NAMES.MusicDetail as any, { slug: item.slug })}
                style={styles.cardRow}
            >
                <ImageWithShimmer
                    source={imageSource}
                    style={styles.thumb}
                    fallbackSource={PLACEHOLDER_IMAGE}
                    shimmerStyle={styles.thumbShimmer}
                    resizeMode="contain"
                />
                <Text style={styles.cardLabel}>{item.title}</Text>
            </TouchableOpacity>
        );
    };

    if (isLoading) {
        return (
            <View style={styles.container}>
                <Header2 title={fallbackTitle} titleStyle={styles.headerTitle} />
                <FlatList
                    data={[]}
                    renderItem={() => null}
                    ListHeaderComponent={<FingeringDetailShimmer count={8} />}
                    contentContainerStyle={styles.list}
                    ItemSeparatorComponent={Sep}
                />
            </View>
        );
    }

    if (error || !data?.data?.fingerings) {
        return (
            <View style={styles.container}>
                <Header2 title={fallbackTitle} titleStyle={styles.headerTitle} />
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>Failed to load fingerings. Please try again.</Text>
                </View>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Header2 title={categoryName} titleStyle={styles.headerTitle} />
            <FlatList
                data={fingerings}
                keyExtractor={(item) => String(item.id)}
                contentContainerStyle={styles.list}
                renderItem={renderItem}
                ItemSeparatorComponent={Sep}
                ListEmptyComponent={
                    <View style={styles.errorContainer}>
                        <Text style={styles.errorText}>No fingerings available</Text>
                    </View>
                }
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: darkColors.background },
    list: { padding: metrics.width(16) },
    cardRow: { flexDirection: 'row', },
    thumb: {
        width: metrics.width(120),
        height: metrics.width(120),
        borderRadius: 12,
        backgroundColor: darkColors.TextWhite,
        overflow: 'hidden',
    },
    thumbShimmer: {
        borderRadius: 12,
    },
    cardLabel: { color: darkColors.TextWhite, marginLeft: metrics.width(23), fontSize: metrics.width(18) },
    sep: { height: 10 },
    back: { color: darkColors.TextWhite, fontSize: metrics.width(20), marginRight: metrics.width(8) },
    headerTitle: { fontSize: metrics.width(20), color: darkColors.primaryColor },
    errorContainer: {
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

export default FingeringDetail;
