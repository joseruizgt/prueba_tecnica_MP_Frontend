import * as axios from '../../../@http/axiosClient';

/// LISTAR PERMISOS
export async function list() {
    let params = {};
    const respuesta = await axios.get('/permiso', params);
    return respuesta.data;
}