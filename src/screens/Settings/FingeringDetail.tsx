import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { metrics } from '@/utils/metrics';
import { darkColors } from '@/config/colors';
import { Header2 } from '@/components';
import { navigate } from '@/navigation/navigationService';
import { SCREEN_NAMES } from '@/config/constants';
const FALLBACK_DATA = [
    { id: '1', label: 'B Flat 1', image: require('@/assets/images/Music.png') },
    { id: '2', label: 'B1', image: require('@/assets/images/Music.png') },
    { id: '3', label: 'C2', image: require('@/assets/images/Music.png') },
    { id: '4', label: 'C Sharp 2', image: require('@/assets/images/Music.png') },
    { id: '5', label: 'B Flat 1', image: require('@/assets/images/Music.png') },
    { id: '6', label: 'B1', image: require('@/assets/images/Music.png') },
    { id: '7', label: 'C2', image: require('@/assets/images/Music.png') },
    { id: '8', label: 'C Sharp 2', image: require('@/assets/images/Music.png') },
];

const Sep = () => <View style={styles.sep} />;

export const FingeringDetail: React.FC<any> = ({ route, _navigation }: any) => {
    const title = route?.params?.title || 'Standard Bassoon Fingerings';
    const data = route?.params?.data ?? FALLBACK_DATA;

    const renderItem = ({ item }: any) => (
        <TouchableOpacity onPress={() => navigate(SCREEN_NAMES.MusicDetail)} style={styles.cardRow}>
            <View style={styles.thumb}>
                <Image source={item.image} style={styles.thumb} resizeMode="contain" />
            </View>
            <Text style={styles.cardLabel}>{item.label}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Header2 title={title} titleStyle={styles.headerTitle} />
            <FlatList
                data={data}
                keyExtractor={(i) => i.id}
                contentContainerStyle={styles.list}
                renderItem={renderItem}
                ItemSeparatorComponent={Sep}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: darkColors.background },
    list: { padding: metrics.width(16) },
    cardRow: { flexDirection: 'row', },
    thumb: { width: metrics.width(120), height: metrics.width(120), borderRadius: 12, justifyContent: 'center', alignItems: 'center', backgroundColor: darkColors.TextWhite },
    cardLabel: { color: darkColors.TextWhite, marginLeft: metrics.width(23), fontSize: metrics.width(18) },
    sep: { height: 10 },
    back: { color: darkColors.TextWhite, fontSize: metrics.width(20), marginRight: metrics.width(8) },
    headerTitle: { fontSize: metrics.width(20), color: darkColors.primaryColor }
});

export default FingeringDetail;
