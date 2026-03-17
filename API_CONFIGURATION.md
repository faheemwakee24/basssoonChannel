# API Configuration Guide

## 🔧 API Setup Overview

Your API client is now fully configured with:

- **Base URL**: `https://tbc-staging.mahrdanial.com`
- **Automatic Authorization**: Bearer token injected in all requests
- **Type-safe responses**: Full TypeScript support
- **Error handling**: Standardized error responses

---

## 📋 Configuration

### Base URL

Located in: `src/config/constants.ts`

```typescript
export const API_BASE_URL = __DEV__
  ? 'https://tbc-staging.mahrdanial.com'
  : 'https://api.bassoonchannel.com';
```

### Environment-based URLs

- **Development**: `https://tbc-staging.mahrdanial.com`
- **Production**: `https://api.bassoonchannel.com`

---

## 🔐 Authentication

The API client automatically includes the Bearer token in all requests:

```
Authorization: Bearer {{token}}
```

### Token Management

#### Set Token (after login)

```typescript
import { apiClient } from '../api/client';

apiClient.setToken(token);
```

#### Get Current Token

```typescript
const token = apiClient.getToken();
```

#### Clear Token (on logout)

```typescript
apiClient.setToken(null);
```

---

## 🚀 API Client Usage

### Import the client

```typescript
import { apiClient } from '../api/client';
```

### Making Requests

#### GET Request

```typescript
const response = await apiClient.get<User>('/api/users/profile');

if (response.error) {
  console.error('Error:', response.error.message);
} else {
  console.log('User:', response.data);
}
```

#### POST Request

```typescript
const response = await apiClient.post<AuthResponse>('/api/auth/login', {
  email: 'user@example.com',
  password: 'password123',
});
```

#### PUT Request

```typescript
const response = await apiClient.put<User>('/api/users/profile', {
  name: 'John Updated',
});
```

#### PATCH Request

```typescript
const response = await apiClient.patch<User>('/api/users/settings', {
  theme: 'dark',
});
```

#### DELETE Request

```typescript
const response = await apiClient.delete<void>('/api/users/account');
```

---

## 🔄 API Response Format

All API calls return an `ApiResponse<T>` object:

```typescript
interface ApiResponse<T> {
  data?: T; // Success response data
  error?: ApiError; // Error information
  status: number; // HTTP status code
}

interface ApiError {
  message: string; // Human-readable error message
  code: string; // Machine-readable error code
  status: number; // HTTP status code
}
```

### Success Example

```typescript
{
  data: { id: '123', name: 'John' },
  status: 200
}
```

### Error Example

```typescript
{
  error: {
    message: 'User not found',
    code: 'USER_NOT_FOUND',
    status: 404
  },
  status: 404
}
```

---

## 📡 Auth API Methods

Pre-built auth methods in `src/api/auth.ts`:

### Login

```typescript
import { authAPI } from '../api/auth';

const response = await authAPI.login({
  email: 'user@example.com',
  password: 'password123',
});

if (!response.error) {
  console.log('Token:', response.data?.token);
}
```

### Register

```typescript
const response = await authAPI.register({
  email: 'newuser@example.com',
  password: 'securepass123',
  name: 'John Doe',
});
```

### Logout

```typescript
const response = await authAPI.logout();
if (!response.error) {
  console.log('Logged out successfully');
}
```

### Get Profile

```typescript
const response = await authAPI.getProfile();
if (!response.error) {
  console.log('User profile:', response.data);
}
```

### Update Profile

```typescript
const response = await authAPI.updateProfile({
  name: 'John Updated',
  avatar: 'https://example.com/avatar.jpg',
});
```

### Refresh Token

```typescript
const response = await authAPI.refreshToken(oldToken);
if (!response.error) {
  const newToken = response.data?.token;
  apiClient.setToken(newToken);
}
```

---

## 🔌 Integration with Redux

### Example: Login with Redux

Create an async thunk in `src/store/slices/authSlice.ts`:

```typescript
import { createAsyncThunk } from '@reduxjs/toolkit';
import { authAPI } from '../../api/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (
    credentials: { email: string; password: string },
    { rejectWithValue },
  ) => {
    const response = await authAPI.login(credentials);

    if (response.error) {
      return rejectWithValue(response.error.message);
    }

    // Store token
    if (response.data?.token) {
      await AsyncStorage.setItem('auth_token', response.data.token);
    }

    return response.data;
  },
);
```

### Example: Use in Component

