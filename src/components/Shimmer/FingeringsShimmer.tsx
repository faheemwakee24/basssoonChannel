import React from 'react';
import { View, StyleSheet } from 'react-native';
import { metrics } from '@/utils/metrics';
import { darkColors } from '@/config/colors';
import { Shimmer } from './Shimmer';

interface FingeringsShimmerProps {
  count?: number;
}

export const FingeringsShimmer: React.FC<FingeringsShimmerProps> = ({ count = 4 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <View key={index} style={styles.row}>
          <Shimmer width="80%" height={metrics.height(20)} borderRadius={0} />
        </View>
      ))}
    </>
  );
};

const styles = StyleSheet.create({
  row: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: metrics.height(15),
    borderTopWidth: 1,
    borderTopColor: darkColors.borderColor20,
  },
});
