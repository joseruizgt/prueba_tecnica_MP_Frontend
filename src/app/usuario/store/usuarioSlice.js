import { createSlice } from '@reduxjs/toolkit';

export const usuarioSlice = createSlice({
    name: 'usuario',
    initialState: {
        list: [],
        states: {},
        individual: {},
        total: 0
    },
    reducers: {
        userList: (state, { payload }) => {
            state.list = payload;
        },
        userStates: (state, { payload }) => {
            state.states = payload
        },
        individualUser: (state, { payload }) => {
            state.individual = payload
        },
        userTotalList: (state, { payload }) => {
            state.total = payload
        }
    }
});

// Action creators are generated for each case reducer function
export const { userList, userStates, individualUser, userTotalList } = usuarioSlice.actions;