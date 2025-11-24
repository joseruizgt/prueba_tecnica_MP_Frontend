/* eslint-disable react/prop-types */
import { ThemeProvider } from "@emotion/react";
import { Button, Typography, createTheme } from "@mui/material";
import { useVale } from "./hooks/useVale";
import { useNavigate } from "react-router-dom";


export const GuardarBorrador = ({ dataVale, setOpen, flagCrear }) => {
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
    const { saveValeH, editItemH } = useVale();

    const enviarAprobacion = () => {
        if (flagCrear) { //condicion para crear
            saveValeH(dataVale);
            navigate('/expedientes/expediente');
        } else { //condicion para editar 
            editItemH(dataVale.idExpediente, dataVale)
            navigate('/expedientes/expediente');
        }
    }

    return (
        <ThemeProvider theme={theme}>
            <div className="flex justify-between">
                <Typography id="modal-modal-title" variant="h6" component="h2" style={{ color: '#1e3a8a', fontWeight: 600, }}>
                    {flagCrear ? 'Crear expediente': 'Editar expediente'}
                </Typography>
                <Button onClick={() => setOpen(false)} style={{ color: '#4f4f4f', fontWeight: 600 }} variant="text">Cerrar</Button>

            </div>
            <Typography id="modal-modal-description" style={{ color: ' #4f4f4f ' }}>
                Cualquier acción es irreversible
            </Typography>

            <div className='mt-5 w-full flex justify-end'>
                <Button onClick={enviarAprobacion} variant="contained" style={{ marginRight: 2 }}>
                    {flagCrear ? 'Crear expediente' : 'Editar expediente'}
                </Button>
            </div>
        </ThemeProvider>
    )
}
