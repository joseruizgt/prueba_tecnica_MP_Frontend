import { error, success } from "../../../@components";
import { encriptItem, saveAgencia } from "../../../@utilities/manager";
import { isLoading, loaded } from "../../../store/slice";
// import { isLoading, loaded } from "../../../store/slice";
import { addFiscalia, listFiscalias, updateFiscalia } from "../api/agenciaApi";
import { FiscaliaIndividual, FiscaliaList, fiscaliaTotalList } from "./fiscaliaSlice";


export const listFiscaliaData = (busqueda, limite, pagina, id = 0, catalogFlag = false) => {
    return async (dispatch) => {
        try {
            const respuesta = await listFiscalias(busqueda, limite, pagina);
            if (respuesta.valid) {
                dispatch(FiscaliaList(respuesta.data.lista));
                dispatch(fiscaliaTotalList(respuesta.data.total));
                // localStorage.setItem('agencia', JSON.stringify(respuesta.data.lista));
                if (catalogFlag) {
                    saveAgencia(respuesta.data.lista)
                }
                if (id !== 0) {
                    let fiscalia = respuesta.data.lista.find(item => item.idFiscalia === id);
                    dispatch(FiscaliaIndividual(fiscalia));
                }
            } else {
                // dispatch(loaded());
                error(respuesta.msg);
            }

        } catch (error) {
            // dispatch(loaded());
            console.log(error, 'error')
        }
    }
}

export const createFiscalia = (data, navigate) => {
    return async (dispatch) => {
        try {
            dispatch(isLoading());
            const respuesta = await addFiscalia(data);
            if (respuesta.valid) {
                dispatch(listFiscaliaData(undefined, undefined, 0, undefined, true));
                dispatch(loaded());
                success(respuesta.msg);
                navigate(`/administracion/fiscalia/editar/${encriptItem(respuesta.data.idFiscalia)}`);
            } else {
                dispatch(loaded());
                error(respuesta.msg);
            }

        } catch (error) {
            dispatch(loaded());
            // interceptorResponse(error);
            console.log(error, 'error')
        }
    }
}

export const updateFiscalias = (data, idFiscalia) => {
    return async (dispatch) => {
        try {
            dispatch(isLoading());
            const respuesta = await updateFiscalia(data, idFiscalia);
            if (respuesta.valid) {
                dispatch(loaded());
                success(respuesta.msg);
                dispatch(listFiscaliaData(undefined, undefined, 0));
            } else {
                dispatch(loaded());
                error(respuesta.msg);
            }

        } catch (error) {
            dispatch(loaded());
            // interceptorResponse(error);
            console.log(error, 'error')
        }
    }
}