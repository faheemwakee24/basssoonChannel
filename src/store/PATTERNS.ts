import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import type { ThunkAction, Action } from '@reduxjs/toolkit';

/**
 * REDUX PATTERNS REFERENCE
 * 
 * Common patterns and examples for Redux Toolkit in this project
 */

// ============================================================================
// PATTERN 1: SIMPLE SLICE WITH REDUCERS
// ============================================================================

interface CounterState {
    value: number;
}

export const counterSlice = createSlice({
    name: 'counter',
    initialState: { value: 0 } as CounterState,
    reducers: {
        increment: (state) => {
            state.value += 1; // RTK uses Immer, mutate like normal!
        },
        decrement: (state) => {
            state.value -= 1;
        },
        incrementByAmount: (state, action: PayloadAction<number>) => {
            state.value += action.payload;
        },
    },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;

// ============================================================================
// PATTERN 2: ASYNC THUNK (API CALLS)
// ============================================================================

export interface Article {
    id: string;
    title: string;
    content: string;
}

interface NewsState {
    articles: Article[];
    isLoading: boolean;
    error: string | null;
}

// Define the async thunk
export const fetchArticles = createAsyncThunk<
    Article[], // Return type
    string, // Argument type (e.g., category)
    {
        rejectValue: string;
    }
>('news/fetchArticles', async (category, { rejectWithValue }) => {
    try {
        const response = await fetch(`/api/articles?category=${category}`);
        if (!response.ok) throw new Error(response.statusText);
        return await response.json();
    } catch (error) {
        return rejectWithValue((error as Error).message);
    }
});

export const newsSlice = createSlice({
    name: 'news',
    initialState: {
        articles: [],
        isLoading: false,
        error: null,
    } as NewsState,
    reducers: {
        clearNews: (state) => {
            state.articles = [];
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchArticles.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchArticles.fulfilled, (state, action) => {
                state.isLoading = false;
                state.articles = action.payload;
            })
            .addCase(fetchArticles.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || 'Failed to fetch articles';
            });
    },
});

export const { clearNews } = newsSlice.actions;

// ============================================================================
// PATTERN 3: SELECTOR FUNCTIONS (Reusable queries)
// ============================================================================

// Basic selectors
export const selectArticles = (state: any) => state.news.articles;
export const selectNewsLoading = (state: any) => state.news.isLoading;
export const selectNewsError = (state: any) => state.news.error;

// Derived selectors
export const selectArticleCount = (state: any) => state.news.articles.length;
export const selectFirstArticle = (state: any) => state.news.articles[0];

// Parameterized selector
export const selectArticleById = (id: string) => (state: any) =>
    state.news.articles.find((article: Article) => article.id === id);

// ============================================================================
// PATTERN 4: THUNK ACTIONS (Manual async handling)
// ============================================================================

/**
 * Custom thunk for complex async logic
 * Dispatch: dispatch(loginUser({ email, password }))
 */
export const loginUser = createAsyncThunk<
    { token: string; user: any },
    { email: string; password: string },
    { rejectValue: string }
>(
    'auth/loginUser',
    async (credentials, { dispatch, rejectWithValue }) => {
        try {
            // You can also dispatch actions from thunks!
            dispatch(setAuthLoading(true));

            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(credentials),
            });

            if (!response.ok) throw new Error(response.statusText);

            const data = await response.json();

            // Success!
            dispatch(setAuthLoading(false));
            return data;
        } catch (error) {
            dispatch(setAuthLoading(false));
            return rejectWithValue((error as Error).message);
        }
    }
);

// ============================================================================
// PATTERN 5: USING IN COMPONENTS
// ============================================================================

/**
 * Component example using all the patterns above
 * 
 * import { useAppDispatch, useAppSelector } from '../store';
 * import { fetchArticles, selectArticles, selectNewsLoading } from '../store/slices/newsSlice';
 * 
 * export const NewsScreen = () => {
 *   const dispatch = useAppDispatch();
 *   const articles = useAppSelector(selectArticles);
 *   const isLoading = useAppSelector(selectNewsLoading);
 *   const error = useAppSelector(selectNewsError);
 * 
 *   useEffect(() => {
 *     // Dispatch async thunk
 *     dispatch(fetchArticles('technology'));
 *   }, [dispatch]);
 * 
 *   if (isLoading) return <Loader />;
 *   if (error) return <Text>{error}</Text>;
 * 
 *   return (
 *     <FlatList
 *       data={articles}
 *       renderItem={({ item }) => <ArticleCard article={item} />}
 *     />
 *   );
 * };
 */

// ============================================================================
// PATTERN 6: SLICE WITH COMPLEX STATE MANAGEMENT
// ============================================================================

interface PracticeState {
    sessions: {
        id: string;
        date: string;
        duration: number;
        scores: number[];
    }[];
    currentSession: {
        id: string;
        started: boolean;
        paused: boolean;
        duration: number;
    } | null;
    stats: {
        totalSessions: number;
        totalHours: number;
        averageScore: number;
    };
    isLoading: boolean;
}

export const practiceSlice = createSlice({
    name: 'practice',
    initialState: {
        sessions: [],
        currentSession: null,
        stats: {
            totalSessions: 0,
            totalHours: 0,
            averageScore: 0,
        },
        isLoading: false,
    } as PracticeState,
    reducers: {
        startSession: (state, action: PayloadAction<{ id: string }>) => {
            state.currentSession = {
                id: action.payload.id,
                started: true,
                paused: false,
                duration: 0,
            };
        },
        pauseSession: (state) => {
            if (state.currentSession) {
                state.currentSession.paused = true;
            }
        },
        resumeSession: (state) => {
            if (state.currentSession) {
                state.currentSession.paused = false;
            }
        },
        endSession: (state, action: PayloadAction<{ scores: number[] }>) => {
            if (state.currentSession) {
                state.sessions.push({
                    id: state.currentSession.id,
                    date: new Date().toISOString(),
                    duration: state.currentSession.duration,
                    scores: action.payload.scores,
                });

                // Update stats
                const allScores = state.sessions.flatMap((s) => s.scores);
                state.stats.totalSessions = state.sessions.length;
                state.stats.averageScore =
                    allScores.reduce((a, b) => a + b, 0) / allScores.length;

                state.currentSession = null;
            }
        },
    },
});

export const { startSession, pauseSession, resumeSession, endSession } =
    practiceSlice.actions;

// ============================================================================
// PATTERN 7: TYPED THUNK (For your app)
// ============================================================================

import type { RootState, AppDispatch } from '../store/store';

export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;

/**
 * Usage:
 * 
 * export const myThunk = (): AppThunk => async (dispatch, getState) => {
 *   const state = getState();
 *   // Do something
 *   dispatch(someAction());
 * };
 */

// ============================================================================
// Placeholder reducers for auth
// ============================================================================

const setAuthLoading = (value: boolean) => ({
    type: 'auth/setLoading',
    payload: value,
});
