import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    SafeAreaView,
} from 'react-native';
import { useTheme } from '../hooks/useTheme';


export const HomeScreen: React.FC = () => {
    const { theme } = useTheme();

    return (
        <SafeAreaView >

        </SafeAreaView>
    );
};

const createStyles = (theme: any) => StyleSheet.create({

});
