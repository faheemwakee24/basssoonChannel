import React from 'react';
import { View, StyleSheet, ScrollView, useWindowDimensions } from 'react-native';
import { metrics } from '@/utils/metrics';
import { darkColors } from '@/config/colors';
import { Shimmer } from './Shimmer';

export const CategoryItemDetailShimmer: React.FC = () => {
    const { width } = useWindowDimensions();
    const playerHeight = width * (16 / 9);

    return (
        <View style={styles.container}>
            <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
                {/* Player Shimmer */}
                <View style={[styles.playerShimmer, { height: playerHeight }]}>
                    <Shimmer width="100%" height="100%" borderRadius={0} />
                </View>

                {/* Content Shimmer */}
                <View style={styles.contentShimmer}>
                    {/* Artist Label Shimmer */}
                    <Shimmer width={metrics.width(150)} height={metrics.height(16)} borderRadius={4} />
                    <View style={styles.spacingLarge} />

                    {/* Description Lines Shimmer */}
                    <Shimmer width="100%" height={metrics.height(14)} borderRadius={4} />
                    <View style={styles.spacing} />
                    <Shimmer width="100%" height={metrics.height(14)} borderRadius={4} />
                    <View style={styles.spacing} />
                    <Shimmer width="95%" height={metrics.height(14)} borderRadius={4} />
                    <View style={styles.spacing} />
                    <Shimmer width="100%" height={metrics.height(14)} borderRadius={4} />
                    <View style={styles.spacing} />
                    <Shimmer width="90%" height={metrics.height(14)} borderRadius={4} />
                    <View style={styles.spacing} />
                    <Shimmer width="100%" height={metrics.height(14)} borderRadius={4} />
                    <View style={styles.spacing} />
                    <Shimmer width="85%" height={metrics.height(14)} borderRadius={4} />
                </View>
            </ScrollView>

            {/* Footer Shimmer */}
            <View style={styles.footerShimmer}>
                <Shimmer width={metrics.width(200)} height={metrics.height(50)} borderRadius={12} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: darkColors.background,
    },
    scroll: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: metrics.height(100),
    },
    playerShimmer: {
        width: '100%',
        backgroundColor: '#1a1a1a',
    },
    contentShimmer: {
        paddingHorizontal: metrics.width(16),
        paddingTop: metrics.height(20),
    },
    spacing: {
        height: metrics.height(10),
    },
    spacingLarge: {
        height: metrics.height(20),
    },
    footerShimmer: {
        position: 'absolute',
        bottom: metrics.height(20),
        left: 0,
        right: 0,
        alignItems: 'center',
        paddingHorizontal: metrics.width(16),
    },
});
