import * as axios from '../../../@http/axiosClient';

/// INICIO SESION
export async function inicioSesion(obj) {
    const respuesta = await axios.post('/login', obj);
    return respuesta.data;
}