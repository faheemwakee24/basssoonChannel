import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Svgs } from '@/assets/icons/Svgs';
import { NewsScreen, NewsDetail } from '../screens';
import Explore from '../screens/Explore';
import { VideoScreen } from '../screens/VideoScreen';
import { AudioScreen } from '../screens/AudioScreen';
import { ProfileScreen } from '../screens/Settings/ProfileScreen';
import { SettingsScreen } from '../screens/Settings/SettingsScreen';
import MyProfile from '../screens/Settings/MyProfile';
import ProfileMenuScreen from '../screens/Settings/ProfileMenuScreen';
import AboutUsScreen from '../screens/Settings/AboutUsScreen';
import FAQScreen from '../screens/Settings/FAQScreen';
import PartnersScreen from '../screens/Settings/PartnersScreen';
import LegalAreaScreen from '../screens/Settings/LegalAreaScreen';
import Dashboard from '@/screens/Dashboard';
import AudioSubcattegories from '@/screens/Settings/AudioSubcattegories';
import CategoryItemsScreen from '@/screens/Settings/CategoryItemsScreen';
import CategoryItemDetailScreen from '@/screens/Settings/CategoryItemDetailScreen';
import type { AudioCategory, CategoryItem } from '@/api/categoriesApi';
import AudioSubcategoriesItem from '@/screens/Settings/SubcategoriesItem';
import AudioCategoryScreen from '@/screens/AudioCategory';
import Notifications from '@/screens/Settings/Notifications';
import NotificationDetail from '@/screens/Settings/NotificationDetail';
import { MasterClassesDetail } from '@/screens/Settings/MasterClassesDetail';
import MySubscriptionDetail from '@/screens/Settings/MySubscriptionDetail';
import { ChangePassword } from '@/screens/Settings/ChangePassword';
import { ProfileSetting } from '@/screens/Settings/ProfileSetting';
import { Subscriptions } from '@/screens/Settings/Subscriptions';
import { MasterClasses } from '@/screens/Settings/MasterClasses';
import SubscriptionPlanDetail from '@/screens/Settings/SubscriptionPlanDetail';
import FingeringsScreen from '@/screens/Settings/FingeringsScreen';
import FingeringDetail from '@/screens/Settings/FingeringDetail';
import Level2Screen from '@/screens/Settings/Level2Screen';
import Level3Screen from '@/screens/Settings/Level3Screen';
import LevelItemDetailScreen from '@/screens/Settings/LevelItemDetailScreen';
import MusicDetail from '@/screens/Settings/MusicDetail';
import { metrics } from '@/utils/metrics';
import { LoginScreen } from '../screens/Auth/LoginScreen';
import { JoinNow } from '../screens/Auth/RegisterScreen';
import { ForgotPassword } from '@/screens/Auth/ForgotPassword';
import { VerifyOtpScreen } from '@/screens/Auth/VerifyOtpScreen';
import { ResetPasswordScreen } from '@/screens/Auth/ResetPasswordScreen';

export type MainTabParamList = {
    Home: undefined;
    News: undefined;
    Explore: undefined;
    Video: undefined;
    Audio: undefined;
};

