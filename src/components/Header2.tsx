import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { metrics } from '@/utils/metrics';
import { darkColors } from '@/config/colors';
import { Svgs } from '@/assets/icons/Svgs';
import { useNavigation } from '@react-navigation/native';

import type { StyleProp, ViewStyle, TextStyle } from 'react-native';

export type Header2Props = {
    title?: string;
    LeftIcon?: React.ReactNode;
    RightComponent?: React.ReactNode;
    onPressLeft?: () => void;
    /** Optional style overrides */
    containerStyle?: StyleProp<ViewStyle>;
    leftStyle?: StyleProp<ViewStyle>;
    rightStyle?: StyleProp<ViewStyle>;
    titleContainerStyle?: StyleProp<ViewStyle>;
    titleStyle?: StyleProp<TextStyle>;
};

export const Header2: React.FC<Header2Props> = ({ title = '', LeftIcon, RightComponent, onPressLeft, containerStyle, leftStyle, rightStyle, titleContainerStyle, titleStyle }) => {
    const navigation = useNavigation();

    return (
        <View style={[styles.container, containerStyle]}>
            <TouchableOpacity onPress={onPressLeft ? onPressLeft : () => navigation.goBack()} style={[styles.leftWrap, leftStyle]} activeOpacity={0.7}>
                {LeftIcon ? LeftIcon : <Svgs.ArrowLeft />}
            </TouchableOpacity>

            <View style={[styles.titleWrap, titleContainerStyle]} pointerEvents="none">
                <Text numberOfLines={1} style={[styles.title, titleStyle]}>
                    {title}
                </Text>
            </View>

            <View style={[styles.rightWrap, rightStyle]}>
                {RightComponent}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    safe: { backgroundColor: darkColors.background },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: metrics.width(16),
        justifyContent: 'space-between',
        width: '100%',
        paddingVertical: metrics.width(5),
    },
    leftWrap: {
        width: metrics.width(25),
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    titleWrap: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        color: darkColors.TextWhite,
        fontSize: metrics.width(16),
        fontWeight: '600',
    },
    rightWrap: {
        width: metrics.width(25),
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
});
