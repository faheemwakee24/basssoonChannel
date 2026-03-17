import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { MainStackParamList } from '@/navigation/MainNavigator';
import { metrics } from '@/utils/metrics';
import { darkColors } from '@/config/colors';
import LinearGradient from 'react-native-linear-gradient';
import { PrimaryButton } from '@/components/PrimaryButton';
import PracticeCard from '@/components/PracticeCard';
import { useGetHomeDataQuery } from '@/api/homeApi';
import { NEWS_BASE_Image_URL, CATEGORY_ITEMS_BASE_Image_URL } from '@/constants/api';
import { DashboardShimmer } from '@/components/Shimmer';


const SectionCard: React.FC<{ image: any; onPress?: () => void }> = ({ image, onPress }) => (
    <TouchableOpacity style={styles.sectionCard} activeOpacity={0.9} onPress={onPress}>
        <Image source={image} style={styles.sectionImage} />
    </TouchableOpacity>
);

const Dashboard: React.FC = () => {
    const navigation = useNavigation<StackNavigationProp<MainStackParamList>>();
    const { data, isLoading, isError, refetch } = useGetHomeDataQuery();

    if (isLoading) {
        return <DashboardShimmer />;
    }

    if (isError || !data?.success) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>Failed to load home data.</Text>
                <PrimaryButton title="Retry" onPress={() => navigation.navigate('MainTabs', { screen: 'Home' } as any)} style={styles.retryButton} />
            </View>
        );
    }

    const homeData = data.data;

    const renderItem = ({ item }: any) => (
        <TouchableOpacity
            style={styles.card}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('NewsDetail', { slug: item.slug })}
        >
            <Image
                source={{ uri: `${NEWS_BASE_Image_URL}${item.image}` }}
                style={styles.thumb}
            />
            <View style={styles.cardBody}>
                <Text style={styles.cardTitle} numberOfLines={1} ellipsizeMode='tail'>{item.name}</Text>
                <Text style={styles.cardExcerpt}
                    ellipsizeMode='tail'
                    numberOfLines={3}
                >{item.description?.replace(/<[^>]*>?/gm, '')}</Text>
            </View>
        </TouchableOpacity>
    );
    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.content}>
                {homeData.top_story && (
                    <TouchableOpacity style={styles.heroCard} activeOpacity={0.9}>
                        <Image
                            source={{ uri: `${NEWS_BASE_Image_URL}${homeData.top_story.image}` }}
                            style={styles.heroImage}
                        />
                        <LinearGradient colors={['transparent', 'rgba(0,0,0,0.7)']} style={styles.heroGradient} />
                        <View style={styles.heroTextWrap}>
                            <Text style={styles.heroTag}>Top story</Text>
                            <Text style={styles.heroTitle}>{homeData.top_story.name}</Text>
                            <PrimaryButton
                                title="READ NOW"
                                onPress={() => navigation.navigate('NewsDetail', { slug: homeData.top_story.slug })}
                                style={styles.heroButton}
                            />
                        </View>
                    </TouchableOpacity>
                )}

                <Text style={styles.sectionHeading}>
                    <Text style={styles.mainTitle}>{homeData.user_name}, </Text>
                    Some Free Exercises For You
                </Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.row}>
                    {homeData.free_exercises?.map((exercise) => (
                        <SectionCard
                            key={exercise.id}
                            image={{ uri: `${CATEGORY_ITEMS_BASE_Image_URL}${exercise.image}` }}
                            onPress={() => navigation.navigate('CategoryItemDetail', { slug: exercise.slug } as any)}
                        />
                    ))}
                </ScrollView>

                {homeData.bookmarks_list && homeData.bookmarks_list.length > 0 && (
                    <>
                        <Text style={styles.sectionHeading}>My Bookmarks List</Text>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.row}>
                            {homeData.bookmarks_list.map((bookmark: any) => (
                                <SectionCard
                                    key={bookmark.id}
                                    image={{ uri: `${CATEGORY_ITEMS_BASE_Image_URL}${bookmark.image}` }}
                                    onPress={() => navigation.navigate('CategoryItemDetail', { slug: bookmark.slug } as any)}
                                />
                            ))}
                        </ScrollView>
                    </>
                )}

                {homeData.free_exercises?.[0] && (
                    <PracticeCard
                        thumbnail={{ uri: `${CATEGORY_ITEMS_BASE_Image_URL}${homeData.free_exercises[0].image}` }}
                        title={homeData.free_exercises[0].name}
                        description={homeData.free_exercises[0].description}
                        onStart={() => navigation.navigate('CategoryItemDetail', { slug: homeData.free_exercises[0].slug } as any)}
                    />
                )}

                <Text style={[styles.sectionHeading, { marginTop: metrics.width(25), marginBottom: metrics.width(25) }]}>Other News</Text>
                <FlatList
                    scrollEnabled={false}
                    data={homeData.other_news}
                    keyExtractor={i => i.id.toString()}
                    renderItem={renderItem}
                    contentContainerStyle={styles.list}
                    showsVerticalScrollIndicator={false}
                />
            </ScrollView>
        </View>
    );
};

export default Dashboard;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: darkColors.background },
    content: { paddingBottom: metrics.height(80), paddingTop: metrics.width(8) },
    heroCard: { height: metrics.height(300), overflow: 'hidden', },
    heroImage: { width: '100%', height: '100%' },
    heroGradient: { ...StyleSheet.absoluteFillObject },
    heroTextWrap: { position: 'absolute', left: metrics.width(12), bottom: metrics.width(12), right: metrics.width(12) },
    heroTag: { color: darkColors.TextWhite, fontSize: metrics.width(12), marginBottom: metrics.height(8) },
    heroTitle: { color: darkColors.TextWhite, fontSize: metrics.width(18), fontWeight: 'bold', marginBottom: metrics.height(12) },
    heroButton: { width: metrics.width(140) },
    sectionHeading: { color: darkColors.TextWhite, fontSize: metrics.width(16), marginLeft: metrics.width(12), marginTop: metrics.width(25), marginBottom: metrics.width(7) },
    row: { paddingLeft: metrics.width(12), paddingRight: metrics.width(12) },
    sectionCard: { width: metrics.width(120), marginRight: metrics.width(12), borderRadius: 8, overflow: 'hidden' },
    sectionImage: { width: '100%', height: metrics.height(80) },
    mainTitle: { color: darkColors.primaryColor, fontWeight: '700', fontSize: metrics.width(30), fontStyle: "italic" },
    list: {
        paddingBottom: metrics.height(40),
        marginHorizontal: metrics.width(20)
    },
    card: {
        flexDirection: 'row',
        marginBottom: metrics.height(15),
        alignItems: 'flex-start'
    },
    thumb: {
        width: metrics.width(120),
        height: metrics.width(120),
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
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: darkColors.background,
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: darkColors.background,
        padding: metrics.width(20),
    },
    errorText: {
        color: darkColors.TextWhite,
        fontSize: metrics.width(16),
        marginBottom: metrics.height(20),
        textAlign: 'center',
    },
    retryButton: {
        width: metrics.width(120),
    },
});
