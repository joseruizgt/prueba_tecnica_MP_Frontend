import { tagPermisosAdministracion, tagPermisosContabilidad, tagPermisosEstadisticas, tagPermisosHistorial, tagPermisosInicio, tagPermisosOrdenes, tagPermisosReportes } from "../@tags/tagPermisos";
import { getPermissionsUser } from "../@utilities/manager";

export const usePermisos = () => {

    let permisos = getPermissionsUser();

    let inicio = permisos.some(item => item === tagPermisosInicio.inicio);
    //ADMINISTRACION DEL SISTEMA
    let administracion = permisos.some(item => item === tagPermisosAdministracion.administracion);
    let gestion_usuarios = permisos.some(item => item === tagPermisosAdministracion.gestion_usuarios);
    let manejo_roles = permisos.some(item => item === tagPermisosAdministracion.manejo_roles);
    let permisosModulo = permisos.some(item => item === tagPermisosAdministracion.permisos);
    let parametrizaciones = permisos.some(item => item === tagPermisosAdministracion.parametrizaciones);
    let control_fiscalias = permisos.some(item => item === tagPermisosAdministracion.control_fiscalias);
    let puestos = permisos.some(item => item === tagPermisosAdministracion.puestos);
    //ORDENES DE COMPRA
    let ordenes = permisos.some(item => item === tagPermisosOrdenes.Orden_compra);
    let vales = permisos.some(item => item === tagPermisosOrdenes.vales);
    let recibos = permisos.some(item => item === tagPermisosOrdenes.recibos);
    let ordenes_pago = permisos.some(item => item === tagPermisosOrdenes.ordenes_pago);
    //ESTADISTICAS
    let estadisticas = permisos.some(item => item === tagPermisosEstadisticas.estadistica);
    //CONTABILIDAD
    let contabilidad = permisos.some(item => item === tagPermisosContabilidad.contabilidad);
    let control_vales = permisos.some(item => item === tagPermisosContabilidad.control_vales);
    let control_recibos = permisos.some(item => item === tagPermisosContabilidad.control_recibos);
    let control_ordenes = permisos.some(item => item === tagPermisosContabilidad.control_ordenes);
    //REPORTES
    let reportes = permisos.some(item => item === tagPermisosReportes.reportes);
    //HISTORIAL
    let historial = permisos.some(item => item === tagPermisosHistorial.historial);
    let historial_control_vales = permisos.some(item => item === tagPermisosHistorial.Historial_control_vales);

    return {
        inicio,
        administracion,
        gestion_usuarios,
        manejo_roles,
        permisosModulo,
        parametrizaciones,
        control_fiscalias,
        puestos,
        ordenes,
        vales,
        recibos,
        ordenes_pago,
        estadisticas,
        contabilidad,
        control_vales,
        control_recibos,
        control_ordenes,
        reportes,
        historial,
        historial_control_vales
    }
}
