import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Image,
    Linking,
} from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { metrics } from '@/utils/metrics';
import { darkColors } from '@/config/colors';
import { Header2 } from '@/components';
import { Svgs } from '@/assets/icons/Svgs';
import { LEVEL_ITEMS_BASE_Additional_Image_URL, LEVEL_ITEMS_BASE_Image_URL } from '@/constants/api';
import type { LevelItemRow } from '@/api/levelsApi';

type LevelItemDetailRoute = {
    LevelItemDetail: { item: LevelItemRow };
};

const openUrl = async (url: string) => {
    try {
        const canOpen = await Linking.canOpenURL(url);
        if (canOpen) await Linking.openURL(url);
    } catch (e) {
        console.warn('Failed to open URL', e);
    }
};

export const LevelItemDetailScreen: React.FC = () => {
    const route = useRoute<RouteProp<LevelItemDetailRoute, 'LevelItemDetail'>>();
    const item = route.params?.item;

    if (!item) {
        return (
            <View style={styles.container}>
                <Header2 title="Detail" titleStyle={styles.headerTitle} />
                <View style={styles.emptyWrap}>
                    <Text style={styles.emptyText}>No item data.</Text>
                </View>
            </View>
        );
    }

    const imageSource = item.image
        ? { uri: `${LEVEL_ITEMS_BASE_Additional_Image_URL}${item.image}` }
        : require('@/assets/images/NO-Image.png');

    const rows: { id: string; label: string; value: string | null; url?: string; linkType?: 'uri' | 'tel' | 'mailto' }[] = [
        { id: 'address', label: 'Address', value: item.full_address },
        { id: 'phone', label: 'Phone', value: item.phone, url: item.phone ? `tel:${item.phone}` : undefined, linkType: 'tel' },
        { id: 'email', label: 'Email', value: item.email, url: item.email ? `mailto:${item.email}` : undefined, linkType: 'mailto' },
        { id: 'website', label: 'Website', value: item.uri, url: item.uri ?? undefined, linkType: 'uri' },
    ].filter((r) => r.value != null && r.value.trim() !== '');

    return (
        <View style={styles.container}>
            <Header2 title={item.name} titleStyle={styles.headerTitle} />
            <ScrollView contentContainerStyle={styles.scroll}>
                <View style={styles.heroWrap}>
                    <Image
                    source={imageSource}
                    style={styles.heroImage}
                    resizeMode="stretch"
                    defaultSource={require('@/assets/images/Music.png')}
                />
                    <Text style={styles.heroTitle}>{item.name}</Text>
                </View>

                <View style={styles.contentWrap}>
                    {item.description ? (
                        <Text style={styles.sectionLabel}>Description</Text>
                    ) : null}
                    {item.description ? (
                        <Text style={styles.bodyText}>{item.description}</Text>
                    ) : null}

                    {rows.length > 0 ? (
                        <>
                            <Text style={[styles.sectionLabel, styles.sectionLabelTop]}>Contact & location</Text>
                            {rows.map((row) => (
                                <TouchableOpacity
                                    key={row.id}
                                    style={styles.row}
                                    onPress={() => row.url && openUrl(row.url)}
                                    disabled={!row.url}
                                    activeOpacity={row.url ? 0.7 : 1}
                                >
                                    <View style={styles.rowIcon}>
                                        {row.id === 'phone' ? (
                                            <Svgs.Phone height={metrics.width(18)} width={metrics.width(18)} />
                                        ) : row.id === 'email' ? (
                                            <Svgs.Email height={metrics.width(18)} width={metrics.width(18)} />
                                        ) : (
                                            <Svgs.WebIcon height={metrics.width(18)} width={metrics.width(18)} />
                                        )}
                                    </View>
                                    <View style={styles.rowContent}>
                                        <Text style={styles.rowLabel}>{row.label}</Text>
                                        <Text style={styles.rowValue} numberOfLines={2}>
                                            {row.value}
                                        </Text>
                                    </View>
                                    {row.url ? (
                                        <Svgs.ArrowRight height={metrics.width(18)} width={metrics.width(18)} />
                                    ) : null}
                                </TouchableOpacity>
                            ))}
                        </>
                    ) : null}
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: darkColors.background },
    headerTitle: { fontSize: metrics.width(18), color: darkColors.TextWhite },
    scroll: { paddingBottom: metrics.height(40) },
    emptyWrap: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    emptyText: { color: darkColors.TextWhite, fontSize: metrics.width(16) },
    heroWrap: {
        height: metrics.height(220),
        position: 'relative',
        backgroundColor: darkColors.listDivider,
    },
    heroImage: {
        ...StyleSheet.absoluteFillObject,
        width: '100%',
        height: '100%',
    },
    heroTitle: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: metrics.width(16),
        color: darkColors.TextWhite,
        fontSize: metrics.width(18),
        fontWeight: '600',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    contentWrap: { paddingHorizontal: metrics.width(16), paddingTop: metrics.height(20) },
    sectionLabel: { color: darkColors.primaryColor, fontSize: metrics.width(14), fontWeight: '600', marginBottom: metrics.height(8) },
    sectionLabelTop: { marginTop: metrics.height(16) },
    bodyText: { color: darkColors.TextWhite, fontSize: metrics.width(14), lineHeight: 22 },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: metrics.height(12),
        borderBottomWidth: 1,
        borderBottomColor: darkColors.listDivider,
    },
    rowIcon: { marginRight: metrics.width(12) },
    rowContent: { flex: 1 },
    rowLabel: { color: darkColors.primaryColor, fontSize: metrics.width(12), marginBottom: 2 },
    rowValue: { color: darkColors.TextWhite, fontSize: metrics.width(14) },
});

export default LevelItemDetailScreen;
