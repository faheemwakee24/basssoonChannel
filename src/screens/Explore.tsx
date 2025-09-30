import React from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Image } from 'react-native';
import { metrics } from '@/utils/metrics';
import { darkColors } from '@/config/colors';
import { Svgs } from '@/assets/icons/Svgs';
const Explore: React.FC = () => {
    const [query, setQuery] = React.useState('');
    const data = React.useMemo(() => [
        {
            id: 'bassoon_basics',
            title: 'Bassoon Basics Platinum',
            items: [
                { id: 'b1', title: 'Embouchure', image: require('@/assets/images/TempImage.png') },
                { id: 'b2', title: 'Embouchure', image: require('@/assets/images/TempImage.png') },
                { id: 'b3', title: 'Embouchure', image: require('@/assets/images/TempImage.png') },
                { id: 'b4', title: 'Embouchure', image: require('@/assets/images/TempImage.png') },
                { id: 'b5', title: 'Embouchure', image: require('@/assets/images/TempImage.png') },
                { id: 'b6', title: 'Embouchure', image: require('@/assets/images/TempImage.png') },
                { id: 'b7', title: 'Embouchure', image: require('@/assets/images/TempImage.png') },
            ],
        },
        {
            id: 'orchestra_excerpts',
            title: 'Orchestra Excerpts Platinum',
            items: [
                { id: 'b1', title: 'Embouchure', image: require('@/assets/images/TempImage.png') },
                { id: 'b2', title: 'Embouchure', image: require('@/assets/images/TempImage.png') },
                { id: 'b3', title: 'Embouchure', image: require('@/assets/images/TempImage.png') },
                { id: 'b4', title: 'Embouchure', image: require('@/assets/images/TempImage.png') },
                { id: 'b5', title: 'Embouchure', image: require('@/assets/images/TempImage.png') },
                { id: 'b6', title: 'Embouchure', image: require('@/assets/images/TempImage.png') },
                { id: 'b7', title: 'Embouchure', image: require('@/assets/images/TempImage.png') },
            ],
        },
        {
            id: 'reed_making',
            title: 'Reed Making Platinum',
            items: [
                { id: 'b1', title: 'Embouchure', image: require('@/assets/images/TempImage.png') },
                { id: 'b2', title: 'Embouchure', image: require('@/assets/images/TempImage.png') },
                { id: 'b3', title: 'Embouchure', image: require('@/assets/images/TempImage.png') },
                { id: 'b4', title: 'Embouchure', image: require('@/assets/images/TempImage.png') },
                { id: 'b5', title: 'Embouchure', image: require('@/assets/images/TempImage.png') },
                { id: 'b6', title: 'Embouchure', image: require('@/assets/images/TempImage.png') },
                { id: 'b7', title: 'Embouchure', image: require('@/assets/images/TempImage.png') },
            ],
        }, {
            id: 'orchestra_excerpts',
            title: 'Orchestra Excerpts Platinum',
            items: [
                { id: 'b1', title: 'Embouchure', image: require('@/assets/images/TempImage.png') },
                { id: 'b2', title: 'Embouchure', image: require('@/assets/images/TempImage.png') },
                { id: 'b3', title: 'Embouchure', image: require('@/assets/images/TempImage.png') },
                { id: 'b4', title: 'Embouchure', image: require('@/assets/images/TempImage.png') },
                { id: 'b5', title: 'Embouchure', image: require('@/assets/images/TempImage.png') },
                { id: 'b6', title: 'Embouchure', image: require('@/assets/images/TempImage.png') },
                { id: 'b7', title: 'Embouchure', image: require('@/assets/images/TempImage.png') },
            ],
        },
        {
            id: 'reed_making',
            title: 'Reed Making Platinum',
            items: [
                { id: 'b1', title: 'Embouchure', image: require('@/assets/images/TempImage.png') },
                { id: 'b2', title: 'Embouchure', image: require('@/assets/images/TempImage.png') },
                { id: 'b3', title: 'Embouchure', image: require('@/assets/images/TempImage.png') },
                { id: 'b4', title: 'Embouchure', image: require('@/assets/images/TempImage.png') },
                { id: 'b5', title: 'Embouchure', image: require('@/assets/images/TempImage.png') },
                { id: 'b6', title: 'Embouchure', image: require('@/assets/images/TempImage.png') },
                { id: 'b7', title: 'Embouchure', image: require('@/assets/images/TempImage.png') },
            ],
        },
    ], []);

    const filteredData = React.useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return data;
        return data
            .map((s) => ({ ...s, items: s.items.filter((it) => it.title.toLowerCase().includes(q)) }))
            .filter((s) => s.items.length > 0);
    }, [data, query]);
    return (
        <View style={styles.container}>

            <View style={styles.searchWrap2}>
                <View style={styles.searchPill}>
                    <TextInput
                        placeholder="Find"
                        placeholderTextColor={darkColors.searchPlaceholder}
                        style={styles.searchInput2}
                        underlineColorAndroid="transparent"
                        value={query}
                        onChangeText={setQuery}
                    />
                    <TouchableOpacity style={styles.searchIcon} activeOpacity={0.7}>
                        <Svgs.Search />
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.searchWrap}>
                    <Image source={require('@/assets/images/TempImage.png')} style={styles.hero} />
                </View>
                {filteredData.map((section, idx) => (
                    <View key={section.id} style={styles.section}>
                        <View style={styles.row2}>
                            <Text style={styles.sectionTitle}>{`${idx + 1}. ${section.title}`}</Text>
                            <Svgs.ArrowRight height={metrics.width(16)} width={metrics.width(16)} color={darkColors.TextWhite} />
                        </View>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.row} style={styles.scrollContainer}>
                            {section.items.map((item) => (
                                <View key={item.id} style={styles.card}>
                                    <Image source={item.image} style={styles.cardBg} />
                                </View>
                            ))}
                            <View style={styles.spacer} />
                        </ScrollView>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

export default Explore;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: darkColors.background },
    content: { paddingBottom: metrics.height(80) },
    searchWrap: { marginBottom: metrics.height(12), marginHorizontal: metrics.width(12) },
    hero: { height: metrics.height(170), borderRadius: 12, width: '100%' },
    section: { marginBottom: metrics.height(18) },
    sectionTitle: { color: darkColors.TextWhite, fontSize: metrics.width(16), marginBottom: metrics.height(8), marginHorizontal: metrics.width(12) },
    row: { alignItems: 'center', },
    card: { width: metrics.width(140), height: metrics.height(80), marginRight: metrics.width(12), borderRadius: 8, overflow: 'hidden' },
    cardBg: { height: '100%', width: '100%', borderRadius: 8, overflow: 'hidden' },
    cardText: { color: darkColors.TextWhite, fontWeight: '700' },
    searchInput: {
        flex: 1,
        height: '100%',
        color: darkColors.TextWhite,
        fontStyle: 'italic',
        paddingVertical: 0,
        paddingRight: metrics.width(8),
    },
    searchWrap2: { paddingHorizontal: metrics.width(16), paddingBottom: metrics.height(8) },
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
    searchInput2: {
        flex: 1,
        height: '100%',
        color: darkColors.TextWhite,
        fontStyle: 'italic',
        paddingVertical: 0,
        paddingRight: metrics.width(8),
    },
    searchIcon: { paddingLeft: metrics.width(8), paddingVertical: metrics.height(6) },
    searchFallback: { color: darkColors.TextWhite, fontSize: metrics.width(18) },
    scrollContainer: { paddingHorizontal: metrics.width(12), paddingRight: metrics.width(30) },
    spacer: { height: metrics.width(10), width: metrics.width(10) },
    row2: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: metrics.height(8), marginHorizontal: metrics.width(12) },
});
