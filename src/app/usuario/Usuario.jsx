import { InputSearch2, MenuItems, ModalComponent, SelectOptionsSearch, TableComponent, TabsComponent } from '../../@components';
import { Box, Button, Fab, createTheme } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import AddIcon from '@mui/icons-material/Add';
import { useEffect, useState } from 'react';
import { useUser } from './hooks/useUser';
import EditIcon from '@mui/icons-material/Edit';
import NoAccountsIcon from '@mui/icons-material/NoAccounts';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { GESTION_USUARIOS, TABS_POSITION } from '../../@utilities/constants';
import { useForm } from 'react-hook-form';
import { Detalles } from './Detalles';
import { CambioContrasenia } from './CambioContrasenia';
import { DeshabilitarHabilitar } from './DeshabilitarHabilitar';
import { Eliminar } from './Eliminar';
import { useNavigate } from 'react-router-dom';
import { encriptItem, getAgencyLocalS } from '../../@utilities/manager';
import { resetPosition } from '../../store/slice';

export const Usuario = () => {

  //TEMA - COLORES
  const theme = createTheme({
    palette: {
      primary: {
        light: '#1e3a8a',
        main: '#1e3a8a',
        dark: '#1e3a8a',
      },
    },
  });
  //SELECTORES
  const { position } = useSelector((state) => state.tab);
  //HOOKS
  const { register, watch, setValue } = useForm();
  const { list, states, total, listUsersH, updateUserH, deleteUserH, individualUsersH } = useUser();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //ESTADOS
  const [ctlFiscalia, setCtlFiscalia] = useState('');
  const [newRows, setNewRows] = useState();
  const [optionsMenu, setOptionsMenu] = useState({ idItem: null, option: null, open: false, ejecucion: false });
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [usuario, setUsuario] = useState({});
  const [controlador, setControlador] = useState(false);
  let watchItems = watch();

  //PAGINACION
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  //COLUMNAS DE LA TABLA
  const columns = [
    { id: 'nombre', label: 'Nombres', minWidth: 170 },
    { id: 'apellido', label: 'Apellidos', minWidth: 100 },
    { id: 'usuario', label: 'Usuario', minWidth: 170, align: 'right' },
    { id: 'fiscalia', label: 'Fiscalía', minWidth: 170, align: 'right' },
    { id: 'accion', label: 'Acciones', minWidth: 170, align: 'right' },
  ];

  //OPCIONES DEL MENU DE ACCIONES PARA REGISTROS ACTIVOS
  const optionsMenuItems = [
    {
      icono: <EditIcon />,
      accion: GESTION_USUARIOS.menuItem1
    },
    {
      icono: <NoAccountsIcon />,
      accion: GESTION_USUARIOS.menuItem2
    },
    {
      icono: <DeleteIcon />,
      accion: GESTION_USUARIOS.menuItem3
    }
  ];

  //OPCIONES DEL MENU DE ACCIONES PARA REGISTROS DESHABILITADOS
  const optionsMenuItemsDisabled = [
    {
      icono: <CheckCircleIcon />,
      accion: GESTION_USUARIOS.menuItem4
    },
    {
      icono: <DeleteIcon />,
      accion: GESTION_USUARIOS.menuItem3
    }
  ];

  //ACCIONES DE LA TABLA PARA USUARIOS ACTIVOS Y DESHABILITADOS
  const acciones = (idUsuario) => {
    return (
      <ThemeProvider theme={theme}>
        <div className='flex justify-end'>
          <Button onClick={() => modalVisualizar(idUsuario)} variant="outlined">{position !== TABS_POSITION.THIRD ? GESTION_USUARIOS.accion1 : GESTION_USUARIOS.accion2}</Button>
          {
            position !== TABS_POSITION.THIRD ?
              <MenuItems id={idUsuario} selectOption={setOptionsMenu} options={position === TABS_POSITION.FIRST ? optionsMenuItems : optionsMenuItemsDisabled} />
              : null
          }
        </div>
      </ThemeProvider>
    )
  }

  //TABS
  const titlesTabs = [
    {
      title: GESTION_USUARIOS.titleTab1,
      badge: states.active
    },
    {
      title: GESTION_USUARIOS.titleTab2,
      badge: states.disabled
    },
    {
      title: GESTION_USUARIOS.titleTab3
    },
  ]

  const componentsTabs = [
    {
      component: <TableComponent
        list={newRows}
        columns={columns}
        page={page}
        setPage={setPage}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
        count={total}
      />
    },
    {
      component: <TableComponent
        list={newRows}
        columns={columns}
        page={page}
        setPage={setPage}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
        count={total}
      />
    },
    {
      component: <TableComponent
        list={newRows}
        columns={columns}
        page={page}
        setPage={setPage}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
        count={total}
      />
    },
  ]

  //MODAL PARA VISUALIZAR INFO DEL USUARIO
  const modalVisualizar = (id) => {
    setUsuario(list.find(item => item.idUsuario === id));
    setOpen(true);
  }

  //FUNCION PARA CONSUMIR EL SERIVICIO LISTAR USUARIOS
  const lista = (search) => {
    if (position === TABS_POSITION.FIRST) {
      listUsersH(search, rowsPerPage, page, 1, ctlFiscalia);
    } else if (position === TABS_POSITION.SECOND) {
      listUsersH(search, rowsPerPage, page, 0, ctlFiscalia);
    } else {
      listUsersH(search, rowsPerPage, page, 1, ctlFiscalia);
    }
  }

  //APERTURA DE MODAL QUE SE MANEJA SOBRE EL MENUITEMS
  useEffect(() => {
    if (!optionsMenu.ejecucion) {
      setUsuario(optionsMenu.idItem ? list.find(item => item.idUsuario === optionsMenu.idItem) : {});
      if (optionsMenu.option !== GESTION_USUARIOS.menuItem1) {
        setOpen2(optionsMenu.open);
      } else {
        individualUsersH(optionsMenu.idItem ? list.find(item => item.idUsuario === optionsMenu.idItem) : {});
        navigate(`/administracion/usuario/editar/${encriptItem(optionsMenu.idItem)}`);
      }
    } else {
      setPage(1);
      setCtlFiscalia('');
      setValue('busqueda', '');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [optionsMenu]);

  //FILTROS PARA EL BUSCADOR
  useEffect(() => {
    lista(watchItems.busqueda);
    setPage(1);
    setControlador(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchItems.busqueda, ctlFiscalia]);

  useEffect(() => {
    if (controlador) {
      lista(watchItems.busqueda);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, rowsPerPage]);

  //REINICIO DEL BUSCADOR Y AGENCIA AL CAMBIAR DE POSICION LAS TABS
  useEffect(() => {
    if (controlador) {
      setValue('busqueda', '');
      setCtlFiscalia('');
      lista(watchItems.busqueda);
      setPage(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [position])

  //ARMA LAS FILAS DE LA TABLA
  useEffect(() => {
    let rows = [];
    list.forEach(item => {
      rows.push({
        idUsuario: item.idUsuario,
        nombre: item.nombre,
        apellido: item.apellido,
        usuario: item.usuario,
        auxiliar: item.auxiliar,
        fiscalia: item.fiscalia.fiscalia,
        accion: acciones(item.idUsuario)
      })
    });
    setNewRows(rows);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [list])

  //REINICIO DEL POSICIONAMIENTO DE LAS TABS
  useEffect(() => {
    dispatch(resetPosition());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <div>
        <h2 className='font-extrabold sm:text-3xl text-md  text-blue-900'>
          {GESTION_USUARIOS.title}
        </h2>
      </div>
      <ThemeProvider theme={theme}>
        <div className='my-8 w-full flex flex-wrap'>
          <div className='w-3/12 pr-3'>
            <SelectOptionsSearch
              register={register}
              name='idFiscalia'
              ctl={ctlFiscalia}
              setCtl={setCtlFiscalia}
              etiqueta='Fiscalía'
              array={getAgencyLocalS()}
              valueOption='idFiscalia'
              nameOption='fiscalia'
              requerido={false}
            />
          </div>

          <div className='w-9/12'>
            <InputSearch2 register={register} name='busqueda' etiqueta='Buscar usuario' textoBusqueda='Por nombre, apellido o usuario' />
          </div>
        </div>
      </ThemeProvider>

      <div className='mb-8'>
        <TabsComponent titlesTabs={titlesTabs} componentsTabs={componentsTabs} />
      </div>

      <Box sx={{ '& > :not(style)': { m: 1 } }}>
        <Fab color="success" aria-label="add" sx={{ position: 'fixed', bottom: '20px', right: '20px' }} onClick={() => navigate('/administracion/usuario/crear')}>
          <AddIcon />
        </Fab>
      </Box>

      <ModalComponent open={open} setOpen={setOpen}>
        {
          position === TABS_POSITION.THIRD ?
            <CambioContrasenia usuario={usuario} setOpen={setOpen} updateUserH={updateUserH} />
            : <Detalles usuario={usuario} setOpen={setOpen} />
        }
      </ModalComponent>

      <ModalComponent open={open2} setOpen={setOpen2}>
        {
          optionsMenu.option === GESTION_USUARIOS.menuItem2 ?
            <DeshabilitarHabilitar setOpen={setOpen2} usuario={usuario} setValue={setValue} setCtlFiscalia={setCtlFiscalia} /> :
            optionsMenu.option === GESTION_USUARIOS.menuItem3 ?
              <Eliminar optionsMenu={optionsMenu} setOptionsMenu={setOptionsMenu} setOpen={setOpen2} usuario={usuario} deleteUserH={deleteUserH} /> :
              optionsMenu.option === GESTION_USUARIOS.menuItem4 ?
                <DeshabilitarHabilitar setOpen={setOpen2} usuario={usuario} activar={true} setValue={setValue} setCtlFiscalia={setCtlFiscalia} />
                : null
        }
      </ModalComponent>
    </>
  );
}