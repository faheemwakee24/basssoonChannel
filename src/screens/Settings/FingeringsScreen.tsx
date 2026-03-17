import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { metrics } from '@/utils/metrics';
import { darkColors } from '@/config/colors';
import { Header2, FingeringsShimmer } from '@/components';
import { navigate } from '@/navigation/navigationService';
import { SCREEN_NAMES } from '@/config/constants';
import { useGetFingeringCategoriesQuery } from '@/api/fingeringsApi';

export const FingeringsScreen: React.FC<any> = ({ route, _navigation }: any) => {
    const { data, isLoading, error } = useGetFingeringCategoriesQuery();

    const handleCategoryPress = (category: any) => {
        navigate(SCREEN_NAMES.FingeringDetail as any, {
            title: category.name,
            slug: category.slug,
            categoryId: category.id,
        });
    };

    if (isLoading) {
        return (
            <View style={styles.container}>
                <Header2 />
                <FlatList
                    data={[]}
                    renderItem={() => null}
                    ListHeaderComponent={<FingeringsShimmer count={4} />}
                    contentContainerStyle={styles.list}
                />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.container}>
                <Header2 />
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>Failed to load fingerings categories. Please try again.</Text>
                </View>
            </View>
        );
    }

    const categories = data?.data?.categories || [];

    return (
        <View style={styles.container}>
            <Header2 />
            <FlatList
                data={categories}
                keyExtractor={(item) => String(item.id)}
                contentContainerStyle={styles.list}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.row} onPress={() => handleCategoryPress(item)}>
                        <Text style={styles.rowText}>{item.name}</Text>
                    </TouchableOpacity>
                )}
                ListEmptyComponent={
                    <View style={styles.errorContainer}>
                        <Text style={styles.errorText}>No fingerings categories available</Text>
                    </View>
                }
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
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: metrics.height(40),
    },
    errorText: {
        color: darkColors.TextWhite,
        fontSize: metrics.width(14),
        textAlign: 'center',
    },
});

export default FingeringsScreen;
