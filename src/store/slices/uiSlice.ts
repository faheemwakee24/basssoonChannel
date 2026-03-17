import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UIState {
    isLoading: boolean;
    snackbar: {
        visible: boolean;
        message: string;
        type: 'success' | 'error' | 'info' | 'warning';
    };
    theme: 'light' | 'dark';
}

const initialState: UIState = {
    isLoading: false,
    snackbar: {
        visible: false,
        message: '',
        type: 'info',
    },
    theme: 'light',
};

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        showSnackbar: (
            state,
            action: PayloadAction<{
                message: string;
                type?: 'success' | 'error' | 'info' | 'warning';
            }>
        ) => {
            state.snackbar = {
                visible: true,
                message: action.payload.message,
                type: action.payload.type || 'info',
            };
        },
        hideSnackbar: (state) => {
            state.snackbar.visible = false;
        },
        setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
            state.theme = action.payload;
        },
    },
});

export const { setLoading, showSnackbar, hideSnackbar, setTheme } =
    uiSlice.actions;
export default uiSlice.reducer;
