import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface User {
  id: number;
  name: string;
  email: string;
  contact_number?: string | null;
  country_id?: number | null;
  address_line_1?: string | null;
  address_line_2?: string | null;
  postal_code?: string | null;
  city?: string | null;
  state?: string | null;
  designation?: string | null;
  profile_image?: string | null;
  email_verified_at?: string | null;
  is_admin: number;
  created_at: string;
  updated_at: string;
  status: number;
  slug: string;
  unique_uri?: string | null;
  image?: string | null;
  stripe_customer_id?: string | null;
  last_viewed_item_id?: number | null;
  current_plan_id?: number | null;
  api_token_expires_at?: string | null;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isLoading: false,
  isAuthenticated: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { setLoading, setUser, setError, logout, clearError } =
  authSlice.actions;
export default authSlice.reducer;
