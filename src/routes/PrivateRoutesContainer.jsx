import { Navigate, Route, Routes } from "react-router-dom"
import { Sidebar } from "../@components"
import { rutasDinamicas } from "./Rutas"
import { Usuario } from "../app/usuario/Usuario"
import { PrivateRoute } from "./PrivateRoute"
import { Rol } from "../app/rol/Rol"
import { Inicio } from "../app/inicio/Inicio"
import { CrearEditar } from "../app/usuario/CrearEditar"
import { Expediente } from "../app/expediente/Expediente"
import { CrearEditar as CrearEditarExpediente } from "../app/expediente/CrearEditar";
import { Fiscalia } from "../app/fiscalia/Fiscalia"
import { Puesto } from "../app/puesto/Puesto"
import { Crear as CrearRol } from "../app/rol/Crear";
import { CrearEditar as CrearEditarFiscalia } from "../app/fiscalia/CrearEditar"
import { CrearEditar as CrearEditarPuesto } from "../app/puesto/CrearEditar"
import { Permiso } from "../app/permisos/Permiso"
import { Editar } from "../app/permisos/Editar"
import { tagPermisosAdministracion, tagPermisosInicio, tagPermisosOrdenes, tagPermisosReportes } from "../@tags/tagPermisos"
import { Reporte } from "../app/reporte/Reporte"
import { PlanillaRecibo } from "../app/reporte/PlanillaRecibo"

export const PrivateRoutesContainer = () => {
    return (
        <Sidebar rutas={rutasDinamicas()} >
            <Routes>
                <Route element={<PrivateRoute permissions={tagPermisosAdministracion.gestion_usuarios} />}>
                    <Route path='/administracion/usuario' element={<Usuario />} />
                    <Route path='/administracion/usuario/editar/:id' element={<CrearEditar flagCrear={false} />} />
                    <Route path='/administracion/usuario/crear' element={<CrearEditar flagCrear={true} />} />
                </Route>

                <Route element={<PrivateRoute permissions={tagPermisosAdministracion.manejo_roles} />}>
                    <Route path='/administracion/rol' element={<Rol />} />
                    <Route path='/administracion/rol/crear' element={<CrearRol flagCrear={true} />} />
                    <Route path='/administracion/rol/editar/:id' element={<CrearRol flagCrear={false} />} />
                </Route>

                <Route element={<PrivateRoute permissions={tagPermisosAdministracion.permisos} />}>
                    <Route path='/administracion/permiso' element={<Permiso />} />
                    <Route path='/administracion/permiso/editar/:id' element={<Editar />} />
                </Route>

                <Route element={<PrivateRoute permissions={tagPermisosAdministracion.control_fiscalias} />}>
                    <Route path='/administracion/fiscalia' element={<Fiscalia />} />
                    <Route path='/administracion/fiscalia/crear' element={<CrearEditarFiscalia flagCrear={true} />} />
                    <Route path='/administracion/fiscalia/editar/:id' element={<CrearEditarFiscalia flagCrear={false} />} />
                </Route>

                <Route element={<PrivateRoute permissions={tagPermisosAdministracion.puestos} />}>
                    <Route path='/administracion/puesto' element={<Puesto />} />
                    <Route path='/administracion/puesto/crear' element={<CrearEditarPuesto flagCrear={true} />} />
                    <Route path='/administracion/puesto/editar/:id' element={<CrearEditarPuesto flagCrear={false} />} />
                </Route>

                <Route element={<PrivateRoute permissions={tagPermisosOrdenes.vales} />}>
                    <Route path='/expedientes/expediente' element={<Expediente />} />
                    <Route path='/expedientes/expediente/crear' element={<CrearEditarExpediente flagCrear={true} />} />
                    <Route path='/expedientes/expediente/editar/:id' element={<CrearEditarExpediente flagCrear={false} />} />
                </Route>

                <Route element={<PrivateRoute permissions={tagPermisosReportes.reportes} />}>
                    <Route path='/reporteria' element={<Reporte />} />
                </Route>

                <Route element={<PrivateRoute permissions={tagPermisosReportes.planillaRecibos} />}>
                    <Route path='/reporteria/planillarecibo' element={<PlanillaRecibo />} />
                </Route>

                <Route element={<PrivateRoute permissions={tagPermisosInicio.inicio} />}>
                    <Route path='/' element={<Inicio />} />
                    <Route path="/*" element={<Navigate to='/' />} />
                </Route>
            </Routes>
        </Sidebar>
    )
}
