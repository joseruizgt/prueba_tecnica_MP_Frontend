import { createSlice } from '@reduxjs/toolkit';

export const fiscaliaSlice = createSlice({
    name: 'fiscalia',
    initialState: {
        listFiscalia: [],
        individualFiscalia: {},
        totalFiscalia: 0,
    },
    reducers: {
        FiscaliaList: (state, { payload }) => {
            state.listFiscalia = payload;
        },
        FiscaliaIndividual: (state, { payload }) => {
            state.individualFiscalia = payload;
        },
        fiscaliaTotalList: (state, { payload }) => {
            state.totalFiscalia = payload;
        },
    }
});

// Action creators are generated for each case reducer function
export const { FiscaliaList, fiscaliaTotalList, FiscaliaIndividual } = fiscaliaSlice.actions;