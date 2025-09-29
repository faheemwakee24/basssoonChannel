import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from '../screens/Auth/LoginScreen';
import { JoinNow } from '../screens/Auth/RegisterScreen';
import { ForgotPassword } from '@/screens/Auth/ForgotPassword';
import { NewsDetail, NewsScreen } from '@/screens';

export type AuthStackParamList = {
    Login: undefined;
    JoinNow: undefined;
    ForgotPassword: undefined;
    NewsScreen: undefined;
    NewsDetail: undefined;
};

const Stack = createStackNavigator<AuthStackParamList>();

export const AuthNavigator: React.FC = () => {
    return (
        <Stack.Navigator
            initialRouteName="NewsDetail"
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen
                name="Login"
                component={LoginScreen}

            />
            <Stack.Screen
                name='JoinNow'
                component={JoinNow}

            />
            <Stack.Screen name='ForgotPassword' component={ForgotPassword} />
            <Stack.Screen name='NewsScreen' component={NewsScreen} />
            <Stack.Screen name='NewsDetail' component={NewsDetail} />
        </Stack.Navigator>
    );
};
