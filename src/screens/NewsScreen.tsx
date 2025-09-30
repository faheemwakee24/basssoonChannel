import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { metrics } from '@/utils/metrics';
import { darkColors } from '@/config/colors';
import { SafeAreaView } from 'react-native-safe-area-context';

const mockData = Array.from({ length: 10 }).map((_, i) => ({
    id: String(i + 1),
    Image: require('../assets/images/TempImage.png'),
    title: `New CD by Theo Plath out now New CD by Theo Plath out now`,
    excerpt: 'Short summary of the news item that gives the user a quick preview of the article. Short summary of the news item that gives the user a quick preview of the article. Short summary of the news item that gives the user a quick preview of the article.',
    image: null,
}));

export const NewsScreen: React.FC = () => {
    const renderItem = ({ item }: any) => (
        <TouchableOpacity style={styles.card} activeOpacity={0.8}>
            <Image source={item.Image} style={styles.thumb} />
            <View style={styles.cardBody}>
                <Text style={styles.cardTitle} numberOfLines={1} ellipsizeMode='tail'>{item.title}</Text>
                <Text style={styles.cardExcerpt}
                    ellipsizeMode='tail'
                    numberOfLines={3}
                >{item.excerpt}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={mockData}
                ListHeaderComponent={<Text style={styles.loginTitle}>News</Text>}
                keyExtractor={i => i.id}
                renderItem={renderItem}
                contentContainerStyle={styles.list}
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: darkColors.background,

    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: metrics.height(14),
    },
    headerTitle: {
        color: darkColors.primaryColor,
        fontSize: metrics.width(18),
        fontWeight: 'bold',
    },
    headerIcons: {
        flexDirection: 'row',
        gap: metrics.width(12),
        alignItems: 'center',
    },
    list: {
        paddingBottom: metrics.height(40),
        marginHorizontal: metrics.width(20)
    },
    card: {
        flexDirection: 'row',
        marginBottom: metrics.height(12),
        alignItems: 'flex-start'
    },
    thumb: {
        width: metrics.width(85),
        height: metrics.width(85),
        borderRadius: 8,
        marginRight: metrics.width(20),
    },
    cardBody: {
        flex: 1,
        color: darkColors.TextWhite,
        fontSize: metrics.width(14),
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },
    cardTitle: {
        color: darkColors.TextWhite,
        fontSize: metrics.width(14),
        fontWeight: 'bold',
    },
    cardExcerpt: {
        fontSize: metrics.width(12),
        color: darkColors.TextWhite,
    },
    loginTitle: {
        fontSize: metrics.width(25),
        fontWeight: 'bold',
        color: darkColors.primaryColor,
        marginBottom: metrics.height(20),
        textAlign: 'center',
    },
});
