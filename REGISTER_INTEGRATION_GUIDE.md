# 🎯 Registration Integration Guide

## Complete RegisterScreen Implementation

The `RegisterScreen` component has been updated to work with Redux and the new API client.

### What Changed

#### Before (Old Implementation)

```typescript
const { register, isLoading } = useAuth();
await register(formData.email, formData.password, formData.name);
```

#### After (New Implementation)

```typescript
const dispatch = useAppDispatch();
const response = await authAPI.register({
  name: formData.name,
  email: formData.email,
  password: formData.password,
  password_confirmation: formData.password_confirmation,
  agree_terms: formData.agree_terms ? '1' : '0',
  agree_policy: formData.agree_policy ? '1' : '0',
});
```

---

## Form Data Structure

### Updated Form State

```typescript
const [formData, setFormData] = useState({
  name: '',
  email: '',
  password: '',
  password_confirmation: '', // Changed from: confirmPassword
  agree_terms: false, // Changed from: acceptTerms
  agree_policy: false, // New field
});
```

### Field Mapping

| Old Field       | New Field             | API Format |
| --------------- | --------------------- | ---------- |
| confirmPassword | password_confirmation | string     |
| acceptTerms     | agree_terms           | "1" or "0" |
| newsletter      | agree_policy          | "1" or "0" |

---

## Validation Rules

All validation rules have been updated to match API requirements:

```typescript
const validateForm = () => {
  const newErrors: Record<string, string> = {};

  // Name - required
  if (!formData.name) {
    newErrors.name = 'Name is required';
  }

  // Email - required, valid format
  if (!formData.email) {
    newErrors.email = 'Email is required';
  } else if (!VALIDATION_RULES.EMAIL_REGEX.test(formData.email)) {
    newErrors.email = 'Please enter a valid email';
  }

  // Password - required, min 8 chars
  if (!formData.password) {
    newErrors.password = 'Password is required';
  } else if (formData.password.length < VALIDATION_RULES.PASSWORD_MIN_LENGTH) {
    newErrors.password = `Password must be at least ${VALIDATION_RULES.PASSWORD_MIN_LENGTH} characters`;
  }

  // Password confirmation - must match
  if (!formData.password_confirmation) {
    newErrors.password_confirmation = 'Please confirm your password';
  } else if (formData.password_confirmation !== formData.password) {
    newErrors.password_confirmation = 'Passwords do not match';
  }

  // Terms agreement - required
  if (!formData.agree_terms) {
    newErrors.agree_terms = 'You must agree to the Terms & Conditions';
  }

  // Policy agreement - required
  if (!formData.agree_policy) {
    newErrors.agree_policy = 'You must agree to the Privacy Policy';
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};
```

---

## API Integration

### Registration Flow

```
1. User fills form
   ↓
2. Clicks "CREATE ACCOUNT"
   ↓
3. Validate form locally
   ↓
4. Dispatch setAuthLoading(true)
   ↓
5. Call authAPI.register()
   ↓
6. Check response for errors
   ↓
7. If success: dispatch setUser() → show snackbar
   If error: dispatch setAuthError() → show error snackbar
   ↓
8. Dispatch setAuthLoading(false)
   ↓
9. Navigate or retry
```

### Implementation

```typescript
const handleRegister = async () => {
  // 1. Validate
  if (!validateForm()) return;

  // 2. Show loading
  dispatch(setAuthLoading(true));

  // 3. Make API call
  const response = await authAPI.register({
    name: formData.name,
    email: formData.email,
    password: formData.password,
    password_confirmation: formData.password_confirmation,
    agree_terms: formData.agree_terms ? '1' : '0',
    agree_policy: formData.agree_policy ? '1' : '0',
  });

  // 4. Handle response
  if (response.error) {
    dispatch(setAuthError(response.error.message));
    dispatch(
      showSnackbar({
        message: response.error.message,
        type: 'error',
      }),
    );
  } else if (response.data?.user) {
    // Success
    dispatch(setUser(response.data.user));
    dispatch(
      showSnackbar({
        message: 'Registration successful!',
        type: 'success',
      }),
    );
    // Token is automatically set by authAPI.register()
    // Navigate to home screen here
  }

  // 5. Hide loading
  dispatch(setAuthLoading(false));
};
```

---

## Imports Updated

### Removed

```typescript
import { useAuth } from '../../hooks/useAuth';
import { Alert } from 'react-native';
import { Header } from '@/components';
```

### Added

```typescript
import {
  useAppDispatch,
  useAppSelector,
  setAuthLoading,
  setAuthError,
  setUser,
  showSnackbar,
} from '../../store';
import { authAPI } from '../../api/auth';
```

---

## State Management

### Redux State Usage

