/* eslint-disable react/prop-types */
import { Button, Typography } from '@mui/material'

export const Detalles = (props) => {
    const { usuario, setOpen } = props;
    return (
        <>
            {
                Object.keys(usuario).length > 0 ?
                    <>
                        <Typography id="modal-modal-title" variant="h6" component="h2" style={{ color: '#1e3a8a', fontWeight: 600 }}>
                            {`${usuario.nombre} ${usuario.apellido}`}
                        </Typography>
                        {
                            [
                                { title: 'Usuario', valor: usuario.usuario },
                                { title: 'Correo electrónico', valor: usuario.correo_electronico },
                                { title: 'Rol', valor: usuario.rol.rol },
                                { title: 'Fiscalía', valor: usuario.fiscalia.fiscalia },
                                { title: 'Puesto', valor: usuario.puesto.puesto }
                            ].map((item) => (
                                <div key={item.title} className='flex'>
                                    <Typography id="modal-modal-description" sx={{ mt: 1, mr: 1 }} style={{ color: '#1e3a8a' }}>
                                        {`${item.title}: `}
                                    </Typography>
                                    <Typography id="modal-modal-description" sx={{ mt: 1 }}>
                                        {item.valor}
                                    </Typography>
                                </div>
                            ))
                        }

                        <div className='mt-2 w-full flex justify-end'>
                            <Button onClick={() => setOpen(false)} style={{ color: '#1e3a8a', fontWeight: 600 }} variant="text">Cerrar</Button>
                        </div>
                    </>
                    : null
            }
        </>
    )
}
