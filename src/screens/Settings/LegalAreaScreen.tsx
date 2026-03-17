import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Linking,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Header2 } from '@/components';
import { metrics } from '@/utils/metrics';
import { darkColors } from '@/config/colors';

const LeftBackButton = () => (
    <Text style={styles.backText}>&lt; Back</Text>
);

const openUrl = (url: string) => () => Linking.openURL(url);

const InlineLink: React.FC<{ text: string; url: string }> = ({ text, url }) => (
    <Text style={styles.link} onPress={openUrl(url)}>{text}</Text>
);

export const LegalAreaScreen: React.FC = () => {
    const insets = useSafeAreaInsets();

    return (
        <View style={styles.container}>
            <Header2
                title="Legal Area"
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
                <Text style={styles.sectionTitle}>Herausgeber / Publisher</Text>

                <Text style={styles.label}>Name der Gesellschaft / Name of the company:</Text>
                <Text style={styles.paragraph}>The Bassoon Channel UG (haftungsbeschränkt)</Text>

                <Text style={styles.label}>vertreten durch die Geschäftsführer / represented by the managing directors:</Text>
                <Text style={styles.paragraph}>Prof. Matthias Rácz, Prof. Malte Refardt</Text>

                <Text style={styles.label}>Sitz der Gesellschaft / Registered office of the company:</Text>
                <Text style={styles.paragraph}>Hannover, Germany</Text>

                <Text style={styles.label}>Adresse / Address:</Text>
                <Text style={styles.paragraph}>Bothfelder Anger 1{'\n'}30659 Hannover{'\n'}Germany</Text>
                <Text style={styles.paragraph}>Tel.: +49 (0)172 9750720, +41 (0)78 8756760</Text>
                <Text style={styles.paragraph}>
                    E-Mail: <InlineLink text="support@thebassoonchannel.com" url="mailto:support@thebassoonchannel.com" />
                </Text>

                <Text style={styles.label}>Registereintragung / Registered office of the company:</Text>
                <Text style={styles.paragraph}>Amtsgericht Hannover, HRB 221353</Text>

                <Text style={styles.label}>Umsatzsteueridentifikationsnummer / VAT number:</Text>
                <Text style={styles.paragraph}>DE 340378819</Text>

                <Text style={styles.label}>Es gelten unsere Allgemeine Geschäftsbedingungen / Our general terms and conditions apply:</Text>
                <Text style={styles.paragraph}><InlineLink text="https://www.iubenda.com/terms-and-conditions/23999276" url="https://www.iubenda.com/terms-and-conditions/23999276" /></Text>

                <Text style={styles.label}>Es gilt unsere Datenschutzerklärung / Our privacy policy applies:</Text>
                <Text style={styles.paragraph}><InlineLink text="https://www.iubenda.com/privacy-policy/23999276/full-legal" url="https://www.iubenda.com/privacy-policy/23999276/full-legal" /></Text>

                <Text style={styles.label}>Es gilt unsere Cookie-Richtlinie / Our cookie policy applies:</Text>
                <Text style={styles.paragraph}><InlineLink text="https://www.iubenda.com/privacy-policy/23999276/cookie-policy" url="https://www.iubenda.com/privacy-policy/23999276/cookie-policy" /></Text>

                <Text style={styles.sectionTitle}>Online Streitbeilegung / Online dispute resolution:</Text>
                <Text style={styles.paragraph}>Die Europäische Kommission stellt unter <InlineLink text="https://ec.europa.eu/consumers/odr/" url="https://ec.europa.eu/consumers/odr/" /> eine Plattform zur Online-Streitbeilegung bereit, die Verbraucher für die Beilegung einer Streitigkeit nutzen können und auf der weitere Informationen zum Thema Streitschlichtung zu finden sind.</Text>
                <Text style={styles.paragraph}>The European Commission provides an online dispute resolution platform at <InlineLink text="https://ec.europa.eu/consumers/odr/" url="https://ec.europa.eu/consumers/odr/" /> that consumers can use to resolve a dispute and where more information on dispute resolution can be found.</Text>

                <Text style={styles.sectionTitle}>Außergerichtliche Streitbeilegung / Out-of-court dispute resolution:</Text>
                <Text style={styles.paragraph}>Wir sind weder verpflichtet noch dazu bereit, im Falle einer Streitigkeit mit einem Verbraucher an einem Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</Text>
                <Text style={styles.paragraph}>We are neither obligated nor willing to participate in dispute resolution proceedings before a consumer arbitration board in the event of a dispute with a consumer.</Text>

                <Text style={styles.sectionTitle}>Rechtlicher Hinweis / Legal notice:</Text>
                <Text style={styles.paragraph}>The Bassoon Channel UG (haftungsb.) prüft und aktualisiert die Informationen auf ihren Webseiten und in der Web-App "Bassoon Channel" ständig. Trotz aller Sorgfalt können sich die Daten zwischenzeitlich verändert haben. Eine Haftung oder Garantie für die Aktualität, Richtigkeit und Vollständigkeit der zur Verfügung gestellten Informationen kann daher nicht übernommen werden.</Text>
                <Text style={styles.paragraph}>Gleiches gilt auch für alle anderen Websites, auf die mittels Hyperlink verwiesen wird. The Bassoon Channel UG (haftungsb.) ist für den Inhalt der Websites, die aufgrund einer solchen Verbindung erreicht werden, nicht verantwortlich. Einige der Informationen und Angebote werden von unseren Partnern als eigenständige Leistungen erbracht. Bitte beachten Sie, dass für diese Dienste und Angebote die Geschäftsbedingungen unserer Partner gelten und mit der Aufnahme derer Webseiten in die The Bassoon Channel UG (haftungsb.) Web-App oder Webseiten keine Empfehlung oder Garantie verbunden ist. The Bassoon Channel UG (haftungsb.) ist für diese Inhalte nicht verantwortlich. Diese Anbieter sind keine unmittelbaren oder mittelbaren Erfüllungsgehilfen von The Bassoon Channel UG (haftungsb.).</Text>
                <Text style={styles.paragraph}>Im Übrigen gelten die Allgemeinen Geschäftsbedingungen (AGB) (siehe Link oben).</Text>
                <Text style={styles.paragraph}>Des Weiteren behält sich The Bassoon Channel UG (haftungsb.) das Recht vor, Änderungen oder Ergänzungen der bereitgestellten Informationen vorzunehmen.</Text>
                <Text style={styles.paragraph}>Inhalt und Struktur der The Bassoon Channel UG (haftungsb.) Web-App und Websites sind urheberrechtlich geschützt. Die Vervielfältigung von Informationen oder Daten, insbesondere die Verwendung von Texten, Textteilen oder Bildmaterial, bedarf der vorherigen schriftlichen Zustimmung von The Bassoon Channel UG (haftungsb.). Bitte schreiben Sie an <InlineLink text="support@thebassoonchannel.com" url="mailto:support@thebassoonchannel.com" /></Text>

                <Text style={styles.paragraph}>The Bassoon Channel UG (haftungsb.) constantly checks and updates the information on its websites and in the web-App "Bassoon Channel". Despite all due care, the data may have changed in the meantime. Therefore, no liability or guarantee can be assumed for the topicality, correctness and completeness of the information provided.</Text>
                <Text style={styles.paragraph}>The same applies to all other websites referred to by hyperlink. The Bassoon Channel UG (haftungsb.) is not responsible for the content of websites accessed via such links. Some of the information and offers are provided by our partners as independent services. Please note that these services and offers are subject to the terms and conditions of our partners and that the inclusion of their websites on The Bassoon Channel UG (haftungsb.) Web-App or websites does not imply any recommendation or guarantee. The Bassoon Channel UG (haftungsb.) is not responsible for these contents. These providers are not vicarious agents of The Bassoon Channel UG (haftungsb.).</Text>
                <Text style={styles.paragraph}>In all other respects, the General Terms and Conditions apply (see Link above).</Text>
                <Text style={styles.paragraph}>Furthermore, The Bassoon Channel UG (haftungsb.) reserves the right to make changes or additions to the information provided.</Text>
                <Text style={styles.paragraph}>The content and structure of The Bassoon Channel UG (haftungsb.) Web-App and websites are protected by copyright. The reproduction of information or data, in particular the use of texts, parts of texts or images, requires the prior written consent of The Bassoon Channel UG (haftungsb.). Please write to <InlineLink text="support@thebassoonchannel.com" url="mailto:support@thebassoonchannel.com" /></Text>

                <Text style={styles.sectionTitle}>V.i.S.d.P./Verantwortlich nach § 18 Abs. 2 MStV:</Text>
                <Text style={styles.paragraph}>Malte Refardt, Matthias Racz, Bothfelder Anger 1, 30659 Hannover</Text>

                <Text style={styles.sectionTitle}>Bildnachweis / Image credits:</Text>
                <Text style={styles.paragraph}>Bilder / Pictures Bassoon Channel: Nikolai Georgiew (<InlineLink text="https://georgiew.de" url="https://georgiew.de" />){'\n'}Künstlerfotos / Artist pictures: privat</Text>

                <Text style={styles.paragraph}>All Logos are the property of The Bassoon Channel UG (haftungsb.).</Text>

                <Text style={styles.copyright}>© Copyright THE BASSOON CHANNEL UG (HAFTUNGSBESCHRÄNKT), Deutschland</Text>
            </ScrollView>
        </View>
    );
};

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
    sectionTitle: {
        color: darkColors.TextWhite,
        fontSize: metrics.width(17),
        fontWeight: '700',
        marginTop: metrics.height(16),
        marginBottom: metrics.height(8),
        textAlign: 'left',
    },
    label: {
        color: darkColors.TextWhite,
        fontSize: metrics.width(14),
        fontWeight: '600',
        marginTop: metrics.height(12),
        marginBottom: metrics.height(4),
        textAlign: 'left',
    },
    paragraph: {
        color: darkColors.TextWhite,
        fontSize: metrics.width(15),
        lineHeight: metrics.height(24),
        marginBottom: metrics.height(6),
        textAlign: 'left',
    },
    link: {
        color: darkColors.primaryColor,
        fontSize: metrics.width(15),
        textDecorationLine: 'underline',
        lineHeight: metrics.height(24),
    },
    copyright: {
        color: darkColors.TextWhite,
        fontSize: metrics.width(14),
        marginTop: metrics.height(24),
        marginBottom: metrics.height(24),
        textAlign: 'center',
    },
});

export default LegalAreaScreen;
