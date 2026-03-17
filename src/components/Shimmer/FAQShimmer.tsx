import React from 'react';
import { View, StyleSheet } from 'react-native';
import { metrics } from '@/utils/metrics';
import { Shimmer } from './Shimmer';

interface FAQShimmerProps {
  count?: number;
}

export const FAQShimmer: React.FC<FAQShimmerProps> = ({ count = 10 }) => {
  return (
    <View style={styles.container}>
      {Array.from({ length: count }).map((_, index) => (
        <View key={index} style={styles.item}>
          <View style={styles.questionBlock}>
            <View style={styles.questionContent}>
              <Shimmer width="90%" height={metrics.width(16)} borderRadius={4} />
            </View>
            <Shimmer width={metrics.width(14)} height={metrics.width(14)} borderRadius={2} />
          </View>
          {index === 0 && (
            <View style={styles.answerBlock}>
              <Shimmer width="100%" height={metrics.width(14)} borderRadius={4} />
              <View style={styles.spacing} />
              <Shimmer width="95%" height={metrics.width(14)} borderRadius={4} />
              <View style={styles.spacing} />
              <Shimmer width="80%" height={metrics.width(14)} borderRadius={4} />
            </View>
          )}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: metrics.width(16),
    paddingTop: metrics.height(16),
  },
  item: {
    marginBottom: metrics.height(12),
  },
  questionBlock: {
    backgroundColor: '#1a1a1a',
    paddingVertical: metrics.height(14),
    paddingHorizontal: metrics.width(16),
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  questionContent: {
    flex: 1,
    paddingRight: metrics.width(12),
  },
  answerBlock: {
    backgroundColor: '#2a2a2a',
    paddingVertical: metrics.height(14),
    paddingHorizontal: metrics.width(16),
    marginTop: 2,
    borderRadius: 4,
  },
  spacing: {
    height: metrics.height(8),
  },
});
