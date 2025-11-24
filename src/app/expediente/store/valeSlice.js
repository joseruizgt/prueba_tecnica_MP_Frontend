import { createSlice } from '@reduxjs/toolkit';

export const valeSlice = createSlice({
    name: 'vale',
    initialState: {
        list: [],
        states: {},
        individual: {},
        currents: {},
        itemRechazo: {},
        bitacoraVale: [],
        bitacoraValeIndividual: {},
        total: 0,
        totalBitacoraVale: 0
    },
    reducers: {
        valeList: (state, { payload }) => {
            state.list = payload;
        },
        valeStates: (state, { payload }) => {
            state.states = payload
        },
        individualVale: (state, { payload }) => {
            state.individual = payload
        },
        currentsVouncher: (state, { payload }) => {
            state.currents = payload
        },
        itemRechazoVouncher: (state, { payload }) => {
            state.itemRechazo = payload
        },
        clearItemRechazoVouncher: (state) => {
            state.itemRechazo = {};
        },
        clearList: (state) => {
            state.list = [];
        },
        clearIndividual: (state) => {
            state.individual = {};
        },
        bitacoraList: (state, { payload }) => {
            state.bitacoraVale = payload;
        },
        individualBitacoraVale: (state, { payload }) => {
            state.bitacoraValeIndividual = payload
        },
        vouncherTotalList: (state, { payload }) => {
            state.total = payload
        },
        vouncherTotalBitacoraList: (state, { payload }) => {
            state.totalBitacoraVale = payload
        },
    }
});

// Action creators are generated for each case reducer function
export const { valeList, valeStates, individualVale, currentsVouncher, itemRechazoVouncher, clearItemRechazoVouncher, clearList, bitacoraList, individualBitacoraVale, vouncherTotalList, vouncherTotalBitacoraList, clearIndividual } = valeSlice.actions;