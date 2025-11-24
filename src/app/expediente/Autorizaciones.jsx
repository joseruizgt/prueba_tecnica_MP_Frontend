/* eslint-disable react/prop-types */
import { ThemeProvider } from "@emotion/react";
import { Button, Typography, createTheme } from "@mui/material";
import { useVale } from "./hooks/useVale";
import { useSelector } from "react-redux";

export const Autorizaciones = ({ flag, expediente, setOpen }) => {
    //TEMAS
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
    const { cambioFaseH } = useVale();
    const { loading } = useSelector((state) => state.loading);
    const { position } = useSelector((state) => state.tab);

    const enviarVale = () => {
        if (flag) {
            cambioFaseH(3, expediente, position);
            setOpen(false);
        } else {
            cambioFaseH(2, expediente, position);
            setOpen(false);
        }
    }

    return (
        loading ? <></> :
            <ThemeProvider theme={theme}>
                <Typography id="modal-modal-title" variant="h6" component="h2" style={{ color: '#1e3a8a', fontWeight: 600, }}>
                    {`¿Desea ${flag ? 'aprobar este expediente' : 'solicitar la aprobación de este expediente'}?`}
                </Typography>

                {
                    Object.keys(expediente).length > 0 ?
                        <div className="ml-4">
                            <div className="flex">
                                <Typography id="modal-modal-description" sx={{ mt: flag ? 0 : 2, mr: 1 }} style={{ color: '#1e3a8a' }}>
                                    {`Correlativo: `}
                                </Typography>
                                <Typography id="modal-modal-description" sx={{ mt: flag ? 0 : 2 }}>
                                    {expediente.correlativo}
                                </Typography>
                            </div>
                            <div className="flex">
                                <Typography id="modal-modal-description" sx={{ mr: 1 }} style={{ color: '#1e3a8a' }}>
                                    {`Delito: `}
                                </Typography>
                                <Typography id="modal-modal-description" >
                                    {`${expediente.delito === 1 ? 'Robo' : expediente.delito === 2 ? 'Asesinato' : 'Estafa'}`}
                                </Typography>
                            </div>
                            <div className="flex">
                                <Typography id="modal-modal-description" sx={{ mr: 1 }} style={{ color: '#1e3a8a' }}>
                                    {`Descripcion: `}
                                </Typography>
                                <Typography id="modal-modal-description" >
                                    {`${expediente.descripcion}`}
                                </Typography>
                            </div>
                        </div>

                        : null
                }

                <div className='mt-5 w-full flex justify-end'>
                    <Button onClick={enviarVale} variant="contained" style={{ marginRight: 2 }}>
                        Enviar
                    </Button>
                    <Button onClick={() => setOpen(false)} style={{ color: '#1e3a8a', fontWeight: 600 }} variant="text">Cerrar</Button>
                </div>
            </ThemeProvider>
    )
}