```typescript
import { useAppDispatch, useAppSelector } from '../store';
import { loginUser } from '../store/slices/authSlice';

export const LoginScreen = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(state => state.auth.isLoading);
  const error = useAppSelector(state => state.auth.error);

  const handleLogin = async () => {
    await dispatch(loginUser({
      email: 'user@example.com',
      password: 'password123'
    }));
  };

  return (
    // JSX
  );
};
```

---

## 🛠️ Adding Custom Endpoints

### Create a new API service

Create `src/api/news.ts`:

```typescript
import { apiClient, ApiResponse } from './client';

export interface Article {
  id: string;
  title: string;
  content: string;
  author: string;
}

class NewsAPI {
  async getArticles(): Promise<ApiResponse<Article[]>> {
    return apiClient.get<Article[]>('/api/news/articles');
  }

  async getArticleById(id: string): Promise<ApiResponse<Article>> {
    return apiClient.get<Article>(`/api/news/articles/${id}`);
  }

  async createArticle(
    article: Partial<Article>,
  ): Promise<ApiResponse<Article>> {
    return apiClient.post<Article>('/api/news/articles', article);
  }

  async updateArticle(
    id: string,
    article: Partial<Article>,
  ): Promise<ApiResponse<Article>> {
    return apiClient.put<Article>(`/api/news/articles/${id}`, article);
  }

  async deleteArticle(id: string): Promise<ApiResponse<void>> {
    return apiClient.delete<void>(`/api/news/articles/${id}`);
  }
}

export const newsAPI = new NewsAPI();
```

### Use in Redux thunk

```typescript
import { createAsyncThunk } from '@reduxjs/toolkit';
import { newsAPI } from '../../api/news';

export const fetchArticles = createAsyncThunk(
  'news/fetchArticles',
  async (_, { rejectWithValue }) => {
    const response = await newsAPI.getArticles();

    if (response.error) {
      return rejectWithValue(response.error.message);
    }

    return response.data;
  },
);
```

---

## ⚠️ Error Handling

### Check for errors

```typescript
const response = await apiClient.get<User>('/api/users/profile');

if (response.error) {
  switch (response.status) {
    case 401:
      console.error('Unauthorized - Token might be expired');
      break;
    case 403:
      console.error('Forbidden - No permission');
      break;
    case 404:
      console.error('Not found');
      break;
    case 500:
      console.error('Server error');
      break;
    default:
      console.error('Error:', response.error.message);
  }
} else {
  console.log('Success:', response.data);
}
```

### Common Error Codes

| Code          | Status | Meaning                              |
| ------------- | ------ | ------------------------------------ |
| NETWORK_ERROR | 0      | Network connectivity issue           |
| HTTP_401      | 401    | Unauthorized - Token invalid/expired |
| HTTP_403      | 403    | Forbidden - No permission            |
| HTTP_404      | 404    | Not found                            |
| HTTP_500      | 500    | Server error                         |

---

## 📝 Headers

### Default Headers

```
Content-Type: application/json
Authorization: Bearer {{token}} (if token is set)
```

### Custom Headers

```typescript
const response = await apiClient.get<Data>('/api/endpoint', {
  headers: {
    'X-Custom-Header': 'value',
  },
});
```

---

## 🔍 Debugging

### Check current token

```typescript
import { apiClient } from '../api/client';

console.log('Current token:', apiClient.getToken());
```

### Check base URL

```typescript
import { API_BASE_URL } from '../config/constants';

console.log('API Base URL:', API_BASE_URL);
```

### Enable network logging (React Native)

```typescript
if (__DEV__) {
  // Network logging is built-in to React Native
  // Use: react-native-network-logger or similar
}
```

---

## 📚 API Endpoints Reference

Defined in: `src/config/constants.ts`

```typescript
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
  },
  USER: {
    PROFILE: '/api/users/profile',
    UPDATE_PROFILE: '/api/users/profile',
    // Add more user endpoints
  },
  // Add more endpoint categories as needed
};
```

---

## 🎯 Usage Pattern

### Best Practice

```typescript
// 1. Import
import { authAPI } from '../api/auth';
import { useAppDispatch } from '../store';

// 2. Make API call
const response = await authAPI.login(credentials);

// 3. Check response
if (response.error) {
  // Handle error
  dispatch(setAuthError(response.error.message));
} else {
  // Handle success
  dispatch(setUser(response.data?.user));
}
```

---

## 📞 Support

For issues or questions about the API:

1. Check the API response error message
2. Verify the token is set correctly
3. Ensure the endpoint exists in constants
4. Check network connectivity
5. Review the server logs

---

**Base URL**: `https://tbc-staging.mahrdanial.com`
**Authorization**: `Bearer {{token}}`
**Last Updated**: January 26, 2026
