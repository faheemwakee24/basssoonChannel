import AsyncStorage from '@react-native-async-storage/async-storage';
import { baseApi } from './baseApi';
import { API_ENDPOINTS } from '../constants/api';
import { STORAGE_KEYS } from '../config/constants';
import { logout as logoutAction } from '../store/slices/authSlice';

/**
 * Auth API slice
 * Handles authentication-related endpoints
 */

// Login Request/Response
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  agree_terms: string | number;
  agree_policy: string | number;
}

export interface VerifyOtpRequest {
  email: string;
  otp: string;
}

export interface ResendOtpRequest {
  email: string;
}

export interface VerifyOtpResponse {
  success: boolean;
  message: string;
  data?: {
    user?: User;
    token?: string;
    token_expires_at?: string;
  };
}

export interface ResendOtpResponse {
  success: boolean;
  message: string;
  data?: { message?: string };
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ForgotPasswordResponse {
  success: boolean;
  message: string;
  data?: { message?: string };
}

export interface VerifyResetOtpResponse {
  success: boolean;
  message: string;
  data?: {
    reset_token?: string;
    message?: string;
  };
}

export interface ResetPasswordRequest {
  reset_token: string;
  password: string;
  password_confirmation: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    user_id?: number;
    user: {
      id: number;
      name: string;
      email: string;
      contact_number?: string | null;
      country_id?: number | null;
      address_line_1?: string | null;
      address_line_2?: string | null;
      postal_code?: string | null;
      city?: string | null;
      state?: string | null;
      designation?: string | null;
      profile_image?: string | null;
      email_verified_at?: string | null;
      is_admin: number;
      created_at: string;
      updated_at: string;
      status: number;
      slug: string;
      unique_uri?: string | null;
      image?: string | null;
      stripe_customer_id?: string | null;
      last_viewed_item_id?: number | null;
      current_plan_id?: number | null;
      api_token_expires_at?: string | null;
    };
    token: string;
    token_expires_at: string;
  };
}

export interface RefreshTokenResponse {
  token: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  contact_number?: string | null;
  country_id?: number | null;
  address_line_1?: string | null;
  address_line_2?: string | null;
  postal_code?: string | null;
  city?: string | null;
  state?: string | null;
  designation?: string | null;
  profile_image?: string | null;
  email_verified_at?: string | null;
  is_admin: number;
  created_at: string;
  updated_at: string;
  status: number;
  slug: string;
  unique_uri?: string | null;
  image?: string | null;
  stripe_customer_id?: string | null;
  last_viewed_item_id?: number | null;
  current_plan_id?: number | null;
  api_token_expires_at?: string | null;
}

/**
 * Auth API slice
 */
