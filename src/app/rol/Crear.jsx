/* eslint-disable react/prop-types */
import { ThemeProvider } from "@emotion/react";
import { Button, Divider, createTheme } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { decryptItem } from "../../@utilities/manager";
import { GESTION_ROLES } from "../../@utilities/constants";
import { InputText, ModalComponent, TextArea } from "../../@components";
import { useRol } from "./hooks/useRol";
import { GuardarModal } from "./GuardarModal";

export const Crear = ({ flagCrear }) => {
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
    const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm();
    const { individualRol, listRolH } = useRol();
    const { id } = useParams();

    //ESTADOS
    const [text, setText] = useState('');
    const [open, setOpen] = useState(false);
    const [dataRol, setDataRol] = useState(null);
    let watchItems = watch();

    const crearEditarRol = (data) => {
        setDataRol(data);
        setOpen(true);
    }

    useEffect(() => {
        if (watchItems.descripcion !== '' && watchItems.descripcion !== undefined && watchItems.descripcion.length <= 150) {
            setText(watchItems.descripcion);
        } else {
            setText('');
        }
    }, [watchItems.descripcion]);

    useEffect(() => {
        if (!flagCrear) {
            listRolH(undefined, undefined, 0, decryptItem(id));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [flagCrear])


    useEffect(() => {
        if (!flagCrear) {
            setValue('rol', individualRol.rol);
            setValue('descripcion', individualRol.descripcion);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [individualRol])

    return (
        <ThemeProvider theme={theme}>
            <div className="flex">
                <div className="w-2/12" >
                    <h3 className='font-extrabold text-md text-blue-900 mb-2'>
                        {GESTION_ROLES.actuales}
                    </h3>

                    {
                        !flagCrear && Object.keys(individualRol).length > 0
                            // && list.length > 0
                            ?
                            <ul style={{ listStyleType: 'disc', color: 'gray', fontSize: 15 }}>
                                <li>{`Rol: ${individualRol.rol}`}</li>
                                <li>{`Descripción: ${individualRol.descripcion}`}</li>
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

                <form className="w-10/12" onSubmit={handleSubmit((data) => crearEditarRol(data))}>
                    <div>
                        <div className="ml-5 mb-5 flex justify-between">
                            <div>
                                <h2 className='font-extrabold text-3xl text-blue-900'>
                                    {
                                        flagCrear ?
                                        GESTION_ROLES.creacion
                                        :
                                        GESTION_ROLES.edicion
                                    }
                                </h2>
                                <h3 className=' text-gray-500 mt-5'>
                                    {GESTION_ROLES.completar}
                                </h3>
                            </div>
                            <div className="my-2">
                                <Button type="submit" variant="contained" style={{ marginRight: 10 }}>
                                    Guardar
                                </Button>
                                <Button onClick={() => navigate('/administracion/rol')} style={{ color: '#1e3a8a', fontWeight: 600 }} variant="outlined">Cancelar</Button>
                            </div>
                        </div>
                        <Divider />

                        <div className={`ml-5 mt-10`}>
                            <h3 className='font-extrabold text-md text-blue-900 mb-2'>
                                {GESTION_ROLES.general}
                            </h3>
                            <div className="flex flex-wrap">
                                <InputText
                                    dimension='mb-5 sm:mb-10 w-full sm:w-1/3 '
                                    register={register}
                                    nombre='rol'
                                    requerido={true}
                                    mensajeRequerido='Campo requerido'
                                    errors={errors}
                                    etiqueta='Nombre del rol'
                                    estilosInput='w-full'
                                    deshabilitado={false}
                                    propsInput={false}
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
                                    etiqueta='Descripcion'
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
                <GuardarModal dataRol={dataRol} setOpen={setOpen} flagCrear={flagCrear} />
            </ModalComponent>
        </ThemeProvider>
    )
}
