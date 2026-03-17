# 📝 Registration API Documentation

## API Endpoint: Register

### Request Details

**Method**: POST  
**Endpoint**: `/auth/register`  
**Base URL**: `https://tbc-staging.mahrdanial.com`  
**Full URL**: `https://tbc-staging.mahrdanial.com/auth/register`

### Headers

```
Content-Type: application/json
Accept: application/json
Authorization: Bearer {{token}} (not required for registration)
```

### Request Body

```typescript
{
  "name": "John Doe",
  "email": "mahrdanial@gmail.com",
  "password": "Alpha@123",
  "password_confirmation": "Alpha@123",
  "agree_terms": "1",        // "1" or "0" / boolean
  "agree_policy": "1"        // "1" or "0" / boolean
}
```

### Field Requirements

| Field                   | Type          | Required | Description                 |
| ----------------------- | ------------- | -------- | --------------------------- |
| `name`                  | string        | Yes      | User's full name            |
| `email`                 | string        | Yes      | Valid email address         |
| `password`              | string        | Yes      | Minimum 8 characters        |
| `password_confirmation` | string        | Yes      | Must match password         |
| `agree_terms`           | string/number | Yes      | "1" or 1 to agree to terms  |
| `agree_policy`          | string/number | Yes      | "1" or 1 to agree to policy |

### TypeScript Interface

```typescript
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
```

---

## Response Format

### Success Response (200 OK)

```json
{
  "user": {
    "id": "123",
    "name": "John Doe",
    "email": "mahrdanial@gmail.com",
    "avatar": null,
    "created_at": "2026-01-26T20:00:00Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Error Responses

**Validation Error (422)**

```json
{
  "message": "The given data was invalid.",
  "errors": {
    "email": ["The email has already been taken."],
    "password": ["The password must be at least 8 characters."]
  },
  "code": "VALIDATION_ERROR",
  "status": 422
}
```

**Bad Request (400)**

```json
{
  "message": "Missing required fields",
  "code": "INVALID_REQUEST",
  "status": 400
}
```

---

## Usage in React Native

### Using Redux + API Client

```typescript
import { authAPI } from '../api/auth'
import { useAppDispatch, useAppSelector } from '../store'
import { setUser, setAuthLoading, setAuthError, showSnackbar } from '../store'

