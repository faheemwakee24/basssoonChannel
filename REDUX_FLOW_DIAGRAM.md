# Redux Flow Diagram & Architecture

## 🏗️ Redux Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                         App Component                            │
│                  (Wrapped with Redux Provider)                   │
└────────────────────────────┬────────────────────────────────────┘
                             │
                ┌────────────┴────────────┐
                │                         │
        ┌───────▼──────┐         ┌───────▼──────┐
        │   Screen 1   │         │   Screen 2   │
        │  Component   │         │  Component   │
        └───────┬──────┘         └───────┬──────┘
                │                        │
        ┌───────▼────────────────────────▼─────────┐
        │     useAppSelector, useAppDispatch       │
        └───────┬────────────────────────────────┬─┘
                │                                │
        ┌───────▼──────────────────────────┐   │
        │    Redux Store (Single Source    │   │
        │         of Truth)                │   │
        │                                  │   │
        │  ┌──────────────────────────┐   │   │
        │  │   Auth Slice             │   │   │
        │  │  • user                  │   │   │
        │  │  • isLoading             │   │   │
        │  │  • isAuthenticated       │   │   │
        │  │  • error                 │   │   │
        │  └──────────────────────────┘   │   │
        │                                  │   │
        │  ┌──────────────────────────┐   │   │
        │  │    UI Slice              │   │   │
        │  │  • isLoading             │   │   │
        │  │  • snackbar              │   │   │
        │  │  • theme                 │   │   │
        │  └──────────────────────────┘   │   │
        │                                  │   │
        │  ┌──────────────────────────┐   │   │
        │  │   [Future Slices]        │   │   │
        │  │  • news                  │   │   │
        │  │  • practice              │   │   │
        │  │  • settings              │   │   │
        │  └──────────────────────────┘   │   │
        │                                  │   │
        └──────────────────────────────────┘   │
                     ▲                         │
                     │                         │
              ┌──────┴─────┐                   │
              │  SELECTORS │                   │
              └──────┬─────┘                   │
                     │                         │
        ┌────────────┴─────────────────────────▼─┐
        │            DISPATCH ACTIONS            │
        │                                        │
        │  dispatch(setUser(userData))           │
        │  dispatch(showSnackbar({...}))        │
        │  dispatch(logout())                    │
        │  dispatch(setTheme('dark'))            │
        └────────────────────────────────────────┘
```

---

## 🔄 Data Flow (Redux One-Way Loop)

```
        ┌──────────────┐
        │  Component   │
        │   Renders    │
        └──────┬───────┘
               │
        ┌──────▼──────────────────────────────┐
        │  1. SUBSCRIBE to State               │
        │  useAppSelector(state => state.auth) │
        └──────┬───────────────────────────────┘
               │
        ┌──────▼─────────────────────┐
        │  2. READ State from Store   │
        │  (via Redux Provider)       │
        └──────┬──────────────────────┘
               │
        ┌──────▼──────────────────┐
        │  3. Component Renders    │
        │  with State Values       │
        └──────┬───────────────────┘
               │
        ┌──────▼────────────────────────────┐
        │  4. USER INTERACTION              │
        │  (button click, form submit, etc) │
        └──────┬─────────────────────────────┘
               │
        ┌──────▼─────────────────────────────────────┐
        │  5. DISPATCH Action                        │
        │  dispatch(setUser({...}))                  │
        └──────┬──────────────────────────────────────┘
               │
        ┌──────▼────────────────────────────────────┐
        │  6. ACTION travels to REDUCER             │
        │  {type: 'auth/setUser', payload: {...}}   │
        └──────┬─────────────────────────────────────┘
               │
        ┌──────▼──────────────────────────────┐
        │  7. REDUCER Updates State           │
        │  (Immer handles immutability)       │
        └──────┬───────────────────────────────┘
               │
        ┌──────▼──────────────────────────┐
        │  8. NEW State Created            │
        │  (Immutable copy)                │
        └──────┬────────────────────────────┘
               │
        ┌──────▼──────────────────────┐
        │  9. All Subscribers          │
        │  Notified of State Change    │
        └──────┬───────────────────────┘
               │
        └──────►  Back to Step 1: Re-render ↻
```

---

## 📊 Component → Redux → Component Cycle

```
UserLoginScreen.tsx
        │
        ├─ useAppDispatch()          ← Hook for dispatching actions
        ├─ useAppSelector()          ← Hook for reading state
        │
        └─ User clicks "Login"
           │
           ├─ dispatch(setAuthLoading(true))
           │   │
           │   └─► Redux Store
           │       └─► authSlice reducer
           │           └─► Update: isLoading = true
           │               └─► All subscribers notified
           │                   └─► Component re-renders
           │                       ├─ Show <Loader />
           │                       │
           ├─ API Call: loginAPI(email, password)
           │   │
           │   ├─ Success
           │   │   │
           │   │   ├─ dispatch(setUser(userData))
           │   │   │   └─► Redux Updates: user = {...}
           │   │   │       └─► Component re-renders
           │   │   │           ├─ Shows user name
           │   │   │           ├─ dispatch(showSnackbar({type: 'success'}))
           │   │   │           │
           │   │   │
           │   ├─ Error
           │       │
           │       ├─ dispatch(setAuthError(error.message))
           │           └─► Redux Updates: error = "Invalid credentials"
           │               └─► Component re-renders
           │                   └─ Shows error message
           │
           └─ dispatch(setAuthLoading(false))
               └─► Redux Updates: isLoading = false
                   └─► Loader hidden
