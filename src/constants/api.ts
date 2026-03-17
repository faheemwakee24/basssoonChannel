/**
 * API Configuration Constants
 * Base API URL from https://dubnxt.infyrolabs.com/docs
 */

// Base API URLs
export const API_BASE_URL = 'https://merge.bassonchannel.com';
export const NEWS_BASE_Image_URL = 'https://app.thebassoonchannel.com/public/uploads/news/full/'
export const FINGERINGS_BASE_Image_URL = 'https://app.thebassoonchannel.com/public/uploads/fingerings/main_image/'
export const FINGERINGS_BASE_Additional_Image_URL = 'https://app.thebassoonchannel.com/public/uploads/fingerings/additional_image/'
export const SUBSCRIPTION_PLAN_ICON_URL = 'https://app.thebassoonchannel.com/public/uploads/subscription-plans/icons/'
export const SUBSCRIPTION_BANNER_IMAGE_URL = 'https://app.thebassoonchannel.com/public/uploads/subscription-plans/banners/'
export const USER_PROFILE_IMAGE_URL = 'https://tbc-staging.mahrdanial.com/public/uploads/users/full/'
export const CATEGORIES_BASE_Image_URL = 'https://app.thebassoonchannel.com/public/uploads/category/full/'
export const BANNER_BASE_Image_URL = 'https://app.thebassoonchannel.com/public/uploads/banners/'
export const CATEGORY_ITEMS_BASE_Image_URL = 'https://app.thebassoonchannel.com/public/uploads/items/full/'
export const LEVEL_ITEMS_BASE_Image_URL = 'https://app.thebassoonchannel.com/public/uploads/level-items/'
export const LEVEL_ITEMS_BASE_Additional_Image_URL = 'https://app.thebassoonchannel.com/public/uploads/levelitems/full/'


// API version prefix
export const API_VERSION_PREFIX = '/api';

// Request timeout: 2400 seconds (40 minutes) in milliseconds
export const API_REQUEST_TIMEOUT_MS = 2400 * 1000;

