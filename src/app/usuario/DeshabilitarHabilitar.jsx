/* eslint-disable react/prop-types */
import { ThemeProvider } from "@emotion/react";
import { Button, Typography, createTheme } from "@mui/material";
import { useUser } from "./hooks/useUser";

export const DeshabilitarHabilitar = ({ setOpen, usuario, activar = false, setValue, setCtlFiscalia }) => {
    const theme = createTheme({
        palette: {
            primary: {
                light: '#1e3a8a',
                main: '#1e3a8a',
                dark: '#1e3a8a',
            },
        },
    });

    const { updateUserH } = useUser();

    const activarDesactivar = () => {
        updateUserH(activar ? { estado: 1 } : { estado: 0 }, usuario.idUsuario, true)
        setValue('busqueda', '');
        setCtlFiscalia('');
        setOpen(false);
    }

    return (
        <ThemeProvider theme={theme}>
            <Typography id="modal-modal-title" variant="h6" component="h2" style={{ color: '#1e3a8a', fontWeight: 600, }}>
                {`¿Está seguro que desea ${activar ? 'activar' : 'deshabilitar'} a este usuario?`}
            </Typography>

            {
                Object.keys(usuario).length > 0 ?
                    <div className="flex">
                        <Typography id="modal-modal-description" sx={{ mt: 2, mr: 1 }} style={{ color: '#1e3a8a' }}>
                            {`Usuario: `}
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            {`${usuario.nombre} ${usuario.apellido}`}
                        </Typography>
                    </div>
                    : null
            }


            <div className='mt-5 w-full flex justify-end'>
                <Button onClick={activarDesactivar} variant="contained" style={{ marginRight: 2 }}>
                    {`${activar ? 'Activar' : 'Deshabilitar'} `}
                </Button>
                <Button onClick={() => setOpen(false)} style={{ color: '#1e3a8a', fontWeight: 600 }} variant="text">Cerrar</Button>
            </div>
        </ThemeProvider>
    )
}
