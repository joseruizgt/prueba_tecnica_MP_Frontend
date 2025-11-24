/* eslint-disable react/prop-types */
import { Button, ThemeProvider, Typography, createTheme } from '@mui/material';
import { useVale } from './hooks/useVale';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const CorreccionExpediente = ({ setOpen, dataVale }) => {
    const theme = createTheme({
        palette: {
            primary: {
                light: '#1e3a8a',
                main: '#1e3a8a',
                dark: '#1e3a8a',
            },
        },
    });
    const { correccionH } = useVale();
    //SELECTORES
    const { position } = useSelector((state) => state.tab);
    const navigate = useNavigate();

    const enviar = () => {
        correccionH(dataVale.idExpediente, dataVale, position);
        setOpen(false);
        navigate('/expedientes/expediente')
    }

    return (
        <ThemeProvider theme={theme}>
            <Typography id="modal-modal-title" variant="h6" component="h2" style={{ color: '#1e3a8a', fontWeight: 600, }}>
                {`Corregir expediente`}
            </Typography>
            <Typography id="modal-modal-description" style={{ color: ' #4f4f4f ' }}>
                Esta acción es irreversible
            </Typography>

            <div className='mt-5 w-full flex justify-end'>
                <Button onClick={enviar} variant="contained" style={{ marginRight: 2 }}>
                    Enviar
                </Button>
                <Button onClick={() => setOpen(false)} style={{ color: '#1e3a8a', fontWeight: 600 }} variant="text">Cancelar</Button>
            </div>
        </ThemeProvider>
    )
}
