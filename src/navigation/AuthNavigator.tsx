import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from '../screens/Auth/LoginScreen';
import { JoinNow } from '../screens/Auth/RegisterScreen';
import { ForgotPassword } from '@/screens/Auth/ForgotPassword';
import { NewsDetail, NewsScreen, SettingsScreen } from '@/screens';
import FingeringsScreen from '@/screens/Settings/FingeringsScreen';
import FingeringDetail from '@/screens/Settings/FingeringDetail';
import MusicDetail from '@/screens/Settings/MusicDetail';
import MasterClasses from '@/screens/Settings/MasterClasses';
import Notifications from '@/screens/Settings/Notifications';
import NotificationDetail from '@/screens/Settings/NotificationDetail';
import Subscriptions from '@/screens/Settings/Subscriptions';
import ProfileSetting from '@/screens/Settings/ProfileSetting';
import ChangePassword from '@/screens/Settings/ChangePassword';
import MySubscriptionDetail from '@/screens/Settings/MySubscriptionDetail';
import MyProfile from '@/screens/Settings/MyProfile';
import Explore from '@/screens/Explore';
import Dashboard from '@/screens/Dashboard';
import { MasterClassesDetail } from '@/screens/Settings/MasterClassesDetail';

export type AuthStackParamList = {
    Login: undefined;
    JoinNow: undefined;
    ForgotPassword: undefined;
    NewsScreen: undefined;
    NewsDetail: undefined;
    SettingsScreen: undefined;
    FingeringsScreen: undefined;
    FingeringDetail: undefined;
    MusicDetail: undefined;
    MasterClasses: undefined;
    Notifications: undefined;
    NotificationDetail: undefined;
    Subscriptions: undefined;
    ProfileSetting: undefined;
    ChangePassword: undefined;
    MySubscriptionDetail: undefined;
    MyProfile: undefined;
    Explore: undefined;
    Dashboard: undefined;
    MasterClassesDetail: undefined;
};

const Stack = createStackNavigator<AuthStackParamList>();

export const AuthNavigator: React.FC = () => {
    return (
        <Stack.Navigator
            initialRouteName="SettingsScreen"
            screenOptions={{ headerShown: false, animation: 'slide_from_right' }}
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
            <Stack.Screen name='SettingsScreen' component={SettingsScreen} />
            <Stack.Screen name='FingeringsScreen' component={FingeringsScreen} />
            <Stack.Screen name='FingeringDetail' component={FingeringDetail} />
            <Stack.Screen name='MusicDetail' component={MusicDetail} />
            <Stack.Screen name='MasterClasses' component={MasterClasses} />
            <Stack.Screen name='Notifications' component={Notifications} />
            <Stack.Screen name='NotificationDetail' component={NotificationDetail} />
            <Stack.Screen name='Subscriptions' component={Subscriptions} />
            <Stack.Screen name='ProfileSetting' component={ProfileSetting} />
            <Stack.Screen name='ChangePassword' component={ChangePassword} />
            <Stack.Screen name='MyProfile' component={MyProfile} />
            <Stack.Screen name='Dashboard' component={Dashboard} />
            <Stack.Screen name='Explore' component={Explore} />
            <Stack.Screen name='MySubscriptionDetail' component={MySubscriptionDetail} />
            <Stack.Screen name='MasterClassesDetail' component={MasterClassesDetail} />

        </Stack.Navigator>
    );
};
