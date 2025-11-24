/* eslint-disable react/prop-types */
import { Button, ThemeProvider, Typography, createTheme } from "@mui/material";
import { useVale } from "./hooks/useVale";
import { useSelector } from "react-redux";

export const Eliminar = ({ expediente, setOpen }) => {
    const theme = createTheme({
        palette: {
            primary: {
                light: '#1e3a8a',
                main: '#1e3a8a',
                dark: '#1e3a8a',
            },
        },
    });

    const { eliminarH } = useVale();
    const { position } = useSelector((state) => state.tab);

    const eliminar = () => {
        eliminarH(expediente.idExpediente, position);
        setOpen(false);
    }

    return (
        <ThemeProvider theme={theme}>
            <Typography id="modal-modal-title" variant="h6" component="h2" style={{ color: ' #d60707 ', fontWeight: 600, }}>
                {`¿Desea eliminar este expediente?`}
            </Typography>
            {
                Object.keys(expediente).length > 0 ?
                    <div className="ml-4">
                        <div className="flex">
                            <Typography id="modal-modal-description" sx={{ mr: 1 }}>
                                {`Correlativo: `}
                            </Typography>
                            <Typography id="modal-modal-description" >
                                {expediente.correlativo}
                            </Typography>
                        </div>
                        <div className="flex">
                            <Typography id="modal-modal-description" sx={{ mr: 1 }} >
                                {`Descripción: `}
                            </Typography>
                            <Typography id="modal-modal-description" >
                                {`${expediente.descripcion}`}
                            </Typography>
                        </div>
                    </div>
                    : null
            }
            <div className='mt-5 w-full flex justify-end'>
                <Button type="button" variant="contained" style={{ backgroundColor: ' #d60707 ', marginRight: 2 }} onClick={eliminar}>
                    Eliminar
                </Button>
                <Button type="button" onClick={() => setOpen(false)} style={{ color: ' #4f4f4f ', fontWeight: 600 }} variant="text">Cerrar</Button>
            </div>

        </ThemeProvider>
    )
}
