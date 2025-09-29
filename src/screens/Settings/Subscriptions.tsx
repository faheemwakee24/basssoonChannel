import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { metrics } from '@/utils/metrics';
import { darkColors } from '@/config/colors';
import { Header2 } from '@/components';
import { Svgs } from '@/assets/icons/Svgs';
import { navigate } from '@/navigation/navigationService';
import { SCREEN_NAMES } from '@/config/constants';

const DATA = [
    {
        id: 'current',
        title: 'Platinum Yearly',
        subtitle: 'Current Plan',
        details: [
            { label: 'Start date:', value: 'Oct 2, 2024' },
            { label: 'Expire on:', value: 'Oct 2, 2025' },
            { label: 'Duration:', value: '1 Year' },
        ],
    },
    {
        id: 'other',
        title: 'We have other plans as well.',
        subtitle: 'View and subscribe for other plans',
        details: [{ label: 'Know more about other subscription plans', value: '' }],
    },
];

const Sep = () => <View style={{ height: metrics.height(12) }} />;

const Card = ({ item }: any) => (
    <TouchableOpacity style={styles.card} activeOpacity={0.8} onPress={() => navigate(SCREEN_NAMES.SettingsScreen)}>
        <View style={styles.cardLeft}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            {item.subtitle ? <Text style={styles.cardSubtitle}>{item.subtitle}</Text> : null}
            {item.details && item.details.length > 0 ? (
                <View style={styles.cardDetails}>
                    {item.details.map((d: any, idx: number) => (
                        <Text key={idx} style={styles.detailText}>
                            {d.label} {d.value}
                        </Text>
                    ))}
                </View>
            ) : null}
        </View>
        <Svgs.ArrowRight height={metrics.width(18)} width={metrics.width(18)} />
    </TouchableOpacity>
);

export const Subscriptions: React.FC<any> = ({ route, navigation: _navigation }: any) => {
    const title = route?.params?.title ?? 'My Subscriptions';

    return (
        <View style={styles.container}>

            <Header2 title={title} titleStyle={styles.headerTitle} />
            <FlatList
                data={DATA}
                keyExtractor={(i) => i.id}
                contentContainerStyle={styles.list}
                renderItem={({ item }) => <Card item={item} />}
                ItemSeparatorComponent={Sep}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: darkColors.background },
    safeArea: { flex: 1 },
    headerTitle: { fontSize: metrics.width(20), color: darkColors.primaryColor },
    list: { padding: metrics.width(16) },
    card: {
        backgroundColor: '#1a1a1a',
        borderRadius: 12,
        padding: metrics.width(16),
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
    },
    cardLeft: { flex: 1, paddingRight: metrics.width(8) },
    cardTitle: { color: darkColors.TextWhite, fontSize: metrics.width(16), fontWeight: '600' },
    cardSubtitle: { color: '#d1d1d1', marginTop: metrics.height(6), marginBottom: metrics.height(8) },
    cardDetails: { marginTop: metrics.height(6) },
    detailText: { color: '#d1d1d1', fontSize: metrics.width(12), marginTop: metrics.height(4) },
});

export default Subscriptions;
