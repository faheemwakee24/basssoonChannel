import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from '../screens/Auth/LoginScreen';
import { JoinNow } from '../screens/Auth/RegisterScreen';
import { ForgotPassword } from '@/screens/Auth/ForgotPassword';
import { VerifyOtpScreen } from '@/screens/Auth/VerifyOtpScreen';
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
import SubscriptionPlanDetail from '@/screens/Settings/SubscriptionPlanDetail';
import MyProfile from '@/screens/Settings/MyProfile';
import ProfileMenuScreen from '@/screens/Settings/ProfileMenuScreen';
import Explore from '@/screens/Explore';
import Dashboard from '@/screens/Dashboard';
import { MasterClassesDetail } from '@/screens/Settings/MasterClassesDetail';
import Level2Screen from '@/screens/Settings/Level2Screen';
import Level3Screen from '@/screens/Settings/Level3Screen';
import LevelItemDetailScreen from '@/screens/Settings/LevelItemDetailScreen';
import AudioSubcattegories from '@/screens/Settings/AudioSubcattegories';
import { ResetPasswordScreen } from '@/screens/Auth/ResetPasswordScreen';

export type AuthStackParamList = {
    Login: undefined;
    JoinNow: undefined;
    VerifyOtp: { email: string; flow?: 'register' | 'reset' };
    ForgotPassword: undefined;
    ResetPassword: { email: string; reset_token: string };
    NewsScreen: undefined;
    NewsDetail: { slug: string };
    SettingsScreen: undefined;
    FingeringsScreen: undefined;
    FingeringDetail: undefined;
    MusicDetail: { slug: string };
    MasterClasses: { title?: string; slug1?: string; slug2?: string; slug3?: string; data?: unknown };
    Notifications: undefined;
    NotificationDetail: undefined;
    Subscriptions: undefined;
    SubscriptionPlanDetail: { initialIndex?: number };
    ProfileSetting: undefined;
    ChangePassword: undefined;
    MySubscriptionDetail: undefined;
    MyProfile: undefined;
    ProfileMenu: undefined;
    Explore: undefined;
    Dashboard: undefined;
    MasterClassesDetail: undefined;
    Level2: { slug: string };
    Level3: { slug1: string; slug2: string };
    LevelItemDetail: { item: import('@/api/levelsApi').LevelItemRow };
    AudioSubcattegories: undefined;
    Bookmarks: undefined;
};

const Stack = createStackNavigator<AuthStackParamList>();

export const AuthNavigator: React.FC = () => {
    return (
        <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{ headerShown: false, animation: 'slide_from_right' }}
        >
            <Stack.Screen
                name="Login"
                component={LoginScreen}

            />
            <Stack.Screen name='JoinNow' component={JoinNow} />
            <Stack.Screen name='VerifyOtp' component={VerifyOtpScreen} />
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
            <Stack.Screen name='SubscriptionPlanDetail' component={SubscriptionPlanDetail} />
            <Stack.Screen name='ProfileSetting' component={ProfileSetting} />
            <Stack.Screen name='ChangePassword' component={ChangePassword} />
            <Stack.Screen name='ProfileMenu' component={ProfileMenuScreen} />
            <Stack.Screen name='MyProfile' component={MyProfile} />
            <Stack.Screen name='Dashboard' component={Dashboard} />
            <Stack.Screen name='Explore' component={Explore} />
            <Stack.Screen name='MySubscriptionDetail' component={MySubscriptionDetail} />
            <Stack.Screen name='MasterClassesDetail' component={MasterClassesDetail} />
            <Stack.Screen name='Level2' component={Level2Screen} />
            <Stack.Screen name='Level3' component={Level3Screen} />
            <Stack.Screen name='LevelItemDetail' component={LevelItemDetailScreen} />
            <Stack.Screen name='AudioSubcattegories' component={AudioSubcattegories} />
            <Stack.Screen name='Bookmarks' component={require('@/screens/Settings/BookmarksScreen').default} />
            <Stack.Screen name='ResetPassword' component={ResetPasswordScreen} />

        </Stack.Navigator>
    );
};
