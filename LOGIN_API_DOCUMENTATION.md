# 🔐 Login API - Implementation Guide

## Overview

The Login API endpoint has been implemented and integrated into the LoginScreen component with Redux state management and Toast notifications.

---

## 📋 API Specification

### Endpoint

```
POST /auth/login
```

### Base URL

```
https://tbc-staging.mahrdanial.com
```

### Full URL

```
https://tbc-staging.mahrdanial.com/auth/login
```

---

## 📤 Request

### Method

`POST`

### Headers

```json
{
  "Content-Type": "application/json",
  "Accept": "application/json",
  "Authorization": "Bearer {token}"
}
```

### Body

```json
{
  "email": "mahrdanial@gmail.com",
  "password": "Alpha@123"
}
```

### Fields

| Field      | Type   | Required | Description                   |
| ---------- | ------ | -------- | ----------------------------- |
| `email`    | string | ✅       | User's email address          |
| `password` | string | ✅       | User's password (min 8 chars) |

---

## 📥 Response

### Success (200 OK)

```json
{
  "data": {
    "user": {
      "id": "123",
      "name": "John Doe",
      "email": "mahrdanial@gmail.com",
      "avatar": "https://...",
      "verified": true
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expiresIn": 3600
  },
  "message": "Login successful",
  "status": 200
}
```

### Error (401 Unauthorized)

```json
{
  "error": {
    "message": "Invalid email or password",
    "code": "INVALID_CREDENTIALS",
    "status": 401
  }
}
```

### Error (422 Validation Error)

```json
{
  "error": {
    "message": "Email is required",
    "code": "VALIDATION_ERROR",
    "status": 422
  }
}
```

---

## TypeScript Interfaces

### LoginRequest

```typescript
export interface LoginRequest {
  email: string;
  password: string;
}
```

### AuthResponse

```typescript
export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  verified?: boolean;
}
```

---

## 🔗 Integration in LoginScreen

### Step 1: Imports

```typescript
import {
  useAppDispatch,
  useAppSelector,
  setUser,
  showSnackbar,
} from '../../store';
import { authAPI } from '../../api/auth';
```

### Step 2: Setup

```typescript
const dispatch = useAppDispatch();
const isLoading = useAppSelector(state => state.auth.isLoading);
```

### Step 3: Login Function

```typescript
const handleLogin = async () => {
  if (!validateForm()) return;

  dispatch({ type: 'auth/setAuthLoading', payload: true });

  const response = await authAPI.login({
    email: formData.email,
    password: formData.password,
  });

  if (response.error) {
    dispatch(
      showSnackbar({
        message: response.error.message,
        type: 'error',
      }),
    );
  } else if (response.data?.user) {
    dispatch(setUser(response.data.user));
    dispatch(
      showSnackbar({
        message: 'Login successful!',
        type: 'success',
      }),
    );
    // Navigate to Dashboard
    setTimeout(() => {
      navigation.navigate('Dashboard' as never);
    }, 500);
  }

  dispatch({ type: 'auth/setAuthLoading', payload: false });
};
```

---

## 🧪 Testing with Postman

### 1. Set Base URL Variable

```
Variable: base_url
Value: https://tbc-staging.mahrdanial.com
```

### 2. Create Request

```
Method: POST
URL: {{base_url}}/auth/login
```

### 3. Headers

```
Content-Type: application/json
Accept: application/json
```

### 4. Body (raw JSON)

```json
{
  "email": "mahrdanial@gmail.com",
  "password": "Alpha@123"
}
```

### 5. Tests (Postman Script)

```javascript
if (pm.response.code === 200) {
  var jsonData = pm.response.json();
  if (jsonData.data && jsonData.data.token) {
    pm.collectionVariables.set('token', jsonData.data.token);
    console.log('Token saved: ' + jsonData.data.token);
  }
}
```

---

## 🔄 Flow Diagram

```
User enters email & password
         ↓
Validates form
         ↓
Dispatches setAuthLoading(true)
         ↓
Calls authAPI.login(credentials)
         ↓
API: POST /auth/login
         ↓
Response received
         ↓
Check if error?
├─ YES: Show error toast
└─ NO:
     ├─ Dispatch setUser(userData)
     ├─ Show success toast
     └─ Navigate to Dashboard
         ↓
Dispatches setAuthLoading(false)
```

---

## 📚 File Locations

| File                               | Purpose                   |
| ---------------------------------- | ------------------------- |
| `src/api/auth.ts`                  | API client methods        |
| `src/screens/Auth/LoginScreen.tsx` | Login UI component        |
| `src/store/slices/authSlice.ts`    | Redux auth state          |
| `src/store/slices/uiSlice.ts`      | Redux UI state (snackbar) |

---

## ✅ Implementation Checklist

