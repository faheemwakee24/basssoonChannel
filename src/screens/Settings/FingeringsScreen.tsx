import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { metrics } from '@/utils/metrics';
import { darkColors } from '@/config/colors';
import { Header2 } from '@/components';
import { navigate } from '@/navigation/navigationService';
import { SCREEN_NAMES } from '@/config/constants';

const DATA = [
    'Standard Bassoon Fingerings',
    'Special Bassoon Fingerings',
    'Standard Contrabassoon Fingerings',
    'Special Contrabassoon Fingerings',
];

export const FingeringsScreen: React.FC<any> = ({ _navigation }: any) => {
    return (
        <View style={styles.container}>
            <Header2 />
            <FlatList
                data={DATA}
                keyExtractor={(item) => item}
                contentContainerStyle={styles.list}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.row} onPress={() => { navigate(SCREEN_NAMES.FingeringDetail) }}>
                        <Text style={styles.rowText}>{item}</Text>
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
