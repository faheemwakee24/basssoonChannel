import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Header2 } from '@/components/Header2';
import { metrics } from '@/utils/metrics';
import { darkColors } from '@/config/colors';

export const MySubscriptionDetail: React.FC<any> = ({ route, navigation: _navigation }: any) => {
    const data = route?.params?.data ?? {
        planName: 'Platinum Yearly',
        duration: '1 Year',
        price: '€299.00',
        startDate: 'Oct 2, 2024',
        expireOn: 'Oct 2, 2025',
        daysLeft: 5,
        transactionId: 'sub_1Q5SKIH1FoCVxB2N69iIZ8eM',
        discountDetails: { name: '100%TBC', value: '100%' },
        discountAmount: '€299',
        amountPaid: '€0',
        status: 'Subscription Cancelled',
    };

    return (
        <View style={styles.container}>
            <Header2 title="My Subscription Details" titleStyle={styles.headerTitle} />

            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.topCard}>
                    <Text style={styles.topLabel}>Plan name: <Text style={styles.topValue}>{data.planName}</Text></Text>
                    <Text style={styles.topLabel}>Duration: <Text style={styles.topValue}>{data.duration}</Text></Text>
                    <Text style={styles.topLabel}>Price: <Text style={styles.topValue}>{data.price}</Text></Text>
                    <Text style={styles.topLabel}>Start date: <Text style={styles.topValue}>{data.startDate}</Text></Text>
                    <Text style={styles.topLabel}>Expire on: <Text style={styles.topValue}>{data.expireOn}</Text></Text>
                    <Text style={styles.topLabel}>Days left: <Text style={styles.topValue}>{data.daysLeft}</Text></Text>
                </View>

                <View style={styles.detailCard}>
                    <Text style={styles.detailLabel}>Expiry date</Text>
                    <Text style={styles.detailValue}>{data.expireOn}</Text>

                    <View style={styles.sep} />

                    <Text style={styles.detailLabel}>Transaction ID</Text>
                    <Text style={styles.detailValue}>{data.transactionId}</Text>

                    <View style={styles.sep} />

                    <Text style={styles.detailLabel}>Discount Details</Text>
                    <Text style={styles.detailValue}>Name: {data.discountDetails.name}, Value: {data.discountDetails.value}</Text>

                    <View style={styles.sep} />

                    <Text style={styles.detailLabel}>Discount Amount</Text>
                    <Text style={styles.detailValue}>{data.discountAmount}</Text>

                    <View style={styles.sep} />

                    <Text style={styles.detailLabel}>Amount paid</Text>
                    <Text style={styles.detailValue}>{data.amountPaid}</Text>

                    <View style={[styles.sep, { marginTop: metrics.height(8) }]} />

                    <Text style={styles.statusLabel}>Status <Text style={styles.statusValue}>{data.status}</Text></Text>
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
});

export default MySubscriptionDetail;
