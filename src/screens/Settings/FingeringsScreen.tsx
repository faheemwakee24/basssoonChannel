import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { metrics } from '@/utils/metrics';
import { darkColors } from '@/config/colors';
import { Header2 } from '@/components';
import { navigate } from '@/navigation/navigationService';
import { SCREEN_NAMES } from '@/config/constants';

const DATA = [
    { id: 'standard_bassoon', title: 'Standard Bassoon Fingerings', screen: SCREEN_NAMES.FingeringDetail, params: { type: 'standard', instrument: 'bassoon' } },
    { id: 'special_bassoon', title: 'Special Bassoon Fingerings', screen: SCREEN_NAMES.FingeringDetail, params: { type: 'special', instrument: 'bassoon' } },
    { id: 'standard_contrabassoon', title: 'Standard Contrabassoon Fingerings', screen: SCREEN_NAMES.FingeringDetail, params: { type: 'standard', instrument: 'contrabassoon' } },
    { id: 'special_contrabassoon', title: 'Special Contrabassoon Fingerings', screen: SCREEN_NAMES.FingeringDetail, params: { type: 'special', instrument: 'contrabassoon' } },
];

export const FingeringsScreen: React.FC<any> = ({ route, _navigation }: any) => {
    const data = route?.params?.data ?? DATA;
    return (
        <View style={styles.container}>
            <Header2 />
            <FlatList
                data={data}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.list}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.row} onPress={() => { navigate(item.screen); }}>
                        <Text style={styles.rowText}>{item.title}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: darkColors.background },
    list: {},
    row: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: metrics.height(15),
        borderTopWidth: 1,
        borderTopColor: darkColors.borderColor20
    },
    rowText: { color: darkColors.TextWhite, fontSize: metrics.width(16), textAlign: 'center' },
    separator: { height: 1, backgroundColor: darkColors.borderColor20 },
});

export default FingeringsScreen;
