import * as axios from '../../../@http/axiosClient';

/// LISTAR PUESTOS
export async function list(busqueda = '', limite = 5, pagina = 1) {
    let params = {
        busqueda,
        limite,
        pagina,
    };
    const respuesta = await axios.get('/puesto', params);
    return respuesta.data;
}

/// AGREGAR NUEVO PUESTO
export async function add(obj) {
    const respuesta = await axios.post('/puesto', obj);
    return respuesta.data;
}

/// ACTUALIZAR PUESTO
export async function update(obj, id) {
    let params = { idPuesto: id };
    const respuesta = await axios.put('/puesto', obj, params)
    return respuesta.data;
}

/// ELIMINAR PUESTO
export async function deleteItem(id) {
    let params = { idPuesto: id };
    const respuesta = await axios.deleteItem('/puesto', params)
    return respuesta.data;
}
