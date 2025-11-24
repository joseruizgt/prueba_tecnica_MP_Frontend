/* eslint-disable react/prop-types */
import { Button, ThemeProvider, Typography, createTheme } from "@mui/material";
import { useRol } from "./hooks/useRol";
import { useNavigate, useParams } from "react-router-dom";
import { decryptItem } from "../../@utilities/manager";

export const GuardarModal = ({ dataRol, setOpen, flagCrear }) => {
    const theme = createTheme({
        palette: {
            primary: {
                light: '#1e3a8a',
                main: '#1e3a8a',
                dark: '#1e3a8a',
            },
        },
    });

    const { createRolH, updateRolH } = useRol();
    const navigate = useNavigate();
    const { id } = useParams();

    const crearEditar = () => {
        if (flagCrear) {
            createRolH(dataRol, navigate);
            setOpen(false);
        } else {
            updateRolH(dataRol, decryptItem(id));
            navigate('/administracion/rol');
        }
    }


    return (
        <ThemeProvider theme={theme}>
            <Typography id="modal-modal-title" variant="h6" component="h2" style={{ color: '#1e3a8a', fontWeight: 600, }}>
                {`${flagCrear ? 'Guardar rol' : 'Guardar cambios'}`}
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
