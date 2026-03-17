# ✅ Registration API Setup - Complete

## What Was Done

### 1. Updated RegisterRequest Interface

**File**: `src/api/auth.ts`

Changed from:

```typescript
export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
}
```

To:

```typescript
export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  agree_terms: string | number;
  agree_policy: string | number;
}
```

### 2. Updated RegisterScreen Component

**File**: `src/screens/Auth/RegisterScreen.tsx`

**Changes:**

- ✅ Integrated Redux state management
- ✅ Replaced `useAuth` hook with Redux
- ✅ Updated form data structure
- ✅ Updated validation rules
- ✅ Integrated API client for registration
- ✅ Added proper error handling
- ✅ Added loading state management
- ✅ Added success/error snackbar notifications

### 3. Created Documentation

- ✅ `REGISTER_API_DOCUMENTATION.md` - API reference
- ✅ `REGISTER_INTEGRATION_GUIDE.md` - Integration guide

---

## API Endpoint Details

### Endpoint

```
POST https://tbc-staging.mahrdanial.com/auth/register
```

### Request Body

```json
{
  "name": "John Doe",
  "email": "mahrdanial@gmail.com",
  "password": "Alpha@123",
  "password_confirmation": "Alpha@123",
  "agree_terms": "1",
  "agree_policy": "1"
}
```

### Response (Success)

```json
{
  "user": {
    "id": "123",
    "name": "John Doe",
    "email": "mahrdanial@gmail.com"
  },
  "token": "eyJ...",
  "refreshToken": "eyJ..."
}
```

---

## Form Structure

### Before

```typescript
{
  name: '',
  email: '',
  password: '',
  confirmPassword: '',        // ❌ Old
  newsletter: false,          // ❌ Old
  acceptTerms: false,         // ❌ Old
}
```

### After

```typescript
{
  name: '',
  email: '',
  password: '',
  password_confirmation: '',  // ✅ New (API format)
  agree_terms: false,         // ✅ New (API format)
  agree_policy: false,        // ✅ New (API format)
}
```

---

## Key Changes in RegisterScreen

### Imports

```typescript
// Added
import {
  useAppDispatch,
  useAppSelector,
  setAuthLoading,
  setAuthError,
  setUser,
  showSnackbar,
} from '../../store';
import { authAPI } from '../../api/auth';

// Removed
import { useAuth } from '../../hooks/useAuth';
```

### State Management

```typescript
// Before
const { register, isLoading } = useAuth();

// After
const dispatch = useAppDispatch();
const isLoading = useAppSelector(state => state.auth.isLoading);
```

### Registration Handler

```typescript
// Before
try {
  await register(formData.email, formData.password, formData.name);
} catch (error) {
  Alert.alert('Registration Failed', '...');
}

// After
dispatch(setAuthLoading(true));

const response = await authAPI.register({
  name: formData.name,
  email: formData.email,
  password: formData.password,
  password_confirmation: formData.password_confirmation,
  agree_terms: formData.agree_terms ? '1' : '0',
  agree_policy: formData.agree_policy ? '1' : '0',
});

if (response.error) {
  dispatch(setAuthError(response.error.message));
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
      message: 'Registration successful!',
      type: 'success',
    }),
  );
}

dispatch(setAuthLoading(false));
```

---

## Validation Rules

All required fields are validated:

| Field                   | Validation                     |
| ----------------------- | ------------------------------ |
| `name`                  | Required, non-empty            |
| `email`                 | Required, valid email format   |
| `password`              | Required, minimum 8 characters |
| `password_confirmation` | Required, must match password  |
| `agree_terms`           | Required, must be checked      |
| `agree_policy`          | Required, must be checked      |

---

## Redux Integration

### Actions Used

```typescript
setAuthLoading(boolean); // Show/hide loading spinner
setAuthError(message); // Set error message
setUser(userData); // Set logged-in user
showSnackbar({ message, type }); // Show toast notification
```

### Redux State

```typescript
state.auth = {
  user: null | User,
  isLoading: boolean,
  isAuthenticated: boolean,
  error: string | null,
};
```

---

## Form Input Updates

### Confirm Password Field

