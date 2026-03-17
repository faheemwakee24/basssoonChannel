import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { Header2 } from '@/components/Header2';
import { metrics } from '@/utils/metrics';
import { darkColors } from '@/config/colors';
import { useGetMySubscriptionQuery } from '@/api/subscriptionApi';
import { useAppDispatch } from '@/store';
import { showSnackbar } from '@/store';

export const MySubscriptionDetail: React.FC<any> = ({ route, navigation: _navigation }: any) => {
    const dispatch = useAppDispatch();
    const { data, isLoading, error } = useGetMySubscriptionQuery();

    // Format date helper
    const formatDate = (dateString: string) => {
        if (!dateString) return 'N/A';
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'short', 
                day: 'numeric' 
            });
        } catch {
            return dateString;
        }
    };

    // Calculate days left
    const calculateDaysLeft = (endDate: string) => {
        if (!endDate) return 0;
        try {
            const end = new Date(endDate);
            const now = new Date();
            const diffTime = end.getTime() - now.getTime();
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            return diffDays > 0 ? diffDays : 0;
        } catch {
            return 0;
        }
    };

    // Format status
    const formatStatus = (status: number) => {
        switch (status) {
            case 1:
                return 'Active';
            case 0:
                return 'Inactive';
            case 2:
                return 'Cancelled';
            default:
                return 'Unknown';
        }
    };

    // Get duration label
    const getDurationLabel = (duration: string) => {
        const durationMap: Record<string, string> = {
            'monthly': '1 Month',
            'yearly': '1 Year',
            'quarterly': '3 Months',
            'semiannual': '6 Months',
        };
        return durationMap[duration] || duration;
    };

    // Process subscription data
    const subscriptionData = useMemo(() => {
        if (!data?.data?.subscription) {
            return null;
        }

        const subscription = data.data.subscription;
        const discount = data.data.discount;

        return {
            planName: subscription.plan_name || 'N/A',
            duration: getDurationLabel(subscription.plan_duration),
            price: `€${parseFloat(subscription.plan_price || '0').toFixed(2)}`,
            startDate: formatDate(subscription.start_date),
            expireOn: formatDate(subscription.end_date),
            daysLeft: calculateDaysLeft(subscription.end_date),
            transactionId: subscription.transaction_id || 'N/A',
            discountDetails: discount ? {
                name: discount.name || 'N/A',
                value: discount.value || 'N/A',
            } : null,
            discountAmount: discount ? `€${parseFloat(discount.amount || '0').toFixed(2)}` : '€0',
            amountPaid: `€${parseFloat(subscription.paid_amount || '0').toFixed(2)}`,
            status: formatStatus(subscription.status),
        };
    }, [data]);

    // Show error toast
    React.useEffect(() => {
        if (error) {
            dispatch(
                showSnackbar({
                    message: 'Failed to load subscription details. Please try again.',
                    type: 'error',
                })
            );
        }
    }, [error, dispatch]);

    if (isLoading) {
        return (
            <View style={styles.container}>
                <Header2 title="My Subscription Details" titleStyle={styles.headerTitle} />
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color={darkColors.primaryColor} />
                </View>
            </View>
        );
    }

    if (!subscriptionData) {
        return (
            <View style={styles.container}>
                <Header2 title="My Subscription Details" titleStyle={styles.headerTitle} />
                <View style={styles.loadingContainer}>
                    <Text style={styles.noDataText}>No subscription found</Text>
                </View>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Header2 title="My Subscription Details" titleStyle={styles.headerTitle} />

            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.topCard}>
                    <Text style={styles.topLabel}>Plan name: <Text style={styles.topValue}>{subscriptionData.planName}</Text></Text>
                    <Text style={styles.topLabel}>Duration: <Text style={styles.topValue}>{subscriptionData.duration}</Text></Text>
                    <Text style={styles.topLabel}>Price: <Text style={styles.topValue}>{subscriptionData.price}</Text></Text>
                    <Text style={styles.topLabel}>Start date: <Text style={styles.topValue}>{subscriptionData.startDate}</Text></Text>
                    <Text style={styles.topLabel}>Expire on: <Text style={styles.topValue}>{subscriptionData.expireOn}</Text></Text>
                    <Text style={styles.topLabel}>Days left: <Text style={styles.topValue}>{subscriptionData.daysLeft}</Text></Text>
                </View>

                <View style={styles.detailCard}>
                    <Text style={styles.detailLabel}>Expiry date</Text>
                    <Text style={styles.detailValue}>{subscriptionData.expireOn}</Text>

                    <View style={styles.sep} />

                    <Text style={styles.detailLabel}>Transaction ID</Text>
                    <Text style={styles.detailValue}>{subscriptionData.transactionId}</Text>

                    <View style={styles.sep} />

                    {subscriptionData.discountDetails && (
                        <>
                            <Text style={styles.detailLabel}>Discount Details</Text>
                            <Text style={styles.detailValue}>Name: {subscriptionData.discountDetails.name}, Value: {subscriptionData.discountDetails.value}</Text>

                            <View style={styles.sep} />
                        </>
                    )}

                    <Text style={styles.detailLabel}>Discount Amount</Text>
                    <Text style={styles.detailValue}>{subscriptionData.discountAmount}</Text>

                    <View style={styles.sep} />

                    <Text style={styles.detailLabel}>Amount paid</Text>
                    <Text style={styles.detailValue}>{subscriptionData.amountPaid}</Text>

                    <View style={[styles.sep, { marginTop: metrics.height(8) }]} />

                    <Text style={styles.statusLabel}>Status <Text style={styles.statusValue}>{subscriptionData.status}</Text></Text>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: darkColors.background },
    headerTitle: { fontSize: metrics.width(20), color: darkColors.primaryColor },
    content: { padding: metrics.width(16), paddingBottom: metrics.height(40) },
    topCard: {
        backgroundColor: '#1a1a1a',
        borderRadius: 12,
        padding: metrics.width(16),
        marginBottom: metrics.height(16),
    },
    topLabel: { color: '#d1d1d1', fontSize: metrics.width(14), marginBottom: metrics.height(6) },
    topValue: { color: darkColors.TextWhite, fontWeight: '600' },
    detailCard: {
        backgroundColor: '#1a1a1a',
        borderRadius: 12,
        padding: metrics.width(16),
    },
    detailLabel: { color: '#9d9d9d', fontSize: metrics.width(13), marginTop: metrics.height(8) },
    detailValue: { color: '#d1d1d1', fontSize: metrics.width(14), marginTop: metrics.height(4) },
    sep: { height: 1, backgroundColor: '#0f0f0f', marginVertical: metrics.height(12) },
    statusLabel: { color: '#d1d1d1', fontSize: metrics.width(14), fontWeight: '600' },
    statusValue: { color: darkColors.primaryColor, fontWeight: '700' },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    noDataText: {
        color: darkColors.TextWhite,
        fontSize: metrics.width(16),
    },
});

export default MySubscriptionDetail;