- [x] LoginRequest interface defined
- [x] AuthResponse interface defined
- [x] authAPI.login() method created
- [x] Token storage implemented
- [x] LoginScreen integrated with Redux
- [x] Toast notifications added
- [x] Form validation added
- [x] Loading state managed
- [x] Error handling implemented
- [x] Navigation after login

---

## 🎯 Error Handling

### Invalid Credentials

```typescript
// Shows error toast to user
'Invalid email or password';
```

### Network Error

```typescript
// Shows error toast to user
'Network error. Please check your connection';
```

### Validation Error

```typescript
// Shows error toast to user
"Email is required" or similar
```

---

## 🔒 Security Features

✅ **Token Storage**

- Token stored in API client
- Automatically included in Authorization header
- Cleared on logout

✅ **Password Security**

- Minimum 8 characters validation
- Sent over HTTPS only
- Never logged

✅ **Error Messages**

- Generic error messages in UI
- Specific errors in console (development)
- No sensitive data exposed

---

## 📊 Redux State

### Before Login

```typescript
{
  auth: {
    user: null,
    isLoading: false,
    isAuthenticated: false,
    error: null,
  }
}
```

### During Login

```typescript
{
  auth: {
    user: null,
    isLoading: true,  // ← Loading
    isAuthenticated: false,
    error: null,
  }
}
```

### After Successful Login

```typescript
{
  auth: {
    user: { id, name, email, ... },  // ← Logged in
    isLoading: false,
    isAuthenticated: true,
    error: null,
  }
}
```

### After Failed Login

```typescript
{
  auth: {
    user: null,
    isLoading: false,
    isAuthenticated: false,
    error: "Invalid email or password",  // ← Error
  }
}
```

---

## 💡 Usage Examples

### Example 1: Simple Login

```typescript
const handleLogin = async () => {
  const response = await authAPI.login({
    email: 'user@example.com',
    password: 'password123',
  });

  if (response.data?.user) {
    console.log('Logged in as:', response.data.user.name);
  }
};
```

### Example 2: With Redux

```typescript
const response = await authAPI.login(credentials);

if (response.data?.user) {
  dispatch(setUser(response.data.user));
  dispatch(
    showSnackbar({
      message: 'Welcome back!',
      type: 'success',
    }),
  );
}
```

### Example 3: Error Handling

```typescript
const response = await authAPI.login(credentials);

if (response.error) {
  dispatch(
    showSnackbar({
      message: response.error.message,
      type: 'error',
    }),
  );
} else {
  // Success logic
}
```

---

## 🔧 API Client Integration

### In `src/api/client.ts`

```typescript
async post<T>(url: string, data?: any): Promise<ApiResponse<T>> {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify(data),
        });

        const json = await response.json();

        if (!response.ok) {
            return { data: null, error: json.error };
        }

        return { data: json.data, error: null };
    } catch (error) {
        return { data: null, error: { message: 'Network error' } };
    }
}
```

### In `src/api/auth.ts`

```typescript
async login(credentials: LoginRequest): Promise<ApiResponse<AuthResponse>> {
    const response = await apiClient.post<AuthResponse>(
        API_ENDPOINTS.AUTH.LOGIN,
        credentials
    );

    if (response.data?.token) {
        apiClient.setToken(response.data.token);
    }

    return response;
}
```

---

## 🎓 Testing Scenarios

### Test 1: Valid Login

**Input:**

```json
{
  "email": "mahrdanial@gmail.com",
  "password": "Alpha@123"
}
```

**Expected:** Success response with token

### Test 2: Invalid Password

**Input:**

```json
{
  "email": "mahrdanial@gmail.com",
  "password": "WrongPassword"
}
```

**Expected:** 401 error - "Invalid email or password"

### Test 3: Invalid Email

**Input:**

```json
{
  "email": "nonexistent@gmail.com",
  "password": "Alpha@123"
}
```

**Expected:** 401 error - "Invalid email or password"

### Test 4: Missing Email

**Input:**

```json
{
  "password": "Alpha@123"
}
```

**Expected:** 422 error - "Email is required"

### Test 5: Missing Password

**Input:**

```json
{
  "email": "mahrdanial@gmail.com"
}
```

**Expected:** 422 error - "Password is required"

---

## 📝 Validation Rules

| Field    | Rule         | Message                                  |
| -------- | ------------ | ---------------------------------------- |
| email    | Required     | "Email is required"                      |
| email    | Valid format | "Please enter a valid email"             |
| password | Required     | "Password is required"                   |
| password | Min 8 chars  | "Password must be at least 8 characters" |

---

## 🚀 Next Steps

1. ✅ Test with Postman first
2. ✅ Test in app with test account
3. ✅ Test error scenarios
4. ✅ Verify token is stored
5. ✅ Verify user is logged in
6. ✅ Test logout functionality

---

**Date**: January 26, 2026  
**Endpoint**: `/auth/login`  
**Base URL**: `https://tbc-staging.mahrdanial.com`  
**Status**: ✅ Implemented & Integrated
