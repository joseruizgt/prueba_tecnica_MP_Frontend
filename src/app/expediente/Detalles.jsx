/* eslint-disable react/prop-types */
import { Button, Divider, ThemeProvider, Typography, createTheme } from "@mui/material";

export const Detalles = ({ expediente, setOpen }) => {
  const theme = createTheme({
    palette: {
      primary: {
        light: '#1e3a8a',
        main: '#1e3a8a',
        dark: '#1e3a8a',
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <div className="ml-3">
        <Typography id="modal-modal-title" variant="h6" component="h2" style={{ color: '#1e3a8a', fontWeight: 600, }}>
          {`Detalles generales`}
        </Typography>
      </div>
      <Divider style={{ marginTop: 10 }} />

      {
        Object.keys(expediente).length > 0 ?
          <div className="ml-4">
            <div className="flex">
              <Typography id="modal-modal-description" sx={{ mt: 2, mr: 1 }} style={{ color: '#1e3a8a', fontWeight: 600 }}>
                {`Estado: `}
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                {`Creado`}
              </Typography>
            </div>
            <div className="flex">
              <Typography id="modal-modal-description" sx={{ mr: 1 }} style={{ color: '#1e3a8a', fontWeight: 600 }}>
                {`Delito: `}
              </Typography>
              <Typography id="modal-modal-description">
                {expediente.delito === 1 ? 'Robo' : expediente.delito === 2 ? 'Asesinato' : 'Estafa'}
              </Typography>
            </div>
            <div className="flex">
              <Typography id="modal-modal-description" sx={{ mr: 1 }} style={{ color: '#1e3a8a', fontWeight: 600 }}>
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
        <Button onClick={() => setOpen(false)} style={{ color: '#1e3a8a', fontWeight: 600 }} variant="text">Cerrar</Button>
      </div>
    </ThemeProvider>
  )
}
