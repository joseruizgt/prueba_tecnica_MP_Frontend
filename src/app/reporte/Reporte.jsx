import { useState } from "react"
import { ModalComponent } from "../../@components";
import Divider from '@mui/material/Divider';
import { NavLink, useNavigate } from "react-router-dom";
import { permissionValidation } from "../../@utilities/manager";
import { tagPermisosReportes } from "../../@tags/tagPermisos";
import { Button } from "@mui/material";
import { useReporte } from "./hooks/useReporte";

export const Reporte = () => {

    const [openModal, setOpenModal] = useState(true);
    const navigate = useNavigate();

    const { generarReporteUsuariosActivosH, generarReporteUsuariosInactivosH } = useReporte();

    const cerrarModal = () => {
        setOpenModal(false);
        navigate('/');
    }

    return (
        <>
            <ModalComponent open={openModal} setOpen={setOpenModal} widthModal={400} manualClosing={true}>
                <h2 className="font-semibold text-blue-900 mb-5">Seleccione el tipo de reporte</h2>
                <ul>
                    {
                        permissionValidation(tagPermisosReportes.planillaRecibos) ?
                            <>
                                <NavLink to={'/reporteria/planillarecibo'}>
                                    <li className="text-gray-600 text-sm my-3 hover:text-gray-800">Planilla de viáticos no comprobables por medio de recibos</li>
                                </NavLink>
                                <Divider />
                            </> : null
                    }
                    {
                        permissionValidation(tagPermisosReportes.recibosUsuario) ?
                            <>
                                <NavLink to={'/reporteria/recibousuario'}>
                                    <li className="text-gray-600 text-sm my-3 hover:text-gray-800">Control de recibos generados por usuario</li>
                                </NavLink>
                                <Divider />
                            </> : null
                    }
                    {
                        permissionValidation(tagPermisosReportes.recibosAgencia) ?
                            <>
                                <NavLink to={'/reporteria/reciboagencia'}>
                                    <li className="text-gray-600 text-sm my-3 hover:text-gray-800">Control de recibos generados por agencia</li>
                                </NavLink>
                                <Divider />
                            </> : null
                    }
                    {
                        permissionValidation(tagPermisosReportes.valesUsuario) ?
                            <>
                                <NavLink to={'/reporteria/valeusuario'}>
                                    <li className="text-gray-600 text-sm my-3 hover:text-gray-800">Control de vales generados por usuario</li>
                                </NavLink>
                                <Divider />
                            </> : null
                    }
                    {
                        permissionValidation(tagPermisosReportes.valesAgencia) ?
                            <>
                                <NavLink to={'/reporteria/valeagencia'}>
                                    <li className="text-gray-600 text-sm my-3 hover:text-gray-800">Control de vales generados por agencia</li>
                                </NavLink>
                                <Divider />
                            </> : null
                    }
                    {
                        permissionValidation(tagPermisosReportes.usuarioActivos) ?
                            <>
                                {/* <NavLink to={'/reporteria/usuarioactivo'}> */}
                                <li onClick={() => {
                                    generarReporteUsuariosActivosH();
                                    cerrarModal();
                                }} className="text-gray-600 text-sm my-3 hover:text-gray-800 cursor-pointer">Listado de usuarios activos</li>
                                {/* </NavLink> */}
                                <Divider />
                            </> : null
                    }
                    {
                        permissionValidation(tagPermisosReportes.usuarioInactivos) ?
                            <>
                                {/* <NavLink to={'/reporteria/usuarioinactivo'}> */}
                                <li onClick={() => {
                                  generarReporteUsuariosInactivosH();
                                  cerrarModal();
                                }} className="text-gray-600 text-sm my-3 hover:text-gray-800 cursor-pointer">Listado de usuarios inactivos</li>
                                {/* </NavLink> */}
                                <Divider />
                            </> : null
                    }
                </ul>

                <div className='mt-8 w-full flex justify-end'>
                    <Button type="button" onClick={cerrarModal} style={{ color: '#1e3a8a', fontWeight: 600 }} variant="text">Cerrar</Button>
                </div>
            </ModalComponent>
        </>
    )
}
