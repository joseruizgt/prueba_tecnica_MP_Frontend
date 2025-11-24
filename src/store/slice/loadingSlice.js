import { createSlice } from '@reduxjs/toolkit';

export const loadingSlice = createSlice({
    name: 'loading',
    initialState: {
        loading: false
    },
    reducers: {
        isLoading: (state) => {
            state.loading = true;
        },
        loaded: (state) => {
            state.loading = false;
        }
    }
});

// Action creators are generated for each case reducer function
export const { isLoading, loaded } = loadingSlice.actions;