import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Header2 } from '@/components';
import { metrics } from '@/utils/metrics';
import { darkColors } from '@/config/colors';

const PARTNERS = [
    { id: 1, name: 'Wilhelm Heckel', logo: 'https://tbc-staging.mahrdanial.com/public/images/partner_logos/logo-heckel.jpg' },
    { id: 2, name: 'Bernd Moosmann', logo: 'https://tbc-staging.mahrdanial.com/public/images/partner_logos/logo-moosmann.png' },
    { id: 3, name: 'Gebrüder Mönnig', logo: 'https://tbc-staging.mahrdanial.com/public/images/partner_logos/logo-monnig.png' },
    { id: 4, name: 'Fox', logo: 'https://tbc-staging.mahrdanial.com/public/images/partner_logos/logo-fox.png' },
    { id: 5, name: 'Püchner', logo: 'https://tbc-staging.mahrdanial.com/public/images/partner_logos/logo-puchner-richtig-schwarz.png' },
    { id: 6, name: 'Marcus Bonna', logo: 'https://tbc-staging.mahrdanial.com/public/images/partner_logos/marcus-bonna-logo-schwarz-besser.png' },
    { id: 7, name: 'Georg Rieger', logo: 'https://tbc-staging.mahrdanial.com/public/images/partner_logos/georg-riegerlogo.jpg' },
    { id: 8, name: 'G. Mollenhauer', logo: 'https://tbc-staging.mahrdanial.com/public/images/partner_logos/gustav-mollenhauer-logo.png' },
    { id: 9, name: "Tan's Fagotteria", logo: 'https://tbc-staging.mahrdanial.com/public/images/partner_logos/logo-jiping-strich-dicker.jpg' },
    { id: 10, name: 'JDRI', logo: 'https://tbc-staging.mahrdanial.com/public/images/partner_logos/logo-jrdi.jpg' },
];

const LeftBackButton = () => (
    <Text style={styles.backText}>&lt; Back</Text>
);

export const PartnersScreen: React.FC = () => {
    const insets = useSafeAreaInsets();

    // Create rows of 2 items
    const rows: typeof PARTNERS[] = [];
    for (let i = 0; i < PARTNERS.length; i += 2) {
        rows.push(PARTNERS.slice(i, i + 2));
    }

    return (
        <View style={styles.container}>
            <Header2
                title="Partners"
                titleStyle={styles.headerTitle}
                
            />
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={[
                    styles.content,
                    { paddingBottom: insets.bottom + metrics.height(100) },
                ]}
                showsVerticalScrollIndicator={false}
            >
                {rows.map((row, rowIndex) => (
                    <View key={rowIndex} style={styles.row}>
                        {row.map((partner) => (
                            <View key={partner.id} style={styles.card}>
                                <Image
                                    source={{ uri: partner.logo }}
                                    style={styles.logo}
                                    resizeMode="contain"
                                />
                            </View>
                        ))}
                        {row.length === 1 && <View style={styles.cardPlaceholder} />}
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

const CARD_WIDTH = (metrics.screenWidth - metrics.width(16) * 3) / 2;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: darkColors.background,
    },
    backButtonWrap: {
        minWidth: metrics.width(70),
    },
    backText: {
        color: darkColors.primaryColor,
        fontSize: metrics.width(16),
    },
    headerTitle: {
        fontSize: metrics.width(20),
        color: darkColors.primaryColor,
    },
    scrollView: {
        flex: 1,
    },
    content: {
        paddingHorizontal: metrics.width(16),
        paddingTop: metrics.height(16),
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: metrics.height(12),
    },
    card: {
        width: CARD_WIDTH,
        height: metrics.height(100),
        backgroundColor: darkColors.background,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: darkColors.TextWhite,
        justifyContent: 'center',
        alignItems: 'center',
        padding: metrics.width(12),
    },
    cardPlaceholder: {
        width: CARD_WIDTH,
    },
    logo: {
        width: '100%',
        height: '100%',
    },
});

export default PartnersScreen;
