import React from 'react';
import { View, StyleSheet } from 'react-native';
import { metrics } from '@/utils/metrics';
import { darkColors } from '@/config/colors';
import { Shimmer } from './Shimmer';

interface FingeringDetailShimmerProps {
  count?: number;
}

export const FingeringDetailShimmer: React.FC<FingeringDetailShimmerProps> = ({ count = 8 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <View key={index} style={styles.cardRow}>
          <Shimmer
            width={metrics.width(120)}
            height={metrics.width(120)}
            borderRadius={12}
          />
          <View style={styles.labelContainer}>
            <Shimmer width="60%" height={metrics.height(20)} borderRadius={4} />
          </View>
        </View>
      ))}
    </>
  );
};

const styles = StyleSheet.create({
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: metrics.height(10),
  },
  labelContainer: {
    marginLeft: metrics.width(23),
    justifyContent: 'center',
  },
});
