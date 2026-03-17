import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { metrics } from '@/utils/metrics';
import { darkColors } from '@/config/colors';
import { Header2, MusicDetailShimmer, ImageWithShimmer } from '@/components';
import { useGetSingleFingeringDetailQuery } from '@/api/fingeringsApi';
import { FINGERINGS_BASE_Additional_Image_URL, FINGERINGS_BASE_Image_URL } from '@/constants/api';

const PLACEHOLDER_MAIN = require('@/assets/images/Music.png');
const PLACEHOLDER_ADDITIONAL = require('@/assets/images/MusicDetail.png');

const getMainImageSource = (imageName: string | null) => {
    if (!imageName) return PLACEHOLDER_MAIN;
    return { uri: `${FINGERINGS_BASE_Image_URL}${imageName}` };
};

const getAdditionalImageSource = (imageName: string | null) => {
    if (!imageName) return PLACEHOLDER_ADDITIONAL;
    return { uri: `${FINGERINGS_BASE_Additional_Image_URL}${imageName}` };
};
export const MusicDetail: React.FC<any> = ({ route, _navigation }: any) => {
    const slug = route?.params?.slug;
    const { data, isLoading, error } = useGetSingleFingeringDetailQuery(slug || '', { skip: !slug });

    if (isLoading) {
        return (
            <View style={styles.container}>
                <Header2 />
                <ScrollView contentContainerStyle={styles.scroll}>
                    <MusicDetailShimmer />
                </ScrollView>
            </View>
        );
    }

    if (error || !data?.data?.fingering) {
        return (
            <View style={styles.container}>
                <Header2 />
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>Failed to load fingering details. Please try again.</Text>
                </View>
            </View>
        );
    }

    const fingering = data.data.fingering;
    const additionalImages = data.data.additional_images || [];
    const mainImageSource = getMainImageSource(fingering.image);

    return (
        <View style={styles.container}>
            <Header2 title={fingering.title} titleStyle={styles.headerTitle} />
            <ScrollView contentContainerStyle={styles.scroll}>
                {/* Main Image */}
                <View style={styles.imageWrapper}>
                    <ImageWithShimmer
                        source={mainImageSource}
                        style={styles.mainImage}
                        fallbackSource={PLACEHOLDER_MAIN}
                        shimmerStyle={styles.mainImageShimmer}
                        resizeMode="cover"
                    />
                    <Text style={styles.text}>{fingering.title}</Text>
                </View>

                {/* Additional Images */}
                {additionalImages.length > 0 ? (
                    <View style={styles.additionalImagesContainer}>
                        {additionalImages.map((additionalImage: any) => (
                            <ImageWithShimmer
                                key={additionalImage.id}
                                source={getAdditionalImageSource(additionalImage?.image || '')}
                                style={styles.image2}
                                fallbackSource={PLACEHOLDER_ADDITIONAL}
                                shimmerStyle={styles.image2Shimmer}
                                resizeMode="contain"
                            />
                        ))}
                    </View>
                ) : (
                    <ImageWithShimmer
                        source={PLACEHOLDER_ADDITIONAL}
                        style={styles.image2}
                        shimmerStyle={styles.image2Shimmer}
                        resizeMode="contain"
                    />
                )}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: darkColors.background },
    scroll: { paddingBottom: metrics.height(40) },
    imageWrapper: {
        width: '100%',
        height: metrics.screenHeight * 0.4,
        justifyContent: 'flex-end',
        overflow: 'hidden',
    },
    mainImage: {
        ...StyleSheet.absoluteFillObject,
    },
    mainImageShimmer: {
        borderRadius: 0,
    },
    text: {
        fontSize: metrics.width(18),
        color: darkColors.black,
        margin: metrics.width(14),
    },
    image2: {
        width: '100%',
        height: metrics.screenHeight * 0.5,
        marginTop: metrics.width(10),
    },
    image2Shimmer: {
        borderRadius: 0,
    },
    additionalImagesContainer: {
        marginTop: metrics.width(10),
    },
    headerTitle: {
        fontSize: metrics.width(20),
        color: darkColors.primaryColor,
    },
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

export default MusicDetail;
