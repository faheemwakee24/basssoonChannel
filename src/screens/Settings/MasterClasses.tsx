import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { metrics } from '@/utils/metrics';
import { darkColors } from '@/config/colors';
import { Header2 } from '@/components';
import LinearGradient from 'react-native-linear-gradient';
import { navigate } from '@/navigation/navigationService';
import { SCREEN_NAMES } from '@/config/constants';
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

const Sep = () => <View style={styles.sep} />;

export const MasterClasses: React.FC<any> = ({ route, _navigation }: any) => {
    const title = route?.params?.title || 'MasterClasses';
    // allow passing the list data and a screen description via route params
    const data = route?.params?.data ?? DATA;

    const renderItem = ({ item }: any) => (
        <TouchableOpacity onPress={() => navigate(SCREEN_NAMES.MusicDetail)} style={styles.cardRow}>
            <View style={styles.thumb}>
                <Image source={item.image} style={styles.thumb} resizeMode="contain" />
            </View>
            <View style={styles.cardBody}>
                <Text style={styles.cardLabel}>{item.label}</Text>
                <Text style={styles.description} numberOfLines={3}>{item?.description}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <LinearGradient colors={[darkColors.background, darkColors.primaryColor]} style={styles.container}>
            <Header2 title={title} titleStyle={styles.headerTitle} />
            <FlatList
                data={data}
                keyExtractor={(i) => i.id}
                contentContainerStyle={styles.list}
                renderItem={renderItem}
                ItemSeparatorComponent={Sep}
            />
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: darkColors.background },
    list: { padding: metrics.width(16) },
    cardRow: { flexDirection: 'row', flex: 1 },
    thumb: { width: metrics.width(130), height: metrics.width(80), borderRadius: 12, justifyContent: 'center', alignItems: 'center', backgroundColor: darkColors.TextWhite },
    cardLabel: { color: darkColors.TextWhite, fontSize: metrics.width(14) },
    sep: { height: 10 },
    headerTitle: { fontSize: metrics.width(20), color: darkColors.primaryColor },
    description: { color: darkColors.TextWhite, fontSize: metrics.width(12), flex: 1, flexWrap: 'wrap' },
    screenDescription: { color: darkColors.TextWhite, fontSize: metrics.width(14), paddingHorizontal: metrics.width(16), paddingTop: metrics.height(8) },
    cardBody: { flex: 1, marginLeft: metrics.width(23) },
});

export default MasterClasses;
