import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Header2 } from '@/components';
import { Svgs } from '@/assets/icons/Svgs';
import { metrics } from '@/utils/metrics';
import { darkColors } from '@/config/colors';
import { navigate } from '@/navigation/navigationService';
import { SCREEN_NAMES } from '@/config/constants';

const LeftBackButton = () => (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
        <Svgs.ArrowLeft width={20} height={20} fill={darkColors.primaryColor} />
        <Text style={{ color: darkColors.primaryColor, fontSize: 16 }}>Back</Text>
    </View>
);

const ABOUT_PARAGRAPHS = [
    "Bassoon Channel is an app that offers short tutorial videos, practice programs, piano accompaniments, fingering charts, and news updates for bassoon players. Our app is designed to help players improve and perfect their skills without replacing the need for lessons.",
    "We believe in creating a supportive and equitable community of bassoonists, where everyone is empowered to reach their full potential and contribute to the art of playing the bassoon. With our program, we're giving bassoonists access to the best education and mentoring, regardless of where they live, so that they can level the playing-field and have a fair chance.",
    "Our goal is to bring the knowledge of the world's top bassoonists to players, no matter where they are in the world or what their financial situation is. We want to make sure that every ambitious bassoonist has the chance to learn and grow, and to build a community where we can all support and encourage each other.",
    "Whether you're a beginner or an experienced player, Bassoon Channel has something to offer. You can access our app from your phone or tablet, and with hundreds of short tutorial videos and practice programs, you can learn at your own pace and on your own schedule. You can also stay up to date with the latest news in the bassoon world and connect with other players from around the globe.",
    "Join us on Bassoon Channel and become part of a community that is dedicated to helping every bassoonist achieve their full potential!",
];

const QUALITY_GUARANTEES = [
    "all our videos are made by bassoonists for bassoonists",
    "we know your needs and have created short videos that bring you the right solutions to the point",
    "No unnecessary blah-blah. All videos are made to the highest Bassoon Channel standards. Matthias Rácz and Malte Refardt vouch for the quality!",
    "In our videos you will find solutions that are not available anywhere else on the internet.",
    "Our videos have different levels of difficulty and you will definitely find exercises that are just right for you and your current skills. We'll help you get better!",
    "We listen to your needs. If you are looking for solutions to a particular problem and can't find them here (which, to be honest, we don't think you would!), contact us and we'll make a video!",
];

export const AboutUsScreen: React.FC = () => {
    const insets = useSafeAreaInsets();

    const handleLegalArea = () => {
        navigate(SCREEN_NAMES.LegalArea);
    };

    return (
        <View style={[styles.container,]}>
            <Header2
                title="About Us"
                titleStyle={styles.headerTitle}
               
        
            />

            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + metrics.height(100) }]}
                showsVerticalScrollIndicator={false}
            >
                {ABOUT_PARAGRAPHS.map((paragraph, index) => (
                    <Text key={`p-${index}`} style={styles.paragraph}>
                        {paragraph}
                    </Text>
                ))}

                <Text style={styles.sectionTitle}>Bassoon Channel's Quality Guarantee</Text>

                {QUALITY_GUARANTEES.map((item, index) => (
                    <Text key={`q-${index}`} style={styles.listItem}>
                        {index + 1}) {item}
                    </Text>
                ))}
            </ScrollView>

            <View style={[styles.buttonWrapper, { paddingBottom: insets.bottom + metrics.height(16) }]}>
                <TouchableOpacity
                    style={styles.legalButton}
                    onPress={handleLegalArea}
                    activeOpacity={0.8}
                >
                    <Text style={styles.legalButtonText}>Legal Area</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: darkColors.background,
    },
    headerTitle: {
        fontSize: metrics.width(20),
        color: darkColors.primaryColor,
    },
    backButtonWrap: {
        width: metrics.width(70),
    },
    scrollView: {
        flex: 1,
    },
    content: {
        paddingHorizontal: metrics.width(16),
        paddingTop: metrics.height(16),
    },
    paragraph: {
        color: darkColors.TextWhite,
        fontSize: metrics.width(15),
        lineHeight: metrics.height(24),
        marginBottom: metrics.height(14),
        textAlign: 'left',
    },
    sectionTitle: {
        color: darkColors.TextWhite,
        fontSize: metrics.width(17),
        fontWeight: '700',
        marginTop: metrics.height(8),
        marginBottom: metrics.height(12),
        textAlign: 'left',
    },
    listItem: {
        color: darkColors.TextWhite,
        fontSize: metrics.width(15),
        lineHeight: metrics.height(24),
        marginBottom: metrics.height(10),
        textAlign: 'left',
    },
    buttonWrapper: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingHorizontal: metrics.width(16),
        backgroundColor: darkColors.background,
    },
    legalButton: {
        backgroundColor: darkColors.primaryColor,
        paddingVertical: metrics.height(14),
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    legalButtonText: {
        color: darkColors.TextWhite,
        fontSize: metrics.width(16),
        fontWeight: '600',
    },
});

export default AboutUsScreen;
