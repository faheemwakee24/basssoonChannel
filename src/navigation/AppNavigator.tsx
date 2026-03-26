import React, { useEffect, useState } from 'react';
import { NavigationContainer, CommonActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { navigationRef } from './navigationService';
import { useAppDispatch, useAppSelector, setUser } from '../store';
import { AuthNavigator } from './AuthNavigator';
import { MainNavigator } from './MainNavigator';
import { tokenStorage } from '../utils/tokenStorage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../config/constants';

export type RootStackParamList = {
    Auth: undefined;
    Main: undefined;
};

const RootStack = createStackNavigator<RootStackParamList>();

export const AppNavigator: React.FC = () => {
    const dispatch = useAppDispatch();
    const isAuthenticated = useAppSelector((s) => s.auth.isAuthenticated);
    const [isRestoring, setIsRestoring] = useState(true);

    useEffect(() => {
        let mounted = true;
        (async () => {
            try {
                const [token, userJson] = await Promise.all([
                    tokenStorage.getAccessToken(),
                    AsyncStorage.getItem(STORAGE_KEYS.USER_DATA),
                ]);
                if (mounted && token && userJson) {
                    const user = JSON.parse(userJson);
                    dispatch(setUser(user));
                }
            } catch (e) {
                if (__DEV__) console.warn('[AppNavigator] Auth restore failed:', e);
            } finally {
                if (mounted) setIsRestoring(false);
            }
        })();
        return () => { mounted = false; };
    }, [dispatch]);


    if (isRestoring) {
        return null;
    }

    return (
        <NavigationContainer ref={navigationRef}>
            <RootStack.Navigator screenOptions={{ headerShown: false }}>
                {isAuthenticated ? (
                    <RootStack.Screen name="Main" component={MainNavigator} />
                ) : (
                    <RootStack.Screen name="Auth" component={AuthNavigator} />
                )}
            </RootStack.Navigator>
        </NavigationContainer>
    );
};
