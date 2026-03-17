import React from 'react';
import { View, StyleSheet } from 'react-native';
import { metrics } from '@/utils/metrics';
import { darkColors } from '@/config/colors';
import { Shimmer } from './Shimmer';

interface SubscriptionPlanShimmerProps {}

export const SubscriptionPlanShimmer: React.FC<SubscriptionPlanShimmerProps> = () => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.card}>
        {/* Circular Graphic */}
        <View style={styles.graphicContainer}>
          <Shimmer
            width={metrics.width(150)}
            height={metrics.width(150)}
            borderRadius={metrics.width(75)}
          />
        </View>

        {/* Title */}
        <Shimmer width="60%" height={metrics.height(28)} borderRadius={4} style={styles.titleShimmer} />

        {/* Price */}
        <Shimmer width="40%" height={metrics.height(32)} borderRadius={4} style={styles.priceShimmer} />

        {/* Duration */}
        <Shimmer width="50%" height={metrics.height(16)} borderRadius={4} style={styles.durationShimmer} />

        {/* Subscribe Button */}
        <Shimmer width="100%" height={metrics.height(50)} borderRadius={12} style={styles.buttonShimmer} />

        {/* Content */}
        <View style={styles.contentSection}>
          <Shimmer width="100%" height={metrics.height(16)} borderRadius={4} style={styles.textShimmer} />
          <Shimmer width="95%" height={metrics.height(16)} borderRadius={4} style={styles.textShimmer} />
          <Shimmer width="90%" height={metrics.height(16)} borderRadius={4} style={styles.textShimmer} />
          <View style={styles.spacing} />
          <Shimmer width="80%" height={metrics.height(16)} borderRadius={4} style={styles.textShimmer} />
          <Shimmer width="100%" height={metrics.height(16)} borderRadius={4} style={styles.textShimmer} />
          <Shimmer width="85%" height={metrics.height(16)} borderRadius={4} style={styles.textShimmer} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: metrics.width(20),
    minHeight: metrics.screenHeight * 0.8,
  },
  card: {
    backgroundColor: '#1a1a1a',
    borderRadius: 20,
    padding: metrics.width(24),
    width: '100%',
    maxWidth: metrics.width(400),
    alignItems: 'center',
  },
  graphicContainer: {
    marginBottom: metrics.height(20),
    alignItems: 'center',
  },
  titleShimmer: {
    marginBottom: metrics.height(8),
  },
  priceShimmer: {
    marginBottom: metrics.height(4),
  },
  durationShimmer: {
    marginBottom: metrics.height(20),
  },
  buttonShimmer: {
    marginBottom: metrics.height(24),
  },
  contentSection: {
    width: '100%',
  },
  textShimmer: {
    marginBottom: metrics.height(8),
  },
  spacing: {
    height: metrics.height(12),
  },
});
