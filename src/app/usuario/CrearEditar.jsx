/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import { AutoCompleteInput, InputPassword, InputText } from "../../@components"
import { GESTION_USUARIOS } from "../../@utilities/constants"
import { Button, Divider, createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useUser } from "./hooks/useUser";
import { convertFormatArrayUser, decryptItem, getAgencyLocalS, getCatRolesLocalS, getJobLocalS } from "../../@utilities/manager";

export const CrearEditar = ({ flagCrear }) => {
  const theme = createTheme({
    palette: {
      primary: {
        light: '#1e3a8a',
        main: '#1e3a8a',
        dark: '#1e3a8a',
      },
    },
  });
  const { id } = useParams();
  const navigate = useNavigate();
  const { individual, listUsersH2, list, updateUserH, createUsersH } = useUser();
  const { register, handleSubmit, formState: { errors }, setValue, control } = useForm();

  const [arrays, setArrays] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const cancelar = () => {
    navigate('/administracion/usuario')
  }

  const catalogos = async () => {
    listUsersH2(undefined, undefined, 0, undefined, undefined, decryptItem(id));
  };

  const envioFormulario = (data) => {
    if (flagCrear) {
      createUsersH(data, navigate);
    } else {
      updateUserH(data, decryptItem(id));
      navigate('/administracion/usuario');
    }
  }

  useEffect(() => {
    catalogos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flagCrear])


  useEffect(() => {
    setArrays({
      rol: getCatRolesLocalS(),
      puesto: getJobLocalS(),
      aprobaciones: convertFormatArrayUser(list),
      autorizaciones: convertFormatArrayUser(list),
      fiscalia: getAgencyLocalS()
    });
    if (!flagCrear) {
      Object.keys(individual).forEach(item => {
        if (item === 'rol') {
          setValue('idRol', individual[item].idRol);
        } else if (item === 'fiscalia') {
          setValue('idFiscalia', individual[item].idFiscalia);
        } else if (item === 'puesto') {
          setValue('idPuesto', individual[item].idPuesto);
        } else {
          setValue(item, individual[item])
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [individual, list])

  return (
    <ThemeProvider theme={theme}>

      {/* <Paper style={{ padding: 40 }} elevation={3} > */}
      <div className="flex">

        <div className="w-2/12" >
          <h3 className='font-extrabold text-md text-blue-900 mb-2'>
            {GESTION_USUARIOS.actuales}
          </h3>

          {list.length > 0 && !flagCrear && Object.keys(individual).length > 0 ?
            <ul style={{ listStyleType: 'disc', color: 'gray', fontSize: 15 }}>
              <li>{`Nombres: ${individual.nombre} ${individual.apellido}`}</li>
              <li>{`Rol: ${individual.rol.rol}`}</li>
              <li>{`Usuario: ${individual.usuario}`}</li>
              <li>{`Puesto: ${individual.puesto.puesto}`}</li>
            </ul>
            : <ul style={{ listStyleType: 'disc', color: 'gray', fontSize: 15 }}>
              <li>Sin registros</li>
            </ul>}


          <h3 className='font-extrabold text-md text-blue-900 mb-2 mt-6'>
            {GESTION_USUARIOS.otras}
          </h3>
          <ul style={{ listStyleType: 'disc', color: 'gray', fontSize: 15 }}>
            <li>Sin solucitudes</li>
          </ul>

        </div>

        <Divider orientation="vertical" flexItem style={{ height: '100vh' }} />

        <form className="w-10/12" onSubmit={handleSubmit((data) =>
          envioFormulario(data))
        }>
          <div >
            <div className="ml-5 mb-5 flex justify-between">
              <div>
                <h2 className='font-extrabold text-3xl text-blue-900'>
                  {
                    !flagCrear ?
                      GESTION_USUARIOS.edicion
                      : GESTION_USUARIOS.creacion
                  }
                </h2>
                <h3 className=' text-gray-500 mt-5'>
                  {GESTION_USUARIOS.completar}
                </h3>
              </div>
              <div className="my-2">
                <Button type="submit" variant="contained" style={{ marginRight: 10 }}>
                  Guardar
                </Button>
                <Button onClick={cancelar} style={{ color: '#1e3a8a', fontWeight: 600 }} variant="outlined">Cancelar</Button>
              </div>
            </div>

            <Divider />

            <div className="mt-10 ml-5">

              <h3 className='font-extrabold text-md text-blue-900 mb-2'>
                {GESTION_USUARIOS.general}
              </h3>
              <div className="flex flex-wrap">
                <InputText
                  dimension='mb-5 sm:mb-10 w-full sm:w-1/2 '
                  register={register}
                  nombre='nombre'
                  requerido={true}
                  mensajeRequerido='Campo requerido'
                  errors={errors}
                  etiqueta='Nombres'
                  estilosInput='w-full'
                  deshabilitado={false}
                />

                <InputText
                  dimension='mb-5 sm:mb-10 w-full sm:w-1/2 sm:pl-3'
                  register={register}
                  nombre='apellido'
                  requerido={true}
                  mensajeRequerido='Campo requerido'
                  errors={errors}
                  etiqueta='Apellidos'
                  estilosInput='w-full'
                  deshabilitado={false}
                />
              </div>

              <h3 className='font-extrabold text-md text-blue-900 mb-2'>
                {GESTION_USUARIOS.especificos}
              </h3>
              <div className="flex flex-wrap">
                <InputText
                  dimension='mb-5 sm:mb-10 w-full sm:w-1/3 sm:pr-4'
                  register={register}
                  nombre='usuario'
                  requerido={true}
                  mensajeRequerido='Campo requerido'
                  errors={errors}
                  etiqueta='Usuario'
                  estilosInput='w-full'
                  deshabilitado={false}
                />

                <InputText
                  dimension='mb-5 sm:mb-10 w-full sm:w-1/3 sm:pr-4'
                  register={register}
                  nombre='correo_electronico'
                  requerido={true}
                  mensajeRequerido='Campo requerido'
                  errors={errors}
                  etiqueta='Correo electrónico'
                  estilosInput='w-full'
                  deshabilitado={false}
                />

                <AutoCompleteInput
                  control={control}
                  errors={errors}
                  name='idPuesto'
                  etiqueta='Puesto'
                  estilosInput='w-full'
                  dimension='mb-5 sm:mb-10 w-full sm:w-1/3'
                  array={arrays.puesto}
                  valueOption='idPuesto'
                  nameOption='puesto'
                  requerido={true}
                  mensajeRequerido='Campo requerido'
                />
              </div>

              <div className="flex flex-wrap">
                <AutoCompleteInput
                  control={control}
                  errors={errors}
                  name='idFiscalia'
                  etiqueta='Fiscalía'
                  estilosInput='w-full'
                  dimension='mb-5 sm:mb-10 w-full sm:w-1/3 sm:pr-4'
                  array={arrays.fiscalia}
                  valueOption='idFiscalia'
                  nameOption='fiscalia'
                  requerido={true}
                  mensajeRequerido='Campo requerido'
                />


                <AutoCompleteInput
                  control={control}
                  errors={errors}
                  name='idRol'
                  etiqueta='Rol asignado'
                  estilosInput='w-full'
                  dimension='mb-5 sm:mb-14 w-full sm:w-1/3 sm:pr-4'
                  array={arrays.rol}
                  valueOption='idRol'
                  nameOption='rol'
                  requerido={true}
                  mensajeRequerido='Campo requerido'
                />
                {
                  flagCrear ?

                    <InputPassword
                      dimension='mb-5 sm:mb-14 w-full sm:w-1/3'
                      register={register}
                      nombre='contrasenia'
                      requerido={true}
                      mensajeRequerido='Campo requerido'
                      errors={errors}
                      etiqueta='Contraseña'
                      estilosInput='w-full'
                      deshabilitado={false}
                      showPassword={showPassword}
                      handleClickShowPassword={handleClickShowPassword}
                      handleMouseDownPassword={handleMouseDownPassword}
                    />

                    : null
                }

              </div>
              <div className="flex flex-wrap"></div>
            </div>
          </div>
        </form>

      </div>

      {/* </Paper> */}
    </ThemeProvider>
  )
}
