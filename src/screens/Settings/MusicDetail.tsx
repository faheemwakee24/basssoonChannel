import React from 'react';
import { View, StyleSheet, Image, ImageBackground, Text, } from 'react-native';
import { metrics } from '@/utils/metrics';
import { darkColors } from '@/config/colors';
import { Header2 } from '@/components';

export const MusicDetail: React.FC<any> = ({ route, _navigation }: any) => {


    return (
        <View style={styles.container}>
            <Header2 />
            <ImageBackground source={require('@/assets/images/Music.png')} style={styles.image} >
                <Text style={styles.text}>Music Detail Screen</Text>
            </ImageBackground>
            <Image source={require('@/assets/images/MusicDetail.png')} style={styles.image2} />

        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: darkColors.background },
    image: {
        width: '100%',
        height: metrics.screenHeight * 0.4,
        justifyContent: 'flex-end'
    },
    text: {
        fontSize: metrics.width(18),
        color: darkColors.black,
        margin: metrics.width(14),
    },
    image2: {
        width: '100%',
        height: metrics.screenHeight * 0.5,
        resizeMode: 'contain',
        marginTop: metrics.width(10),
    }
});

export default MusicDetail;
