import { configureStore } from "@reduxjs/toolkit"
import { loadingSlice, tabSlice } from "./slice";
import { usuarioSlice } from "../app/usuario/store";
import { fiscaliaSlice } from "../app/fiscalia/store";
import { puestoSlice } from "../app/puesto/store";
import { rolSlice } from "../app/rol/store";
import { valeSlice } from "../app/expediente/store";

export const store = configureStore({
    reducer: {
        loading: loadingSlice.reducer,
        users: usuarioSlice.reducer,
        tab: tabSlice.reducer,
        fiscalia: fiscaliaSlice.reducer,
        job: puestoSlice.reducer,
        rol: rolSlice.reducer,
        vouncher: valeSlice.reducer
    }
});