export type MainStackParamList = {
    MainTabs: undefined;
    Profile: undefined;
    Settings: undefined;
    MyProfile: undefined;
    ProfileMenu: undefined;
    AboutUs: undefined;
    FAQ: undefined;
    Partners: undefined;
    LegalArea: undefined;
    AudioSubcattegories: { section: AudioCategory };
    AudioSubcategoriesItem: any;
    CategoryItems: {
        categorySlug: string;
        subcategorySlug: string;
        type: string;
        subcategoryName?: string;
    };
    CategoryItemDetail: { item: CategoryItem };
    NewsScreen: undefined;
    NewsDetail: { slug: string };
    SettingsScreen: undefined;
    FingeringsScreen: undefined;
    FingeringDetail: undefined;
    MusicDetail: { slug: string };
    MasterClasses: { title?: string; slug1?: string; slug2?: string; slug3?: string; data?: unknown };
    Notifications: undefined;
    NotificationDetail: { title?: string; body?: string };
    Subscriptions: undefined;
    SubscriptionPlanDetail: { initialIndex?: number };
    ProfileSetting: undefined;
    ChangePassword: undefined;

    Dashboard: undefined;
    Explore: undefined;
    MySubscriptionDetail: undefined;
    MasterClassesDetail: undefined;
    Level2: { slug: string };
    Level3: { slug1: string; slug2: string };
    LevelItemDetail: { item: import('@/api/levelsApi').LevelItemRow };
    Bookmarks: undefined;
    Login: undefined;
    JoinNow: undefined;
    VerifyOtp: { email: string; flow?: 'register' | 'reset' };
    ForgotPassword: undefined;
    ResetPassword: { email: string; reset_token: string };
    AudioCategory: undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();
const Stack = createStackNavigator<MainStackParamList>();

const tabBarOptions = {
    tabBarStyle: {
        backgroundColor: '#000000',
        borderTopWidth: 0,
        paddingTop: 8,
        paddingBottom: 8,
        height: metrics.width(80),

    } as const,
    tabBarActiveTintColor: '#D80E43',
    tabBarInactiveTintColor: '#ffffff',
    tabBarLabelStyle: {
        fontSize: 12,
        fontWeight: '500' as const,
    },
};

const stackScreenOptions = {
    headerStyle: { backgroundColor: '#ffffff', borderBottomWidth: 1, borderBottomColor: '#e2e8f0' },
    headerTintColor: '#0f172a',
    headerTitleStyle: { fontWeight: '600' as const, fontSize: 18 },
    headerBackTitleVisible: false,
};

const getTabIcon = (routeName: string, color: string, size: number) => {
    const iconProps = { width: size, height: size, fill: '#ffffff' };
    switch (routeName) {
        case 'Home':
            return <Svgs.HomeIcon {...iconProps} />;
        case 'News':
            return <Svgs.NewsIcon {...iconProps} />;
        case 'Explore':
            return <Svgs.ExploreIcon {...iconProps} />;
        case 'Video':
            return <Svgs.VideoIcon {...iconProps} />;
        case 'Audio':
            return <Svgs.MusicIcon {...iconProps} />;
        default:
            return <Svgs.ExploreIcon {...iconProps} />;
    }
};

const renderCommonScreens = () => (
    <>
        <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profile' }} />
        <Stack.Screen name="Settings" component={SettingsScreen} options={{ title: 'Settings' }} />

        <Stack.Screen name="AudioSubcategoriesItem" component={AudioSubcategoriesItem} options={{ headerShown: false }} />
        <Stack.Screen name="CategoryItems" component={CategoryItemsScreen} options={{ headerShown: false }} />
        <Stack.Screen name="CategoryItemDetail" component={CategoryItemDetailScreen} options={{ headerShown: false }} />

        <Stack.Screen name='NewsDetail' component={NewsDetail} options={{ headerShown: false }} />
        <Stack.Screen name='FingeringsScreen' component={FingeringsScreen} options={{ headerShown: false }} />
        <Stack.Screen name='FingeringDetail' component={FingeringDetail} options={{ headerShown: false }} />
        <Stack.Screen name='MusicDetail' component={MusicDetail} options={{ headerShown: false }} />
        <Stack.Screen name='MasterClasses' component={MasterClasses} options={{ headerShown: false }} />
        <Stack.Screen name='Notifications' component={Notifications} options={{ headerShown: false }} />
        <Stack.Screen name='NotificationDetail' component={NotificationDetail} options={{ headerShown: false }} />
        <Stack.Screen name='Subscriptions' component={Subscriptions} options={{ headerShown: false }} />
        <Stack.Screen name='SubscriptionPlanDetail' component={SubscriptionPlanDetail} options={{ headerShown: false }} />
        <Stack.Screen name='ProfileSetting' component={ProfileSetting} options={{ headerShown: false }} />
        <Stack.Screen name='ChangePassword' component={ChangePassword} options={{ headerShown: false }} />
        <Stack.Screen name='ProfileMenu' component={ProfileMenuScreen} options={{ headerShown: false }} />
        <Stack.Screen name='AboutUs' component={AboutUsScreen} options={{ headerShown: false }} />
        <Stack.Screen name='FAQ' component={FAQScreen} options={{ headerShown: false }} />
        <Stack.Screen name='Partners' component={PartnersScreen} options={{ headerShown: false }} />
        <Stack.Screen name='LegalArea' component={LegalAreaScreen} options={{ headerShown: false }} />
        <Stack.Screen name='MyProfile' component={MyProfile} options={{ headerShown: false }} />
        <Stack.Screen name='MySubscriptionDetail' component={MySubscriptionDetail} options={{ headerShown: false }} />
        <Stack.Screen name='MasterClassesDetail' component={MasterClassesDetail} options={{ headerShown: false }} />
        <Stack.Screen name='Level2' component={Level2Screen} options={{ headerShown: false }} />
        <Stack.Screen name='Level3' component={Level3Screen} options={{ headerShown: false }} />
        <Stack.Screen name='LevelItemDetail' component={LevelItemDetailScreen} options={{ headerShown: false }} />
        <Stack.Screen name='AudioSubcattegories' component={AudioSubcattegories} options={{ headerShown: false }} />
        <Stack.Screen name='Bookmarks' component={require('@/screens/Settings/BookmarksScreen').default} options={{ headerShown: false }} />
    </>
);

const HomeStack = () => (
    <Stack.Navigator screenOptions={stackScreenOptions}>
        <Stack.Screen name="Dashboard" component={Dashboard} options={{ headerShown: false }} />
        {renderCommonScreens()}
    </Stack.Navigator>
);

const NewsStack = () => (
    <Stack.Navigator screenOptions={stackScreenOptions}>
        <Stack.Screen name="NewsScreen" component={NewsScreen} options={{ headerShown: false }} />
        {renderCommonScreens()}
    </Stack.Navigator>
);

const ExploreStack = () => (
    <Stack.Navigator screenOptions={stackScreenOptions}>
        <Stack.Screen name="SettingsScreen" component={SettingsScreen} options={{ headerShown: false }} />
        {renderCommonScreens()}
    </Stack.Navigator>
);

const VideoStack = () => (
    <Stack.Navigator screenOptions={stackScreenOptions}>
        <Stack.Screen name="Explore" component={Explore} options={{ headerShown: false }} />
        {renderCommonScreens()}
    </Stack.Navigator>
);

const AudioStack = () => (
    <Stack.Navigator screenOptions={stackScreenOptions}>
        <Stack.Screen name="AudioCategory" component={AudioCategoryScreen} options={{ headerShown: false }} />
        {renderCommonScreens()}
    </Stack.Navigator>
);

const MainTabs: React.FC = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                ...tabBarOptions,
                headerShown: false,
                tabBarIcon: ({ color, size }) => getTabIcon(route.name, color, size),
            })}
        >
            <Tab.Screen name="Home" component={HomeStack} options={{ tabBarLabel: 'Home' }} />
            <Tab.Screen name="News" component={NewsStack} options={{ tabBarLabel: 'News' }} />
            <Tab.Screen name="Explore" component={ExploreStack} options={{ tabBarLabel: 'Explore' }} />
            <Tab.Screen name="Video" component={VideoStack} options={{ tabBarLabel: 'Video' }} />
            <Tab.Screen name="Audio" component={AudioStack} options={{ tabBarLabel: 'Audio' }} />
        </Tab.Navigator>
    );
};

export const MainNavigator: React.FC = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="MainTabs" component={MainTabs} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="JoinNow" component={JoinNow} />
            <Stack.Screen name="VerifyOtp" component={VerifyOtpScreen} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
            <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
        </Stack.Navigator>
    );
};
