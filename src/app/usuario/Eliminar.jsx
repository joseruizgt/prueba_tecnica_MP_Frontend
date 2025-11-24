/* eslint-disable react/prop-types */
import { Button, Typography } from "@mui/material"

export const Eliminar = ({ optionsMenu, setOptionsMenu, setOpen, usuario, deleteUserH }) => {

    const eliminarRegistro = async () => {
        await deleteUserH(usuario.idUsuario);
        setOptionsMenu({ ...optionsMenu, ejecucion: true })
        setOpen(false);
    }

    return (
        <>
            <Typography id="modal-modal-title" variant="h6" component="h2" style={{ color: ' #d60707 ', fontWeight: 600, }}>
                {`¿Está seguro que desea eliminar a este usuario?`}
            </Typography>
            <Typography id="modal-modal-description" style={{ fontSize: 13, marginLeft: 13, color: '#d60707' }}>
                Esta acción es irreversible
            </Typography>

            {
                Object.keys(usuario).length > 0 ?
                    <div className="flex ml-3">
                        <Typography id="modal-modal-description" sx={{ mt: 2, mr: 1 }} style={{ color: '#d60707' }}>
                            {`Usuario: `}
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }} style={{ color: '#424242' }}>
                            {`${usuario.nombre} ${usuario.apellido}`}
                        </Typography>
                    </div>
                    : null
            }

            <div className='mt-5 w-full flex justify-end'>
                <Button onClick={eliminarRegistro} variant="contained" style={{ backgroundColor: ' #d60707', marginRight: 2 }}>
                    Eliminar
                </Button>
                <Button onClick={() => setOpen(false)} style={{ color: '#424242' }} variant="text">Cerrar</Button>
            </div>
        </>
    )
}
