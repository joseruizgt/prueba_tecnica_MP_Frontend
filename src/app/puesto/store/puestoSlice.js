import { createSlice } from '@reduxjs/toolkit';

export const puestoSlice = createSlice({
    name: 'puesto',
    initialState: {
        listJob: [],
        individualJob: {},
        total: 0
    },
    reducers: {
        jobList: (state, { payload }) => {
            state.listJob = payload;
        },
        jobIndividual: (state, { payload }) => {
            state.individualJob = payload;
        },
        jobTotalList: (state, { payload }) => {
            state.total = payload;
        },
    }
});

// Action creators are generated for each case reducer function
export const { jobList, jobIndividual, jobTotalList } = puestoSlice.actions;