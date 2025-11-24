import * as axios from '../../../@http/axiosClient';

/// LISTAR USUARIOS
export async function list(busqueda = '', limite = 5, pagina = 1, estado, idFiscalia = '') {
    let params = {
        busqueda,
        limite,
        pagina,
        estado,
        idFiscalia
    };
    const respuesta = await axios.get('/usuario', params);
    return respuesta.data;
}

export async function item(id) {
    let params = {
        id
    };
    const respuesta = await axios.get('/usuario/individual', params);
    return respuesta.data;
}

/// AGREGAR NUEVO USUARIO
export async function add(obj) {
    const respuesta = await axios.post('/usuario', obj);
    return respuesta.data;
}

/// ACTUALIZAR USUARIO
export async function update(obj, id) {
    let params = { idUsuario: id };
    const respuesta = await axios.put('/usuario', obj, params)
    return respuesta.data;
}

/// ELIMINAR USUARIO
export async function deleteItem(id) {
    let params = { idUsuario: id };
    const respuesta = await axios.deleteItem('/usuario', params)
    return respuesta.data;
}
