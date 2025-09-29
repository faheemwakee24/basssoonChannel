import { API_BASE_URL, API_ENDPOINTS } from '../config/constants';
import { User } from '../hooks/useAuth';

export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    email: string;
    password: string;
    name: string;
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
    private baseURL: string;

    constructor() {
        this.baseURL = API_BASE_URL;
    }

    private async request<T>(
        endpoint: string,
        options: RequestInit = {}
    ): Promise<T> {
        const url = `${this.baseURL}${endpoint}`;

        const defaultHeaders = {
            'Content-Type': 'application/json',
        };

        const config: RequestInit = {
            ...options,
            headers: {
                ...defaultHeaders,
                ...options.headers,
            },
        };

        try {
            const response = await fetch(url, config);

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('API request failed:', error);
            throw error;
        }
    }

    async login(credentials: LoginRequest): Promise<AuthResponse> {
        return this.request<AuthResponse>(API_ENDPOINTS.AUTH.LOGIN, {
            method: 'POST',
            body: JSON.stringify(credentials),
        });
    }

    async register(userData: RegisterRequest): Promise<AuthResponse> {
        return this.request<AuthResponse>(API_ENDPOINTS.AUTH.REGISTER, {
            method: 'POST',
            body: JSON.stringify(userData),
        });
    }

    async logout(): Promise<void> {
        return this.request<void>(API_ENDPOINTS.AUTH.LOGOUT, {
            method: 'POST',
        });
    }

    async refreshToken(token: string): Promise<{ token: string }> {
        return this.request<{ token: string }>(API_ENDPOINTS.AUTH.REFRESH, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    }

    async getProfile(token: string): Promise<User> {
        return this.request<User>(API_ENDPOINTS.USER.PROFILE, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    }

    async updateProfile(token: string, userData: Partial<User>): Promise<User> {
        return this.request<User>(API_ENDPOINTS.USER.UPDATE_PROFILE, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(userData),
        });
    }
}

export const authAPI = new AuthAPI();
