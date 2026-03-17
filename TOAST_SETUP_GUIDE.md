# 🎯 Toast/Snackbar Setup - Complete Guide

## Overview

A complete Toast/Snackbar notification system has been integrated into your Bassoon Channel app using Redux for state management and React Native Animated API for smooth animations.

---

## What Was Added

### 1. **Toast Component** (`src/components/Toast.tsx`)

A fully-featured toast notification component with:

- ✅ 4 notification types: `success`, `error`, `warning`, `info`
- ✅ Smooth slide-up/slide-down animations
- ✅ Auto-dismiss after 3 seconds (configurable)
- ✅ Manual dismiss button
- ✅ Color-coded backgrounds per type
- ✅ Icons for each notification type
- ✅ Responsive design
- ✅ Redux integration

### 2. **Redux Integration**

Uses existing Redux UI slice with:

- `showSnackbar(message, type)` - Display toast
- `hideSnackbar()` - Hide toast
- State managed in `state.ui.snackbar`

### 3. **App Integration**

Toast component added to `App.tsx` root level for global access:

```tsx
<Provider store={store}>
  <SafeAreaProvider>
    <ThemeProvider>
      <Header />
      <AppNavigator />
      <Toast /> {/* ← Added here */}
    </ThemeProvider>
  </SafeAreaProvider>
</Provider>
```

---

## How to Use

### Basic Usage

```typescript
import { useAppDispatch } from '../store';
import { showSnackbar } from '../store/slices/uiSlice';

export const MyComponent = () => {
  const dispatch = useAppDispatch();

  const handleSuccess = () => {
    dispatch(
      showSnackbar({
        message: 'Operation successful!',
        type: 'success',
      }),
    );
  };

  const handleError = () => {
    dispatch(
      showSnackbar({
        message: 'Something went wrong!',
        type: 'error',
      }),
    );
  };

  return (
    <>
      <Button onPress={handleSuccess} title="Show Success" />
      <Button onPress={handleError} title="Show Error" />
    </>
  );
};
```

### In RegisterScreen

```typescript
import { useAppDispatch } from '../../store';
import { showSnackbar } from '../../store/slices/uiSlice';

// In your component:
const dispatch = useAppDispatch();

// When registration succeeds:
dispatch(
  showSnackbar({
    message: 'Registration successful!',
    type: 'success',
  }),
);

// When registration fails:
dispatch(
  showSnackbar({
    message: 'Email already exists',
    type: 'error',
  }),
);
```

---

## Notification Types

### Success (Green)

```typescript
dispatch(
  showSnackbar({
    message: 'Operation completed successfully!',
    type: 'success',
  }),
);
```

**Color**: `#4CAF50`  
**Icon**: ✓

### Error (Red)

```typescript
dispatch(
  showSnackbar({
    message: 'An error occurred!',
    type: 'error',
  }),
);
```

**Color**: `#F44336`  
**Icon**: ✕

### Warning (Orange)

```typescript
dispatch(
  showSnackbar({
    message: 'Please review this!',
    type: 'warning',
  }),
);
```

**Color**: `#FF9800`  
**Icon**: ⚠

### Info (Blue) - Default

```typescript
dispatch(
  showSnackbar({
    message: 'Just so you know...',
    type: 'info',
  }),
);

// Or simply:
dispatch(
  showSnackbar({
    message: 'Just so you know...',
  }),
); // Defaults to 'info'
```

**Color**: `#2196F3`  
**Icon**: ℹ

---

## Toast Features

### Auto-Dismiss

Toasts automatically disappear after 3 seconds:

```typescript
const TOAST_DURATION = 3000; // milliseconds
```

### Manual Dismiss

Users can dismiss by:

1. Tapping the X button on the right
2. Tapping anywhere on the toast

### Smooth Animations

- **Slide In**: 300ms ease-in from bottom
- **Slide Out**: 300ms ease-out to bottom
- Interpolated opacity for smooth fading

### Positioning

- **Bottom**: 20px from bottom
- **Sides**: 16px padding left/right
- **Z-Index**: 9999 (always on top)

---

## Styling

### Toast Container

```typescript
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
    left: 16,
    right: 16,
    zIndex: 9999,
  },
  toast: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    // ... shadows and elevation
  },
});
```

### Customize Colors

Edit `src/components/Toast.tsx` in `getBackgroundColor()`:

```typescript
const getBackgroundColor = () => {
  switch (snackbar.type) {
    case 'success':
      return '#4CAF50'; // Change this
    case 'error':
      return '#F44336'; // Or this
    // ...
  }
};
```

### Customize Duration

Edit `Toast.tsx`:

```typescript
const TOAST_DURATION = 3000; // Change milliseconds here
```

---

## Files Created/Modified

| File                       | Action       | Details                     |
| -------------------------- | ------------ | --------------------------- |
| `src/components/Toast.tsx` | **Created**  | Main toast component        |
| `src/components/index.ts`  | **Modified** | Added Toast export          |
| `App.tsx`                  | **Modified** | Added `<Toast />` component |

---

## Redux State Structure

### UI Slice State

