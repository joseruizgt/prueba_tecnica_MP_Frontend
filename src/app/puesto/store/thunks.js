import { error, success } from "../../../@components";
import { encriptItem, saveJobLocalS } from "../../../@utilities/manager";
import { isLoading, loaded } from "../../../store/slice";
import { add, list, update } from "../api/puestoApi";
import { jobIndividual, jobList, jobTotalList } from "./puestoSlice";

export const listJobs = (busqueda, limite, pagina, id = 0, catalogFlag = false) => {
    return async (dispatch) => {
        try {
            const respuesta = await list(busqueda, limite, pagina);
            if (respuesta.valid) {
                dispatch(jobList(respuesta.data.lista));
                dispatch(jobTotalList(respuesta.data.total));
                // localStorage.setItem('puesto', JSON.stringify(respuesta.data.lista));
                if (catalogFlag) {
                    saveJobLocalS(respuesta.data.lista);
                }
                if (id !== 0) {
                    let puesto = respuesta.data.lista.find(item => item.idPuesto === id);
                    dispatch(jobIndividual(puesto));
                }
            } else {
                error(respuesta.msg);
            }
        } catch (error) {
            console.log(error, 'error')
        }
    }
}

export const createJob = (data, navigate) => {
    return async (dispatch) => {
        try {
            dispatch(isLoading());
            const respuesta = await add(data);
            if (respuesta.valid) {
                dispatch(listJobs(undefined, undefined, 0, undefined, true));
                dispatch(loaded());
                success(respuesta.msg);
                navigate(`/administracion/puesto/editar/${encriptItem(respuesta.data.idPuesto)}`);
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

export const updateJob = (data, idPuesto) => {
    return async (dispatch) => {
        try {
            dispatch(isLoading());
            const respuesta = await update(data, idPuesto);
            if (respuesta.valid) {
                dispatch(loaded());
                success(respuesta.msg);
                dispatch(listJobs(undefined, undefined, 0));
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