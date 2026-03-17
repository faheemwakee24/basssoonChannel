import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS, API_BASE_URL } from '../config/constants';
import { API_REQUEST_TIMEOUT_MS } from '../constants/api';

export interface ApiError {
    message: string;
    code: string;
    status: number;
}

export interface ApiResponse<T> {
    data?: T;
    error?: ApiError;
    status: number;
}

class ApiClient {
    private baseURL: string;
    private token: string | null = null;

    constructor() {
        this.baseURL = API_BASE_URL;
        this.initializeToken();
    }

    /**
     * Initialize token from storage
     */
    private async initializeToken() {
        try {
            this.token = await AsyncStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
        } catch (error) {
            console.error('Failed to initialize token:', error);
        }
    }

    /**
     * Set the authorization token
     */
    setToken(token: string | null) {
        this.token = token;
    }

    /**
     * Get the authorization token
     */
    getToken(): string | null {
        return this.token;
    }

    /**
     * Build headers with Authorization
     */
    private getHeaders(customHeaders: Record<string, string> = {}): Record<string, string> {
        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
            ...customHeaders,
        };

        if (this.token) {
            headers['Authorization'] = `Bearer ${this.token}`;
        }

        return headers;
    }

    /**
     * Fetch with timeout (2400 seconds). Aborts request and clears timer on completion.
     */
    private async fetchWithTimeout(
        url: string,
        init: RequestInit
    ): Promise<Response> {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), API_REQUEST_TIMEOUT_MS);
        try {
            const response = await fetch(url, {
                ...init,
                signal: controller.signal,
            });
            return response;
        } finally {
            clearTimeout(timeoutId);
        }
    }

    /**
     * Make a GET request
     */
    async get<T>(
        endpoint: string,
        options?: { headers?: Record<string, string> }
    ): Promise<ApiResponse<T>> {
        try {
            const url = `${this.baseURL}${endpoint}`;
            const headers = this.getHeaders(options?.headers);

            const response = await this.fetchWithTimeout(url, {
                method: 'GET',
                headers,
            });

            return this.handleResponse<T>(response);
        } catch (error) {
            return this.handleError<T>(error);
        }
    }

    /**
     * Make a POST request
     */
    async post<T>(
        endpoint: string,
        body?: any,
        options?: { headers?: Record<string, string> }
    ): Promise<ApiResponse<T>> {
        try {
            const url = `${this.baseURL}${endpoint}`;
            const headers = this.getHeaders(options?.headers);

            const response = await this.fetchWithTimeout(url, {
                method: 'POST',
                headers,
                body: body ? JSON.stringify(body) : undefined,
            });

            return this.handleResponse<T>(response);
        } catch (error) {
            return this.handleError<T>(error);
        }
    }

    /**
     * Make a PUT request
     */
    async put<T>(
        endpoint: string,
        body?: any,
        options?: { headers?: Record<string, string> }
    ): Promise<ApiResponse<T>> {
        try {
            const url = `${this.baseURL}${endpoint}`;
            const headers = this.getHeaders(options?.headers);

            const response = await this.fetchWithTimeout(url, {
                method: 'PUT',
                headers,
                body: body ? JSON.stringify(body) : undefined,
            });

            return this.handleResponse<T>(response);
        } catch (error) {
            return this.handleError<T>(error);
        }
    }

    /**
     * Make a PATCH request
     */
    async patch<T>(
        endpoint: string,
        body?: any,
        options?: { headers?: Record<string, string> }
    ): Promise<ApiResponse<T>> {
        try {
            const url = `${this.baseURL}${endpoint}`;
            const headers = this.getHeaders(options?.headers);

            const response = await this.fetchWithTimeout(url, {
                method: 'PATCH',
                headers,
                body: body ? JSON.stringify(body) : undefined,
            });

            return this.handleResponse<T>(response);
        } catch (error) {
            return this.handleError<T>(error);
        }
    }

    /**
     * Make a DELETE request
     */
    async delete<T>(
        endpoint: string,
        options?: { headers?: Record<string, string> }
    ): Promise<ApiResponse<T>> {
        try {
            const url = `${this.baseURL}${endpoint}`;
            const headers = this.getHeaders(options?.headers);

            const response = await this.fetchWithTimeout(url, {
                method: 'DELETE',
                headers,
            });

            return this.handleResponse<T>(response);
        } catch (error) {
            return this.handleError<T>(error);
        }
    }

    /**
     * Handle successful response
     */
    private async handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
        const status = response.status;

        try {
            const data = await response.json();

            if (!response.ok) {
                return {
                    error: {
                        message: data.message || 'An error occurred',
                        code: data.code || `ERROR_${status}`,
                        status,
                    },
                    status,
                };
            }

            return {
                data,
                status,
            };
        } catch (error) {
            return {
                error: {
                    message: `HTTP ${status}: ${response.statusText}`,
                    code: `HTTP_${status}`,
                    status,
                },
                status,
            };
        }
    }

    /**
     * Handle error response
     */
    private handleError<T>(error: any): ApiResponse<T> {
        let message = error instanceof Error ? error.message : 'Network error';
        if (error?.name === 'AbortError') {
            message = 'Request timeout';
        }

        return {
            error: {
                message,
                code: 'NETWORK_ERROR',
                status: 0,
            },
            status: 0,
        };
    }
}

// Export singleton instance
export const apiClient = new ApiClient();
