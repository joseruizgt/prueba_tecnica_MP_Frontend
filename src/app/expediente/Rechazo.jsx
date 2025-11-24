/* eslint-disable react/prop-types */
import { Button, ThemeProvider, Typography, createTheme } from "@mui/material";
import { TextArea } from "../../@components";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useVale } from "./hooks/useVale";
import { useSelector } from "react-redux";
import { getAgencyLocalS } from "../../@utilities/manager";

export const Rechazo = ({ expediente, setOpen }) => {
    const theme = createTheme({
        palette: {
            primary: {
                light: '#1e3a8a',
                main: '#1e3a8a',
                dark: '#1e3a8a',
            },
        },
    });

    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const { position } = useSelector((state) => state.tab);
    const { cambioFaseH } = useVale();
    const [text, setText] = useState('');
    let watchItems = watch();


    const rechazarVale = (data) => {
        // editItemH(vale.idExpediente, data);
        cambioFaseH(4, { ...expediente, ...data }, position);
        setOpen(false);
    }

    useEffect(() => {
        if (watchItems.motivo !== '' && watchItems.motivo !== undefined && watchItems.motivo.length <= 150) {
            setText(watchItems.motivo);
        } else {
            setText('');
        }
    }, [watchItems.motivo]);

    return (
        <ThemeProvider theme={theme}>
            <Typography id="modal-modal-title" variant="h6" component="h2" style={{ color: '#1e3a8a', fontWeight: 600, }}>
                {`¿Desea rechazar este expediente?`}
            </Typography>

            <form onSubmit={handleSubmit((data) => rechazarVale(data))}>
                {
                    Object.keys(expediente).length > 0 ?
                        <div className="ml-4">
                            <div className="flex">
                                <Typography id="modal-modal-description" sx={{ mr: 1 }} style={{ color: '#1e3a8a' }}>
                                    {`Correlativo: `}
                                </Typography>
                                <Typography id="modal-modal-description" >
                                    {`${expediente.correlativo}`}
                                </Typography>
                            </div>
                            <div className="flex">
                                <Typography id="modal-modal-description" sx={{ mr: 1 }} style={{ color: '#1e3a8a' }}>
                                    {`Descripcion: `}
                                </Typography>
                                <Typography id="modal-modal-description">
                                    {expediente.descripcion}
                                </Typography>
                            </div>
                            <div className="flex">
                                <Typography id="modal-modal-description" sx={{ mr: 1 }} style={{ color: '#1e3a8a' }}>
                                    {`Delito: `}
                                </Typography>
                                <Typography id="modal-modal-description" >
                                    {expediente.delito === 1 ? 'Robo' : expediente.delito === 2 ? 'Asesinato' : 'Estafa'}
                                </Typography>
                            </div>
                            <div className="flex">
                                <Typography id="modal-modal-description" sx={{ mr: 1 }} style={{ color: '#1e3a8a' }}>
                                    {`Fiscalía: `}
                                </Typography>
                                <Typography id="modal-modal-description" >
                                    {getAgencyLocalS().find(item => item.idFiscalia === expediente.idFiscalia)?.fiscalia || ''}
                                </Typography>
                            </div>
                            <div className="flex flex-wrap mt-5">
                                <TextArea
                                    dimension='mb-5 sm:mb-10 w-full'
                                    register={register}
                                    nombre='motivo_rechazo'
                                    requerido={true}
                                    mensajeRequerido='Campo requerido'
                                    errors={errors}
                                    etiqueta='Motivo de rechazo'
                                    estilosInput='w-full'
                                    deshabilitado={false}
                                    text={text}
                                    maxLength={150}
                                />
                            </div>
                        </div>
                        : null
                }
                <div className='mt-5 w-full flex justify-end'>
                    <Button type="submit" variant="contained" style={{ marginRight: 2 }}>
                        Enviar
                    </Button>
                    <Button type="button" onClick={() => setOpen(false)} style={{ color: '#1e3a8a', fontWeight: 600 }} variant="text">Cerrar</Button>
                </div>
            </form>

        </ThemeProvider>
    )
}