export const RegisterScreen = () => {
    const dispatch = useAppDispatch()
    const isLoading = useAppSelector(state => state.auth.isLoading)

    const handleRegister = async () => {
        dispatch(setAuthLoading(true))

        const response = await authAPI.register({
            name: "John Doe",
            email: "john@example.com",
            password: "Alpha@123",
            password_confirmation: "Alpha@123",
            agree_terms: "1",
            agree_policy: "1"
        })

        if (response.error) {
            dispatch(setAuthError(response.error.message))
            dispatch(showSnackbar({
                message: response.error.message,
                type: 'error'
            }))
        } else if (response.data?.user) {
            dispatch(setUser(response.data.user))
            dispatch(showSnackbar({
                message: 'Registration successful!',
                type: 'success'
            }))
            // Navigate to home screen
        }

        dispatch(setAuthLoading(false))
    }

    return (
        // Your JSX
    )
}
```

### Form Validation

```typescript
const validateForm = formData => {
  const errors: Record<string, string> = {};

  // Name validation
  if (!formData.name) {
    errors.name = 'Name is required';
  }

  // Email validation
  if (!formData.email) {
    errors.email = 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = 'Please enter a valid email';
  }

  // Password validation
  if (!formData.password) {
    errors.password = 'Password is required';
  } else if (formData.password.length < 8) {
    errors.password = 'Password must be at least 8 characters';
  }

  // Password confirmation validation
  if (!formData.password_confirmation) {
    errors.password_confirmation = 'Please confirm your password';
  } else if (formData.password_confirmation !== formData.password) {
    errors.password_confirmation = 'Passwords do not match';
  }

  // Terms agreement validation
  if (!formData.agree_terms) {
    errors.agree_terms = 'You must agree to the Terms & Conditions';
  }

  // Policy agreement validation
  if (!formData.agree_policy) {
    errors.agree_policy = 'You must agree to the Privacy Policy';
  }

  return errors;
};
```

---

## Implementation in RegisterScreen

### Component Structure

```typescript
export const JoinNow: React.FC = () => {
    // State management
    const dispatch = useAppDispatch()
    const isLoading = useAppSelector(state => state.auth.isLoading)

    // Form data
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        agree_terms: false,
        agree_policy: false,
    })

    // Validation
    const validateForm = () => {
        // ... validation logic
    }

    // Handle registration
    const handleRegister = async () => {
        if (!validateForm()) return

        dispatch(setAuthLoading(true))

        const response = await authAPI.register({
            name: formData.name,
            email: formData.email,
            password: formData.password,
            password_confirmation: formData.password_confirmation,
            agree_terms: formData.agree_terms ? '1' : '0',
            agree_policy: formData.agree_policy ? '1' : '0',
        })

        // ... handle response
        dispatch(setAuthLoading(false))
    }

    // Render UI
    return (
        // ... JSX
    )
}
```

---

## Error Handling

### Common Errors

| Error                 | Status | Solution                                 |
| --------------------- | ------ | ---------------------------------------- |
| Email already taken   | 422    | Ask user to use different email or login |
| Password too short    | 422    | Inform user password must be 8+ chars    |
| Passwords don't match | 422    | Check validation before sending          |
| Missing fields        | 400    | Validate all required fields             |
| Network error         | 0      | Check internet connection                |

### Error Handling Pattern

```typescript
if (response.error) {
  switch (response.status) {
    case 422:
      // Validation error
      dispatch(
        showSnackbar({
          message: 'Please check your information',
          type: 'error',
        }),
      );
      break;
    case 400:
      // Bad request
      dispatch(
        showSnackbar({
          message: 'Invalid request',
          type: 'error',
        }),
      );
      break;
    case 0:
      // Network error
      dispatch(
        showSnackbar({
          message: 'Network error. Check your connection.',
          type: 'error',
        }),
      );
      break;
    default:
      // Generic error
      dispatch(setAuthError(response.error.message));
  }
}
```

---

## Password Requirements

- **Minimum Length**: 8 characters
- **Recommended**: Mix of uppercase, lowercase, numbers, symbols
- **Example Valid Passwords**:
  - `Alpha@123`
  - `SecurePass123!`
  - `MyPassword#2026`

---

## Email Validation

- **Format**: Standard email format (user@domain.com)
- **Must be unique**: Cannot already exist in system
- **Examples**:
  - ✅ `john@example.com`
  - ✅ `user.name@company.co.uk`
  - ❌ `invalid.email`
  - ❌ `user@`

---

## Agreement Fields

Both `agree_terms` and `agree_policy` are required to be "1" or true.

```typescript
// Frontend boolean to API format
agree_terms: formData.agree_terms ? '1' : '0';
agree_policy: formData.agree_policy ? '1' : '0';
```

---

## Testing with Postman

### Postman Request

```
POST https://tbc-staging.mahrdanial.com/auth/register

Headers:
- Content-Type: application/json
- Accept: application/json

Body (raw JSON):
{
  "name": "John Doe",
  "email": "test@example.com",
  "password": "Alpha@123",
  "password_confirmation": "Alpha@123",
  "agree_terms": "1",
  "agree_policy": "1"
}
```

### Expected Response

```json
{
  "user": {
    "id": "123",
    "name": "John Doe",
    "email": "test@example.com",
    "avatar": null
  },
  "token": "eyJ...",
  "refreshToken": "eyJ..."
}
```

---

## Best Practices

✅ **DO:**

- Validate all fields before sending
- Show loading state during registration
- Display user-friendly error messages
- Store token securely after registration
- Log user in automatically after registration
- Show success confirmation
- Clear form after successful registration

❌ **DON'T:**

- Send requests without validation
- Show technical error messages
- Store password in plain text
- Send form data as FormData when JSON is expected
- Ignore token from response
- Make requests from UI without Redux state

---

## Related Endpoints

- `POST /auth/login` - User login
- `POST /auth/logout` - User logout
- `GET /user/profile` - Get user profile
- `PUT /user/profile` - Update user profile
- `POST /auth/refresh` - Refresh token

---

**Endpoint**: `/auth/register`  
**Base URL**: `https://tbc-staging.mahrdanial.com`  
**Method**: POST  
**Authentication**: Not required  
**Last Updated**: January 26, 2026
