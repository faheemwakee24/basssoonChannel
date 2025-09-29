import React from 'react';
import { Text, StyleSheet, ScrollView, View, Linking } from 'react-native';
import { metrics } from '@/utils/metrics';
import { darkColors } from '@/config/colors';
import { Header2 } from '@/components';

export const NotificationDetail: React.FC<any> = ({ route }: any) => {
    const title = route?.params?.title ?? 'Inform us!';
    const body = route?.params?.body ?? `Sometimes we do need your help! Whenever you or your friends have won an audition or a competition; or a new recording is coming out, or a good composer has written a new piece... please don't hesitate to let us know! Our "News" section also relies on us keeping each other informed and exchanging information as a Bassoon Community! We look forward to receiving your feedback at: support@thebassoonchannel.com or on social media. Thank you!!`;

    // detect the email inside the body and render it clickable
    const email = 'support@thebassoonchannel.com';
    const parts = body.split(email);

    const openEmail = async (mail: string) => {
        const url = `mailto:${mail}`;
        try {
            await Linking.openURL(url);
        } catch (e) {
            console.warn('Failed to open mail app', e);
        }
    };

    return (
        <View style={styles.container}>
            <Header2 title={title} titleStyle={styles.title} />
            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.bodyText}>
                    {parts[0]}
                    <Text onPress={() => openEmail(email)} style={styles.mailLink}>{email}</Text>
                    {parts[1]}
                </Text>
            </ScrollView>

        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: darkColors.background },
    safeArea: { flex: 1 },
    content: { marginHorizontal: metrics.width(20) },
    title: { color: darkColors.primaryColor, fontSize: metrics.width(20), fontWeight: '700', textAlign: 'center', marginVertical: metrics.height(12) },
    bodyText: { color: darkColors.TextWhite, fontSize: metrics.width(14), lineHeight: metrics.height(22), textAlign: 'left' },
    mailLink: { color: '#1976d2', textDecorationLine: 'underline' },
});

export default NotificationDetail;
