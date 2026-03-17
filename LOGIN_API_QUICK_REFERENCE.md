# 🔐 Login API - Quick Reference

## One-Line Implementation

```typescript
const response = await authAPI.login({
  email: 'user@example.com',
  password: 'password123',
});
```

---

## API Endpoint

```
POST https://tbc-staging.mahrdanial.com/auth/login
```

---

## Request

```json
{
  "email": "mahrdanial@gmail.com",
  "password": "Alpha@123"
}
```

---

## Success Response (200)

```json
{
  "data": {
    "user": {
      "id": "123",
      "name": "John Doe",
      "email": "mahrdanial@gmail.com",
      "verified": true
    },
    "token": "eyJ...",
    "refreshToken": "eyJ...",
    "expiresIn": 3600
  }
}
```

---

## Error Response (401)

```json
{
  "error": {
    "message": "Invalid email or password",
    "code": "INVALID_CREDENTIALS",
    "status": 401
  }
}
```

---

## Usage in Component

```typescript
import {
  useAppDispatch,
  useAppSelector,
  setUser,
  showSnackbar,
} from '../../store';
import { authAPI } from '../../api/auth';

export const MyComponent = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(state => state.auth.isLoading);

  const handleLogin = async () => {
    dispatch({ type: 'auth/setAuthLoading', payload: true });

    const response = await authAPI.login({
      email: 'mahrdanial@gmail.com',
      password: 'Alpha@123',
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
      navigation.navigate('Dashboard' as never);
    }

    dispatch({ type: 'auth/setAuthLoading', payload: false });
  };

  return <Button onPress={handleLogin} disabled={isLoading} title="Login" />;
};
```

---

## Form Validation

```typescript
if (!email) return 'Email is required';
if (!email.includes('@')) return 'Invalid email';
if (!password) return 'Password is required';
if (password.length < 8) return 'Password must be 8+ characters';
```

---

## Token Management

- ✅ Automatically stored on successful login
- ✅ Automatically included in all API requests
- ✅ Header: `Authorization: Bearer {token}`
- ✅ Cleared on logout

---

## Redux State

```typescript
// Before login
state.auth = { user: null, isLoading: false, isAuthenticated: false }

// After successful login
state.auth = { user: {...}, isLoading: false, isAuthenticated: true }

// After failed login
state.auth = { user: null, isLoading: false, isAuthenticated: false, error: '...' }
```

---

## Loading State

```typescript
<Button
  disabled={isLoading} // Disable during login
  loading={isLoading} // Show spinner
  onPress={handleLogin}
/>
```

---

## Toast Notifications

```typescript
// Success
dispatch(
  showSnackbar({
    message: 'Login successful!',
    type: 'success', // Green toast
  }),
);

// Error
dispatch(
  showSnackbar({
    message: 'Invalid email or password',
    type: 'error', // Red toast
  }),
);
```

---

## File Locations

| File                               | Purpose        |
| ---------------------------------- | -------------- |
| `src/screens/Auth/LoginScreen.tsx` | Login UI       |
| `src/api/auth.ts`                  | login() method |
| `src/store/slices/authSlice.ts`    | Redux state    |

---

## Testing in Postman

```
Method: POST
URL: https://tbc-staging.mahrdanial.com/auth/login

Headers:
- Content-Type: application/json
- Accept: application/json

Body (JSON):
{
  "email": "mahrdanial@gmail.com",
  "password": "Alpha@123"
}
```

---

## Status Codes

| Code | Meaning          | Example             |
| ---- | ---------------- | ------------------- |
| 200  | Success          | User logged in      |
| 401  | Unauthorized     | Invalid credentials |
| 422  | Validation Error | Missing fields      |
| 500  | Server Error     | Database issue      |

---

## Common Errors

| Error                       | Cause             | Solution               |
| --------------------------- | ----------------- | ---------------------- |
| "Invalid email or password" | Wrong credentials | Check email & password |
| "Email is required"         | Empty email       | Enter email            |
| "Password is required"      | Empty password    | Enter password         |
| "Network error"             | No internet       | Check connection       |

---

## Implementation Checklist

- [x] API method exists (authAPI.login)
- [x] LoginScreen integrated with Redux
- [x] Form validation working
- [x] Token storage working
- [x] Error handling working
- [x] Toast notifications working
- [x] Navigation working
- [x] Loading state working

---

## Postman Test Script

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

## Related APIs

- **Register**: `POST /auth/register` - Create new account
- **Logout**: `POST /auth/logout` - Logout user
- **Refresh**: `POST /auth/refresh` - Refresh token
- **Profile**: `GET /auth/profile` - Get user profile

---

## Security Notes

✅ Password min 8 characters  
✅ Token sent over HTTPS only  
✅ Token in Authorization header  
✅ No sensitive data in logs  
✅ Generic error messages to user

---

**API**: `/auth/login`  
**Method**: POST  
**Status**: ✅ Ready
