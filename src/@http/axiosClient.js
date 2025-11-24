/* eslint-disable no-undef */
import axios from 'axios';
import { getToken, logout, saveTokenLocalStorage } from '../@utilities/manager';
import { error as errorNotification } from "../@components";

const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    withCredentials: true
});

axiosClient.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;

        // Si recibimos un 600 (token expirado) y no hemos reintentado aún
        if (error.response?.status === 600 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                // Se llama al endpoint para renovar el accessToken usando el refreshToken (en cookie)
                const refreshResponse = await axios.post(
                    import.meta.env.VITE_BACKEND_URL + '/auth/refresh-token',
                    {},
                    { withCredentials: true }
                );

                const newAccessToken = refreshResponse.data.accessToken;

                // Se Guarda nuevo token
                saveTokenLocalStorage(newAccessToken);

                // Actualiza el header y reintenta la petición original
                originalRequest.headers['x-token'] = newAccessToken;
                return axiosClient(originalRequest);

            } catch (refreshError) {
                console.error('Error al renovar el token:', refreshError);

                //se realiza redireccion al inicio de sesion
                errorNotification('Tu sesión ha expirado');
                setTimeout(() => {
                    logout(() => {
                        window.location.reload();
                    });
                }, 1000);
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);




export function get(url, params = {}) {
    // const requestUrl = import.meta.env.VITE_BACKEND_URL + url
    const config = getConfig(params)
    return axiosClient.get(url, config);
}

//de aqui para abajo me falta actualizar las funciones
export function post(url, body, params = {}) {
    // const requestUrl = import.meta.env.VITE_BACKEND_URL + url
    const config = getConfig(params)
    return axiosClient.post(url, body, config);
}

export function put(url, body, params = {}) {
    // const requestUrl = import.meta.env.VITE_BACKEND_URL + url
    const config = getConfig(params)
    return axiosClient.put(url, body, config);
}

export function deleteItem(url, params = {}) {
    // const requestUrl = import.meta.env.VITE_BACKEND_URL + url
    const config = getConfig(params);
    return axiosClient.delete(url, config);
}

export function jsreport(body, params = {}) {
    const requestUrl = import.meta.env.VITE_JSREPORT_URL
    const config = getConfigJsReport(params);
    return axios.post(requestUrl, body, config);
}

function getConfig(params) {
    const config = {
        headers: {
            'x-token': getToken(),
        }
    }
    if (typeof params === 'object') {
        return { ...config, params }
    } else {
        return config
    }
}

function getConfigJsReport(params) {
    const config = {
        headers: {
            Authorization: 'Basic bWljb29wZTptaWNvb3BlMTIzNA==',

        },
        responseType: 'blob'
    }
    if (typeof params === 'object') {
        return { ...config, params }
    } else {
        return config
    }
}