// API Endpoints based on Swagger docs at https://dubnxt.infyrolabs.com/docs
export const API_ENDPOINTS = {
  // User endpoints
  USER: {
    LIST: '/users',
    CREATE: '/users',
    DETAIL: (id: string) => `/users/${id}`,
    UPDATE: (id: string) => `/users/${id}`,
    DELETE: (id: string) => `/users/${id}`,
    UPDATE_PROFILE: '/users/profile',
    ACCOUNT: '/user/account',
    PROFILE: '/user/profile',
    CHANGE_PICTURE: '/user/change-picture',
    CHANGE_PASSWORD: '/user/change-password',
    FCM_TOKEN: '/users/fcm-token',
    CREDITS: '/users/credits',
    CREDITS_DEDUCTIONS: '/users/credits/deductions',
    CREDITS_HISTORY: '/users/credits/history',
  },
  // Auth endpoints
  AUTH: {
    REGISTER: '/auth/register',
    VERIFY_OTP: '/auth/verify-otp',
    LOGIN: '/auth/login',
    SOCIAL_AUTH: '/auth/social-auth',
    REFRESH_TOKEN: '/auth/refresh-token',
    LOGOUT: '/auth/logout',
    RESEND_OTP: '/auth/resend-otp',
    PROFILE: '/auth/profile',
    FORGOT_PASSWORD: '/auth/forgot-password',
    VERIFY_RESET_OTP: '/auth/verify-reset-otp',
    RESET_PASSWORD: '/auth/reset-password',
  },
  // Project endpoints (add based on your Swagger docs)
  PROJECT: {
    LIST: '/projects',
    CREATE: '/projects',
    DETAIL: (id: string) => `/projects/${id}`,
    UPDATE: (id: string) => `/projects/${id}`,
    DELETE: (id: string) => `/projects/${id}`,
    VIDEOS: (id: string) => `/projects/${id}/videos`,
  },
  // Video endpoints (add based on your Swagger docs)
  VIDEO: {
    LIST: '/videos',
    UPLOAD: '/videos/upload',
    DETAIL: (id: string) => `/videos/${id}`,
    DELETE: (id: string) => `/videos/${id}`,
  },
  // Subscription endpoints
  SUBSCRIPTION: {
    LIST: '/subscriptions',
    PLANS: '/subscriptions/plans',
    BROWSE_OTHER_PLANS: '/subscriptions/browse-other-plans',
    ME: '/subscriptions/me',
    CHECKOUT: '/subscriptions/checkout',
    PURCHASE_PLAN: (slug: string) => `/subscriptions/purchase-plan/${slug}`,
    CONFIRM: '/subscriptions/confirm',
    CONFIRM_IOS: '/subscriptions/confirm-ios',
    CONFIRM_ANDROID: '/subscriptions/confirm-android',
    CANCEL: '/subscriptions/cancel',
    DETAIL: (id: string) => `/subscriptions/${id}`,
    CREATE: '/subscriptions',
    UPDATE: (id: string) => `/subscriptions/${id}`,
    CANCEL_BY_ID: (id: string) => `/subscriptions/${id}/cancel`,
  },
  // Payment endpoints
  PAYMENT: {
    PAYMENT_METHODS: '/payment-methods',
    PAYMENT_METHOD: (id: string) => `/payment-methods/${id}`,
    CREATE_PAYMENT_INTENT: '/payment-intents',
    CONFIRM_PAYMENT: (id: string) => `/payment-intents/${id}/confirm`,
    SETUP_INTENT: '/setup-intents',
  },
  // Heygen endpoints
  HEYGEN: {
    GET_ALL_AVATARS: '/heygen/getAllAvatars',
    GET_ALL_VOICES: '/heygen/getAllVoices',
    GET_ALL_VOICES_LOCALES: '/heygen/video_translate/getTargetLanguage',
    GENERATE_VIDEO: '/heygen/video/generate',
    GENERATE_AV4_VIDEO: '/heygen/video/av4/generate',
    VIDEO_TRANSLATE: '/heygen/video/translate',
    VIDEO_TRANSLATE_STATUS: (videoTranslateId: string) => `/heygen/video/translate/${videoTranslateId}`,
    VIDEO_STATUS: '/heygen/video/status',
    MAKE_YOUR_OWN_CHARACTER: '/heygen/makeYourOwnCharacter',
    PHOTO_GENERATION: (generationId: string) => `/heygen/photo/generation/${generationId}`,
    PHOTO_AVATAR_GENERATIONS: (projectId: string) => `/heygen/photo-avatar-generations/project/${projectId}`,
    VIDEO_TRANSLATIONS: (projectId: string) => `/heygen/video-translations/project/${projectId}`,
    UPLOAD_ASSET: '/heygen/asset/upload',
    GET_ASSET_UPLOADS: '/heygen/asset/uploads',
    USER_GENERATIONS: '/heygen/user-generations',
    RECENT_CREATIONS: '/heygen/recent-creations',
    GET_GROUPED_AVATARS: '/heygen/getGroupedAvatars',
    DASHBOARD_STATS: '/heygen/dashboard/stats',
    DELETE_IMAGE_UPLOAD: (id: string) => `/heygen/image-upload/${id}`,
    DELETE_VIDEO_TRANSLATION: (id: string) => `/heygen/video-translation/${id}`,
    DELETE_PHOTO_AVATAR_GENERATION: (id: string) => `/heygen/photo-avatar-generation/${id}`,
    DELETE_GENERATE_AVATAR_VIDEO: (id: string) => `/heygen/generate-avatar-video/${id}`,
  },
  // Character endpoints
  CHARACTER: {
    UPLOAD_IMAGE: '/gcp/upload',
    CREATE_VIDEO: '/character-speaking/create-video',
    VIDEO_STATUS: (talkId: string) => `/character-speaking/video-status/${talkId}`,
  },
  // Notifications endpoints
  NOTIFICATIONS: {
    LIST: '/notifications',
    MARK_AS_READ: (id: string) => `/notifications/${id}/read`,
    MARK_ALL_AS_READ: '/notifications/read-all',
  },
  // Support endpoints
  SUPPORT: {
    REQUEST: '/support/request',
  },
  // Admin Auth endpoints
  ADMIN_AUTH: {
    DELETE_USER: (userId: string) => `/auth/users/${userId}`,
  },
  // News endpoints
  NEWS: {
    LIST: '/news',
    DETAIL: (slug: string) => `/news/${slug}`,
  },
  // Fingerings endpoints
  FINGERINGS: {
    CATEGORIES: '/fingerings/categories',
    DETAIL: (slug: string) => `/fingerings/${slug}`,
    FINGERING_DETAIL: (slug: string) => `/fingerings/details/${slug}`,
  },
  // Categories (audio) endpoints
  CATEGORIES: {
    AUDIO: '/categories/all/audio',
    VIDEO: '/categories/all/video',
    ITEMS: (categorySlug: string, subcategorySlug: string, type: string) =>
      `/categories/${categorySlug}/subcategory/${subcategorySlug}/type/${type}/items`,
  },
  // Bookmarks
  BOOKMARKS: {
    TOGGLE: '/bookmarks/toggle',
    LIST: '/bookmarks',
  },
  // Levels (settings explore)
  LEVELS: {
    LEVEL1: '/levels/level1',
    LEVEL2: (slug: string) => `/levels/level2/${slug}`,
    LEVEL3: (slug1: string, slug2: string) => `/levels/level3/${slug1}/${slug2}`,
  },
  // Level items (MasterClasses list)
  LEVEL_ITEMS: {
    BY_SLUG1: (slug1: string) => `/levelitems/${slug1}`,
    BY_SLUG1_SLUG2: (slug1: string, slug2: string) => `/levelitems/${slug1}/${slug2}`,
    BY_SLUG1_SLUG2_SLUG3: (slug1: string, slug2: string, slug3: string) =>
      `/levelitems/${slug1}/${slug2}/${slug3}`,
  },
  // Items details
  ITEMS: {
    DETAILS: (slug: string) => `/items/details/${slug}`,
  },
  // Home / general endpoints
  HOME: {
    DATA: '/home',
    FAQ: '/home/faq',
  },
} as const;
