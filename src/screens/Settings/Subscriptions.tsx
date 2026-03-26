import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { metrics } from '@/utils/metrics';
import { darkColors } from '@/config/colors';
import { Header2 } from '@/components';
import { Svgs } from '@/assets/icons/Svgs';
import { navigate } from '@/navigation/navigationService';
import { SCREEN_NAMES } from '@/config/constants';
import { useGetMySubscriptionQuery } from '@/api/subscriptionApi';

export const Subscriptions: React.FC<any> = ({ route }) => {
    const title = route?.params?.title ?? 'My Subscriptions';
    const { data, isLoading, isError } = useGetMySubscriptionQuery();

    const subscription = data?.data?.subscription;
    const hasActivePlan = !!subscription;

    if (isLoading) {
        return (
            <View style={styles.container}>
                <Header2 title={title} titleStyle={styles.headerTitle} />
                <View style={styles.center}>
                    <ActivityIndicator size="large" color={darkColors.primaryColor} />
                </View>
            </View>
        );
    }

    if (isError) {
        return (
            <View style={styles.container}>
                <Header2 title={title} titleStyle={styles.headerTitle} />
                <View style={styles.center}>
                    <Text style={styles.errorText}>Failed to load subscription data.</Text>
                </View>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Header2 title={title} titleStyle={styles.headerTitle} />
            
            <ScrollView contentContainerStyle={styles.scroll}>
                {/* Current Plan Card */}
                <View style={styles.card}>
                    <Text style={styles.cardLabel}>Your Current Plan :</Text>
                    <Text style={styles.planName}>
                        {hasActivePlan ? subscription.plan_name : 'No Active Plan'}
                    </Text>
                    
                    {hasActivePlan && (
                        <TouchableOpacity 
                            style={styles.linkRow} 
                            onPress={() => navigate(SCREEN_NAMES.MySubscriptionDetail as any, { slug: subscription.slug })}
                        >
                            <Text style={styles.linkText}>View Details</Text>
                            <Svgs.ArrowRight height={metrics.width(14)} width={metrics.width(14)} fill={darkColors.primaryColor} />
                        </TouchableOpacity>
                    )}
                </View>

                {/* Other Plans Card */}
                <View style={styles.card}>
                    <Text style={styles.otherPlansTitle}>We have other plans as well.</Text>
                    <Text style={styles.otherPlansSubtitle}>View and subscribe for other plans</Text>
                    
                    <View style={styles.infoRow}>
                        <Text style={styles.infoText}>Know more about other subscription plans</Text>
                    </View>
                    
                    <TouchableOpacity 
                        style={styles.linkRow} 
                        onPress={() => navigate(SCREEN_NAMES.SubscriptionPlanDetail as any, { initialIndex: 0 })}
                    >
                        <Text style={styles.linkText}>Browse Plans</Text>
                        <Svgs.ArrowRight height={metrics.width(14)} width={metrics.width(14)} fill={darkColors.primaryColor} />
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        backgroundColor: darkColors.background 
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: { 
        fontSize: metrics.width(32), 
        color: darkColors.primaryColor,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: metrics.height(10),
    },
    scroll: { 
        padding: metrics.width(20),
        gap: metrics.height(16),
    },
    card: {
        backgroundColor: '#1a1a1a',
        borderRadius: 16,
        padding: metrics.width(24),
    },
    cardLabel: { 
        color: darkColors.TextWhite, 
        fontSize: metrics.width(22), 
        fontWeight: '500',
        marginBottom: metrics.height(12),
    },
    planName: { 
        color: darkColors.primaryColor, 
        fontSize: metrics.width(42), 
        fontWeight: '700',
        marginBottom: metrics.height(16),
    },
    otherPlansTitle: {
        color: darkColors.TextWhite,
        fontSize: metrics.width(18),
        fontWeight: 'bold',
        marginBottom: metrics.height(4),
    },
    otherPlansSubtitle: {
        color: darkColors.TextWhite,
        fontSize: metrics.width(18),
        fontWeight: '400',
        marginBottom: metrics.height(20),
    },
    infoRow: {
        marginBottom: metrics.height(20),
    },
    infoText: {
        color: '#9d9d9d',
        fontSize: metrics.width(16),
    },
    linkRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: metrics.width(8),
    },
    linkText: {
        color: darkColors.primaryColor,
        fontSize: metrics.width(18),
        fontWeight: '500',
    },
    errorText: {
        color: darkColors.TextWhite,
        fontSize: metrics.width(16),
        textAlign: 'center',
    },
});

export default Subscriptions;
