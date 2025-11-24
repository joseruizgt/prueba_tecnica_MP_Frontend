import { error, success } from "../../../@components";
import { savePermissions, saveRolLocalStorage, saveTokenLocalStorage, saveUser } from "../../../@utilities/manager";
import { isLoading, loaded } from "../../../store/slice";
import { inicioSesion } from "../api/authApi";

export const login = (dataLogin, setToken) => {
    return async (dispatch) => {
        //destructuracion de lo que venga en data
        try {
            dispatch(isLoading());
            const respuesta = await inicioSesion(dataLogin);
            if (respuesta.valid) {
                saveTokenLocalStorage(respuesta.data.token);
                saveRolLocalStorage(respuesta.data.rol);
                setToken(respuesta.data.token);
                saveUser(respuesta.data.usuario);
                savePermissions(respuesta.data.permisos);
                dispatch(loaded());
                success(respuesta.msg, 1500);
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
