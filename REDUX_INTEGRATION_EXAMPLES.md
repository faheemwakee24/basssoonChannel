# Redux Integration Examples for Bassoon Channel

## 🎯 Real-World Examples for Your App

### 1. Authentication Integration

**Before (using useAuth hook):**

```tsx
import { useAuth } from '../hooks/useAuth';

export const LoginScreen = () => {
  const { user, login, logout } = useAuth();
  // ...
};
```

**After (using Redux):**

```tsx
import { useAppDispatch, useAppSelector, setUser, logout } from '../store';

export const LoginScreen = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.auth.user);

  const handleLogin = async (email, password) => {
    dispatch(setAuthLoading(true));
    try {
      const userData = await loginAPI(email, password);
      dispatch(setUser(userData));
    } catch (err) {
      dispatch(setAuthError(err.message));
    }
  };
};
```

---

### 2. News/Articles State Management

Create `src/store/slices/newsSlice.ts`:

```tsx
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export interface NewsArticle {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  imageUrl?: string;
}

interface NewsState {
  articles: NewsArticle[];
  selectedArticle: NewsArticle | null;
  isLoading: boolean;
  error: string | null;
}

export const fetchNewsArticles = createAsyncThunk(
  'news/fetchArticles',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/news');
      if (!response.ok) throw new Error('Failed to fetch');
      return await response.json();
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);

const newsSlice = createSlice({
  name: 'news',
  initialState: {
    articles: [],
    selectedArticle: null,
    isLoading: false,
    error: null,
  } as NewsState,
  reducers: {
    selectArticle: (state, action) => {
      state.selectedArticle = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchNewsArticles.pending, state => {
        state.isLoading = true;
      })
      .addCase(fetchNewsArticles.fulfilled, (state, action) => {
        state.isLoading = false;
        state.articles = action.payload;
      })
      .addCase(fetchNewsArticles.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { selectArticle } = newsSlice.actions;
export default newsSlice.reducer;
```

Add to store: `src/store/store.ts`

```tsx
import newsReducer from './slices/newsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    ui: uiReducer,
    news: newsReducer, // Add this
  },
});
```

---

### 3. Practice Sessions State Management

Create `src/store/slices/practiceSlice.ts`:

```tsx
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface PracticeSession {
  id: string;
  date: string;
  duration: number;
  exercisesCompleted: number;
  averageScore: number;
}

interface PracticeState {
  sessions: PracticeSession[];
  currentSessionId: string | null;
  isRecording: boolean;
}

const practiceSlice = createSlice({
  name: 'practice',
  initialState: {
    sessions: [],
    currentSessionId: null,
    isRecording: false,
  } as PracticeState,
  reducers: {
    startPractice: (state, action: PayloadAction<string>) => {
      state.currentSessionId = action.payload;
      state.isRecording = true;
    },
    endPractice: (state, action: PayloadAction<PracticeSession>) => {
      state.sessions.push(action.payload);
      state.currentSessionId = null;
      state.isRecording = false;
    },
    pausePractice: state => {
      state.isRecording = false;
    },
    resumePractice: state => {
      state.isRecording = true;
    },
  },
});

export const { startPractice, endPractice, pausePractice, resumePractice } =
  practiceSlice.actions;
export default practiceSlice.reducer;
```

---

### 4. Usage in Screens

**NewsScreen.tsx:**

```tsx
import React, { useEffect } from 'react';
import { FlatList, View } from 'react-native';
import {
  useAppDispatch,
  useAppSelector,
  fetchNewsArticles,
  selectArticle,
} from '../store';

export const NewsScreen = () => {
  const dispatch = useAppDispatch();
  const articles = useAppSelector(state => state.news.articles);
  const isLoading = useAppSelector(state => state.news.isLoading);

  useEffect(() => {
    dispatch(fetchNewsArticles());
  }, [dispatch]);

  return (
    <FlatList
      data={articles}
      renderItem={({ item }) => (
        <NewsCard
          article={item}
          onPress={() => dispatch(selectArticle(item))}
        />
      )}
    />
  );
};
```

**DashboardScreen.tsx:**

