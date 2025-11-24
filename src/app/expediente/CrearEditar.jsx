/* eslint-disable react/prop-types */
import { ThemeProvider } from "@emotion/react";
import { Button, Divider, createTheme } from "@mui/material";
import { GESTION_ORDENES } from "../../@utilities/constants";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { AutoCompleteInput, ModalComponent, TextArea } from "../../@components";
import { useEffect, useState } from "react";
import { GuardarBorrador } from "./GuardarBorrador";
import { useVale } from "./hooks/useVale";
import { decryptItem } from "../../@utilities/manager";
import { CorreccionExpediente } from "./CorreccionExpediente";
import { useDispatch } from "react-redux";
import { clearIndividual } from "./store";

export const CrearEditar = ({ flagCrear }) => {
    const theme = createTheme({
        palette: {
            primary: {
                light: '#1e3a8a',
                main: '#1e3a8a',
                dark: '#1e3a8a',
            },
        },
    });

    //HOOKS
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, setValue, watch, control } = useForm();
    const { individual, individualValePeticionH } = useVale();
    const dispatch = useDispatch();
    const { id } = useParams();


    //ESTADOS
    const [text, setText] = useState('');
    const [open, setOpen] = useState(false);
    // const [open2, setOpen2] = useState(false);
    const [open3, setOpen3] = useState(false);
    // const [open5, setOpen5] = useState(false);
    const [dataVale, setDataVale] = useState(null);
    let watchItems = watch();

    let array = [{ delito: 1, descripcion: 'Robo' }, { delito: 2, descripcion: 'Asesinato' }, { delito: 3, descripcion: 'Estafa' }];

    const guardarBorradorVale = (data) => {
        if (Object.keys(individual).length > 0 && individual.flag_rechazo === 1) {    //si se está editando y es un vale rechazado
            console.log('estoy aca')
            let data1 = { ...data, idExpediente: decryptItem(id) };
            setDataVale(data1);
            setOpen3(true);
        } else {
            if (flagCrear) {    //si se está creando un nuevo vale
                setDataVale(data);
            } else {   //si se está editando un vale existente
                let data1 = { ...data, idExpediente: decryptItem(id) };
                setDataVale(data1);
            }
            setOpen(true);
        }
    }

    const limpiarVista = (flagRetorno) => {
        dispatch(clearIndividual());
        if (flagRetorno) {
            navigate('/expedientes/expediente');
        }
    }

    //PARA MANEJAR EL CAMBIO DE TEXTO DEL INPUT DE CONCEPTO
    useEffect(() => {
        if (watchItems.descripcion !== '' && watchItems.descripcion !== undefined && watchItems.descripcion.length <= 150) {
            setText(watchItems.descripcion);
        } else {
            setText('');
        }
    }, [watchItems.descripcion]);

    //PARA OBTENER VALE INDIVIDUAL
    useEffect(() => {
        if (id && !flagCrear) {
            individualValePeticionH(decryptItem(id));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (!flagCrear) {
            setValue('delito', individual.delito);
            setValue('descripcion', individual.descripcion);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [individual])

    return (
        <ThemeProvider theme={theme}>
            <div className="flex">
                <div className="w-2/12" >
                    <h3 className='font-extrabold text-md text-blue-900 mb-2'>
                        {GESTION_ORDENES.actuales}
                    </h3>

                    {
                        !flagCrear && Object.keys(individual).length > 0
                            // && list.length > 0
                            ?
                            <ul style={{ listStyleType: 'disc', color: 'gray', fontSize: 15 }}>
                                <li>{`Delito: ${individual.delito === 1 ? 'Robo' : individual.delito === 2 ? 'Asesinato' : 'Estafa'}`}</li>
                                <li>{`Descripcion: ${individual.descripcion}`}</li>
                            </ul>
                            :
                            <ul style={{ listStyleType: 'disc', color: 'gray', fontSize: 15 }}>
                                <li>Sin registros</li>
                            </ul>
                    }



                    <h3 className='font-extrabold text-md text-blue-900 mb-2 mt-6'>
                        {GESTION_ORDENES.otras}
                    </h3>
                    <ul style={{ listStyleType: 'disc', color: 'gray', fontSize: 15 }}>
                        <li>Sin solucitudes</li>
                    </ul>
                </div>
                <Divider orientation="vertical" flexItem style={{ height: '100vh' }} />

                <form className="w-10/12" onSubmit={handleSubmit((data) => guardarBorradorVale(data))}>
                    <div>
                        <div className="ml-5 mb-5 flex justify-between">
                            <div>
                                <h2 className='font-extrabold text-3xl text-blue-900'>
                                    {
                                        !flagCrear ?
                                            GESTION_ORDENES.edicion
                                            : GESTION_ORDENES.creacion
                                    }
                                </h2>
                                <h3 className=' text-gray-500 mt-5'>
                                    {GESTION_ORDENES.completar}
                                </h3>
                            </div>
                            <div className="my-2">
                                <Button type="submit" variant="contained" style={{ marginRight: 10 }}>
                                    Guardar
                                </Button>
                                <Button onClick={() => limpiarVista(true)} style={{ color: '#1e3a8a', fontWeight: 600 }} variant="outlined">Cancelar</Button>
                            </div>
                        </div>
                        <Divider />

                        <div className={`ml-5 mt-10`}>
                            <h3 className='font-extrabold text-md text-blue-900 mb-2'>
                                {GESTION_ORDENES.general}
                            </h3>
                            <div className="flex flex-wrap">
                                <AutoCompleteInput
                                    control={control}
                                    errors={errors}
                                    name='delito'
                                    etiqueta='Delito'
                                    estilosInput='w-full'
                                    dimension='mb-5 sm:mb-10 w-full sm:w-1/3'
                                    array={array}
                                    valueOption='delito'
                                    nameOption='descripcion'
                                    requerido={true}
                                    mensajeRequerido='Campo requerido'
                                />
                            </div>
                            <div className="flex flex-wrap">
                                <TextArea
                                    dimension='mb-5 sm:mb-10 w-full'
                                    register={register}
                                    nombre='descripcion'
                                    requerido={true}
                                    mensajeRequerido='Campo requerido'
                                    errors={errors}
                                    etiqueta='Descripción'
                                    estilosInput='w-full'
                                    deshabilitado={false}
                                    text={text}
                                    maxLength={150}
                                />
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <ModalComponent open={open} setOpen={setOpen}>
                <GuardarBorrador dataVale={dataVale} setOpen={setOpen} flagCrear={flagCrear} />
            </ModalComponent>

            <ModalComponent open={open3} setOpen={setOpen3}>
                <CorreccionExpediente dataVale={dataVale} setOpen={setOpen3} />
            </ModalComponent>
        </ThemeProvider>
    )
}
