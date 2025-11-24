import * as axios from '../../../@http/axiosClient';

/// enviarDatosPlanillaRecibos
export async function planillaRecibo(data) {
    let {fechaInicio, fechaFin} = data;
    let params = {
        fechaInicio,
        fechaFin
    };
    const respuesta = await axios.get('/recibo/planilla', params);
    return respuesta.data;
}

/// enviarDatosPlanillaRecibos
export async function recibosUsuario(data) {
    let {fechaInicio, fechaFin, idUsuario} = data;
    let params = {
        fechaInicio,
        fechaFin,
        idUsuario
    };
    const respuesta = await axios.get('/recibo/usuario', params);
    return respuesta.data;
}

/// enviarDatosPlanillaRecibos
export async function recibosAgencia(data) {
    let {fechaInicio, fechaFin, idAgencia} = data;
    let params = {
        fechaInicio,
        fechaFin,
        idAgencia
    };
    const respuesta = await axios.get('/recibo/agencia', params);
    return respuesta.data;
}

/// enviarDatosPlanillaRecibos
export async function valesUsuario(data) {
    let {fechaInicio, fechaFin, idUsuario} = data;
    let params = {
        fechaInicio,
        fechaFin,
        idUsuario
    };
    const respuesta = await axios.get('/vale/usuario', params);
    return respuesta.data;
}

/// enviarDatosPlanillaRecibos
export async function valesAgencia(data) {
    let {fechaInicio, fechaFin, idAgencia} = data;
    let params = {
        fechaInicio,
        fechaFin,
        idAgencia
    };
    const respuesta = await axios.get('/vale/agencia', params);
    return respuesta.data;
}

/// enviarDatosPlanillaRecibos
export async function usuariosActivos() {
    let params = {
    };
    const respuesta = await axios.get('/usuario/activos', params);
    return respuesta.data;
}

/// enviarDatosPlanillaRecibos
export async function usuariosInactivos() {
    let params = {
    };
    const respuesta = await axios.get('/usuario/inactivos', params);
    return respuesta.data;
}