```tsx
import { useAppSelector } from '../store';

export const DashboardScreen = () => {
  const user = useAppSelector(state => state.auth.user);
  const sessions = useAppSelector(state => state.practice.sessions);
  const theme = useAppSelector(state => state.ui.theme);

  return (
    <View style={{ flex: 1 }}>
      <Text>Welcome, {user?.name}</Text>
      <Text>Practice sessions: {sessions.length}</Text>
      <Text>Theme: {theme}</Text>
    </View>
  );
};
```

---

### 5. Complex Selectors

Create `src/store/selectors.ts`:

```tsx
import { RootState } from './store';

// Auth selectors
export const selectUser = (state: RootState) => state.auth.user;
export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;
export const selectAuthError = (state: RootState) => state.auth.error;

// News selectors
export const selectAllArticles = (state: RootState) => state.news.articles;
export const selectArticleCount = (state: RootState) =>
  state.news.articles.length;
export const selectArticleById = (id: string) => (state: RootState) =>
  state.news.articles.find(article => article.id === id);

// Practice selectors
export const selectTotalPracticeSessions = (state: RootState) =>
  state.practice.sessions.length;
export const selectTotalPracticeHours = (state: RootState) =>
  state.practice.sessions.reduce(
    (total, session) => total + session.duration,
    0,
  ) / 60;
export const selectAveragePracticeScore = (state: RootState) => {
  const sessions = state.practice.sessions;
  if (sessions.length === 0) return 0;
  const totalScore = sessions.reduce(
    (total, session) => total + session.averageScore,
    0,
  );
  return Math.round(totalScore / sessions.length);
};

// Combined selectors
export const selectUserStats = (state: RootState) => ({
  user: state.auth.user,
  totalSessions: selectTotalPracticeSessions(state),
  totalHours: selectTotalPracticeHours(state),
  averageScore: selectAveragePracticeScore(state),
});
```

**Use in components:**

```tsx
import { useAppSelector } from '../store';
import { selectUserStats, selectArticleById } from '../store/selectors';

const MyComponent = () => {
  const stats = useAppSelector(selectUserStats);
  const article = useAppSelector(selectArticleById('123'));
};
```

---

### 6. Error Handling & Loading States

```tsx
export const NewsDetailScreen = () => {
  const dispatch = useAppDispatch();
  const article = useAppSelector(state => state.news.selectedArticle);
  const isLoading = useAppSelector(state => state.news.isLoading);
  const error = useAppSelector(state => state.news.error);

  if (isLoading) return <Loader />;
  if (error) {
    return (
      <ErrorScreen
        message={error}
        onRetry={() => dispatch(fetchNewsArticles())}
      />
    );
  }
  if (!article) return <EmptyState />;

  return <ArticleContent article={article} />;
};
```

---

### 7. Thunk Pattern (Complex Logic)

```tsx
import { createAsyncThunk } from '@reduxjs/toolkit';

export const syncUserData = createAsyncThunk(
  'auth/syncUserData',
  async (_, { dispatch, getState, rejectWithValue }) => {
    try {
      const state = getState() as any;
      const user = state.auth.user;

      // Fetch fresh data
      const response = await fetch(`/api/users/${user.id}`);
      const freshData = await response.json();

      // Update local state
      dispatch(setUser(freshData));

      // Show success message
      dispatch(
        showSnackbar({
          message: 'User data synced',
          type: 'success',
        }),
      );

      return freshData;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);

// Use in component:
const handleSync = () => {
  dispatch(syncUserData());
};
```

---

## 📋 Checklist for Integration

- [ ] Add auth slice to handle login/logout
- [ ] Add news slice for articles
- [ ] Add practice slice for sessions
- [ ] Create selectors file
- [ ] Update screens to use Redux
- [ ] Remove old useAuth hook usage
- [ ] Test state management
- [ ] Set up Redux DevTools (optional)

---

## 🎓 Learning Path

1. Start with simple slices (auth, ui)
2. Add selectors for complex queries
3. Implement async thunks for API calls
4. Create reusable hooks for components
5. Refactor existing screens

Ready to integrate? Start with one screen and gradually migrate! 🚀
