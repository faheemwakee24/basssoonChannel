import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { metrics } from '@/utils/metrics';
import { darkColors } from '@/config/colors';
import { Shimmer } from './Shimmer';
import { NewsCardShimmer } from './NewsCardShimmer';

export const DashboardShimmer: React.FC = () => {
    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            {/* Hero Shimmer */}
            <View style={styles.heroShimmer}>
                <Shimmer width="100%" height={metrics.height(300)} borderRadius={0} />
            </View>

            {/* Section Heading Shimmer */}
            <View style={styles.headingWrap}>
                <Shimmer width={metrics.width(250)} height={metrics.width(20)} borderRadius={4} />
            </View>

            {/* Horizontal Scroll Shimmer */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.row}>
                {Array.from({ length: 4 }).map((_, index) => (
                    <View key={index} style={styles.sectionCardShimmer}>
                        <Shimmer width={metrics.width(120)} height={metrics.height(80)} borderRadius={8} />
                    </View>
                ))}
            </ScrollView>

            {/* Practice Card Shimmer */}
            <View style={styles.practiceCardShimmer}>
                <Shimmer width="100%" height={metrics.height(120)} borderRadius={12} />
            </View>

            {/* News List Shimmer Heading */}
            <View style={styles.headingWrap}>
                <Shimmer width={metrics.width(120)} height={metrics.width(20)} borderRadius={4} />
            </View>

            {/* News List Shimmer */}
            <View style={styles.listWrap}>
                <NewsCardShimmer count={3} />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: darkColors.background,
    },
    content: {
        paddingBottom: metrics.height(80),
        paddingTop: metrics.width(8),
    },
    heroShimmer: {
        marginBottom: metrics.width(25),
    },
    headingWrap: {
        marginLeft: metrics.width(12),
        marginTop: metrics.width(25),
        marginBottom: metrics.width(15),
    },
    row: {
        paddingLeft: metrics.width(12),
        paddingRight: metrics.width(12),
    },
    sectionCardShimmer: {
        marginRight: metrics.width(12),
    },
    practiceCardShimmer: {
        marginHorizontal: metrics.width(16),
        marginTop: metrics.width(25),
    },
    listWrap: {
        marginHorizontal: metrics.width(20),
    },
});
