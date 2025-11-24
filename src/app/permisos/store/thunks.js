import { error } from "../../../@components";
import { savePermissionsSystem } from "../../../@utilities/manager";
import { list } from "../api/permisoApi";

export const listPermisos = () => {
    return async (dispatch) => {
        try {
            const respuesta = await list();
            if (respuesta.valid) {
                let respuestaAux = [];
                respuesta.data.lista.forEach(item => {
                    respuestaAux.push({
                        id_permiso: item.idPermiso,
                        codigo: item.codigo
                    })
                });
                // localStorage.setItem('200', JSON.stringify(respuestaAux));
                savePermissionsSystem(respuestaAux)
            } else {
                error(respuesta.msg);
            }
        } catch (error) {
            console.log(error, 'error')
        }
    }
}