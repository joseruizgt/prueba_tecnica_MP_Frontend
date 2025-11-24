/* eslint-disable react/prop-types */
import { ThemeProvider } from "@emotion/react"
import { Button, Skeleton, Typography, createTheme } from "@mui/material";

export const Detalles = ({ setOpen, rol }) => {
  const theme = createTheme({
    palette: {
      primary: {
        light: '#1e3a8a',
        main: '#1e3a8a',
        dark: '#1e3a8a',
      },
    },
  });

  const formatearFecha = (fecha) => {
    const d = new Date(fecha);
    const dia = d.getDate().toString().padStart(2, '0');
    const mes = (d.getMonth() + 1).toString().padStart(2, '0');
    const anio = d.getFullYear();
    const horas = d.getHours().toString().padStart(2, '0');
    const minutos = d.getMinutes().toString().padStart(2, '0');
    const segundos = d.getSeconds().toString().padStart(2, '0');

    return `${dia}/${mes}/${anio} ${horas}h:${minutos}min:${segundos}s`;
  }
  return (
    <ThemeProvider theme={theme}>
      {
        Object.keys(rol).length > 0 ?
          <>
            <Typography id="modal-modal-title" variant="h6" component="h2" style={{ color: '#1e3a8a', fontWeight: 600, }}>
              {`Detalles del rol`}
            </Typography>
            <div className="flex mt-5">
              <Typography id="modal-modal-description" sx={{ mr: 1, ml: 2 }} style={{ color: '#1e3a8a' }}>
                {`Rol: `}
              </Typography>
              <Typography id="modal-modal-description">
                {`${rol.rol}`}
              </Typography>
            </div>
            <div className="flex">
              <Typography id="modal-modal-description" sx={{ mr: 1, ml: 2 }} style={{ color: '#1e3a8a' }}>
                {`Descripción: `}
              </Typography>
              <Typography id="modal-modal-description">
                {`${rol.descripcion}`}
              </Typography>
            </div>
            <div className="flex">
              <Typography id="modal-modal-description" sx={{ mr: 1, ml: 2 }} style={{ color: '#1e3a8a' }}>
                {`Fecha de creación: `}
              </Typography>
              <Typography id="modal-modal-description">
                {`${formatearFecha(rol.fecha_creacion)}`}
              </Typography>
            </div>
            <div className='mt-5 w-full flex justify-end'>
              <Button type="button" onClick={() => setOpen(false)} style={{ color: '#1e3a8a', fontWeight: 600 }} variant="text">Cerrar</Button>
            </div>
          </>
          : <>
            <Skeleton />
            <Skeleton animation="wave" />
            <Skeleton animation={false} />
          </>
      }
    </ThemeProvider>
  )
}
