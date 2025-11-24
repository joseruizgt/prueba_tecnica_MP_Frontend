import { error, success } from "../../../@components";
import { encriptItem } from "../../../@utilities/manager";
import { isLoading, loaded } from "../../../store/slice";
import { add, deleteItem, item, list, update } from "../api/usuarioApi";
import { individualUser, userList, userStates, userTotalList } from "./usuarioSlice";

export const listUsers = (busqueda, limite, pagina, estado, idFiscalia) => {
    return async (dispatch) => {
        try {
            // dispatch(isLoading());
            const respuesta = await list(busqueda, limite, pagina, estado, idFiscalia);
            if (respuesta.valid) {
                dispatch(userList(respuesta.data.lista));
                dispatch(userStates({ active: respuesta.data.activos, disabled: respuesta.data.deshabilitados }));
                dispatch(userTotalList(respuesta.data.total));
                // dispatch(loaded());
            } else {
                // dispatch(loaded());
                error(respuesta.msg);
            }
        } catch (error) {
            dispatch(loaded());
            // interceptorResponse(error);
            console.log(error, 'error')
        }
    }
}

export const listUsers2 = (busqueda, limite, pagina, estado, idFiscalia, id) => {
    return async (dispatch) => {
        try {
            dispatch(isLoading());
            const respuesta = await list(busqueda, limite, pagina, estado, idFiscalia);
            if (respuesta.valid) {
                dispatch(userList(respuesta.data.lista));
                dispatch(userStates({ active: respuesta.data.activos, disabled: respuesta.data.deshabilitados }));
                dispatch(userTotalList(respuesta.data.total));
                if (id) {
                    let usuarioIndividual = respuesta.data.lista.find(item => item.idUsuario === id);
                    dispatch(individualUser(usuarioIndividual));
                }
                dispatch(loaded());
            } else {
                dispatch(loaded());
                error(respuesta.msg);
            }

        } catch (error) {
            dispatch(loaded());
            console.log(error, 'error')
        }
    }
}

export const createUser = (data, navigate) => {
    return async (dispatch) => {
        try {
            dispatch(isLoading());
            const respuesta = await add(data);
            if (respuesta.valid) {
                dispatch(loaded());
                success(respuesta.msg);
                navigate(`/administracion/usuario/editar/${encriptItem(respuesta.data.idUsuario)}`);
            } else {
                dispatch(loaded());
                console.log('entreeee')
                error(respuesta.msg);
            }

        } catch (error) {
            dispatch(loaded());
            console.log(error, 'error')
        }
    }
}

export const updateUser = (data, idUsuario, flagHabilitarDeshabilitar) => {
    return async (dispatch) => {
        try {
            dispatch(isLoading());
            const respuesta = await update(data, idUsuario);
            if (respuesta.valid) {
                dispatch(loaded());
                success(respuesta.msg);
                if (flagHabilitarDeshabilitar) {
                    dispatch(listUsers(undefined, undefined, 1, data.estado === 1 ? 0 : 1, undefined));
                }
            } else {
                dispatch(loaded());
                error(respuesta.msg);
            }

        } catch (error) {
            dispatch(loaded());
            console.log(error, 'error')
        }
    }
}

export const deleteUser = (idUsuario) => {
    return async (dispatch) => {
        try {
            dispatch(isLoading());
            const respuesta = await deleteItem(idUsuario);
            if (respuesta.valid) {
                dispatch(loaded());
                success(respuesta.msg);
                dispatch(listUsers(undefined, undefined, 1, 1, undefined));
            } else {
                dispatch(loaded());
                error(respuesta.msg);
            }

        } catch (error) {
            dispatch(loaded());
            console.log(error, 'error')
        }
    }
}

export const getUsuario = (id) => {
    return async (dispatch) => {
        try {
            const respuesta = await item(id);
            if (respuesta.valid) {
                dispatch(individualUser(respuesta.data));
            } else {
                dispatch(loaded());
                error(respuesta.msg);
            }

        } catch (error) {
            dispatch(loaded());
            console.log(error, 'error')
        }
    }
}