```typescript
state.ui = {
  isLoading: boolean,
  snackbar: {
    visible: boolean,
    message: string,
    type: 'success' | 'error' | 'info' | 'warning',
  },
  theme: 'light' | 'dark',
};
```

### Actions Available

```typescript
// Show toast
dispatch(
  showSnackbar({
    message: 'Your message here',
    type: 'success', // optional, defaults to 'info'
  }),
);

// Hide toast (usually automatic)
dispatch(hideSnackbar());
```

---

## Usage Examples

### Registration Success

```typescript
const response = await authAPI.register(formData);

if (response.data?.user) {
  dispatch(setUser(response.data.user));
  dispatch(
    showSnackbar({
      message: '✨ Welcome! Registration successful!',
      type: 'success',
    }),
  );
  // Navigate to home
} else {
  dispatch(
    showSnackbar({
      message: response.error?.message || 'Registration failed',
      type: 'error',
    }),
  );
}
```

### Form Validation

```typescript
if (!formData.email) {
  dispatch(
    showSnackbar({
      message: 'Email is required',
      type: 'error',
    }),
  );
  return;
}

if (!VALIDATION_RULES.EMAIL_REGEX.test(formData.email)) {
  dispatch(
    showSnackbar({
      message: 'Please enter a valid email',
      type: 'warning',
    }),
  );
  return;
}
```

### Network Operations

```typescript
try {
  dispatch(
    showSnackbar({
      message: 'Loading data...',
      type: 'info',
    }),
  );

  const data = await fetchUserData();

  dispatch(
    showSnackbar({
      message: 'Data loaded successfully!',
      type: 'success',
    }),
  );
} catch (error) {
  dispatch(
    showSnackbar({
      message: 'Failed to load data',
      type: 'error',
    }),
  );
}
```

---

## Advanced Usage

### Multiple Toasts (Sequential)

```typescript
// First toast
dispatch(
  showSnackbar({
    message: 'Processing...',
    type: 'info',
  }),
);

// After 3 seconds, show second toast
setTimeout(() => {
  dispatch(
    showSnackbar({
      message: 'Done!',
      type: 'success',
    }),
  );
}, 3000);
```

### Conditional Toast

```typescript
const handleSubmit = () => {
  if (isValid) {
    dispatch(
      showSnackbar({
        message: 'Form submitted!',
        type: 'success',
      }),
    );
  } else {
    dispatch(
      showSnackbar({
        message: 'Please fix the errors',
        type: 'error',
      }),
    );
  }
};
```

### Toast with Dynamic Message

```typescript
const showErrorToast = (errorCode: string) => {
  const messages: Record<string, string> = {
    EMAIL_EXISTS: 'Email already registered',
    WEAK_PASSWORD: 'Password too weak',
    NETWORK_ERROR: 'No internet connection',
  };

  dispatch(
    showSnackbar({
      message: messages[errorCode] || 'An error occurred',
      type: 'error',
    }),
  );
};
```

---

## Testing

### Manual Test 1: Success Toast

1. Open RegisterScreen
2. Fill form with valid data
3. Click Register
4. See green success toast
5. Verify auto-dismisses after 3 seconds

### Manual Test 2: Error Toast

1. Open RegisterScreen
2. Enter invalid email
3. Click Register
4. See red error toast
5. Verify manual dismiss works

### Manual Test 3: Manual Dismiss

1. Show any toast
2. Click X button
3. Toast disappears immediately

### Manual Test 4: Message Visibility

1. Show toast with long message
2. Verify text wraps properly
3. Verify all text is visible (max 2 lines)

---

## Performance Notes

- ✅ Lightweight component (minimal re-renders)
- ✅ Uses Animated API (no frame drops)
- ✅ Redux state management (efficient updates)
- ✅ Proper cleanup (auto-dismiss timers)
- ✅ No memory leaks (refs properly managed)

---

## Troubleshooting

### Toast not showing?

1. Verify Redux store is initialized: `<Provider store={store}>`
2. Verify `<Toast />` is in App.tsx
3. Check console for Redux errors
4. Verify you're dispatching `showSnackbar` correctly

### Toast appearing but not dismissing?

1. Check that `hideSnackbar` action exists
2. Verify animation values are correct
3. Check that toast state updates properly in Redux

### Toast position wrong?

1. Edit `styles.container` in `Toast.tsx`
2. Adjust `bottom`, `left`, `right` values
3. Verify `zIndex: 9999` is high enough

### Colors not showing?

1. Verify `getBackgroundColor()` returns valid hex
2. Check React Native color support
3. Test with hardcoded color values

---

## Next Steps

1. ✅ Test toast with registration form
2. ✅ Test toast with different message types
3. ✅ Customize colors to match app theme
4. ✅ Adjust duration if needed
5. ✅ Add toast to other screens (Login, Settings, etc.)

---

## Summary

✅ Toast component created and integrated  
✅ Redux state management configured  
✅ App.tsx updated with Toast component  
✅ Smooth animations implemented  
✅ 4 notification types supported  
✅ Auto-dismiss and manual dismiss working  
✅ Documentation complete

**Status**: Ready to use! 🚀

---

**Date**: January 26, 2026  
**Component**: Toast (Snackbar)  
**Status**: Complete ✅  
**Location**: `src/components/Toast.tsx`
