import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import { metrics } from '@/utils/metrics';
import { darkColors } from '@/config/colors';
import { Header2, NewsCardShimmer } from '@/components';
import { Svgs } from '@/assets/icons/Svgs';
import { navigate } from '@/navigation/navigationService';
import { SCREEN_NAMES } from '@/config/constants';
import { useGetNotificationsQuery } from '@/api/notificationsApi';
import type { NotificationItem } from '@/api/notificationsApi';

const stripHtml = (html: string | null | undefined): string => {
    if (!html) return '';
    return html.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim();
};

const Item = ({ item }: { item: NotificationItem }) => {
    const description = stripHtml(item.description);
    return (
        <TouchableOpacity
            style={styles.item}
            activeOpacity={0.8}
            onPress={() =>
                navigate(SCREEN_NAMES.NotificationDetail as any, {
                    title: item.title,
                    body: description || item.description,
                })
            }
        >
            <View style={styles.itemContent}>
                <Text style={styles.itemTitle} numberOfLines={2}>
                    {item.title}
                </Text>
                {description ? (
                    <Text style={styles.itemSubtitle} numberOfLines={2}>
                        {description}
                    </Text>
                ) : null}
            </View>
            <Svgs.ArrowRight
                height={metrics.width(18)}
                width={metrics.width(18)}
                color={darkColors.TextWhite}
            />
        </TouchableOpacity>
    );
};

export const Notifications: React.FC = () => {
    const { data, isLoading, error } = useGetNotificationsQuery();
    const notifications = data?.data?.notifications ?? [];
    console.log('error', error);

    if (isLoading) {
        return (
            <View style={styles.container}>
                <Header2 title="Notifications" titleStyle={styles.headerTitle} />
                <ScrollView contentContainerStyle={styles.list}>
                    <NewsCardShimmer count={5} />
                </ScrollView>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.container}>
                <Header2 title="Notifications" titleStyle={styles.headerTitle} />
                <View style={styles.centerWrap}>
                    <Text style={styles.emptyText}>
                        Failed to load notifications. Please try again.
                    </Text>
                </View>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Header2 title="Notifications" titleStyle={styles.headerTitle} />
            <FlatList
                data={notifications}
                keyExtractor={(i) => String(i.id)}
                contentContainerStyle={[
                    styles.list,
                    notifications.length === 0 && styles.listEmpty,
                ]}
                renderItem={({ item }) => <Item item={item} />}
                ListEmptyComponent={
                    <View style={styles.centerWrap}>
                        <Text style={styles.emptyText}>No notifications.</Text>
                    </View>
                }
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: darkColors.background },
    headerTitle: { fontSize: metrics.width(20), color: darkColors.primaryColor },
    list: { padding: metrics.width(16), paddingBottom: metrics.height(24) },
    listEmpty: { flexGrow: 1 },
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
    itemTitle: {
        color: darkColors.TextWhite,
        fontSize: metrics.width(14),
        fontWeight: '600',
    },
    itemSubtitle: {
        color: darkColors.TextWhite,
        fontSize: metrics.width(12),
        marginTop: metrics.height(6),
        opacity: 0.9,
    },
    centerWrap: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: metrics.width(24),
    },
    emptyText: {
        color: darkColors.TextWhite,
        fontSize: metrics.width(14),
        textAlign: 'center',
    },
});

export default Notifications;
