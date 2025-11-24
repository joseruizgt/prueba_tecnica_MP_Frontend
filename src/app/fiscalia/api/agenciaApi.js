import * as axios from '../../../@http/axiosClient';

/// LISTAR AGENCIAS
export async function list(busqueda = '', limite = 5, pagina = 1) {
    let params = {
        busqueda,
        limite,
        pagina,
    };
    const respuesta = await axios.get('/agencia', params);
    return respuesta.data;
}

// LISTAR FISCALIAS
export async function listFiscalias(busqueda = '', limite = 5, pagina = 1) {
    let params = {
        busqueda,
        limite,
        pagina,
    };
    const respuesta = await axios.get('/fiscalia', params);
    return respuesta.data;
}

/// AGREGAR NUEVA AGENCIA
export async function add(obj) {
    const respuesta = await axios.post('/agencia', obj);
    return respuesta.data;
}

/// AGREGAR NUEVA FISCALIA
export async function addFiscalia(obj) {
    const respuesta = await axios.post('/fiscalia', obj);
    return respuesta.data;
}

/// ACTUALIZAR AGENCIA
export async function update(obj, id) {
    let params = { idAgencia: id };
    const respuesta = await axios.put('/agencia', obj, params)
    return respuesta.data;
}

/// ACTUALIZAR FISCALIA
export async function updateFiscalia(obj, id) {
    let params = { idFiscalia: id };
    const respuesta = await axios.put('/fiscalia', obj, params)
    return respuesta.data;
}

/// ELIMINAR AGENCIA
export async function deleteItem(id) {
    let params = { idAgencia: id };
    const respuesta = await axios.deleteItem('/agencia', params)
    return respuesta.data;
}

/// ELIMINAR AGENCIA
export async function deleteFiscalia(id) {
    let params = { idFiscalia: id };
    const respuesta = await axios.deleteItem('/fiscalia', params)
    return respuesta.data;
}