export const authApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    // Login with email and password
    login: builder.mutation<AuthResponse, LoginRequest>({
      query: body => {
        console.log('[AuthAPI] Login request:', JSON.stringify(body, null, 2));
        return {
          url: API_ENDPOINTS.AUTH.LOGIN,
          method: 'POST',
          body,
        };
      },
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data?.data?.token) {
            const { tokenStorage } = await import('../utils/tokenStorage');
            await tokenStorage.setAccessToken(data.data.token);
          }
          if (data?.data?.user) {
            await AsyncStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(data.data.user));
          }
        } catch (error) {
          console.error('[AuthAPI] Login failed:', error);
        }
      },
      invalidatesTags: ['Auth', 'User'],
    }),

    // Register new user (may return OTP flow: data.user_id, no token)
    register: builder.mutation<AuthResponse | { success: boolean; message: string; data: { user_id: number; message: string } }, RegisterRequest>({
      query: body => {
        console.log('[AuthAPI] Register request:', JSON.stringify(body, null, 2));
        return {
          url: API_ENDPOINTS.AUTH.REGISTER,
          method: 'POST',
          body,
        };
      },
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const authData = data as AuthResponse;
          if (authData?.data?.token) {
            const { tokenStorage } = await import('../utils/tokenStorage');
            await tokenStorage.setAccessToken(authData.data.token);
          }
          if (authData?.data?.user) {
            await AsyncStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(authData.data.user));
          }
        } catch (error) {
          console.error('[AuthAPI] Register failed:', error);
        }
      },
      invalidatesTags: ['Auth', 'User'],
    }),

    // Verify OTP (email verification after register)
    verifyOtp: builder.mutation<VerifyOtpResponse, VerifyOtpRequest>({
      query: body => ({
        url: API_ENDPOINTS.AUTH.VERIFY_OTP,
        method: 'POST',
        body,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data?.data?.token) {
            const { tokenStorage } = await import('../utils/tokenStorage');
            await tokenStorage.setAccessToken(data.data.token);
          }
          if (data?.data?.user) {
            await AsyncStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(data.data.user));
          }
        } catch (error) {
          console.error('[AuthAPI] Verify OTP failed:', error);
        }
      },
      invalidatesTags: ['Auth', 'User'],
    }),

    // Resend OTP to email
    resendOtp: builder.mutation<ResendOtpResponse, ResendOtpRequest>({
      query: body => ({
        url: API_ENDPOINTS.AUTH.RESEND_OTP,
        method: 'POST',
        body,
      }),
    }),

    // Forgot password – sends reset OTP to email
    forgotPassword: builder.mutation<ForgotPasswordResponse, ForgotPasswordRequest>({
      query: body => ({
        url: API_ENDPOINTS.AUTH.FORGOT_PASSWORD,
        method: 'POST',
        body,
      }),
    }),

    // Verify reset OTP (for password reset flow)
    verifyResetOtp: builder.mutation<VerifyResetOtpResponse, VerifyOtpRequest>({
      query: body => ({
        url: API_ENDPOINTS.AUTH.VERIFY_RESET_OTP,
        method: 'POST',
        body,
      }),
    }),

    // Reset password using token
    resetPassword: builder.mutation<{ success: boolean; message: string; data: any }, ResetPasswordRequest>({
      query: body => ({
        url: API_ENDPOINTS.AUTH.RESET_PASSWORD,
        method: 'POST',
        body,
      }),
    }),

    // Logout current user
    logout: builder.mutation<void, void>({
      query: () => {
        console.log('[AuthAPI] Logout request');
        return {
          url: API_ENDPOINTS.AUTH.LOGOUT,
          method: 'POST',
        };
      },
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          console.error('[AuthAPI] Logout failed:', error);
        } finally {
          const { tokenStorage } = await import('../utils/tokenStorage');
          await tokenStorage.clearAccessToken();
          await AsyncStorage.removeItem(STORAGE_KEYS.USER_DATA);
          dispatch(logoutAction());
        }
      },
      invalidatesTags: ['Auth', 'User'],
    }),

    // Refresh authentication token
    refreshToken: builder.mutation<RefreshTokenResponse, void>({
      query: () => {
        console.log('[AuthAPI] Refresh token request');
        return {
          url: API_ENDPOINTS.AUTH.REFRESH_TOKEN,
          method: 'POST',
        };
      },
      async onQueryStarted(arg, {dispatch, queryFulfilled}) {
        try {
          const {data} = await queryFulfilled;
          // Update token after successful refresh
          if (data.token) {
            const {tokenStorage} = await import('../utils/tokenStorage');
            await tokenStorage.setAccessToken(data.token);
          }
        } catch (error) {
          console.error('[AuthAPI] Refresh token failed:', error);
        }
      },
    }),

    // Get user profile
    getProfile: builder.query<User, void>({
      query: () => {
        console.log('[AuthAPI] Get profile request');
        return {
          url: API_ENDPOINTS.USER.PROFILE,
          method: 'GET',
        };
      },
      providesTags: ['User'],
    }),

    // Update user profile
    updateProfile: builder.mutation<User, Partial<User>>({
      query: body => {
        console.log('[AuthAPI] Update profile request:', JSON.stringify(body, null, 2));
        return {
          url: API_ENDPOINTS.USER.UPDATE_PROFILE,
          method: 'PUT',
          body,
        };
      },
      invalidatesTags: ['User'],
    }),
  }),
});

// Export hooks for usage in components
export const {
  useLoginMutation,
  useRegisterMutation,
  useVerifyOtpMutation,
  useResendOtpMutation,
  useForgotPasswordMutation,
  useVerifyResetOtpMutation,
  useResetPasswordMutation,
  useLogoutMutation,
  useRefreshTokenMutation,
  useGetProfileQuery,
  useLazyGetProfileQuery,
  useUpdateProfileMutation,
} = authApi;
