import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { metrics } from '@/utils/metrics';
import { Shimmer } from './Shimmer';

const SECTION_COUNT = 4;
const CARDS_PER_SECTION = 5;

export const ExploreShimmer: React.FC = () => {
  return (
    <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <View style={styles.searchWrap}>
        <Shimmer
          width="100%"
          height={metrics.height(170)}
          borderRadius={12}
        />
      </View>
      {Array.from({ length: SECTION_COUNT }).map((_, sectionIndex) => (
        <View key={sectionIndex} style={styles.section}>
          <View style={styles.row2}>
            <Shimmer
              width={metrics.width(180)}
              height={metrics.width(16)}
              borderRadius={4}
            />
            <Shimmer
              width={metrics.width(16)}
              height={metrics.width(16)}
              borderRadius={4}
            />
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.row}
            style={styles.scrollContainer}
          >
            {Array.from({ length: CARDS_PER_SECTION }).map((_, cardIndex) => (
              <Shimmer
                key={cardIndex}
                width={metrics.width(140)}
                height={metrics.height(80)}
                borderRadius={8}
                style={styles.card}
              />
            ))}
          </ScrollView>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  content: {
    paddingBottom: metrics.height(80),
  },
  searchWrap: {
    marginBottom: metrics.height(12),
    marginHorizontal: metrics.width(12),
  },
  section: {
    marginBottom: metrics.height(18),
  },
  row2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: metrics.height(8),
    marginHorizontal: metrics.width(12),
  },
  row: {
    alignItems: 'center',
  },
  scrollContainer: {
    paddingHorizontal: metrics.width(12),
    paddingRight: metrics.width(30),
  },
  card: {
    marginRight: metrics.width(12),
  },
});
