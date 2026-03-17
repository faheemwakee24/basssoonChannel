import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    TextInput,
} from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { metrics } from '@/utils/metrics';
import { darkColors } from '@/config/colors';
import { Svgs } from '@/assets/icons/Svgs';
import { navigate } from '@/navigation/navigationService';
import { SCREEN_NAMES } from '@/config/constants';
import { FingeringsShimmer, Header2 } from '@/components';
import { useGetLevel3Query } from '@/api/levelsApi';
import type { Level3LevelItem } from '@/api/levelsApi';

type Level3Route = {
    Level3: { slug1: string; slug2: string };
};

type LevelListItem = { id: string; title: string; onPress: () => void };

function levelToItem(level: Level3LevelItem, slug1: string, slug2: string): LevelListItem {
    return {
        id: `level-${level.id}`,
        title: level.name,
        onPress: () =>
            navigate(SCREEN_NAMES.MasterClasses, {
                title: level.name,
                slug1,
                slug2,
                slug3: level.slug,
            }),
    };
}

export const Level3Screen: React.FC = () => {
    const route = useRoute<RouteProp<Level3Route, 'Level3'>>();
    const slug1 = route.params?.slug1 ?? '';
    const slug2 = route.params?.slug2 ?? '';

    const { data, isLoading, isError } = useGetLevel3Query(
        { slug1, slug2 },
        { skip: !slug1 || !slug2 }
    );

    const items = React.useMemo((): LevelListItem[] => {
        if (!data?.data?.levels?.length) return [];
        return data.data.levels.map((level) => levelToItem(level, slug1, slug2));
    }, [data, slug1, slug2]);

    const [query, setQuery] = React.useState('');

    const filtered = React.useMemo(() => {
        if (!query) return items;
        const q = query.trim().toLowerCase();
        return items.filter((it) => it.title.toLowerCase().includes(q));
    }, [items, query]);

    if (!slug1 || !slug2) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>Missing slug.</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Header2 title="" />
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
                {isLoading ? (
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

export default Level3Screen;
