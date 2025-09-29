// Environment configuration
export const ENV = {
    // App environment
    NODE_ENV: 'development', // React Native doesn't have process.env by default
    IS_DEV: __DEV__,
    IS_PROD: !__DEV__,

    // API configuration
    API_BASE_URL: __DEV__ ? 'http://localhost:3000' : 'https://api.bassoonchannel.com',
    API_TIMEOUT: 10000, // 10 seconds

    // Feature flags
    FEATURES: {
        ENABLE_ANALYTICS: !__DEV__,
        ENABLE_CRASH_REPORTING: !__DEV__,
        ENABLE_DEBUG_MENU: __DEV__,
    },

    // App configuration
    APP: {
        NAME: 'Bassoon Channel',
        VERSION: '1.0.0',
        BUILD_NUMBER: '1',
    },
};

// Validate required environment variables
export const validateEnv = () => {
    const requiredVars = ['API_BASE_URL'];
    const missing = requiredVars.filter(varName => !ENV[varName as keyof typeof ENV]);

    if (missing.length > 0) {
        console.warn(`Missing environment variables: ${missing.join(', ')}`);
    }
};

// Initialize environment validation
if (__DEV__) {
    validateEnv();
}