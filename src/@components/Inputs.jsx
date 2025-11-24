/* eslint-disable react/prop-types */
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Autocomplete, Button, FilledInput, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, MenuItem, Select, TextField } from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';
import { Controller } from "react-hook-form";

export const InputText = (props) => {
    const { dimension, register, nombre, valorRegex = '', mensajeRegex = '', requerido, mensajeRequerido, errors, etiqueta, estilosInput, deshabilitado, propsInput = false } = props;
    return (
        <div className={dimension}>
            <TextField
                {
                ...register(nombre, {
                    pattern: {
                        value: valorRegex,
                        message: mensajeRegex
                    },
                    required: {
                        value: requerido,
                        message: mensajeRequerido
                    }
                })
                }
                error={errors[nombre] ? true : false}
                helperText={errors[nombre] ? errors[nombre].message : ''}
                label={etiqueta}
                variant="filled"
                className={estilosInput}
                disabled={deshabilitado}
                InputLabelProps={{ shrink: true }}
                InputProps={{
                    startAdornment: propsInput ? <InputAdornment position="start">Q.</InputAdornment> : ''
                }}
            />
        </div>
    )
};

export const TextArea = (props) => {
    const { dimension, register, nombre, valorRegex = '', mensajeRegex = '', requerido, mensajeRequerido, errors, etiqueta, estilosInput, deshabilitado, text, maxLength } = props;

    return (
        <div className={dimension}>
            <FormControl fullWidth>
                <TextField
                    {
                    ...register(nombre, {
                        pattern: {
                            value: valorRegex,
                            message: mensajeRegex
                        },
                        required: {
                            value: requerido,
                            message: mensajeRequerido
                        }
                    })
                    }
                    id="filled-multiline-static"
                    label={etiqueta}
                    multiline
                    rows={4}
                    variant="filled"
                    error={errors[nombre] ? true : false}
                    className={estilosInput}
                    disabled={deshabilitado}
                    InputLabelProps={{ shrink: true }}
                    inputProps={{ maxLength: maxLength }}
                />
                <FormHelperText
                    style={{ position: 'absolute', right: 0, bottom: -20 }}
                >
                    {`${text.length}/${maxLength}`}
                </FormHelperText>
            </FormControl>
        </div>
    )
}

export const InputPassword = (props) => {
    const { dimension, estilosInput, errors, nombre, etiqueta, showPassword, handleClickShowPassword, handleMouseDownPassword, register, requerido, mensajeRequerido } = props;
    return (
        <div className={dimension}>
            <FormControl variant="filled" className={estilosInput} error={errors[nombre] ? true : false}>
                <InputLabel htmlFor="filled-adornment-password">{etiqueta}</InputLabel>
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
                    ...register(nombre, {
                        required: {
                            value: requerido,
                            message: mensajeRequerido
                        }
                    })
                    }

                />
            </FormControl>
            {errors[nombre] && <span className='text-red-600 text-sm ml-3'>{errors[nombre].message}</span>}
        </div>
    )
}

export const InputSearch = (props) => {
    const { register, name, etiqueta, textoBusqueda, funcion } = props;
    return (
        <div className="flex">
            <TextField {...register(name)} id="filled-basic" label={etiqueta} variant="filled" helperText={textoBusqueda} fullWidth />
            <div className="pl-2 mt-2">
                <Button onClick={funcion} sx={{ borderRadius: 2, height: 45 }} variant="contained" startIcon={<SearchIcon />}>
                    Buscar
                </Button>
            </div>
        </div>

    )
}

export const InputSearch2 = (props) => {
    const { register, name, etiqueta, textoBusqueda } = props;
    return (
        <div className="flex">
            <TextField {...register(name)} id="filled-basic" label={etiqueta} variant="filled" helperText={textoBusqueda} fullWidth />
        </div>

    )
}

