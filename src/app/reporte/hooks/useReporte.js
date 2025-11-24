import { useDispatch } from 'react-redux';
import { generarReportePlanillaRecibos, generarReporteRecibosAgencia, generarReporteRecibosUsuario, generarReporteUsuariosActivos, generarReporteUsuariosInactivos, generarReporteValesAgencia, generarReporteValesUsuario } from '../store'

export const useReporte = () => {

    const dispatch = useDispatch();

    const generarReportePlanillaRecibosH = (data) => {
        dispatch(generarReportePlanillaRecibos(data));
    }

    const generarReporteRecibosUsuarioH = (data) => {
        dispatch(generarReporteRecibosUsuario(data));
    }

    const generarReporteRecibosAgenciaH = (data) => {
        dispatch(generarReporteRecibosAgencia(data));
    }

    const generarReporteValesUsuarioH = (data) => {
        dispatch(generarReporteValesUsuario(data));
    }

    const generarReporteValesAgenciaH = (data) => {
        dispatch(generarReporteValesAgencia(data));
    }

    const generarReporteUsuariosActivosH = (data) => {
        dispatch(generarReporteUsuariosActivos(data));
    }

    const generarReporteUsuariosInactivosH = (data) => {
        dispatch(generarReporteUsuariosInactivos(data));
    }

    return {
        //valores
        //funciones
        generarReportePlanillaRecibosH,
        generarReporteRecibosUsuarioH,
        generarReporteRecibosAgenciaH,
        generarReporteValesUsuarioH,
        generarReporteValesAgenciaH,
        generarReporteUsuariosActivosH,
        generarReporteUsuariosInactivosH
    }
}
