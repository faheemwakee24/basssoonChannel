import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { metrics } from '@/utils/metrics';
import { darkColors } from '@/config/colors';
import { Svgs } from '@/assets/icons/Svgs';
import { navigate } from '@/navigation/navigationService';
import { SCREEN_NAMES } from '@/config/constants';

export const SettingsScreen: React.FC<any> = ({ _navigation }: any) => {
    const DATA = [
        { id: '1', label: 'taking place B Flat 1', description: 'The 38th Schleswig-Holstein Music Festival, taking place from July 1 to August 27, 20 ... The 38th Schleswig-Holstein Music Festival, taking place from July 1 to August 27, 20 ...', image: require('@/assets/images/Music.png') },
        { id: '2', label: 'taking place B Flat 1', description: 'The 38th Schleswig-Holstein Music Festival, taking place from July 1 to August 27, 20 ... The 38th Schleswig-Holstein Music Festival, taking place from July 1 to August 27, 20 ...', image: require('@/assets/images/Music.png') },
        { id: '3', label: 'taking place B Flat 1', description: 'The 38th Schleswig-Holstein Music Festival, taking place from July 1 to August 27, 20 ... The 38th Schleswig-Holstein Music Festival, taking place from July 1 to August 27, 20 ...', image: require('@/assets/images/Music.png') },
        { id: '4', label: 'taking place B Flat 1', description: 'The 38th Schleswig-Holstein Music Festival, taking place from July 1 to August 27, 20 ... The 38th Schleswig-Holstein Music Festival, taking place from July 1 to August 27, 20 ...', image: require('@/assets/images/Music.png') },
        { id: '5', label: 'taking place B Flat 1', description: 'The 38th Schleswig-Holstein Music Festival, taking place from July 1 to August 27, 20 ... The 38th Schleswig-Holstein Music Festival, taking place from July 1 to August 27, 20 ...', image: require('@/assets/images/Music.png') },
        { id: '6', label: 'taking place B Flat 1', description: 'The 38th Schleswig-Holstein Music Festival, taking place from July 1 to August 27, 20 ... The 38th Schleswig-Holstein Music Festival, taking place from July 1 to August 27, 20 ...', image: require('@/assets/images/Music.png') },
        { id: '7', label: 'taking place B Flat 1', description: 'The 38th Schleswig-Holstein Music Festival, taking place from July 1 to August 27, 20 ... The 38th Schleswig-Holstein Music Festival, taking place from July 1 to August 27, 20 ...', image: require('@/assets/images/Music.png') },
        { id: '8', label: 'taking place B Flat 1', description: 'The 38th Schleswig-Holstein Music Festival, taking place from July 1 to August 27, 20 ... The 38th Schleswig-Holstein Music Festival, taking place from July 1 to August 27, 20 ...', image: require('@/assets/images/Music.png') },
    ];
    const DATA2 = [
        { id: '1', label: 'taking place B Flat 1', image: require('@/assets/images/Music.png') },
        { id: '2', label: 'taking place B Flat 1', image: require('@/assets/images/Music.png') },
        { id: '3', label: 'taking place B Flat 1', image: require('@/assets/images/Music.png') },
        { id: '4', label: 'taking place B Flat 1', image: require('@/assets/images/Music.png') },
        { id: '5', label: 'taking place B Flat 1', image: require('@/assets/images/Music.png') },
        { id: '6', label: 'taking place B Flat 1', image: require('@/assets/images/Music.png') },

    ];
    const items = React.useMemo(() => [
        {
            id: 'fingerings',
            title: 'Fingerings',
            onPress: () => navigate(SCREEN_NAMES.FingeringsScreen),
        },
        {
            id: 'masterclasses',
            title: 'Masterclasses',
            onPress: () => navigate(SCREEN_NAMES.MasterClasses),
        },
        { id: 'competition', title: 'Competition', onPress: () => navigate(SCREEN_NAMES.MasterClasses, { data: DATA2, title: 'Basson Basic Platinium' }) },
        { id: 'places_to_study', title: 'Places to study', onPress: () => navigate(SCREEN_NAMES.MasterClasses, { data: DATA, title: 'Double Tongue Platinium' }) },
        { id: 'vacancies', title: 'Vacancies', onPress: () => { } },
        { id: 'bassoonists', title: 'Bassoonists in Orchestras', onPress: () => { } },
        { id: 'manufacturers', title: 'Manufacturers', onPress: () => { } },
        { id: 'reeds', title: 'Reeds & Cane', onPress: () => { } },
        { id: 'shops', title: 'Bassoon Shops', onPress: () => { } },
        { id: 'inside_tbc', title: 'Inside TBC', onPress: () => navigate(SCREEN_NAMES.ProfileSetting) },
        // eslint-disable-next-line react-hooks/exhaustive-deps
    ], [] as Array<{ id: string; title: string; onPress: () => void }>);

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
                {filtered.map((it) => (
                    <TouchableOpacity key={it.id} style={styles.listItem} onPress={it.onPress}>
                        <Text style={styles.listItemText}>{it.title}</Text>
                    </TouchableOpacity>
                ))}
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
});
