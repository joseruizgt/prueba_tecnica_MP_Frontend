import { useDispatch, useSelector } from 'react-redux';
import { createRol, createRolPermissions, deleteRolPermissions, listRols, listRolsPermissions, updateRol } from '../store';


export const useRol = () => {

    const dispatch = useDispatch();
    const { listRol, individualRol, listRolPermissions, individualRolPermissions, total, totalRolPermissions } = useSelector((state) => state.rol);

    const listRolH = (busqueda, limite, pagina, id) => {
        dispatch(listRols(busqueda, limite, pagina, id));
    }

    const createRolH = (data, navigate) => {
        dispatch(createRol(data, navigate));
    }

    const updateRolH = (data, idRol) => {
        dispatch(updateRol(data, idRol));
    }

    const listRolsPermissionsH = (busqueda, limite, pagina, id) => {
        dispatch(listRolsPermissions(busqueda, limite, pagina, id));
    }

    const createRolPermissionsH = (data, id_rol) => {
        dispatch(createRolPermissions(data, id_rol));
    }

    const deleteRolPermissionsH = (data, id_rol) => {
        dispatch(deleteRolPermissions(data, id_rol));
    }

    return {
        //valores
        listRol,
        individualRol,
        listRolPermissions,
        individualRolPermissions,
        total,
        totalRolPermissions,

        //funciones
        listRolH,
        createRolH,
        updateRolH,
        listRolsPermissionsH,
        createRolPermissionsH,
        deleteRolPermissionsH
    }
}
