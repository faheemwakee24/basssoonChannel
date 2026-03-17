import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Shimmer } from './Shimmer';
import { metrics } from '@/utils/metrics';
import { darkColors } from '@/config/colors';

export const MyProfileShimmer: React.FC = () => {
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                {/* Profile Row Shimmer */}
                <View style={styles.profileRow}>
                    {/* Avatar Shimmer */}
                    <View style={styles.avatarWrap}>
                        <Shimmer
                            width={metrics.width(150)}
                            height={metrics.width(150)}
                            borderRadius={metrics.width(5)}
                        />
                    </View>

                    {/* Name and Email Shimmer */}
                    <View style={styles.infoWrap}>
                        <Shimmer
                            width="80%"
                            height={metrics.height(22)}
                            borderRadius={4}
                            style={styles.nameShimmer}
                        />
                        <Shimmer
                            width="60%"
                            height={metrics.height(18)}
                            borderRadius={4}
                            style={styles.emailShimmer}
                        />
                    </View>
                </View>

                {/* Grid Tiles Shimmer */}
                <View style={styles.grid}>
                    {Array.from({ length: 6 }).map((_, index) => (
                        <View key={index} style={styles.tileShimmer}>
                            <Shimmer
                                width={metrics.width(50)}
                                height={metrics.width(50)}
                                borderRadius={8}
                                style={styles.iconShimmer}
                            />
                            <Shimmer
                                width="70%"
                                height={metrics.height(14)}
                                borderRadius={4}
                                style={styles.labelShimmer}
                            />
                        </View>
                    ))}
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
    content: {
        padding: metrics.width(16),
    },
    profileRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: metrics.height(24),
    },
    avatarWrap: {
        width: metrics.width(150),
        height: metrics.width(150),
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        borderRadius: metrics.width(5),
    },
    infoWrap: {
        flex: 1,
        paddingLeft: metrics.width(16),
    },
    nameShimmer: {
        marginBottom: metrics.height(8),
    },
    emailShimmer: {
        marginTop: metrics.height(4),
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: metrics.width(8),
    },
    tileShimmer: {
        aspectRatio: 1,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: darkColors.borderColor20,
        marginBottom: metrics.height(12),
        alignItems: 'center',
        justifyContent: 'center',
        padding: metrics.width(8),
        backgroundColor: 'transparent',
        width: '48%',
    },
    iconShimmer: {
        marginBottom: metrics.height(8),
    },
    labelShimmer: {
        marginTop: metrics.height(4),
    },
});
