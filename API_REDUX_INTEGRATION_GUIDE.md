# API & Redux Integration Guide

## 🚀 Quick Start

### 1. Login Example

```typescript
// LoginScreen.tsx
import { useAppDispatch, useAppSelector } from '../store';
import { authAPI } from '../api/auth';
import { setUser, setAuthLoading, setAuthError } from '../store';

export const LoginScreen = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(state => state.auth.isLoading);
  const error = useAppSelector(state => state.auth.error);

  const handleLogin = async (email: string, password: string) => {
    dispatch(setAuthLoading(true));

    const response = await authAPI.login({ email, password });

    if (response.error) {
      dispatch(setAuthError(response.error.message));
    } else {
      dispatch(setUser(response.data?.user || null));
      // Token is automatically set in apiClient
    }

    dispatch(setAuthLoading(false));
  };

  return (
    // Your JSX
  );
};
```

---

## 🔄 Integration Pattern

### Step 1: API Call

```typescript
const response = await authAPI.login(credentials);
```

### Step 2: Check Response

```typescript
if (response.error) {
  // Handle error
} else {
  // Handle success
}
```

### Step 3: Update Redux

```typescript
dispatch(setUser(response.data?.user));
```

### Step 4: Optional - Store Token

```typescript
// Already done by authAPI, but you can verify:
import { apiClient } from '../api/client';
const token = apiClient.getToken();
```

---

## 📋 Common Scenarios

### Scenario 1: User Login

```typescript
// Component
const handleLogin = async () => {
  dispatch(setAuthLoading(true));

  const response = await authAPI.login({
    email: userEmail,
    password: userPassword,
  });

  if (response.error) {
    dispatch(setAuthError(response.error.message));
  } else {
    dispatch(setUser(response.data?.user || null));
    dispatch(
      showSnackbar({
        message: 'Login successful!',
        type: 'success',
      }),
    );
  }

  dispatch(setAuthLoading(false));
};
```

### Scenario 2: Fetch User Profile

```typescript
import { useEffect } from 'react';
import { authAPI } from '../api/auth';

export const ProfileScreen = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.auth.user);

  useEffect(() => {
    const fetchProfile = async () => {
      dispatch(setAuthLoading(true));

      const response = await authAPI.getProfile();

      if (!response.error) {
        dispatch(setUser(response.data || null));
      }

      dispatch(setAuthLoading(false));
    };

    fetchProfile();
  }, [dispatch]);

  if (!user) return <Text>Loading...</Text>;

  return <Text>Welcome, {user.name}</Text>;
};
```

### Scenario 3: Update Profile

```typescript
const handleUpdateProfile = async (updates: Partial<User>) => {
  dispatch(setAuthLoading(true));

  const response = await authAPI.updateProfile(updates);

  if (response.error) {
    dispatch(setAuthError(response.error.message));
  } else {
    dispatch(setUser(response.data || null));
    dispatch(
      showSnackbar({
        message: 'Profile updated!',
        type: 'success',
      }),
    );
  }

  dispatch(setAuthLoading(false));
};
```

### Scenario 4: Handle Logout

```typescript
const handleLogout = async () => {
  dispatch(setAuthLoading(true));

  const response = await authAPI.logout();

  if (response.error) {
    console.error('Logout failed:', response.error);
  }

  dispatch(logout()); // Clear Redux state
  dispatch(setAuthLoading(false));
};
```

---

## 🔐 Token Management

### After Successful Login

```typescript
// Token is automatically set by authAPI.login()
// No need to manually call apiClient.setToken()
```

### On App Startup (from AsyncStorage)

```typescript
import { apiClient } from '../api/client';
import AsyncStorage from '@react-native-async-storage/async-storage';

useEffect(() => {
  const restoreToken = async () => {
    const token = await AsyncStorage.getItem('auth_token');
    if (token) {
      apiClient.setToken(token);
    }
  };

  restoreToken();
}, []);
```

### Token Expiration

```typescript
const handleTokenExpired = async () => {
  const refreshToken = await AsyncStorage.getItem('refresh_token');

  if (refreshToken) {
    const response = await authAPI.refreshToken(refreshToken);

    if (!response.error) {
      const newToken = response.data?.token;
      if (newToken) {
        await AsyncStorage.setItem('auth_token', newToken);
        apiClient.setToken(newToken);
      }
    }
  }
};
```

