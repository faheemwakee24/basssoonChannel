import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { metrics } from '@/utils/metrics';
import { darkColors } from '@/config/colors';
import { Header2 } from '@/components';
import { Svgs } from '@/assets/icons/Svgs';
import { navigate } from '@/navigation/navigationService';
import { SCREEN_NAMES } from '@/config/constants';
// navigation may be used in the future

const DATA = [
    { id: '1', title: 'Inform us!', subtitle: 'About 11 Months ago', onPress: () => navigate(SCREEN_NAMES.NotificationDetail) },
    { id: '2', title: 'Bookmarks: Life is easier now', subtitle: 'About 11 Months ago', onPress: () => navigate(SCREEN_NAMES.Subscriptions) },
];

const Item = ({ item }: any) => (
    <TouchableOpacity style={styles.item} activeOpacity={0.8} onPress={item?.onPress}>
        <View style={styles.itemContent}>
            <Text style={styles.itemTitle}>{item.title}</Text>
            <Text style={styles.itemSubtitle}>{item.subtitle}</Text>
        </View>
        <Svgs.ArrowRight height={metrics.width(18)} width={metrics.width(18)} />
    </TouchableOpacity>
);

export const Notifications: React.FC<any> = ({ route: _route, navigation: _navigation }: any) => {
    const title = 'Notifications';

    return (
        <View style={styles.container}>

            <Header2 title={title} titleStyle={styles.headerTitle} />
            <FlatList
                data={DATA}
                keyExtractor={(i) => i.id}
                contentContainerStyle={styles.list}
                renderItem={({ item }) => <Item item={item} />}
            />

        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: darkColors.background },
    safeArea: { flex: 1 },
    headerTitle: { fontSize: metrics.width(20), color: darkColors.primaryColor },
    list: { padding: metrics.width(16) },
    item: {
        backgroundColor: darkColors.green,
        padding: metrics.width(16),
        borderRadius: 4,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: metrics.height(16),
    },
    itemContent: { flex: 1, paddingRight: metrics.width(8) },
    itemTitle: { color: darkColors.TextWhite, fontSize: metrics.width(14), fontWeight: '600' },
    itemSubtitle: { color: darkColors.TextWhite, fontSize: metrics.width(12), marginTop: metrics.height(6) },
});

export default Notifications;
