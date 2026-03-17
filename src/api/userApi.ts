import {baseApi} from './baseApi';
import {API_ENDPOINTS, API_BASE_URL, API_VERSION_PREFIX} from '../constants/api';

/**
 * User API slice
 * Handles user-related endpoints
 */

// User Account Response
export interface UserAccountResponse {
  success: boolean;
  message: string;
  data: {
    user: {
      id: number;
      name: string;
      email: string;
      contact_number: string | null;
      country_id: number | null;
      address_line_1: string | null;
      address_line_2: string | null;
      postal_code: string | null;
      city: string | null;
      state: string | null;
      designation: string | null;
      profile_image: string | null;
      email_verified_at: string | null;
      is_admin: number;
      created_at: string;
      updated_at: string;
      status: number;
      slug: string;
      unique_uri: string | null;
      image: string | null;
      stripe_customer_id: string | null;
      last_viewed_item_id: number | null;
      current_plan_id: number | null;
      api_token_expires_at: string | null;
    };
  };
}

// Update Profile Request
export interface UpdateProfileRequest {
  name: string;
  contact_number: string;
  country_id: number;
  address_line_1: string;
  address_line_2?: string;
  postal_code: string;
  city: string;
  state: string;
}

// Update Profile Response
export interface UpdateProfileResponse {
  success: boolean;
  message: string;
  data?: {
    user: UserAccountResponse['data']['user'];
  };
}

// Change Profile Picture Request
export interface ChangeProfilePictureRequest {
  file: {
    uri: string;
    type: string;
    name: string;
  };
}

// Change Profile Picture Response
export interface ChangeProfilePictureResponse {
  success: boolean;
  message: string;
  data?: {
    user: UserAccountResponse['data']['user'];
  };
}

// Change Password Request
export interface ChangePasswordRequest {
  current_password: string;
  password: string;
  password_confirmation: string;
}

// Change Password Response
export interface ChangePasswordResponse {
  success: boolean;
  message: string;
}

/**
 * User API slice
 */
export const userApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    // Get user account data
    getUserAccount: builder.query<UserAccountResponse, void>({
      query: () => {
        console.log('[UserAPI] Get user account request');
        return {
          url: API_ENDPOINTS.USER.ACCOUNT,
          method: 'GET',
        };
      },
      providesTags: ['User'],
    }),
    // Update user profile
    updateProfile: builder.mutation<UpdateProfileResponse, UpdateProfileRequest>({
      query: (body) => {
        console.log('[UserAPI] Update profile request', body);
        return {
          url: API_ENDPOINTS.USER.PROFILE,
          method: 'PUT',
          body,
        };
      },
      invalidatesTags: ['User'],
    }),
    // Change profile picture
    changeProfilePicture: builder.mutation<ChangeProfilePictureResponse, ChangeProfilePictureRequest>({
      queryFn: async ({file}) => {
        try {
          // Get auth token for this request
          const {tokenStorage} = await import('../utils/tokenStorage');
          const token = await tokenStorage.getAccessToken();

          const formData = new FormData();
          formData.append('image', {
            uri: file.uri,
            type: file.type,
            name: file.name,
          } as any);

          // Prepare headers - don't set Content-Type for FormData
          // React Native will automatically set it with boundary for multipart/form-data
          const headers: Record<string, string> = {
            'Accept': 'application/json',
          };
          
          if (token) {
            headers['authorization'] = `Bearer ${token}`;
          }

          // Make the fetch request directly to handle FormData properly
          const uploadUrl = `${API_BASE_URL}${API_VERSION_PREFIX}${API_ENDPOINTS.USER.CHANGE_PICTURE}`;
          console.log('[UserAPI] Uploading profile picture to:', uploadUrl);
          console.log('[UserAPI] File info:', { uri: file.uri, type: file.type, name: file.name });
          
          const response = await fetch(uploadUrl, {
            method: 'POST',
            headers,
            body: formData,
          });

          console.log('[UserAPI] Upload response status:', response.status, response.statusText);
          const data = await response.json();
          console.log('[UserAPI] Upload response data:', JSON.stringify(data, null, 2));

          if (!response.ok) {
            return {
              error: {
                status: response.status,
                data: data,
              },
            };
          }

          return {data};
        } catch (error: any) {
          return {
            error: {
              status: 'FETCH_ERROR',
              error: error.message || 'Failed to upload profile picture',
            },
          };
        }
      },
      invalidatesTags: ['User'],
    }),
    // Change password
    changePassword: builder.mutation<ChangePasswordResponse, ChangePasswordRequest>({
      query: (body) => {
        console.log('[UserAPI] Change password request');
        return {
          url: API_ENDPOINTS.USER.CHANGE_PASSWORD,
          method: 'PUT',
          body,
        };
      },
    }),
  }),
});

// Export hooks for usage in components
export const {
  useGetUserAccountQuery,
  useLazyGetUserAccountQuery,
  useUpdateProfileMutation,
  useChangeProfilePictureMutation,
  useChangePasswordMutation,
} = userApi;
