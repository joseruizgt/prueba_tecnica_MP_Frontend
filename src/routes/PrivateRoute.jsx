/* eslint-disable react/prop-types */
import { Navigate, Outlet } from 'react-router-dom';
import { getPermissionsUser, getToken } from '../@utilities/manager';
import { NotFound } from '../@components';

export const PrivateRoute = ({ permissions }) => {
    let countPermissions = 0;
    const token = getToken();
    // const rol = decryptRolLocalStorage();
    let permisos = getPermissionsUser(); 

    if (token) {
        for (let i = 0; i < permisos.length; i++) {
            if (permisos[i] === permissions) {
                countPermissions++;
                break;
            }
        }
    }
    return (
        token
            ? countPermissions > 0
                ? <Outlet />
                : <NotFound />
            : <Navigate to="/login" />
    )
}
