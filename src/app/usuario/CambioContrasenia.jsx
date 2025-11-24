/* eslint-disable react/prop-types */
import { Button, FilledInput, FormControl, IconButton, InputAdornment, InputLabel, Typography, createTheme } from "@mui/material"
import { useEffect, useState } from "react";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { ThemeProvider } from "@emotion/react";
import { useForm } from "react-hook-form";
import { error } from "../../@components";
import { getUser, saveUser } from "../../@utilities/manager";

export const CambioContrasenia = ({ usuario, setOpen, updateUserH, reset = false }) => {

    const theme = createTheme({
        palette: {
            primary: {
                light: '#1e3a8a',
                main: '#1e3a8a',
                dark: '#1e3a8a',
            },
        },
    });

    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const [warning, setWarning] = useState(null)
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    let watchItems = watch();

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const cambioContraseniaConfirmado = async (data) => {
        if (warning === '' && watchItems.confirmarContrasenia !== '') {
            if (reset) {
                data = { ...data, cambio_contrasenia: 1 }
                let usuarioInfo = getUser();
                usuarioInfo = {
                    ...usuarioInfo,
                    cambio_contrasenia: 1
                }
                saveUser(usuarioInfo);
            } else {
                data = { ...data, cambio_contrasenia: 0 }
            }
            await updateUserH(data, usuario.idUsuario);
            setOpen(false);
        } else {
            error('Las contraseñas no coinciden');
        }
    }

    useEffect(() => {
        if (watchItems.confirmarContrasenia !== '') {
            if (watchItems.confirmarContrasenia !== watchItems.contrasenia) {
                setWarning('Las contraseñas no coinciden')
            } else {
                setWarning('')
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [watchItems.confirmarContrasenia, watchItems.contrasenia])


    return (
        <>
            {
                Object.keys(usuario).length > 0 ?
                    <ThemeProvider theme={theme}>
                        <Typography id="modal-modal-title" variant="h6" component="h2" style={{ color: '#1e3a8a', fontWeight: 600 }}>
                            {`${usuario.nombre} ${usuario.apellido}`}
                        </Typography>
                        {
                            reset ?
                                <Typography id="modal-modal-title" component="h2" style={{ color: '#1e3a8a', fontWeight: 100 }}>
                                    Ingrese una nueva contraseña
                                </Typography>
                                : null
                        }
                        <form onSubmit={handleSubmit((data) => cambioContraseniaConfirmado(data))}>
                            <div className="mt-5 flex flex-wrap">

                                <div className="w-full">
                                    <FormControl fullWidth variant="filled">
                                        <InputLabel htmlFor="filled-adornment-password">Nueva contraseña</InputLabel>
                                        <FilledInput
                                            id="filled-adornment-password"
                                            type={showPassword ? 'text' : 'password'}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowPassword}
                                                        onMouseDown={handleMouseDownPassword}
                                                        edge="end"
                                                    >
                                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                            {
                                            ...register('contrasenia', {
                                                required: {
                                                    value: true,
                                                    message: 'ingrese la nueva contraseña'
                                                },
                                                pattern: {
                                                    value: reset ? /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{5,50}$/ : '',
                                                    message: 'La contraseña debe tener una mayúscula, una minúscula, un dígito y ser una cadena > 5'
                                                },
                                            })
                                            }
                                            error={errors['contrasenia'] ? true : false}
                                        />
                                    </FormControl>
                                    {errors['contrasenia'] && <span className='text-red-600 text-sm ml-3'>{errors['contrasenia'].message}</span>}
                                </div>

                                <div className="w-full">
                                    <FormControl fullWidth variant="filled" style={{ marginTop: 20 }}>
                                        <InputLabel htmlFor="filled-adornment-password">Confirmar contraseña</InputLabel>
                                        <FilledInput
                                            id="filled-adornment-password"
                                            type={showPassword ? 'text' : 'password'}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowPassword}
                                                        onMouseDown={handleMouseDownPassword}
                                                        edge="end"
                                                    >
                                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                            {
                                            ...register('confirmarContrasenia')
                                            }
                                        />
                                    </FormControl>
                                    {warning !== '' ? <span className='text-red-600 text-sm ml-3'>{warning}</span> : null}
                                </div>
                            </div>

                            <div className='mt-5 w-full flex justify-end'>
                                <Button type="submit" variant="contained" style={{ marginRight: 2 }}>
                                    Guardar
                                </Button>
                                {
                                    !usuario.acceso ?
                                        <Button onClick={() => setOpen(false)} style={{ color: '#1e3a8a', fontWeight: 600 }} variant="text">Cerrar</Button>
                                        : null
                                }
                            </div>
                        </form>
                    </ThemeProvider>
                    : null
            }
        </>
    )
}
