import { SCREEN_NAMES } from './constants';

// Navigation configuration
export const NAVIGATION_CONFIG = {
    // Tab bar configuration
    TAB_BAR: {
        activeTintColor: '#0ea5e9',
        inactiveTintColor: '#94a3b8',
        style: {
            backgroundColor: '#ffffff',
            borderTopWidth: 1,
            borderTopColor: '#e2e8f0',
            paddingTop: 8,
            paddingBottom: 8,
            height: 60,
        },
        labelStyle: {
            fontSize: 12,
            fontWeight: '500',
        },
    },

    // Stack navigation configuration
    STACK_OPTIONS: {
        headerStyle: {
            backgroundColor: '#ffffff',
            borderBottomWidth: 1,
            borderBottomColor: '#e2e8f0',
        },
        headerTintColor: '#0f172a',
        headerTitleStyle: {
            fontWeight: '600',
            fontSize: 18,
        },
        headerBackTitleVisible: false,
    },

    // Modal configuration
    MODAL_OPTIONS: {
        presentation: 'modal' as const,
        headerShown: true,
        headerStyle: {
            backgroundColor: '#ffffff',
            borderBottomWidth: 1,
            borderBottomColor: '#e2e8f0',
        },
        headerTintColor: '#0f172a',
        headerTitleStyle: {
            fontWeight: '600',
            fontSize: 18,
        },
        headerBackTitleVisible: false,
    },
};

// Screen options for different screen types
export const getScreenOptions = (screenType: 'stack' | 'tab' | 'modal' = 'stack') => {
    switch (screenType) {
        case 'tab':
            return NAVIGATION_CONFIG.TAB_BAR;
        case 'modal':
            return NAVIGATION_CONFIG.MODAL_OPTIONS;
        default:
            return NAVIGATION_CONFIG.STACK_OPTIONS;
    }
};