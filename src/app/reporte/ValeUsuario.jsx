/* eslint-disable react/prop-types */
import { ThemeProvider } from "@emotion/react";
import { Button, Divider, createTheme, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { GESTION_REPORTES } from "../../@utilities/constants";
import { AutoCompleteInput, InputDate, ModalComponent } from "../../@components";
import { useReporte } from "./hooks/useReporte";
import { useUser } from "../usuario/hooks/useUser";
import { convertFormatArrayUser, decryptItem } from "../../@utilities/manager";


export const ValeUsuario = () => {
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
  const { register, handleSubmit, formState: { errors }, control } = useForm();
  const { listUsersH2, list } = useUser();
  const { generarReporteValesUsuarioH } = useReporte();
  const { id } = useParams();

  //ESTADOS
  const [open, setOpen] = useState(false);
  const [dataFormulario, setDataFormulario] = useState(null);
  // const [ctlJefeAprueba, setCtlJefeAprueba] = useState('');

  const generarReporte = () => {
    setOpen(false);
    generarReporteValesUsuarioH(dataFormulario);
  }

  const abrirModal = (data) => {
    setDataFormulario(data);
    setOpen(true);
  }

  const catalogos = async () => {
    listUsersH2(undefined, undefined, 0, undefined, undefined, decryptItem(id));
  };

  useEffect(() => {
    catalogos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <div className="flex">
        <div className="w-2/12" >
          <h3 className='font-extrabold text-md text-blue-900 mb-2'>
            {GESTION_REPORTES.actuales}
          </h3>

          <ul style={{ listStyleType: 'disc', color: 'gray', fontSize: 15 }}>
            <li>Sin registros</li>
          </ul>

          <h3 className='font-extrabold text-md text-blue-900 mb-2 mt-6'>
            {GESTION_REPORTES.otras}
          </h3>
          <ul style={{ listStyleType: 'disc', color: 'gray', fontSize: 15 }}>
            <li>Sin solucitudes</li>
          </ul>
        </div>
        <Divider orientation="vertical" flexItem style={{ height: '100vh' }} />

        <form className="w-10/12" onSubmit={handleSubmit((data) => abrirModal(data))}>
          <div>
            <div className="ml-5 mb-5 flex justify-between">
              <div>
                <h2 className='font-extrabold text-2xl text-blue-900'>
                  {
                    GESTION_REPORTES.reporteValesUsuario
                  }
                </h2>
                <h3 className=' text-gray-500 mt-5'>
                  {GESTION_REPORTES.completar}
                </h3>
              </div>
              <div className="my-2">
                <Button type="submit" variant="contained" style={{ marginRight: 10 }}>
                  Generar
                </Button>
                <Button onClick={() => navigate('/reporteria')} style={{ color: '#1e3a8a', fontWeight: 600 }} variant="outlined">Cancelar</Button>
              </div>
            </div>
            <Divider />

            <div className={`ml-5 mt-10`}>
              <h3 className='font-extrabold text-md text-blue-900 mb-2'>
                {GESTION_REPORTES.general}
              </h3>
              <div className="flex flex-wrap">
                <InputDate
                  dimension='mb-5 sm:mb-10 pr-1 w-full sm:w-1/3 '
                  register={register}
                  nombre='fechaInicio'
                  requerido={true}
                  mensajeRequerido='Campo requerido'
                  errors={errors}
                  etiqueta='Rango de inicio'
                  estilosInput='w-full'
                  deshabilitado={false}
                  propsInput={false}
                />

                <InputDate
                  dimension='mb-5 sm:mb-10 pl-1 w-full sm:w-1/3 '
                  register={register}
                  nombre='fechaFin'
                  requerido={true}
                  mensajeRequerido='Campo requerido'
                  errors={errors}
                  etiqueta='Rango fin'
                  estilosInput='w-full'
                  deshabilitado={false}
                  propsInput={false}
                />
              </div>
              <h3 className='font-extrabold text-md text-blue-900 mb-2'>
                {GESTION_REPORTES.especifico}
              </h3>
              <div className="flex flex-wrap">
                <AutoCompleteInput
                  control={control}
                  errors={errors}
                  name='idUsuario'
                  etiqueta='Usuario'
                  estilosInput='w-full'
                  dimension='mb-5 sm:mb-14 w-full sm:w-1/3 sm:pr-4'
                  array={convertFormatArrayUser(list)}
                  valueOption='idUsuario'
                  nameOption='nombre'
                  requerido={true}
                  mensajeRequerido='Campo requerido'
                />
                {/* <SelectOptions2
                  dimension='mb-5 sm:mb-14 w-full sm:w-1/3 sm:pr-4'
                  register={register}
                  name='idUsuario'
                  ctl={ctlJefeAprueba}
                  setCtl={setCtlJefeAprueba}
                  etiqueta='Usuario'
                  array={list}
                  valueOption='idUsuario'
                  nameOption='usuario'
                  requerido={true}
                  mensajeRequerido='campo obligatorio'
                  setValue={setValue}
                  errors={errors}
                /> */}
              </div>
            </div>
          </div>
        </form>
      </div>
      <ModalComponent open={open} setOpen={setOpen}>
        <Typography id="modal-modal-title" variant="h6" component="h2" style={{ color: '#1e3a8a', fontWeight: 600, }}>
          {`¿Desea generar este reporte?`}
        </Typography>

        <div className="flex">
          <Typography id="modal-modal-description" sx={{ mt: 1, ml: 2 }}>
            Esta acción es irreversible
          </Typography>
        </div>



        <div className='mt-5 w-full flex justify-end'>
          <Button onClick={generarReporte} variant="contained" style={{ marginRight: 2 }}>
            Sí
          </Button>
          <Button onClick={() => setOpen(false)} style={{ color: '#1e3a8a', fontWeight: 600 }} variant="text">Cerrar</Button>
        </div>
      </ModalComponent>
    </ThemeProvider>
  )
}
