import { createSlice } from '@reduxjs/toolkit';

export const tabSlice = createSlice({
    name: 'tab',
    initialState: {
        position: 0
    },
    reducers: {
        changePosition: (state, { payload }) => {
            state.position = payload;
        },
        resetPosition: (state) => {
            state.position = 0;
        },
    }
});

// Action creators are generated for each case reducer function
export const { changePosition, resetPosition } = tabSlice.actions;