```typescript
// Get dispatch function
const dispatch = useAppDispatch();

// Get loading state
const isLoading = useAppSelector(state => state.auth.isLoading);

// Dispatch actions
dispatch(setAuthLoading(true));
dispatch(setUser(userData));
dispatch(setAuthError(errorMessage));
dispatch(showSnackbar({ message, type }));
```

### Redux Actions

| Action                    | Purpose           | Example                                   |
| ------------------------- | ----------------- | ----------------------------------------- |
| `setAuthLoading(boolean)` | Show/hide loading | `dispatch(setAuthLoading(true))`          |
| `setUser(user)`           | Set current user  | `dispatch(setUser(response.data.user))`   |
| `setAuthError(message)`   | Set error message | `dispatch(setAuthError('Email taken'))`   |
| `showSnackbar(config)`    | Show toast        | `dispatch(showSnackbar({message, type}))` |

---

## API Request/Response

### Request

```json
POST /auth/register

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "Alpha@123",
  "password_confirmation": "Alpha@123",
  "agree_terms": "1",
  "agree_policy": "1"
}
```

### Success Response (200)

```json
{
  "user": {
    "id": "123",
    "name": "John Doe",
    "email": "john@example.com",
    "avatar": null
  },
  "token": "eyJ...",
  "refreshToken": "eyJ..."
}
```

### Error Response (422)

```json
{
  "message": "Email already in use",
  "errors": {
    "email": ["The email has already been taken."]
  },
  "code": "VALIDATION_ERROR",
  "status": 422
}
```

---

## Component Flow

```typescript
JoinNow Component
├── Redux setup
│   ├── dispatch = useAppDispatch()
│   └── isLoading = useAppSelector(state => state.auth.isLoading)
│
├── Local state
│   ├── formData (name, email, password, password_confirmation, agree_terms, agree_policy)
│   └── errors
│
├── Handlers
│   ├── validateForm() → Returns boolean
│   ├── handleInputChange() → Updates form & clears error
│   └── handleRegister() → Validates → Calls API → Updates Redux
│
└── Render
    ├── Text input for name
    ├── Text input for email
    ├── Text input for password
    ├── Text input for confirm password
    ├── Checkbox for policy agreement
    ├── Checkbox for terms agreement
    └── CREATE ACCOUNT button (disabled while loading)
```

---

## Testing Checklist

- [ ] Form validation works correctly
- [ ] Error messages display properly
- [ ] Loading state shows during submission
- [ ] Successful registration shows snackbar
- [ ] Error registration shows error snackbar
- [ ] Form clears after success (optional)
- [ ] Navigation happens after success
- [ ] Token is stored after registration
- [ ] All fields are required
- [ ] Password confirmation must match password
- [ ] Email validation works
- [ ] Terms agreement is required
- [ ] Policy agreement is required

---

## Common Issues & Solutions

### Issue: "agree_terms is not defined"

**Solution**: Check form state includes both `agree_terms` and `agree_policy`

### Issue: "Passwords do not match" error

**Solution**: Field name is `password_confirmation`, not `confirmPassword`

### Issue: Redux actions not working

**Solution**: Import from `../store` (checks store/index.ts exports)

### Issue: API returns 422 validation error

**Solution**: Validate all fields match API requirements:

- name: string (required)
- email: valid email (required, must be unique)
- password: min 8 chars (required)
- password_confirmation: must match password (required)
- agree_terms: "1" (required)
- agree_policy: "1" (required)

---

## Next Steps

1. **Test Registration**: Try registering with valid data
2. **Test Validation**: Try with invalid data to see error messages
3. **Test Error Handling**: Check email already exists error
4. **Test Loading**: Verify loading spinner shows
5. **Test Success**: Verify user is logged in after registration
6. **Test Navigation**: Navigate to home screen after success

---

## Files Modified

| File                                  | Changes                                   |
| ------------------------------------- | ----------------------------------------- |
| `src/screens/Auth/RegisterScreen.tsx` | Integrated Redux + updated form structure |
| `src/api/auth.ts`                     | Updated RegisterRequest interface         |
| `src/config/constants.ts`             | (No changes needed)                       |

---

## Quick Reference

### Form Data Example

```typescript
{
  name: "John Doe",
  email: "john@example.com",
  password: "Alpha@123",
  password_confirmation: "Alpha@123",
  agree_terms: true,
  agree_policy: true
}
```

### API Call

```typescript
const response = await authAPI.register({
  name: formData.name,
  email: formData.email,
  password: formData.password,
  password_confirmation: formData.password_confirmation,
  agree_terms: formData.agree_terms ? '1' : '0',
  agree_policy: formData.agree_policy ? '1' : '0',
});
```

### Response Handling

```typescript
if (response.error) {
  // Show error
  dispatch(setAuthError(response.error.message));
} else {
  // Success
  dispatch(setUser(response.data?.user));
}
```

---

**Updated**: January 26, 2026  
**Status**: Ready to Use ✅
