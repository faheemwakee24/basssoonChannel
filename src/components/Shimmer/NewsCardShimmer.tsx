import React from 'react';
import { View, StyleSheet } from 'react-native';
import { metrics } from '@/utils/metrics';
import { Shimmer } from './Shimmer';

interface NewsCardShimmerProps {
  count?: number;
}

export const NewsCardShimmer: React.FC<NewsCardShimmerProps> = ({ count = 5 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <View key={index} style={styles.card}>
          <Shimmer
            width={metrics.width(85)}
            height={metrics.width(85)}
            borderRadius={8}
          />
          <View style={styles.cardBody}>
            <Shimmer width="90%" height={metrics.width(16)} borderRadius={4} />
            <View style={styles.spacing} />
            <Shimmer width="100%" height={metrics.width(12)} borderRadius={4} />
            <View style={styles.spacingSmall} />
            <Shimmer width="95%" height={metrics.width(12)} borderRadius={4} />
            <View style={styles.spacingSmall} />
            <Shimmer width="85%" height={metrics.width(12)} borderRadius={4} />
          </View>
        </View>
      ))}
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    marginBottom: metrics.height(12),
    alignItems: 'flex-start',
  },
  cardBody: {
    flex: 1,
    marginLeft: metrics.width(20),
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  spacing: {
    height: metrics.height(8),
  },
  spacingSmall: {
    height: metrics.height(4),
  },
});
