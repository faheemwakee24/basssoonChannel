import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from './navigationService';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuth } from '../hooks/useAuth';
import { AuthNavigator } from './AuthNavigator';
import { MainNavigator } from './MainNavigator';
import { SCREEN_NAMES } from '../config/constants';

export type RootStackParamList = {
    Auth: undefined;
    Main: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export const AppNavigator: React.FC = () => {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
        // TODO: Add loading screen component
        return null;
    }

    return (
        <NavigationContainer ref={navigationRef}>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                }}
            >
                {/* {isAuthenticated ? (
                    <Stack.Screen name="Main" component={MainNavigator} />
                ) : (
                    <Stack.Screen name="Auth" component={AuthNavigator} />
                )} */}
                <Stack.Screen name="Auth" component={AuthNavigator} />

            </Stack.Navigator>
        </NavigationContainer>
    );
};
