import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, FlatList } from 'react-native';
import { metrics } from '@/utils/metrics';
import { darkColors } from '@/config/colors';
import LinearGradient from 'react-native-linear-gradient';
import { PrimaryButton } from '@/components/PrimaryButton';
import PracticeCard from '@/components/PracticeCard';

const SectionCard: React.FC<{ image: any }> = ({ image }) => (
    <TouchableOpacity style={styles.sectionCard} activeOpacity={0.9}>
        <Image source={image} style={styles.sectionImage} />
    </TouchableOpacity>
);

const Dashboard: React.FC = () => {
    const sections = new Array(6).fill(0).map((_, i) => ({ id: i.toString(), title: `Item ${i + 1}`, image: require('@/assets/images/TempImage.png') }));
    const mockData = Array.from({ length: 10 }).map((_, i) => ({
        id: String(i + 1),
        Image: require('../assets/images/TempImage.png'),
        title: `New CD by Theo Plath out now New CD by Theo Plath out now`,
        excerpt: 'Short summary of the news item that gives the user a quick preview of the article. Short summary of the news item that gives the user a quick preview of the article. Short summary of the news item that gives the user a quick preview of the article.',
        image: null,
    }));
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
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.content}>
                <TouchableOpacity style={styles.heroCard} activeOpacity={0.9}>
                    <Image source={require('@/assets/images/TempImage.png')} style={styles.heroImage} />
                    <LinearGradient colors={['transparent', 'rgba(0,0,0,0.7)']} style={styles.heroGradient} />
                    <View style={styles.heroTextWrap}>
                        <Text style={styles.heroTag}>Top story</Text>
                        <Text style={styles.heroTitle}>Klaus Thunemann has passed away</Text>
                        <PrimaryButton title="READ NOW" onPress={() => { }} style={styles.heroButton} />
                    </View>
                </TouchableOpacity>

                <Text style={styles.sectionHeading}><Text style={styles.mainTitle}>Malte, </Text>Some Free Exercises For You</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.row}>
                    {sections.map((s) => (
                        <SectionCard key={s.id} image={s.image} />
                    ))}
                </ScrollView>
                <Text style={styles.sectionHeading}>My Bookmarks List</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.row}>
                    {sections.map((s) => (
                        <SectionCard key={s.id} image={s.image} />
                    ))}
                </ScrollView>


                <PracticeCard thumbnail={require('@/assets/images/TempImage.png')} title="Scales Video #1" description={'In this video, Gustavo Núñez emphasizes the importance of practicing scales for musicians. He mentions that historically, music was primarily based ...'} onStart={() => { }} />
                <Text style={[styles.sectionHeading, { marginTop: metrics.width(25), marginBottom: metrics.width(25) }]}>Other News</Text>
                <FlatList
                    data={mockData}
                    keyExtractor={i => i.id}
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
});