```typescript
// Before
<BassoonInput
    value={formData.confirmPassword}
    onChangeText={(value) => handleInputChange('confirmPassword', value)}
    ...
/>

// After
<BassoonInput
    value={formData.password_confirmation}
    onChangeText={(value) => handleInputChange('password_confirmation', value)}
    ...
/>
```

### Agreement Checkboxes

```typescript
// Before - Newsletter checkbox
<Checkbox checked={formData.newsletter} onToggle={...} />

// After - Policy checkbox (position 1)
<Checkbox checked={formData.agree_policy} onToggle={...} />

// After - Terms checkbox (position 2)
<Checkbox checked={formData.agree_terms} onToggle={...} />
```

---

## Error Handling

### User-Friendly Error Messages

```typescript
if (response.error) {
  // API returns detailed error messages
  dispatch(setAuthError(response.error.message));

  // Show snackbar notification
  dispatch(
    showSnackbar({
      message: response.error.message,
      type: 'error',
    }),
  );
}
```

### Common Errors

| Error                 | Cause          | Solution                  |
| --------------------- | -------------- | ------------------------- |
| Email already taken   | Email exists   | Use different email       |
| Password too short    | < 8 characters | Use 8+ character password |
| Passwords don't match | Mismatch       | Ensure both fields match  |
| Missing fields        | Empty field    | Fill all required fields  |
| Network error         | No connection  | Check internet            |

---

## Testing the Registration

### With Valid Data

```
Name: John Doe
Email: john@example.com
Password: Alpha@123
Confirm: Alpha@123
Terms: ✓
Policy: ✓

Result: Success snackbar, user logged in
```

### With Invalid Email

```
Name: John Doe
Email: invalid-email
Password: Alpha@123
Confirm: Alpha@123
Terms: ✓
Policy: ✓

Result: Error message "Please enter a valid email"
```

### With Non-Matching Password

```
Name: John Doe
Email: john@example.com
Password: Alpha@123
Confirm: Different@123
Terms: ✓
Policy: ✓

Result: Error message "Passwords do not match"
```

### With Unchecked Agreements

```
Name: John Doe
Email: john@example.com
Password: Alpha@123
Confirm: Alpha@123
Terms: ✗
Policy: ✓

Result: Error message "You must agree to Terms & Conditions"
```

---

## Files Modified

| File                                  | Changes                                        |
| ------------------------------------- | ---------------------------------------------- |
| `src/screens/Auth/RegisterScreen.tsx` | Complete refactor with Redux + API integration |
| `src/api/auth.ts`                     | Updated RegisterRequest interface              |

## Files Created

| File                            | Purpose                         |
| ------------------------------- | ------------------------------- |
| `REGISTER_API_DOCUMENTATION.md` | Complete API reference          |
| `REGISTER_INTEGRATION_GUIDE.md` | Integration guide with examples |

---

## Next Steps

1. **Test Registration** - Try with valid data
2. **Test Validation** - Try with invalid data
3. **Check Token** - Verify token is stored
4. **Test Navigation** - Navigate after success
5. **Test Error States** - Try duplicate email, etc.

---

## Quick Reference

### API Endpoint

```
POST https://tbc-staging.mahrdanial.com/auth/register
```

### Required Fields

- `name` (string)
- `email` (valid email)
- `password` (8+ chars)
- `password_confirmation` (must match)
- `agree_terms` ("1" or 1)
- `agree_policy` ("1" or 1)

### Response

```json
{
  "user": { id, name, email, ... },
  "token": "Bearer token",
  "refreshToken": "Refresh token"
}
```

### Component Usage

```typescript
const response = await authAPI.register({
  name,
  email,
  password,
  password_confirmation,
  agree_terms: '1',
  agree_policy: '1',
});
```

---

## Status

✅ **Registration API fully integrated**  
✅ **Form validation complete**  
✅ **Redux state management integrated**  
✅ **Error handling implemented**  
✅ **Documentation created**

**Ready to test!** 🚀

---

**Date**: January 26, 2026  
**Endpoint**: `/auth/register`  
**Base URL**: `https://tbc-staging.mahrdanial.com`  
**Status**: Complete ✅