```

---

## 🎯 File Organization & Relationships

```
src/store/
│
├─ store.ts
│  └─ Combines all slices into one Redux store
│     └─ Exports: store, RootState, AppDispatch
│
├─ hooks.ts
│  └─ useAppDispatch, useAppSelector (typed versions)
│     └─ Provides type safety to all components
│
├─ index.ts (Main export file)
│  ├─ Re-exports store
│  ├─ Re-exports hooks
│  ├─ Re-exports all actions from slices
│  └─ Re-exports all types
│
├─ slices/
│  │
│  ├─ authSlice.ts
│  │  └─ Auth reducer with actions:
│  │     ├─ setUser
│  │     ├─ setAuthLoading
│  │     ├─ setAuthError
│  │     ├─ logout
│  │     └─ clearError
│  │
│  └─ uiSlice.ts
│     └─ UI reducer with actions:
│        ├─ setUILoading
│        ├─ showSnackbar
│        ├─ hideSnackbar
│        └─ setTheme
│
└─ PATTERNS.ts (Reference guide for patterns)
   └─ Common Redux patterns with examples
```

---

## 🔌 Integration Points in Your App

```
App.tsx
├─ <Provider store={store}>
│  └─ Connects Redux to React
│     └─ Makes store available to all components
│
├─ <SafeAreaProvider>
├─ <ThemeProvider>
└─ <AppNavigator>
   └─ All screens can now use:
      ├─ useAppSelector()
      └─ useAppDispatch()
```

---

## 📈 State Shape

```typescript
// Complete Redux State
{
  auth: {
    user: {
      id: string
      email: string
      name: string
      avatar?: string
    } | null
    isLoading: boolean
    isAuthenticated: boolean
    error: string | null
  }
  ui: {
    isLoading: boolean
    snackbar: {
      visible: boolean
      message: string
      type: 'success' | 'error' | 'info' | 'warning'
    }
    theme: 'light' | 'dark'
  }
  // Future slices can be added here:
  // news: { articles, selectedArticle, isLoading, error }
  // practice: { sessions, currentSession, isRecording }
  // etc...
}
```

---

## 🎬 Example Flow: User Login

```
1. User opens app
   └─ App.tsx renders with Redux Provider

2. User navigates to LoginScreen
   └─ Component mounts
   └─ Calls: useAppSelector(state => state.auth)
   └─ Gets: { user: null, isLoading: false, ... }

3. User enters email & password
   └─ Component renders input fields with user data

4. User clicks "Login" button
   └─ handleLogin() function called
   └─ dispatch(setAuthLoading(true))
      │
      ├─ Action sent to Redux Store
      ├─ authSlice reducer processes it
      ├─ State.auth.isLoading = true
      ├─ All subscribers (useAppSelector) notified
      └─ LoginScreen re-renders with <Loader />

5. API call: loginAPI(email, password)
   └─ Waiting for response...
   └─ Component shows loading spinner

6. API returns success with user data
   └─ dispatch(setUser(userData))
      │
      ├─ Action sent to Redux Store
      ├─ authSlice reducer processes it
      ├─ State.auth.user = userData
      ├─ State.auth.isAuthenticated = true
      ├─ All subscribers notified
      └─ LoginScreen re-renders with user info

7. dispatch(setAuthLoading(false))
   └─ Loader hidden

8. dispatch(showSnackbar({message: 'Login successful!', type: 'success'}))
   └─ Toast notification shown

9. Navigation to MainApp
   └─ All screens can now access user from Redux
   └─ dispatch(logout()) available to clear user
```

---

## 🚀 Adding New Slice Example

```
Adding a News Slice:

src/store/slices/newsSlice.ts (NEW FILE)
└─ Defines news state shape
   └─ Creates news reducer
   └─ Exports news actions

src/store/store.ts (MODIFY)
├─ import newsReducer
└─ Add to configureStore: { news: newsReducer }

src/store/index.ts (MODIFY)
└─ Export news actions

Now in components:
├─ useAppSelector(state => state.news.articles)
└─ dispatch(fetchArticles())
```

---

## 💾 Persistence (Optional - Future)

```
Redux → (serialize) → AsyncStorage
   ↓
On app startup:
AsyncStorage → (deserialize) → Redux
```

---

## 🎯 Quick Reference

| What            | How                                            |
| --------------- | ---------------------------------------------- |
| Read state      | `useAppSelector(state => state.auth.user)`     |
| Dispatch action | `dispatch(setUser(data))`                      |
| Get store       | `store` from `src/store`                       |
| Add new slice   | Follow `src/store/slices/authSlice.ts` pattern |
| Use async       | Create `createAsyncThunk` in slice             |
| Debug           | Redux DevTools browser extension               |

---

**Total Flow Summary**: Component → useAppSelector (subscribe) → Render → User Interaction → dispatch (action) → Reducer → New State → Components Notified → Re-render → Loop 🔄
