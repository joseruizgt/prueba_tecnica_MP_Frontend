/* eslint-disable react/prop-types */

import { Button, Divider, FormControlLabel, Switch, createTheme } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useRol } from "../rol/hooks/useRol";
import { useEffect, useState } from "react";
import { decryptItem, getPermissions } from "../../@utilities/manager";
import { ThemeProvider } from "@emotion/react";
import { GESTION_ROLES } from "../../@utilities/constants";
import { TabsComponent, success } from "../../@components";
import { tagPermisosAdministracion, tagPermisosInicio, tagPermisosOrdenes, tagPermisosReportes } from "../../@tags/tagPermisos";
import { useDispatch } from "react-redux";
import { resetPosition } from "../../store/slice";

export const Editar = () => {
    const theme = createTheme({
        palette: {
            primary: {
                light: '#1e3a8a',
                main: '#1e3a8a',
                dark: '#1e3a8a',
            },
        },
    });

    const navigate = useNavigate();
    const { individualRolPermissions, listRolsPermissionsH, createRolPermissionsH, deleteRolPermissionsH } = useRol();
    const { id } = useParams();
    const dispatch = useDispatch();

    //ESTADOS
    const [state, setState] = useState({
        //INICIO
        [tagPermisosInicio.inicio]: false,
        //ADMINISTRACION
        [tagPermisosAdministracion.administracion]: false,
        [tagPermisosAdministracion.gestion_usuarios]: false,
        [tagPermisosAdministracion.manejo_roles]: false,
        [tagPermisosAdministracion.permisos]: false,
        [tagPermisosAdministracion.control_fiscalias]: false,
        [tagPermisosAdministracion.puestos]: false,
        //ORDENES DE COMPRA
        [tagPermisosOrdenes.Orden_compra]: false,
        [tagPermisosOrdenes.vales]: false,
        //REPORTES
        [tagPermisosReportes.reportes]: false,
        [tagPermisosReportes.planillaRecibos]: false,
    });

    const cancelar = () => {
        navigate('/administracion/permiso');
    }

    const handleChange = (event) => {
        if (event.target.name === tagPermisosAdministracion.administracion && event.target.checked === false) {
            setState({
                ...state,
                [event.target.name]: event.target.checked,
                [tagPermisosAdministracion.gestion_usuarios]: false,
                [tagPermisosAdministracion.manejo_roles]: false,
                [tagPermisosAdministracion.permisos]: false,
                [tagPermisosAdministracion.control_fiscalias]: false,
                [tagPermisosAdministracion.puestos]: false,
            });
        } else if (event.target.name === tagPermisosOrdenes.Orden_compra && event.target.checked === false) {
            setState({
                ...state,
                [event.target.name]: event.target.checked,
                [tagPermisosOrdenes.vales]: false,
            });
        } else if (event.target.name === tagPermisosReportes.reportes && event.target.checked === false) {
            setState({
                ...state,
                [event.target.name]: event.target.checked,
                [tagPermisosReportes.planillaRecibos]: false,
            });
        } else {
            setState({
                ...state,
                [event.target.name]: event.target.checked,
            });
        }
    };

    //TABS
    const titlesTabs = [
        {
            title: 'Inicio'
        },
        {
            title: 'Administración',
        },
        {
            title: 'Expedientes',
        },
        {
            title: 'Reportes'
        }
    ]

    const componentInicio = () => {
        return (
            <>
                <div>
                    <h3 className='font-extrabold text-md text-blue-900 mb-2'>
                        Módulo principal
                    </h3>
                </div>
                <FormControlLabel
                    control={
                        <Switch
                            checked={state[tagPermisosInicio.inicio]}
                            onChange={handleChange}
                            name={tagPermisosInicio.inicio}
                        />
                    }
                    label="Inicio"
                />
            </>
        )
    }

    const componentAdministracion = () => {
        return (
            <>
                <div>
                    <div>
                        <h3 className='font-extrabold text-md text-blue-900 mb-2'>
                            Módulo principal
                        </h3>
                    </div>
                    < FormControlLabel
                        control={
                            < Switch
                                checked={state[tagPermisosAdministracion.administracion]}
                                onChange={handleChange}
                                name={tagPermisosAdministracion.administracion}
                            />
                        }
                        label="Administración"
                    />
                </div>
                <div className="mt-5">
                    <div>
                        <h3 className='font-extrabold text-md text-blue-900 mb-2'>
                            Submódulos
                        </h3>
                    </div>
                    <div className="flex flex-wrap">
                        < FormControlLabel
                            control={
                                < Switch
                                    checked={state[tagPermisosAdministracion.gestion_usuarios]}
                                    disabled={state[tagPermisosAdministracion.administracion] ? false : true}
                                    onChange={handleChange}
                                    name={tagPermisosAdministracion.gestion_usuarios}
                                />
                            }
                            label="Gestión de usuarios"
                        />
                        < FormControlLabel
                            control={
                                < Switch
                                    checked={state[tagPermisosAdministracion.manejo_roles]}
                                    disabled={state[tagPermisosAdministracion.administracion] ? false : true}
                                    onChange={handleChange}
                                    name={tagPermisosAdministracion.manejo_roles}
                                />
                            }
                            label="Manejo de roles"
                        />
                        < FormControlLabel
                            control={
                                < Switch
                                    checked={state[tagPermisosAdministracion.permisos]}
                                    disabled={state[tagPermisosAdministracion.administracion] ? false : true}
                                    onChange={handleChange}
                                    name={tagPermisosAdministracion.permisos}
                                />
                            }
                            label="Permisos"
                        />
                        < FormControlLabel
                            control={
                                < Switch
                                    checked={state[tagPermisosAdministracion.control_fiscalias]}
                                    disabled={state[tagPermisosAdministracion.administracion] ? false : true}
                                    onChange={handleChange}
                                    name={tagPermisosAdministracion.control_fiscalias}
                                />
                            }
                            label="Control de fiscalías"
                        />
                        < FormControlLabel
                            control={
                                < Switch
                                    checked={state[tagPermisosAdministracion.puestos]}
                                    disabled={state[tagPermisosAdministracion.administracion] ? false : true}
                                    onChange={handleChange}
                                    name={tagPermisosAdministracion.puestos}
                                />
                            }
                            label="Puestos"
                        />
                    </div>
                </div>
            </>
        )
    }

    const componentOrdenCompra = () => {
        return (
            <>
                <div>
                    <div>
                        <h3 className='font-extrabold text-md text-blue-900 mb-2'>
                            Módulo principal
                        </h3>
                    </div>
                    < FormControlLabel
                        control={
                            < Switch
                                checked={state[tagPermisosOrdenes.Orden_compra]}
                                onChange={handleChange}
                                name={tagPermisosOrdenes.Orden_compra}
                            />
                        }
                        label="Expedientes"
                    />
                </div>
                <div className="mt-5">
                    <div>
                        <h3 className='font-extrabold text-md text-blue-900 mb-2'>
                            Submódulos
                        </h3>
                    </div>
                    <div className="flex flex-wrap">
                        < FormControlLabel
                            control={
                                < Switch
                                    checked={state[tagPermisosOrdenes.vales]}
                                    disabled={state[tagPermisosOrdenes.Orden_compra] ? false : true}
                                    onChange={handleChange}
                                    name={tagPermisosOrdenes.vales} />
                            }
                            label="Registro de expedientes"
                        />
                    </div>
                </div>
            </>
        )
    }

    const componentReportes = () => {
        return (
            <>
                <div>
                    <div>
                        <h3 className='font-extrabold text-md text-blue-900 mb-2'>
                            Módulo principal
                        </h3>
                    </div>
                    <FormControlLabel
                        control={
                            <Switch checked={state[tagPermisosReportes.reportes]} onChange={handleChange} name={tagPermisosReportes.reportes} />
                        }
                        label="Reportes"
                    />
                </div>
                <div className="mt-5">
                    <div>
                        <h3 className='font-extrabold text-md text-blue-900 mb-2'>
                            Submódulos
                        </h3>
                    </div>
                    <div className="flex flex-wrap">
                        < FormControlLabel
                            control={
                                < Switch checked={state[tagPermisosReportes.planillaRecibos]} disabled={state[tagPermisosReportes.reportes] ? false : true} onChange={handleChange} name={tagPermisosReportes.planillaRecibos} />
                            }
                            label="Reportes de expedientes"
                        />
                    </div>
                </div>
            </>
        )
    }

    //COMPONENTES QUE SE VISUALIZAN EN CADA TAB
    const componentsTabs = [
        {
            component: componentInicio()
        },
        {
            component: componentAdministracion()
        },
        {
            component: componentOrdenCompra()
        },
        {
            component: componentReportes()
        }
    ]

    //ENVIAR
    const guardarPermisos = () => {
        let arregloCrear = [];
        let arregloEliminar = []
        if (Object.keys(individualRolPermissions).length > 0) {
            const permisosActuales = Object.entries(state).map(([codigo, estado]) => ({ codigo, estado }));

            permisosActuales.forEach(element => {
                let busqueda = individualRolPermissions.permisos.some(item => item.permiso.codigo === element.codigo);
                if (busqueda) {
                    if (!element.estado) {
                        arregloEliminar.push({
                            codigo: element.codigo
                        });
                    }
                } else {
                    if (element.estado) {
                        arregloCrear.push({
                            codigo: element.codigo
                        });
                    }
                }
            });

            let arregloCrearFinal = [];
            let arregloEliminarFinal = [];
            let permisosSistema = getPermissions()

            if (arregloCrear.length > 0) {
                permisosSistema.forEach(item => {
                    let busqueda = arregloCrear.some(element => element.codigo === item.codigo);
                    if (busqueda) {
                        arregloCrearFinal.push({
                            ...item
                        })
                    }
                });
                createRolPermissionsH(arregloCrearFinal, decryptItem(id));
            }
            if (arregloEliminar.length > 0) {
                permisosSistema.forEach(item => {
                    let busqueda = arregloEliminar.some(element => element.codigo === item.codigo);
                    if (busqueda) {
                        arregloEliminarFinal.push({
                            ...item
                        })
                    }
                });
                deleteRolPermissionsH(arregloEliminarFinal, decryptItem(id));
            }
            success('Elemento actualizado');
            navigate('/administracion/permiso');
        }
    }

    useEffect(() => {
        listRolsPermissionsH(undefined, undefined, 0, decryptItem(id));
        dispatch(resetPosition());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (Object.keys(individualRolPermissions).length > 0) {
            let arregloAux = state;
            individualRolPermissions.permisos.forEach(item => {
                arregloAux = {
                    ...arregloAux,
                    [item.permiso.codigo]: true
                }
            });
            setState(arregloAux);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [individualRolPermissions]);

    return (
        <ThemeProvider theme={theme}>
            <div className="flex">
                <div className="w-2/12" >
                    <h3 className='font-extrabold text-md text-blue-900 mb-2'>
                        {GESTION_ROLES.actuales}
                    </h3>

                    {
                        Object.keys(individualRolPermissions).length > 0
                            // && list.length > 0
                            ?
                            <ul style={{ listStyleType: 'disc', color: 'gray', fontSize: 15 }}>
                                <li>{`Rol: ${individualRolPermissions.rol}`}</li>
                                <li>{`Descripción: ${individualRolPermissions.descripcion}`}</li>
                            </ul>
                            :
                            <ul style={{ listStyleType: 'disc', color: 'gray', fontSize: 15 }}>
                                <li>Sin registros</li>
                            </ul>
                    }



                    <h3 className='font-extrabold text-md text-blue-900 mb-2 mt-6'>
                        {GESTION_ROLES.otras}
                    </h3>
                    <ul style={{ listStyleType: 'disc', color: 'gray', fontSize: 15 }}>
                        <li>Sin solucitudes</li>
                    </ul>
                </div>
                <Divider orientation="vertical" flexItem style={{ height: '100vh' }} />


                <div className="w-10/12">
                    <div className="ml-5 mb-5 flex justify-between">
                        <div>
                            <h2 className='font-extrabold text-3xl text-blue-900'>
                                Asignación de permisos
                            </h2>
                            <h3 className=' text-gray-500 mt-5'>
                                {GESTION_ROLES.completar}
                            </h3>
                        </div>
                        <div className="my-2">
                            <Button type="button" onClick={guardarPermisos} variant="contained" style={{ marginRight: 10 }}>
                                Guardar
                            </Button>
                            <Button onClick={cancelar} style={{ color: '#1e3a8a', fontWeight: 600 }} variant="outlined">Cancelar</Button>
                        </div>
                    </div>
                    <Divider />
                    <div className='m-8'>
                        <TabsComponent titlesTabs={titlesTabs} componentsTabs={componentsTabs} />
                    </div>
                </div>

            </div>
        </ThemeProvider>
    )
}
