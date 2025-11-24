import { createSlice } from '@reduxjs/toolkit';

export const rolSlice = createSlice({
    name: 'rol',
    initialState: {
        listRol: [],
        individualRol: {},
        listRolPermissions: [],
        individualRolPermissions: {},
        total: 0,
        totalRolPermissions: 0
    },
    reducers: {
        rolList: (state, { payload }) => {
            state.listRol = payload;
        },
        rolIndividual: (state, { payload }) => {
            state.individualRol = payload;
        },
        rolListPermissions: (state, { payload }) => {
            state.listRolPermissions = payload;
        },
        rolIndividualPermissions: (state, { payload }) => {
            state.individualRolPermissions = payload;
        },
        clearRolIndividualPermissions: (state) => {
            state.individualRolPermissions = {};
        },
        rolTotalList: (state, { payload }) => {
            state.total = payload;
        },
        rolPermissionsTotalList: (state, { payload }) => {
            state.totalRolPermissions = payload;
        }
    }
});

// Action creators are generated for each case reducer function
export const { rolList, rolIndividual, rolListPermissions, rolIndividualPermissions, clearRolIndividualPermissions, rolTotalList, rolPermissionsTotalList } = rolSlice.actions;