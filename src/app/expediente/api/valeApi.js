import * as axios from '../../../@http/axiosClient';

/// LISTAR VALES
export async function list(busqueda = '', limite = 5, pagina = 1, tab = 1) {
    let params = {
        busqueda,
        limite,
        pagina,
        tab
    };
    const respuesta = await axios.get('/expediente', params);
    return respuesta.data;
}

export async function item(idExpediente) {
    let params = {
        idExpediente
    };
    const respuesta = await axios.get('/expediente/individual', params);
    return respuesta.data;
}

/// AGREGAR NUEVO VALE
export async function add(obj, params) {
    const respuesta = await axios.post('/expediente', obj, params);
    return respuesta.data;
}

/// ACTUALIZAR VALE
export async function update(obj, params) {
    const respuesta = await axios.put('/expediente', obj, params)
    return respuesta.data;
}

/// ELIMINAR VALE
export async function deleteItem(idExpediente) {
    let params = { idExpediente };
    const respuesta = await axios.deleteItem('/expediente', params)
    return respuesta.data;
}

/// OBTENER CANTIDAD DE VALES VIGENTES
export async function currentVounchers() {
    let params = {
    };
    const respuesta = await axios.get('/vale/vigentes', params);
    return respuesta.data;
}

/// CAMBIO DE FASE DEL VALE
export async function change(obj, params) {
    const respuesta = await axios.post('/expediente/fase', obj, params);
    return respuesta.data;
}

/// RECHAZO VALE
export async function rejection(obj, params) {
    const respuesta = await axios.post('/rechazo-vale', obj, params);
    return respuesta.data;
}

export async function itemRechazo(idVale) {
    let params = {
        idVale
    };
    const respuesta = await axios.get('/rechazo-vale', params);
    return respuesta.data;
}

export async function correccionV(idExpediente, data) {
    let params = {
        idExpediente
    };
    const respuesta = await axios.put('/expediente/correccion', data, params);
    return respuesta.data;
}

export async function listConta(busqueda = '', limite = 5, pagina = 1, tab = 1, idAgencia) {
    let params = {
        busqueda,
        limite,
        pagina,
        tab,
        idAgencia
    };
    const respuesta = await axios.get('/vale/contabilidad', params);
    return respuesta.data;
}

export async function listTot(busqueda = '', limite = 5, pagina = 1, idAgencia) {
    let params = {
        busqueda,
        limite,
        pagina,
        idAgencia
    };
    const respuesta = await axios.get('/vale/total', params);
    return respuesta.data;
}

export async function itemBitacora(idExpediente) {
    let params = {
        id_expediente: idExpediente
    };
    const respuesta = await axios.get('/expediente/bitacora/individual', params);
    return respuesta.data;
}
