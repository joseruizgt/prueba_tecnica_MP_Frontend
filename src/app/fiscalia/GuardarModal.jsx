/* eslint-disable react/prop-types */
import { Button, ThemeProvider, Typography, createTheme } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { decryptItem } from "../../@utilities/manager";
import { useFiscalia } from "./hooks/useFiscalia";


export const GuardarModal = ({ dataFiscalia, setOpen, flagCrear }) => {
    const theme = createTheme({
        palette: {
            primary: {
                light: '#1e3a8a',
                main: '#1e3a8a',
                dark: '#1e3a8a',
            },
        },
    });

    const {createFiscaliaH, updateFiscaliaH} = useFiscalia();
    const navigate = useNavigate();
    const { id } = useParams();

    const crearEditar = () => {
        if (flagCrear) {
            createFiscaliaH(dataFiscalia, navigate);
            setOpen(false);
        } else {
            updateFiscaliaH(dataFiscalia, decryptItem(id));
            navigate('/administracion/fiscalia');
        }
    }


    return (
        <ThemeProvider theme={theme}>
            <Typography id="modal-modal-title" variant="h6" component="h2" style={{ color: '#1e3a8a', fontWeight: 600, }}>
                {`${flagCrear ? 'Guardar fiscalía' : 'Guardar cambios'}`}
            </Typography>
            <Typography id="modal-modal-description" style={{ color: ' #4f4f4f ' }}>
                esta acción es irreversible
            </Typography>
            <Typography id="modal-modal-description" style={{ color: ' #4f4f4f ' }}>
                {`${flagCrear ? '¿Desea guardar este registro?' : '¿Desea guardar los cambios?'}`}

            </Typography>

            <div className='mt-5 w-full flex justify-end'>
                <Button onClick={crearEditar} variant="contained" style={{ marginRight: 2 }}>
                    Sí
                </Button>
                <Button onClick={() => setOpen(false)} style={{ color: '#1e3a8a', fontWeight: 600 }} variant="text">No</Button>
            </div>
        </ThemeProvider>
    )
}
