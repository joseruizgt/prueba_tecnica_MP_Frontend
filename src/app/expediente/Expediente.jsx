import { Box, Button, Divider, Fab, Skeleton, Typography, createTheme } from "@mui/material";
import { GESTION_ORDENES, TABS_POSITION } from "../../@utilities/constants"
import { ThemeProvider } from "@emotion/react";
import { InputSearch2, MenuItems, ModalComponent, SelectOptions, TableComponent, TabsComponent } from "../../@components";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useVale } from "./hooks/useVale";
import { useDispatch, useSelector } from "react-redux";
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from "react-router-dom";
import SendIcon from '@mui/icons-material/Send';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import BlockIcon from '@mui/icons-material/Block';
import { Autorizaciones } from "./Autorizaciones";
import { Rechazo } from "./Rechazo";
import { encriptItem, getUser } from "../../@utilities/manager";
import { clearItemRechazoVouncher } from "./store";
import { Eliminar } from "./Eliminar";
import { VerticalStepper } from "../../@components/VerticalStepper";
import { Detalles } from "./Detalles";

export const Expediente = () => {
    const theme = createTheme({
        palette: {
            primary: {
                light: '#1e3a8a',
                main: '#1e3a8a',
                dark: '#1e3a8a',
            },
        },
    });
    //SELECTORES
    const { position } = useSelector((state) => state.tab);
    //HOOKS
    const { register, watch, setValue } = useForm();
    const { list, states, listValesH, individualValeH, individualBitacoraH, bitacoraValeIndividual, total } = useVale();
    const navigate = useNavigate();
    //STATES
    const [ctl, setCtl] = useState('');
    const [newRows, setNewRows] = useState();
    const [expediente, setExpediente] = useState({})
    const [expedienteDetalles, setExpedienteDetalles] = useState({})
    const [OpenModalMenuItems, setOpenModalMenuItems] = useState(false);
    const [bitacoraModal, setBitacoraModal] = useState(false);
    const [detallesModal, setDetallesModal] = useState(false);
    const [openMotivoModal, setOpenMotivoModal] = useState(false);
    const [openDetalleExpedienteRechazo, setOpenDetalleExpedienteRechazo] = useState({});
    const [controlador, setControlador] = useState(false);
    const dispatch = useDispatch();
    let watchItems = watch();

    let array = [{ delito: 1, descripcion: 'Robo' }, { delito: 2, descripcion: 'Asesinato' }, { delito: 3, descripcion: 'Estafa' }];
    let usuario = getUser();

    //PAGINACION
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [optionsMenu, setOptionsMenu] = useState({ idItem: null, option: null, open: false, ejecucion: false });



    //COLUMNAS DE LA TABLA
    const columns = [
        { id: 'correlativo', label: 'Correlativo', minWidth: 170 },
        { id: 'delito', label: 'Delito', minWidth: 100 },
        { id: 'descripcion', label: 'Descripcion', minWidth: 170, align: 'center' },
        { id: 'accion', label: 'Acciones', minWidth: 170, align: 'right' },
    ];

    //OPCIONES DEL MENU DE ACCIONES PARA REGISTROS ACTIVOS
    const optionsMenuItems = [
        {
            icono: <SendIcon />,
            accion: GESTION_ORDENES.menuItem1
        },
        {
            icono: <EditIcon />,
            accion: GESTION_ORDENES.menuItem2
        },
        {
            icono: <DeleteIcon />,
            accion: GESTION_ORDENES.menuItem3
        }
    ];

    const optionsMenuItems2 = [
        {
            icono: <CheckCircleIcon />,
            accion: GESTION_ORDENES.menuItem1
        },
        {
            icono: <BlockIcon />,
            accion: GESTION_ORDENES.menuItem6
        },
    ];

    const optionsMenuItems3 = [
        {
            icono: <CheckCircleIcon />,
            accion: GESTION_ORDENES.menuItem2
        },
        {
            icono: <DeleteIcon />,
            accion: GESTION_ORDENES.menuItem3
        }
    ];

    //opciones del menu para eliminar vales
    const optionMenuItems4 = [
        {
            icono: <DeleteIcon />,
            accion: GESTION_ORDENES.menuItem3
        }
    ]

    //Funcion para manejar el boton ver de las acciones
    const verItem = (idExpediente) => {
        individualBitacoraH(idExpediente);
        setBitacoraModal(true);
    }

    const verDetallesItem = (idExpediente) => {
        setExpedienteDetalles(idExpediente ? list.find(item => item.idExpediente === idExpediente) : {});
        setDetallesModal(true);
    }

    const verMotivo = (idExpediente) => {
        individualBitacoraH(idExpediente);
        setOpenDetalleExpedienteRechazo(idExpediente ? list.find(item => item.idExpediente === idExpediente) : {})
        setOpenMotivoModal(true);
    }

    //ACCIONES DE CADA TUPLA EN LA TABLA
    const acciones = (idExpediente) => {
        return (
            <ThemeProvider theme={theme}>
                <div className='flex justify-end'>
                    <Button onClick={() => position === TABS_POSITION.FIRST ? verDetallesItem(idExpediente) : position === TABS_POSITION.FOURTH ? verMotivo(idExpediente) : verItem(idExpediente)} variant="outlined">{position === TABS_POSITION.FOURTH ? 'Motivo' : GESTION_ORDENES.accion1}</Button>

                    {
                        usuario.acceso !== 'ADMINISTRADOR' ?

                            position === TABS_POSITION.FIRST ?
                                usuario.acceso !== 'COORDINADOR' ?
                                    <MenuItems id={idExpediente} selectOption={setOptionsMenu} options={optionsMenuItems} />
                                    : null

                                : position === TABS_POSITION.SECOND ?
                                    usuario.acceso !== 'COORDINADOR' ?
                                        <MenuItems id={idExpediente} selectOption={setOptionsMenu} options={optionMenuItems4} />
                                        : <MenuItems id={idExpediente} selectOption={setOptionsMenu} options={optionsMenuItems2} />


                                    : position === TABS_POSITION.FOURTH ?
                                        usuario.acceso !== 'COORDINADOR' ?
                                            <MenuItems id={idExpediente} selectOption={setOptionsMenu} options={optionsMenuItems3} />
                                            : null

                                        : null
                            : null
                    }
                </div>
            </ThemeProvider>
        )
    }

    //TABS
    const titlesTabs = [
        {
            title: GESTION_ORDENES.titleTab1,
            badge: states.draft
        },
        {
            title: GESTION_ORDENES.titleTab2,
            badge: states.approval
        },
        {
            title: GESTION_ORDENES.titleTab3,
            badge: states.authorization
        },
        {
            title: GESTION_ORDENES.titleTab9,
            badge: states.rejected
        }
    ]
    //COMPONENTES A MORSTRAR POR TAB
    const componentsTabs = () => {
        let components = [];
        for (let i = 0; i < 10; i++) {
            components.push({
                component: <TableComponent
                    list={newRows}
                    columns={columns}
                    page={page}
                    setPage={setPage}
                    rowsPerPage={rowsPerPage}
                    setRowsPerPage={setRowsPerPage}
                    count={total}
                />
            })
        }
        return components;
    }

    const lista = (search) => {
        for (let i = 0; i < 10; i++) {
            if (position === i) {
                listValesH(search, rowsPerPage, page, i + 1);
            }
        }
    }

    useEffect(() => {
        if (!optionsMenu.ejecucion) {
            setExpediente(optionsMenu.idItem ? list.find(item => item.idExpediente === optionsMenu.idItem) : {});
            if (optionsMenu.option !== GESTION_ORDENES.menuItem2) {
                setOpenModalMenuItems(optionsMenu.open);
            } else {
                dispatch(clearItemRechazoVouncher());
                individualValeH(optionsMenu.idItem ? list.find(item => item.idExpediente === optionsMenu.idItem) : {});
                navigate(`/expedientes/expediente/editar/${encriptItem(optionsMenu.idItem)}`);
            }
        } else {
            setPage(1);
            setCtl('');
            setValue('busqueda', '');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [optionsMenu]);

    useEffect(() => {
        lista(watchItems.busqueda);
        setPage(1);
        setControlador(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [watchItems.busqueda]);

    useEffect(() => {
        if (controlador) {
            lista(watchItems.busqueda);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, rowsPerPage]);

    useEffect(() => {
        if (controlador) {
            setValue('busqueda', '');
            setCtl('');
            lista(watchItems.busqueda);
            setPage(1);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [position]);

    useEffect(() => {
        let rows = [];
        list.forEach(item => {
            rows.push({
                idExpediente: item.idExpediente,
                correlativo: item.correlativo ?? 'Pendiente',
                delito: item.delito === 1 ? 'Robo' : item.delito === 2 ? 'Asesinato' : 'Estafa',
                descripcion: item.descripcion,
                accion: acciones(item.idExpediente)
            })
        });
        setNewRows(rows);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [list]);

    return (
        <>
            <div>
                <h2 className='font-extrabold text-3xl text-blue-900'>
                    {GESTION_ORDENES.vales}
                </h2>
            </div>

            <ThemeProvider theme={theme}>
                <div className='my-8 w-full flex flex-wrap'>
                    <div className='w-3/12 pr-3'>
                        <SelectOptions
                            register={register}
                            name='delito'
                            ctl={ctl}
                            setCtl={setCtl}
                            etiqueta='Delito'
                            array={array}
                            valueOption='delito'
                            nameOption='descripcion'
                            requerido={false}
                            disabledInput={true}
                        />
                    </div>

                    <div className='w-9/12'>
                        <InputSearch2 register={register} name='busqueda' etiqueta='Buscar expediente' textoBusqueda='Por correlativo o descripción' />
                    </div>
                </div>
            </ThemeProvider>

            <div className='mb-8'>
                <TabsComponent titlesTabs={titlesTabs} componentsTabs={componentsTabs()} />
            </div>

            <Box sx={{ '& > :not(style)': { m: 1 } }}>
                <Fab color="success" aria-label="add" sx={{ position: 'fixed', bottom: '20px', right: '20px' }} onClick={() =>
                    navigate('/expedientes/expediente/crear')
                }>
                    <AddIcon />
                </Fab>
            </Box>

            {/* MODALES PARA ACCIONES DE LOS REGISTROS */}
            <ModalComponent open={OpenModalMenuItems} setOpen={setOpenModalMenuItems}>
                {

                    optionsMenu.option === GESTION_ORDENES.menuItem1 ?
                        position === TABS_POSITION.FIRST ?
                            < Autorizaciones setOpen={setOpenModalMenuItems} flag={false} expediente={expediente} /> :
                            position === TABS_POSITION.SECOND ?
                                <Autorizaciones setOpen={setOpenModalMenuItems} flag={true} expediente={expediente} />
                                : null
                        : optionsMenu.option === GESTION_ORDENES.menuItem6 ?
                            position === TABS_POSITION.SECOND ?
                                <Rechazo expediente={expediente} setOpen={setOpenModalMenuItems} />
                                : null
                            : optionsMenu.option === GESTION_ORDENES.menuItem3 ?
                                <Eliminar expediente={expediente} setOpen={setOpenModalMenuItems} />
                                : null
                }
            </ModalComponent>

            {/* MODAL PARA MOSTRAR TRACKING DEL EXPEDIENTE */}
            <ModalComponent open={bitacoraModal} setOpen={setBitacoraModal} widthModal={800}>
                {
                    Object.keys(bitacoraValeIndividual).length > 0 ?
                        <>
                            <div className="flex justify-between">
                                <div className="flex flex-wrap">
                                    <Typography id="modal-modal-title" variant="h6" component="h2" style={{ fontWeight: 600 }}>
                                        <div className="m-0 p-0">
                                            Correlativo: &nbsp;
                                        </div>
                                    </Typography>
                                    <Typography id="modal-modal-title" variant="h6" component="h2">
                                        <div className="m-0 p-0">
                                            {`${bitacoraValeIndividual.expediente.correlativo}`}
                                        </div>
                                    </Typography>
                                </div>
                            </div>
                            <div className="flex">
                                <Typography id="modal-modal-title" variant="h6" component="h2" style={{ fontWeight: 600 }}>
                                    <div className="m-0 p-0">
                                        Descripción: &nbsp;
                                    </div>
                                </Typography>
                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                    <div className="m-0 p-0">
                                        {bitacoraValeIndividual.expediente.descripcion}
                                    </div>
                                </Typography>
                            </div>

                            <Divider style={{ marginBottom: 10, marginTop: 10 }} />
                            <VerticalStepper list={bitacoraValeIndividual} />
                            <div className='mt-5 w-full flex justify-end'>
                                <Button type="button" onClick={() => {
                                    setBitacoraModal(false)
                                }} style={{ color: ' #4f4f4f ', fontWeight: 600 }} variant="text">Cerrar</Button>
                            </div>
                        </> :
                        <>
                            <Skeleton />
                            <Skeleton animation="wave" />
                            <Skeleton animation={false} />
                        </>

                }
            </ModalComponent>

            {/* MODAL PARA MOSTRAR DETALLES DEL EXPEDIENTE */}
            <ModalComponent open={detallesModal} setOpen={setDetallesModal}>
                <Detalles expediente={expedienteDetalles} setOpen={setDetallesModal} />
            </ModalComponent>

            {/* MODAL PARA MOSTRAR MOTIVO DE RECHAZO */}
            <ModalComponent open={openMotivoModal} setOpen={setOpenMotivoModal}>
                {
                    Object.keys(openDetalleExpedienteRechazo).length > 0 && Object.keys(bitacoraValeIndividual).length > 0 ?
                        <>
                            <div className="flex justify-between">
                                <div className="flex">
                                    <Typography id="modal-modal-title" variant="h6" component="h2" style={{ fontWeight: 600 }}>
                                        <div className="m-0 p-0">
                                            Correlativo: &nbsp;
                                        </div>
                                    </Typography>
                                    <Typography id="modal-modal-title" variant="h6" component="h2">
                                        <div className="m-0 p-0">
                                            {`${openDetalleExpedienteRechazo.correlativo}`}
                                        </div>
                                    </Typography>
                                </div>
                            </div>
                            <div className="flex flex-wrap">
                                <Typography id="modal-modal-title" variant="h6" component="h2" style={{ fontWeight: 600 }}>
                                    <div className="m-0 p-0">
                                        Motivo de rechazo: &nbsp;
                                    </div>
                                </Typography>
                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                    <div className="m-0 p-0 text-md">
                                        {`${openDetalleExpedienteRechazo.motivo_rechazo} `}
                                    </div>
                                </Typography>
                            </div>
                            <Divider style={{ marginBottom: 10, marginTop: 10 }} />
                            <VerticalStepper list={bitacoraValeIndividual} />

                            <div className='mt-5 w-full flex justify-end'>
                                <Button onClick={() => {
                                    dispatch(clearItemRechazoVouncher());
                                    setOpenMotivoModal(false);
                                }} style={{ color: '#4f4f4f', fontWeight: 600 }} variant="text">Cerrar</Button>
                            </div>
                        </>
                        : <>
                            <Skeleton />
                            <Skeleton animation="wave" />
                            <Skeleton animation={false} />
                        </>
                }
            </ModalComponent>
        </>
    )
}
