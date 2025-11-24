import { Button, ThemeProvider, createTheme } from "@mui/material"
import { indigo } from "@mui/material/colors";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { InputPassword, InputText } from "../../@components";
import { login } from "./store";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { listFiscaliaData } from "../fiscalia/store";
import { listJobs } from "../puesto/store";
import { listRols } from "../rol/store";
import { resetPosition } from "../../store/slice";
import { listPermisos } from "../permisos/store/thunks";

export const LoginPage = () => {

    const theme = createTheme({
        palette: {
            primary: {
                light: indigo[200],
                main: indigo[900],
                dark: indigo[800],
            },
        },
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [token, setToken] = useState(null);

    const { register, handleSubmit, formState: { errors } } = useForm();

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const inicioSesion = (data) => {
        dispatch(login(data, setToken));
        dispatch(listFiscaliaData(undefined, undefined, 0, undefined, true));
        dispatch(listJobs(undefined, undefined, 0, undefined, true));
        dispatch(listRols(undefined, undefined, 0, undefined, true));
        dispatch(listPermisos());
        dispatch(resetPosition());
    }

    useEffect(() => {
        if (token) {
            navigate('/');
        }
        // eslint-disable-next-line
    }, [token]);

    return (
        <ThemeProvider theme={theme}>
            <div className="bg-white animate__animated animate__fadeIn">
                {/* {loading && <Loader />} */}
                <div className="flex justify-center h-screen">
                    <div className={`hidden bg-cover lg:block lg:w-2/3 bg-[url('../assets/images/principal.jpg')]`}>
                        <div className="flex items-end h-full px-20 bg-blue-900 bg-opacity-70">
                            <div className="mb-10">
                                <h2 className="text-4xl font-bold text-white">MINISTERIO PÚBLICO</h2>
                                <p className="max-w-xl mt-3 text-white">DIRECCIÓN DE INVESTIGACIÓN CRIMINALISTA</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center w-full max-w-md px-6 mx-4 lg:mx-auto lg:w-2/6 rounded-none shadow-none my-0">
                        <div className="flex-1">
                            <div className="text-center">
                                <h2 className="text-2xl font-bold text-indigo-900 flex justify-center items-center">Ingrese sus datos</h2>
                            </div>

                            <div className="mt-8">
                                <form onSubmit={handleSubmit((data) => inicioSesion(data))}>

                                    <InputText
                                        dimension='mb-10'
                                        register={register}
                                        nombre='fiscalia'
                                        requerido={false}
                                        mensajeRequerido='Campo requerido'
                                        errors={errors}
                                        etiqueta='Fiscalía'
                                        estilosInput='w-full'
                                        deshabilitado={false}
                                    />

                                    <InputText
                                        dimension='mb-10'
                                        register={register}
                                        nombre='usuario'
                                        requerido={true}
                                        mensajeRequerido='Campo requerido'
                                        errors={errors}
                                        etiqueta='Usuario'
                                        estilosInput='w-full'
                                        deshabilitado={false}
                                    />

                                    <InputPassword
                                        dimension='mb-10'
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


                                    <div className="mt-6 flex justify-center">
                                        <Button
                                            // sx={{ bgcolor: 'primary.darker' }} 
                                            variant="contained"
                                            className="w-full"
                                            style={{ borderRadius: 30 }}
                                            type="submit"
                                        >Ingresar</Button>
                                    </div>
                                </form>
                                <p className="mt-6 text-sm text-center text-gray-400">MINISTERIO PÚBLICO DE GUATEMALA</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ThemeProvider>
    )
}
