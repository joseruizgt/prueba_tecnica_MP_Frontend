import { error, success } from "../../../@components";
import { encriptItem, saveCatRolsLocalS } from "../../../@utilities/manager";
import { isLoading, loaded } from "../../../store/slice";
import { add, addRolPermissions, deleteRolPermission, list, listRolPermissions, update } from "../api/rolApi";
import { rolIndividual, rolIndividualPermissions, rolList, rolListPermissions, rolPermissionsTotalList, rolTotalList } from "./rolSlice";

export const listRols = (busqueda, limite, pagina, id = 0, catalogFlag = false) => {
    return async (dispatch) => {
        try {
            const respuesta = await list(busqueda, limite, pagina);
            if (respuesta.valid) {
                dispatch(rolList(respuesta.data.lista));
                dispatch(rolTotalList(respuesta.data.total));
                // localStorage.setItem('rol', JSON.stringify(respuesta.data.lista));
                if (catalogFlag) {
                    saveCatRolsLocalS(respuesta.data.lista);
                }
                if (id !== 0) {
                    let rol = respuesta.data.lista.find(item => item.idRol === id);
                    dispatch(rolIndividual(rol));
                }
            } else {
                error(respuesta.msg);
            }
        } catch (error) {
            console.log(error, 'error')
        }
    }
}

export const createRol = (data, navigate) => {
    return async (dispatch) => {
        try {
            dispatch(isLoading());
            const respuesta = await add(data);
            if (respuesta.valid) {
                dispatch(listRols(undefined, undefined, 0, undefined, true));
                dispatch(loaded());
                success(respuesta.msg);
                navigate(`/administracion/rol/editar/${encriptItem(respuesta.data.idRol)}`);
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

export const updateRol = (data, idRol) => {
    return async (dispatch) => {
        try {
            dispatch(isLoading());
            const respuesta = await update(data, idRol);
            if (respuesta.valid) {
                dispatch(loaded());
                success(respuesta.msg);
                dispatch(listRols(undefined, undefined, 0));
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

export const listRolsPermissions = (busqueda, limite, pagina, id = 0) => {
    return async (dispatch) => {
        try {
            // dispatch(isLoading());
            const respuesta = await listRolPermissions(busqueda, limite, pagina);
            if (respuesta.valid) {
                dispatch(loaded());
                dispatch(rolListPermissions(respuesta.data.lista));
                dispatch(rolPermissionsTotalList(respuesta.data.total));
                if (id !== 0) {
                    let rol = respuesta.data.lista.find(item => item.idRol === id);
                    dispatch(rolIndividualPermissions(rol));
                }
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

export const createRolPermissions = (data, id_rol) => {
    return async (dispatch) => {
        try {
            const respuesta = await addRolPermissions({ permisos: data }, { id_rol });
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

export const deleteRolPermissions = (data, id_rol) => {
    return async (dispatch) => {
        try {
            const respuesta = await deleteRolPermission({ permisos: data }, { id_rol });
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