import * as axios from '../../../@http/axiosClient';

/// LISTAR ROLES
export async function list(busqueda = '', limite = 5, pagina = 1) {
    let params = {
        busqueda,
        limite,
        pagina,
    };
    const respuesta = await axios.get('/rol', params);
    return respuesta.data;
}

/// AGREGAR NUEVO ROL
export async function add(obj) {
    const respuesta = await axios.post('/rol', obj);
    return respuesta.data;
}

/// ACTUALIZAR ROL
export async function update(obj, id) {
    let params = { idRol: id };
    const respuesta = await axios.put('/rol', obj, params)
    return respuesta.data;
}

/// ELIMINAR ROL
export async function deleteItem(id) {
    let params = { idRol: id };
    const respuesta = await axios.deleteItem('/rol', params)
    return respuesta.data;
}

//LISTAR PERMISOS QUE TIENE UN ROL
export async function listRolPermissions(busqueda = '', limite = 5, pagina = 1) {
    let params = {
        busqueda,
        limite,
        pagina,
    };
    const respuesta = await axios.get('/rol/lista-permisos', params);
    return respuesta.data;
}

/// GUARDAR PEMISOS A UN ROL
export async function addRolPermissions(obj, params) {
    const respuesta = await axios.post('/rol/lista-permisos', obj, params);
    return respuesta.data;
}

/// ELIMINAR PEMISOS A UN ROL
export async function deleteRolPermission(obj, params) {
    const respuesta = await axios.put('/rol/lista-permisos', obj, params);
    return respuesta.data;
}