export const SelectOptions = (props) => {

    const { register, name, setValue, etiqueta, array, valueOption, nameOption, ctl, setCtl, requerido = true, mensajeRequerido = '', dimension = '', disabledInput = false } = props;

    const handleChange = (event) => {
        setCtl(event.target.value);
        setValue(name, event.target.value);
    };

    return (
        <div className={dimension}>
            <FormControl variant="filled" fullWidth>
                <InputLabel id="demo-simple-select-filled-label">{etiqueta}</InputLabel>
                <Select
                    {...register(name, {
                        required: {
                            value: requerido,
                            message: mensajeRequerido
                        }
                    })}
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    value={ctl}
                    onChange={handleChange}
                    disabled={disabledInput}
                >
                    <MenuItem value="">
                        <em>--Ninguna opción --</em>
                    </MenuItem>

                    {array?.map((item) => (
                        <MenuItem key={item[valueOption]} value={item[valueOption]}>{item[nameOption]}</MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    )
}

export const SelectOptionsSearch = (props) => {

    const { register, name, etiqueta, array, valueOption, nameOption, ctl, setCtl, requerido = true, mensajeRequerido = '', dimension = '', disabledInput = false } = props;

    const handleChange = (event) => {
        setCtl(event.target.value);
    };

    return (
        <div className={dimension}>
            <FormControl variant="filled" fullWidth>
                <InputLabel id="demo-simple-select-filled-label">{etiqueta}</InputLabel>
                <Select
                    {...register(name, {
                        required: {
                            value: requerido,
                            message: mensajeRequerido
                        }
                    })}
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    value={ctl}
                    onChange={handleChange}
                    disabled={disabledInput}
                >
                    <MenuItem value="">
                        <em>--Ninguna opción --</em>
                    </MenuItem>

                    {array?.map((item) => (
                        <MenuItem key={item[valueOption]} value={item[valueOption]}>{item[nameOption]}</MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    )
}

export const SelectOptions2 = (props) => {

    const { register, name, setValue, etiqueta, array, valueOption, nameOption, ctl, setCtl, requerido = true, mensajeRequerido = '', dimension = '', errors } = props;

    const handleChange = (event) => {
        setCtl(event.target.value);
        setValue(name, event.target.value);
    };

    return (
        <div className={dimension}>
            <FormControl variant="filled" fullWidth error={errors[name] && ctl === '' ? true : false}>
                <InputLabel id="demo-simple-select-filled-label">{etiqueta}</InputLabel>
                <Select
                    {...register(name, {
                        required: {
                            value: requerido,
                            message: mensajeRequerido
                        }
                    })}
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    value={ctl}
                    onChange={handleChange}
                >
                    <MenuItem value="">
                        <em>--Ninguna opción --</em>
                    </MenuItem>

                    {array?.map((item) => (
                        <MenuItem key={item[valueOption]} value={item[valueOption]}>{item[nameOption]}</MenuItem>
                    ))}
                </Select>
                <FormHelperText>{errors[name] && ctl === '' ? errors[name].message : ''}</FormHelperText>
            </FormControl>
        </div>
    )
}

export const AutoCompleteInput = (props) => {

    const { control, estilosInput, name, etiqueta, array, valueOption, nameOption, requerido = true, mensajeRequerido = '', dimension = '', errors } = props;

    return (
        <div className={dimension}>
            <Controller
                name={name}
                control={control}
                rules={requerido ? { required: mensajeRequerido } : {}}
                render={({ field }) => (
                    < Autocomplete
                        options={array}
                        getOptionLabel={(option) => option[nameOption]}
                        onChange={(_, newValue) => {
                            field.onChange(newValue ? newValue[valueOption] : null);
                        }}
                        value={array?.find((opt) => opt[valueOption] === field.value) || null}
                        renderInput={(params) =>
                            <TextField
                                {...params}
                                label={etiqueta}
                                variant="filled"
                                error={errors[name] ? true : false}
                                helperText={errors[name] ? errors[name].message : ''}
                                className={estilosInput}
                            />}
                    />
                )}
            />
        </div>

    )
}

export const InputDate = (props) => {
    const { dimension, register, nombre, valorRegex = '', mensajeRegex = '', requerido, mensajeRequerido, errors, etiqueta, estilosInput, deshabilitado, propsInput = false } = props;
    return (
        <div className={dimension}>
            <TextField
                {
                ...register(nombre, {
                    pattern: {
                        value: valorRegex,
                        message: mensajeRegex
                    },
                    required: {
                        value: requerido,
                        message: mensajeRequerido
                    }
                })
                }
                error={errors[nombre] ? true : false}
                helperText={errors[nombre] ? errors[nombre].message : ''}
                label={etiqueta}
                variant="filled"
                className={estilosInput}
                disabled={deshabilitado}
                InputLabelProps={{ shrink: true }}
                InputProps={{
                    startAdornment: propsInput ? <InputAdornment position="start">Q.</InputAdornment> : ''
                }}
                type='date'
            />
        </div>
    )
};