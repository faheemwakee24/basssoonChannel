# Redux Toolkit Setup Guide

Redux Toolkit (RTK) has been successfully set up in your project! Here's what was added:

## 📦 Installed Packages

- `@reduxjs/toolkit@2.11.2` - Redux state management toolkit
- `react-redux@9.2.0` - React bindings for Redux

## 📁 Created Files & Folders

### Store Configuration

- `src/store/store.ts` - Redux store configuration
- `src/store/hooks.ts` - Custom typed hooks (`useAppDispatch`, `useAppSelector`)
- `src/store/slices/` - Directory for Redux slices

### Redux Slices (State Modules)

- `src/store/slices/authSlice.ts` - Authentication state management

  - State: `user`, `isLoading`, `isAuthenticated`, `error`
  - Actions: `setUser`, `setAuthLoading`, `setAuthError`, `logout`, `clearError`

- `src/store/slices/uiSlice.ts` - UI state management
  - State: `isLoading`, `snackbar`, `theme`
  - Actions: `setUILoading`, `showSnackbar`, `hideSnackbar`, `setTheme`

### Updated Files

- `App.tsx` - Wrapped with Redux `<Provider>`
- `src/store/index.ts` - Updated exports for all Redux utilities

## 🚀 Quick Start

### 1. Using Redux in Components

```tsx
import { useAppDispatch, useAppSelector, setUser, setAuthError } from '../store';

export const MyComponent = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.auth.user);
  const isLoading = useAppSelector(state => state.auth.isLoading);

  const handleLogin = async () => {
    dispatch(setAuthLoading(true));
    try {
      // Fetch user...
      dispatch(setUser(userData));
    } catch (error) {
      dispatch(setAuthError(error.message));
    }
  };

  return (
    // Your JSX
  );
};
```

### 2. Available Imports

```tsx
// Hooks (always use these for type safety!)
import { useAppDispatch, useAppSelector } from '../store';

// Auth Actions
import {
  setUser,
  setAuthLoading,
  setAuthError,
  logout,
  clearError,
} from '../store';

// UI Actions
import { setUILoading, showSnackbar, hideSnackbar, setTheme } from '../store';

// Types
import type { ReduxUser, ReduxAuthState, UIState } from '../store';
```

### 3. Adding New Slices

Create a new file in `src/store/slices/` following the pattern:

```tsx
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface MyFeatureState {
  // Your state
}

const initialState: MyFeatureState = {
  // Initial values
};

const myFeatureSlice = createSlice({
  name: 'myFeature',
  initialState,
  reducers: {
    myAction: (state, action: PayloadAction<any>) => {
      // Mutate state (RTK uses Immer)
      state.someValue = action.payload;
    },
  },
});

export const { myAction } = myFeatureSlice.actions;
export default myFeatureSlice.reducer;
```

Then add to `src/store/store.ts`:

```tsx
import myFeatureReducer from './slices/myFeatureSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    ui: uiReducer,
    myFeature: myFeatureReducer, // Add this
  },
});
```

### 4. Async Actions (AsyncThunk)

For API calls, use `createAsyncThunk`:

```tsx
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchUser = createAsyncThunk(
  'auth/fetchUser',
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/users/${userId}`);
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    /* ... */
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUser.pending, state => {
        state.isLoading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});
```

## 📚 Resources

- [Redux Toolkit Docs](https://redux-toolkit.js.org/)
- [React-Redux Hooks](https://react-redux.js.org/api/hooks)
- [Best Practices](https://redux-toolkit.js.org/usage/usage-guide)

## ✅ Features

- ✨ **Type-Safe**: Full TypeScript support with custom hooks
- 🎯 **Immer Integration**: Write immutable updates like mutations
- 🔧 **Pre-configured**: Redux DevTools support included
- 📦 **Redux Thunk**: Async action middleware built-in
- 🎪 **Scalable**: Easy to add new slices and features
