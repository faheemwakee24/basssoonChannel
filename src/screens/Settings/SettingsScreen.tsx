import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { metrics } from '@/utils/metrics';
import { darkColors } from '@/config/colors';
import { Svgs } from '@/assets/icons/Svgs';
import { navigate } from '@/navigation/navigationService';
import { SCREEN_NAMES } from '@/config/constants';
import { FingeringsShimmer } from '@/components';
import { useGetLevel1Query } from '@/api/levelsApi';

type SettingsItem = { id: string; title: string; onPress: () => void };

const FINGERINGS_ITEM: SettingsItem = {
    id: 'fingerings',
    title: 'Fingerings',
    onPress: () => navigate(SCREEN_NAMES.FingeringsScreen),
};

export const SettingsScreen: React.FC<any> = ({ _navigation }: any) => {
    const { data: level1Data, isLoading, isError } = useGetLevel1Query();

    const items = React.useMemo((): SettingsItem[] => {
        const fingerings: SettingsItem[] = [FINGERINGS_ITEM];
        if (!level1Data?.data?.levels?.length) return fingerings;
        const levelItems: SettingsItem[] = level1Data.data.levels.map((level) => ({
            id: `level-${level.id}`,
            title: level.name,
            onPress: () =>
                level.further_levels_exists === 1
                    ? navigate(SCREEN_NAMES.Level2 as any, { slug: level.slug })
                    : navigate(SCREEN_NAMES.MasterClasses, {
                          title: level.name,
                          slug1: level.slug,
                      }),
        }));
        return [...fingerings, ...levelItems];
    }, [level1Data]);

    const [query, setQuery] = React.useState('');

    const filtered = React.useMemo(() => {
        if (!query) return items;
        const q = query.trim().toLowerCase();
        return items.filter((it) => it.title.toLowerCase().includes(q));
    }, [items, query]);

    return (
        <View style={styles.container}>

            <View style={styles.searchWrap}>
                <View style={styles.searchPill}>
                    <TextInput
                        placeholder="Find"
                        placeholderTextColor={darkColors.searchPlaceholder}
                        style={styles.searchInput}
                        underlineColorAndroid="transparent"
                        value={query}
                        onChangeText={setQuery}
                    />
                    <TouchableOpacity style={styles.searchIcon} activeOpacity={0.7}>
                        <Svgs.Search />
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView contentContainerStyle={styles.list}>
                {isLoading && items.length <= 1 ? (
                    <View style={styles.loadingWrap}>
                        <FingeringsShimmer count={8} />
                    </View>
                ) : isError ? (
                    <Text style={styles.errorText}>Unable to load items. Pull to retry.</Text>
                ) : (
                    filtered.map((it) => (
                        <TouchableOpacity key={it.id} style={styles.listItem} onPress={it.onPress}>
                            <Text style={styles.listItemText}>{it.title}</Text>
                        </TouchableOpacity>
                    ))
                )}
            </ScrollView>

        </View>
    );
};
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: darkColors.background },
    searchWrap: { paddingHorizontal: metrics.width(16), paddingBottom: metrics.height(8) },
    searchPill: {
        height: metrics.height(46),
        borderRadius: 999,
        borderWidth: 1,
        borderColor: darkColors.searchBorder,
        backgroundColor: darkColors.searchBg,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: metrics.width(12),
    },
    searchInput: {
        flex: 1,
        height: '100%',
        color: darkColors.TextWhite,
        fontStyle: 'italic',
        paddingVertical: 0,
        paddingRight: metrics.width(8),
    },
    searchIcon: { paddingLeft: metrics.width(8), paddingVertical: metrics.height(6) },
    searchFallback: { color: darkColors.TextWhite, fontSize: metrics.width(18) },
    list: { paddingHorizontal: metrics.width(16), paddingBottom: metrics.height(120) },
    listItem: {
        paddingVertical: metrics.width(11),
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: darkColors.listDivider,
    },
    listItemText: { color: darkColors.TextWhite, textAlign: 'center', fontSize: metrics.width(16) },
    loadingWrap: { paddingTop: metrics.height(8) },
    errorText: { color: darkColors.TextWhite, textAlign: 'center', paddingVertical: metrics.height(24), fontSize: metrics.width(14) },
});
