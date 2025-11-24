import { error, success } from "../../../@components";
// import { interceptorResponse } from "../../../@utilities/manager";
import { isLoading, loaded, resetPosition } from "../../../store/slice";
import { add, change, correccionV, currentVounchers, deleteItem, item, itemBitacora, itemRechazo, list, listConta, listTot, rejection, update } from "../api/valeApi";
import { bitacoraList, clearIndividual, clearItemRechazoVouncher, currentsVouncher, individualBitacoraVale, individualVale, itemRechazoVouncher, valeList, valeStates, vouncherTotalBitacoraList, vouncherTotalList } from "./valeSlice";


export const listVale = (busqueda, limite, pagina, tab) => {
    return async (dispatch) => {
        try {
            // dispatch(isLoading());
            const respuesta = await list(busqueda, limite, pagina, tab);
            if (respuesta.valid) {
                dispatch(valeList(respuesta.data.lista));
                dispatch(valeStates(
                    {
                        draft: respuesta.data.borradores,
                        approval: respuesta.data.aprobar,
                        authorization: respuesta.data.autorizar,
                        disbursement: respuesta.data.pendienteDesembolso,
                        liquidate: respuesta.data.pendienteLiquidar,
                        finalized: respuesta.data.finalizados,
                        pendingApproval: respuesta.data.pendientesAprobar,
                        pendingAuthorization: respuesta.data.pendientesAutorizar,
                        rejected: respuesta.data.rechazados
                    }));
                dispatch(vouncherTotalList(respuesta.data.total));
                dispatch(loaded());
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

export const valesVigentes = () => {
    return async (dispatch) => {
        try {
            const respuesta = await currentVounchers();
            if (respuesta.valid) {
                dispatch(currentsVouncher(respuesta.data));
            } else {
                error(respuesta.msg);
            }
        } catch (error) {
            console.log(error, 'error')
        }
    }
}

export const saveVale = (data) => {
    return async (dispatch) => {
        try {
            dispatch(isLoading());
            const respuesta = await add(data);
            if (respuesta.valid) {
                dispatch(listVale(undefined, undefined, 0, 1));
                dispatch(resetPosition())
                dispatch(loaded());
                success(respuesta.msg);
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

export const cambioFase = (fase, data, tab) => {
    return async (dispatch) => {
        try {
            dispatch(isLoading());
            const respuesta = await change(data, { fase, idExpediente: data.idExpediente });
            if (respuesta.valid) {
                dispatch(listVale(undefined, undefined, 0, tab + 1));
                dispatch(loaded());
                success(respuesta.msg);
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

export const rechazoVale = (idExpediente, data) => {
    return async (dispatch) => {
        try {
            let data1 = { ...data, idExpediente }
            const respuesta = await rejection(data1);
            if (respuesta.valid) {
                // success(respuesta.msg);
            } else {
                error(respuesta.msg);
            }
        } catch (error) {
            dispatch(loaded());
            // interceptorResponse(error);
            console.log(error, 'error')
        }
    }
}

export const individualValePeticion = (idExpediente) => {
    return async (dispatch) => {
        try {
            const respuesta = await item(idExpediente);
            if (respuesta.valid) {
                dispatch(individualVale(respuesta.data));
            } else {
                error(respuesta.msg);
            }
        } catch (error) {
            console.log(error, 'error')
        }
    }
}

export const editItem = (id, data) => {
    return async (dispatch) => {
        try {
            dispatch(isLoading());
            const respuesta = await update(data, { idExpediente: id });
            if (respuesta.valid) {
                dispatch(listVale(undefined, undefined, 0, 1));
                dispatch(resetPosition())
                dispatch(loaded());
                success(respuesta.msg);
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

export const obtenerRechazo = (idVale) => {
    return async (dispatch) => {
        try {
            const respuesta = await itemRechazo(idVale);
            if (respuesta.valid) {
                dispatch(itemRechazoVouncher(respuesta.data))
            } else {
                error(respuesta.msg);
            }
        } catch (error) {
            console.log(error, 'error')
        }
    }
}

export const correccion = (idExpediente, data, tab) => {
    return async (dispatch) => {
        try {
            const respuesta = await correccionV(idExpediente, data);
            if (respuesta.valid) {
                dispatch(listVale(undefined, undefined, 0, tab + 1));
                dispatch(clearIndividual());
                dispatch(clearItemRechazoVouncher());
            } else {
                error(respuesta.msg);
            }
        } catch (error) {
            console.log(error, 'error')
            // interceptorResponse(error);
        }
    }
}

export const eliminar = (idExpediente, tab) => {
    return async (dispatch) => {
        try {
            const respuesta = await deleteItem(idExpediente);
            if (respuesta.valid) {
                dispatch(valesVigentes());
                dispatch(listVale(undefined, undefined, 0, tab + 1));
                success('Elemento eliminado correctamente');
            } else {
                error(respuesta.msg);
            }
        } catch (error) {
            console.log(error, 'error')
            // interceptorResponse(error);
        }
    }
}

export const listValesConta = (busqueda, limite, pagina, tab, idAgencia) => {
    return async (dispatch) => {
        try {
            // dispatch(isLoading());
            const respuesta = await listConta(busqueda, limite, pagina, tab, idAgencia);
            if (respuesta.valid) {
                dispatch(valeList(respuesta.data.lista));
                dispatch(valeStates(
                    {
                        disbursement: respuesta.data.pendienteDesembolso,
                        liquidate: respuesta.data.pendienteLiquidar,
                        finalized: respuesta.data.finalizados
                    }));
                dispatch(vouncherTotalList(respuesta.data.total));
                dispatch(loaded());
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

export const listTotal = (busqueda, limite, pagina, idAgencia) => {
    return async (dispatch) => {
        try {
            // dispatch(isLoading());
            const respuesta = await listTot(busqueda, limite, pagina, idAgencia);
            if (respuesta.valid) {
                dispatch(bitacoraList(respuesta.data.lista));
                dispatch(vouncherTotalBitacoraList(respuesta.data.total));
                dispatch(loaded());
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

export const individualBitacora = (idExpediente) => {
    return async (dispatch) => {
        try {
            const respuesta = await itemBitacora(idExpediente);
            if (respuesta.valid) {
                dispatch(individualBitacoraVale(respuesta.data));
            } else {
                error(respuesta.msg);
            }
        } catch (error) {
            console.log(error, 'error')
        }
    }
}