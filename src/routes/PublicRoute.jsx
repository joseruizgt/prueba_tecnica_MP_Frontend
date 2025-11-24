/* eslint-disable react/prop-types */
import { Navigate } from 'react-router-dom';
import { getToken } from '../@utilities/manager';

export const PublicRoute = ({ children }) => {
    return getToken()
        ? <Navigate to="/" />
        : children
}
