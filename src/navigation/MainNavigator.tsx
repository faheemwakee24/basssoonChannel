import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { SCREEN_NAMES } from '../config/constants';
import { getScreenOptions } from '../config/navigation';
import { HomeScreen } from '../screens/HomeScreen';
import { ProfileScreen } from '../screens/Settings/ProfileScreen';
import { SettingsScreen } from '../screens/Settings/SettingsScreen';

export type MainTabParamList = {
    Dashboard: undefined;
    Wallet: undefined;
    Transactions: undefined;
    Notifications: undefined;
};

export type MainStackParamList = {
    MainTabs: undefined;
    Profile: undefined;
    Settings: undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();
const Stack = createStackNavigator<MainStackParamList>();

const MainTabs: React.FC = () => {
    return (
        <Tab.Navigator
            screenOptions={getScreenOptions('tab')}
        >
            <Tab.Screen
                name="Dashboard"
                component={HomeScreen}
                options={{
                    title: 'Dashboard',
                    tabBarLabel: 'Home',
                }}
            />
            <Tab.Screen
                name="Wallet"
                component={HomeScreen} // TODO: Replace with actual WalletScreen
                options={{
                    title: 'Wallet',
                    tabBarLabel: 'Wallet',
                }}
            />
            <Tab.Screen
                name="Transactions"
                component={HomeScreen} // TODO: Replace with actual TransactionsScreen
                options={{
                    title: 'Transactions',
                    tabBarLabel: 'Transactions',
                }}
            />
            <Tab.Screen
                name="Notifications"
                component={HomeScreen} // TODO: Replace with actual NotificationsScreen
                options={{
                    title: 'Notifications',
                    tabBarLabel: 'Notifications',
                }}
            />
        </Tab.Navigator>
    );
};

export const MainNavigator: React.FC = () => {
    return (
        <Stack.Navigator
            screenOptions={getScreenOptions('stack')}
        >
            <Stack.Screen
                name="MainTabs"
                component={MainTabs}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    title: 'Profile',
                }}
            />
            <Stack.Screen
                name="Settings"
                component={SettingsScreen}
                options={{
                    title: 'Settings',
                }}
            />
        </Stack.Navigator>
    );
};
