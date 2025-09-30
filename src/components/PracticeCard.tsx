import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { metrics } from '@/utils/metrics';
import { darkColors } from '@/config/colors';
import { PrimaryButton } from '@/components/PrimaryButton';
import LinearGradient from 'react-native-linear-gradient';

type PracticeCardProps = {
    thumbnail: any;
    title: string;
    description: string;
    rating?: number;
    onStart?: () => void;
};

export const PracticeCard: React.FC<PracticeCardProps> = ({ thumbnail, title, description, rating = 5, onStart }) => {
    return (
        <LinearGradient colors={['#D80E4310', '#D80E4380']} >
            <Text style={styles.sectionHeading}>Keep Practicing</Text>
            <View style={styles.container}>

                <View style={styles.thumbWrap}>
                    <Image source={thumbnail} style={styles.thumb} />
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <Text style={styles.thumbTitle}>{title}</Text>
                    </View>
                </View>

                <View style={styles.detailWrap}>
                    <View style={styles.starsRow}>
                        <Text style={styles.stars}>{'★'.repeat(rating)}</Text>
                    </View>
                    <Text style={styles.desc}>{description}</Text>
                    <PrimaryButton title="START NOW" onPress={onStart ? onStart : () => { }} style={styles.button} textStyle={styles.buttonText} />
                </View>
            </View>
        </LinearGradient>
    );
};

export default PracticeCard;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        gap: metrics.width(12),
        padding: metrics.width(12),
        borderRadius: 12,
        backgroundColor: 'transparent',
    },
    thumbWrap: {
        width: metrics.width(150),
        borderRadius: 12,
        overflow: 'hidden',
        backgroundColor: '#2a0b15',
    },
    thumb: { width: '100%', height: metrics.height(80), borderRadius: 8 },
    thumbTitle: { color: darkColors.TextWhite, marginTop: metrics.height(8), textAlign: 'left', marginHorizontal: metrics.width(6) },
    detailWrap: {
        flex: 1,
        backgroundColor: '#d80e43',
        borderRadius: 12,
        padding: metrics.width(12),
        justifyContent: 'space-between',
    },
    starsRow: { flexDirection: 'row', justifyContent: 'flex-end' },
    stars: { color: '#ffd700', fontSize: metrics.width(14), marginBottom: metrics.height(8) },
    desc: { color: darkColors.TextWhite, lineHeight: metrics.height(20), marginBottom: metrics.height(12) },
    button: { width: metrics.width(120), alignSelf: 'flex-start', backgroundColor: darkColors.TextWhite, borderRadius: 100, paddingVertical: metrics.width(10) },
    sectionHeading: { color: darkColors.TextWhite, fontSize: metrics.width(16), marginLeft: metrics.width(12), marginTop: metrics.width(25), marginBottom: metrics.width(7) },
    buttonText: { color: darkColors.primaryColor, fontWeight: 'bold' },

});
