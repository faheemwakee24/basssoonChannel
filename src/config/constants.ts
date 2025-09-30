// App-wide constants
export const APP_CONFIG = {
    APP_NAME: 'Bassoon Channel',
    VERSION: '1.0.0',
};

export const API_BASE_URL = __DEV__ ? 'http://localhost:3000' : 'https://api.bassoonchannel.com';

export const STORAGE_KEYS = {
    AUTH_TOKEN: 'auth_token',
    USER_DATA: 'user_data',
    THEME: 'theme',
    LANGUAGE: 'language',
};

export const SCREEN_NAMES = {
    // Auth Screens
    LOGIN: 'Login',
    JoinNow: 'JoinNow',
    ForgotPassword: 'ForgotPassword',
    SettingsScreen: 'SettingsScreen',
    FingeringsScreen: 'FingeringsScreen',
    FingeringDetail: 'FingeringDetail',
    MusicDetail: 'MusicDetail',
    MasterClasses: 'MasterClasses',
    Notifications: 'Notifications',
    NotificationDetail: 'NotificationDetail',
    Subscriptions: 'Subscriptions',
    MyProfile: 'MyProfile',
    Explore: 'Explore',
    Dashboard: 'Dashboard',
    ProfileSetting: 'ProfileSetting',
    ChangePassword: 'ChangePassword',
    MySubscriptionDetail: 'MySubscriptionDetail',
    MasterClassesDetail: 'MasterClassesDetail'
};

export const VALIDATION_RULES = {
    EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    PASSWORD_MIN_LENGTH: 8,
    PHONE_REGEX: /^\+?[\d\s\-()]+$/,
};

export const API_ENDPOINTS = {
    AUTH: {
        LOGIN: '/auth/login',
        REGISTER: '/auth/register',
        LOGOUT: '/auth/logout',
        REFRESH: '/auth/refresh',
    },
    USER: {
        PROFILE: '/user/profile',
        UPDATE_PROFILE: '/user/profile',
    },
};