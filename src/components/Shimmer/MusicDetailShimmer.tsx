import React from 'react';
import { View, StyleSheet } from 'react-native';
import { metrics } from '@/utils/metrics';
import { darkColors } from '@/config/colors';
import { Shimmer } from './Shimmer';

interface MusicDetailShimmerProps {}

export const MusicDetailShimmer: React.FC<MusicDetailShimmerProps> = () => {
  return (
    <View style={styles.container}>
      {/* Main image shimmer */}
      <Shimmer
        width="100%"
        height={metrics.screenHeight * 0.4}
        borderRadius={0}
      />
      
      {/* Additional images shimmer */}
      <View style={styles.additionalImagesContainer}>
        <Shimmer
          width="100%"
          height={metrics.screenHeight * 0.5}
          borderRadius={0}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: darkColors.background,
  },
  additionalImagesContainer: {
    marginTop: metrics.width(10),
  },
});
