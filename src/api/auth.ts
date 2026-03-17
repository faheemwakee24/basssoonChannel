import { API_ENDPOINTS } from '../config/constants';
import { apiClient, ApiResponse } from './client';
import { User } from '../hooks/useAuth';

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

export interface AuthResponse {
    user: User;
    token: string;
    refreshToken: string;
}

export interface ApiError {
    message: string;
    code: string;
    status: number;
}

class AuthAPI {
    /**
     * Login with email and password
     */
    async login(credentials: LoginRequest): Promise<ApiResponse<AuthResponse>> {
        const response = await apiClient.post<AuthResponse>(
            API_ENDPOINTS.AUTH.LOGIN,
            credentials
        );

        // If login is successful, store the token
        if (response.data?.token) {
            apiClient.setToken(response.data.token);
        }

        return response;
    }

    /**
     * Register new user
     */
    async register(userData: RegisterRequest): Promise<ApiResponse<AuthResponse>> {
        const response = await apiClient.post<AuthResponse>(
            API_ENDPOINTS.AUTH.REGISTER,
            userData
        );

        // If registration is successful, store the token
        if (response.data?.token) {
            apiClient.setToken(response.data.token);
        }

        return response;
    }

    /**
     * Logout current user
     */
    async logout(): Promise<ApiResponse<void>> {
        const response = await apiClient.post<void>(API_ENDPOINTS.AUTH.LOGOUT);

        // Clear token on logout
        if (!response.error) {
            apiClient.setToken(null);
        }

        return response;
    }

    /**
     * Refresh authentication token
     */
    async refreshToken(token: string): Promise<ApiResponse<{ token: string }>> {
        // Temporarily set the token for the refresh request
        const previousToken = apiClient.getToken();
        apiClient.setToken(token);

        const response = await apiClient.post<{ token: string }>(
            API_ENDPOINTS.AUTH.REFRESH
        );

        // Update token if refresh is successful
        if (response.data?.token) {
            apiClient.setToken(response.data.token);
        } else {
            // Restore previous token if refresh fails
            apiClient.setToken(previousToken);
        }

        return response;
    }

    /**
     * Get user profile
     */
    async getProfile(): Promise<ApiResponse<User>> {
        return apiClient.get<User>(API_ENDPOINTS.USER.PROFILE);
    }

    /**
     * Update user profile
     */
    async updateProfile(userData: Partial<User>): Promise<ApiResponse<User>> {
        return apiClient.put<User>(
            API_ENDPOINTS.USER.UPDATE_PROFILE,
            userData
        );
    }
}

export const authAPI = new AuthAPI();