---

## 📝 File Structure

```
src/
├── api/
│   ├── client.ts           ← API client with auth
│   └── auth.ts             ← Auth endpoints
├── config/
│   └── constants.ts        ← Base URL & endpoints
├── store/
│   ├── store.ts            ← Redux store
│   └── slices/
│       ├── authSlice.ts    ← Auth state
│       └── uiSlice.ts      ← UI state
└── screens/
    ├── LoginScreen.tsx     ← Example screen
    └── ProfileScreen.tsx   ← Example screen
```

---

## 🧪 Testing API Calls

### Test Login

```typescript
const testLogin = async () => {
  const response = await authAPI.login({
    email: 'test@example.com',
    password: 'password123',
  });

  console.log('Response:', response);
  console.log('Token:', apiClient.getToken());
};
```

### Test Profile Fetch

```typescript
const testGetProfile = async () => {
  const response = await authAPI.getProfile();
  console.log('Profile:', response);
};
```

### Test Logout

```typescript
const testLogout = async () => {
  const response = await authAPI.logout();
  console.log('Logout response:', response);
  console.log('Token after logout:', apiClient.getToken());
};
```

---

## ⚠️ Error Handling Examples

### Handle 401 Unauthorized

```typescript
const response = await authAPI.getProfile();

if (response.status === 401) {
  // Token expired or invalid
  // Redirect to login
  dispatch(logout());
  navigation.navigate('Login');
}
```

### Handle Network Error

```typescript
const response = await authAPI.login(credentials);

if (response.status === 0) {
  // Network error
  dispatch(
    showSnackbar({
      message: 'Network error. Check your connection.',
      type: 'error',
    }),
  );
}
```

### Handle Server Error

```typescript
if (response.status >= 500) {
  dispatch(
    showSnackbar({
      message: 'Server error. Please try again later.',
      type: 'error',
    }),
  );
}
```

---

## 🎯 Best Practices

### ✅ DO

- Always check `response.error` before using `response.data`
- Dispatch `setAuthLoading(true)` before API call
- Dispatch `setAuthLoading(false)` after API call
- Show user-friendly error messages
- Handle network errors gracefully
- Store token securely (AsyncStorage)

### ❌ DON'T

- Ignore error responses
- Show technical error messages to users
- Make API calls without loading state
- Hardcode tokens in code
- Store sensitive data in plain text
- Make direct fetch calls without the client

---

## 📊 Complete Example Screen

```typescript
import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import {
  useAppDispatch,
  useAppSelector,
  setUser,
  setAuthError,
  setAuthLoading,
} from '../store';
import { authAPI } from '../api/auth';

export const ProfileScreen = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.auth.user);
  const isLoading = useAppSelector(state => state.auth.isLoading);
  const error = useAppSelector(state => state.auth.error);

  // Fetch profile on mount
  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    dispatch(setAuthLoading(true));

    const response = await authAPI.getProfile();

    if (response.error) {
      dispatch(setAuthError(response.error.message));
    } else {
      dispatch(setUser(response.data || null));
    }

    dispatch(setAuthLoading(false));
  };

  const handleLogout = async () => {
    dispatch(setAuthLoading(true));

    const response = await authAPI.logout();

    if (!response.error) {
      dispatch(logout());
    }

    dispatch(setAuthLoading(false));
  };

  if (isLoading) return <ActivityIndicator />;

  if (error) {
    return (
      <View>
        <Text>Error: {error}</Text>
        <TouchableOpacity onPress={fetchProfile}>
          <Text>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!user) return <Text>No user data</Text>;

  return (
    <View>
      <Text>Welcome, {user.name}</Text>
      <Text>Email: {user.email}</Text>
      <TouchableOpacity onPress={handleLogout}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};
```

---

## 📞 Troubleshooting

### "Authorization header not being sent"

- Verify token is set: `apiClient.getToken()`
- Check token is stored after login
- Ensure using `authAPI` methods, not raw fetch

### "401 Unauthorized on every request"

- Token might be invalid or expired
- Check token format: `Bearer <token>`
- Verify token is stored correctly in AsyncStorage

### "CORS errors"

- Backend should have correct CORS headers
- Check base URL is correct
- Verify request headers are valid

### "Network timeouts"

- Check internet connection
- Verify base URL is accessible
- Check network request timeout settings

---

**Happy coding!** 🎉
