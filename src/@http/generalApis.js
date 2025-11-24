import * as axios from './axiosClient';

/// GENERAR REPORTE
export async function reporte(body, params) {
    const respuesta = await axios.jsreport(body, params);
    return respuesta;
}