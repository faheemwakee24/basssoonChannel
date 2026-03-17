import React from 'react';
import { View, StyleSheet } from 'react-native';
import { metrics } from '@/utils/metrics';
import { darkColors } from '@/config/colors';
import { Shimmer } from './Shimmer';

interface NewsDetailShimmerProps {}

export const NewsDetailShimmer: React.FC<NewsDetailShimmerProps> = () => {
  return (
    <View style={styles.container}>
      {/* Hero image shimmer */}
      <Shimmer
        width="100%"
        height={metrics.height(300)}
        borderRadius={0}
      />
      
      {/* Content section */}
      <View style={styles.contentWrap}>
        {/* Body text lines */}
        <Shimmer width="100%" height={metrics.height(16)} borderRadius={4} />
        <View style={styles.spacing} />
        <Shimmer width="100%" height={metrics.height(16)} borderRadius={4} />
        <View style={styles.spacing} />
        <Shimmer width="95%" height={metrics.height(16)} borderRadius={4} />
        <View style={styles.spacing} />
        <Shimmer width="100%" height={metrics.height(16)} borderRadius={4} />
        <View style={styles.spacing} />
        <Shimmer width="90%" height={metrics.height(16)} borderRadius={4} />
        <View style={styles.spacing} />
        <Shimmer width="100%" height={metrics.height(16)} borderRadius={4} />
        <View style={styles.spacing} />
        <Shimmer width="85%" height={metrics.height(16)} borderRadius={4} />
        <View style={styles.spacingLarge} />
        
        {/* Website link shimmer */}
        <View style={styles.linkRow}>
          <Shimmer width={metrics.width(18)} height={metrics.width(18)} borderRadius={4} />
          <View style={styles.linkContent}>
            <View style={styles.linkHeader}>
              <Shimmer width={metrics.width(40)} height={metrics.height(16)} borderRadius={4} />
              <Shimmer width={metrics.width(18)} height={metrics.width(18)} borderRadius={4} />
            </View>
            <View style={styles.spacingSmall} />
            <Shimmer width="80%" height={metrics.height(12)} borderRadius={4} />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: darkColors.background,
  },
  contentWrap: {
    paddingHorizontal: metrics.width(16),
    paddingTop: metrics.height(18),
  },
  spacing: {
    height: metrics.height(8),
  },
  spacingLarge: {
    height: metrics.height(18),
  },
  spacingSmall: {
    height: metrics.height(4),
  },
  linkRow: {
    flexDirection: 'row',
    gap: metrics.width(4),
    alignItems: 'flex-start',
  },
  linkContent: {
    flex: 1,
    marginLeft: metrics.width(4),
  },
  linkHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
});
