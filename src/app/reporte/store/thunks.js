import { error, success } from "../../../@components";
import { reporte } from "../../../@http/generalApis";
// import { interceptorResponse } from "../../../@utilities/manager";
import { isLoading, loaded } from "../../../store/slice";
import { planillaRecibo, recibosAgencia, recibosUsuario, usuariosActivos, usuariosInactivos, valesAgencia, valesUsuario } from "../api/reporteApi";
import fileDownload from "js-file-download";

export const generarReportePlanillaRecibos = (data) => {
    return async (dispatch) => {
        try {
            dispatch(isLoading());
            const respuesta = await planillaRecibo(data);
            if (respuesta.valid) {
                let dataFinal = { template: { name: "planilla-recibos" }, data: respuesta };
                reporte(dataFinal).then((response) => {
                    dispatch(loaded());
                    success('Reporte generado correctamente');
                    const date = `${new Date().getDate()}-${(new Date().getMonth() + 1)}-${new Date().getFullYear()}`;
                    fileDownload(response.data, `Planilla recibos ${date}.pdf`);
                }).catch((e) => {
                    console.log(e);
                    dispatch(loaded());
                    error('ocurrió un error');
                });
            } else {
                dispatch(loaded());
                error(respuesta.msg);
            }

        } catch (error) {
            dispatch(loaded());
            // interceptorResponse(error);
            error('error, comuníquese con el administrador');
            console.log(error, 'error')
        }
    }
}

export const generarReporteRecibosUsuario = (data) => {
    return async (dispatch) => {
        try {
            dispatch(isLoading());
            const respuesta = await recibosUsuario(data);
            if (respuesta.valid) {
                let dataFinal = { template: { name: "recibo-usuario" }, data: respuesta };
                reporte(dataFinal).then((response) => {
                    dispatch(loaded());
                    success('Reporte generado correctamente');
                    const date = `${new Date().getDate()}-${(new Date().getMonth() + 1)}-${new Date().getFullYear()}`;
                    fileDownload(response.data, `Recibos por usuario ${date}.pdf`);
                }).catch((e) => {
                    console.log(e);
                    dispatch(loaded());
                    error('ocurrió un error');
                });
            } else {
                dispatch(loaded());
                error(respuesta.msg);
            }

        } catch (error) {
            dispatch(loaded());
            // interceptorResponse(error);
            error('error, comuníquese con el administrador');
            console.log(error, 'error')
        }
    }
}

export const generarReporteRecibosAgencia = (data) => {
    return async (dispatch) => {
        try {
            dispatch(isLoading());
            const respuesta = await recibosAgencia(data);
            if (respuesta.valid) {
                let dataFinal = { template: { name: "recibo-agencia" }, data: respuesta };
                reporte(dataFinal).then((response) => {
                    dispatch(loaded());
                    success('Reporte generado correctamente');
                    const date = `${new Date().getDate()}-${(new Date().getMonth() + 1)}-${new Date().getFullYear()}`;
                    fileDownload(response.data, `Recibos por agencia ${date}.pdf`);
                }).catch((e) => {
                    console.log(e);
                    dispatch(loaded());
                    error('ocurrió un error');
                });
            } else {
                dispatch(loaded());
                error(respuesta.msg);
            }

        } catch (error) {
            dispatch(loaded());
            // interceptorResponse(error);
            error('error, comuníquese con el administrador');
            console.log(error, 'error')
        }
    }
}

export const generarReporteValesUsuario = (data) => {
    return async (dispatch) => {
        try {
            dispatch(isLoading());
            const respuesta = await valesUsuario(data);
            if (respuesta.valid) {
                let dataFinal = { template: { name: "vale-usuario" }, data: respuesta };
                reporte(dataFinal).then((response) => {
                    dispatch(loaded());
                    success('Reporte generado correctamente');
                    const date = `${new Date().getDate()}-${(new Date().getMonth() + 1)}-${new Date().getFullYear()}`;
                    fileDownload(response.data, `Vales por usuario ${date}.pdf`);
                }).catch((e) => {
                    console.log(e);
                    dispatch(loaded());
                    error('ocurrió un error');
                });
            } else {
                dispatch(loaded());
                error(respuesta.msg);
            }

        } catch (error) {
            dispatch(loaded());
            // interceptorResponse(error);
            error('error, comuníquese con el administrador');
            console.log(error, 'error')
        }
    }
}

export const generarReporteValesAgencia = (data) => {
    return async (dispatch) => {
        try {
            dispatch(isLoading());
            const respuesta = await valesAgencia(data);
            if (respuesta.valid) {
                let dataFinal = { template: { name: "vale-agencia" }, data: respuesta };
                reporte(dataFinal).then((response) => {
                    dispatch(loaded());
                    success('Reporte generado correctamente');
                    const date = `${new Date().getDate()}-${(new Date().getMonth() + 1)}-${new Date().getFullYear()}`;
                    fileDownload(response.data, `Vales por agencia ${date}.pdf`);
                }).catch((e) => {
                    console.log(e);
                    dispatch(loaded());
                    error('ocurrió un error');
                });
            } else {
                dispatch(loaded());
                error(respuesta.msg);
            }

        } catch (error) {
            dispatch(loaded());
            // interceptorResponse(error);
            error('error, comuníquese con el administrador');
            console.log(error, 'error')
        }
    }
}

export const generarReporteUsuariosActivos = () => {
    return async (dispatch) => {
        try {
            dispatch(isLoading());
            const respuesta = await usuariosActivos();
            if (respuesta.valid) {
                let dataFinal = { template: { name: "usuarios-activos" }, data: respuesta };
                reporte(dataFinal).then((response) => {
                    dispatch(loaded());
                    success('Reporte generado correctamente');
                    const date = `${new Date().getDate()}-${(new Date().getMonth() + 1)}-${new Date().getFullYear()}`;
                    fileDownload(response.data, `Usuarios activos ${date}.pdf`);
                }).catch((e) => {
                    console.log(e);
                    dispatch(loaded());
                    error('ocurrió un error');
                });
            } else {
                dispatch(loaded());
                error(respuesta.msg);
            }
        } catch (error) {
            dispatch(loaded());
            // interceptorResponse(error);
            error('error, comuníquese con el administrador');
            console.log(error, 'error')
        }
    }
}

export const generarReporteUsuariosInactivos = () => {
    return async (dispatch) => {
        try {
            dispatch(isLoading());
            const respuesta = await usuariosInactivos();
            if (respuesta.valid) {
                let dataFinal = { template: { name: "usuarios-inactivos" }, data: respuesta };
                reporte(dataFinal).then((response) => {
                    dispatch(loaded());
                    success('Reporte generado correctamente');
                    const date = `${new Date().getDate()}-${(new Date().getMonth() + 1)}-${new Date().getFullYear()}`;
                    fileDownload(response.data, `Usuarios inactivos ${date}.pdf`);
                }).catch((e) => {
                    console.log(e);
                    dispatch(loaded());
                    error('ocurrió un error');
                });
            } else {
                dispatch(loaded());
                error(respuesta.msg);
            }
        } catch (error) {
            dispatch(loaded());
            // interceptorResponse(error);
            error('error, comuníquese con el administrador');
            console.log(error, 'error')
        }
    }
}