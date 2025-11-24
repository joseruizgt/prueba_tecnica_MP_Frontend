import EditIcon from '@mui/icons-material/Edit';
import { Button, createTheme } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useRol } from '../rol/hooks/useRol';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { GESTION_PERMISOS } from '../../@utilities/constants';
import { ThemeProvider } from '@emotion/react';
import { InputSearch2, MenuItems, ModalComponent, TableComponent } from '../../@components';
import { encriptItem } from '../../@utilities/manager';
import { Detalles } from './Detalles';
import { useDispatch } from 'react-redux';
import { clearRolIndividualPermissions } from '../rol/store';

export const Permiso = () => {
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
  //HOOKS
  const { register, watch, setValue } = useForm();
  const { listRolsPermissionsH, listRolPermissions, totalRolPermissions } = useRol();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //ESTADOS
  const [newRows, setNewRows] = useState();
  const [optionsMenu, setOptionsMenu] = useState({ idItem: null, option: null, open: false, ejecucion: false });
  const [open, setOpen] = useState(false);
  const [rol, setRol] = useState({});
  const [controlador, setControlador] = useState(false);
  let watchItems = watch();
  //PAGINACION
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  //COLUMNAS DE LA TABLA
  const columns = [
    { id: 'rol', label: 'Rol', minWidth: 170, align: 'center' },
    { id: 'descripcion', label: 'Descripción', minWidth: 100, align: 'center' },
    { id: 'fecha_creacion', label: 'Fecha de creación', minWidth: 170, align: 'center' },
    { id: 'accion', label: 'Acciones', minWidth: 170, align: 'right' },
  ];
  //OPCIONES DEL MENU DE ACCIONES PARA REGISTROS ACTIVOS
  const optionsMenuItems = [
    {
      icono: <EditIcon />,
      accion: GESTION_PERMISOS.menuItem2
    }
  ];
  //ACCIONES DE LA TABLA PARA USUARIOS ACTIVOS Y DESHABILITADOS
  const acciones = (idRol) => {
    return (
      <ThemeProvider theme={theme}>
        <div className='flex justify-end'>
          <Button onClick={() => modalVisualizar(idRol)} variant="outlined">{GESTION_PERMISOS.accion1}</Button>
          <MenuItems id={idRol} selectOption={setOptionsMenu} options={optionsMenuItems} />
        </div>
      </ThemeProvider>
    )
  }
  //MODAL PARA VISUALIZAR INFO DEL ROL
  const modalVisualizar = (id) => {
    setRol(listRolPermissions.find(item => item.idRol === id));
    setOpen(true);
  }
  //FUNCION PARA CONSUMIR EL SERVICIO
  const lista = (search) => {
    listRolsPermissionsH(search, rowsPerPage, page);
  }

  const formatearFecha = (fecha) => {
    const d = new Date(fecha);
    const dia = d.getDate().toString().padStart(2, '0');
    const mes = (d.getMonth() + 1).toString().padStart(2, '0');
    const anio = d.getFullYear();

    return `${dia}/${mes}/${anio}`;
  }

  useEffect(() => {
    dispatch(clearRolIndividualPermissions())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  //APERTURA DE MODAL QUE SE MANEJA SOBRE EL MENUITEMS
  useEffect(() => {
    if (!optionsMenu.ejecucion) {
      setRol(optionsMenu.idItem ? listRolPermissions.find(item => item.idRol === optionsMenu.idItem) : {});
      if (optionsMenu.option === GESTION_PERMISOS.menuItem2) {
        navigate(`/administracion/permiso/editar/${encriptItem(optionsMenu.idItem)}`)
      }
    } else {
      setPage(1);
      setValue('busqueda', '');
      // lista(buscador);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [optionsMenu]);

  //FILTROS Y CAMBIOS DE LOS DATOS DE LA TABLA
  useEffect(() => {
      lista(watchItems.busqueda);
      setPage(1);
      setControlador(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchItems.busqueda]);

  useEffect(() => {
      if (controlador) {
        lista(watchItems.busqueda);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, rowsPerPage]);

  useEffect(() => {
    let rows = [];
    listRolPermissions.forEach(item => {
      rows.push({
        idRol: item.idRol,
        rol: item.rol,
        descripcion: item.descripcion,
        fecha_creacion: formatearFecha(item.fecha_creacion),
        accion: acciones(item.idRol)
      })
    });
    setNewRows(rows);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listRolPermissions])

  return (
    <>
      <div>
        <h2 className='font-extrabold text-3xl text-blue-900'>
          {GESTION_PERMISOS.title}
        </h2>
      </div>
      <ThemeProvider theme={theme}>
        <div className='my-8 w-full'>
          <div>
            <InputSearch2 register={register} name='busqueda' etiqueta='Buscar rol' textoBusqueda='Por nombre del rol' />
          </div>
        </div>
      </ThemeProvider>

      <div className='mb-8'>
        <TableComponent
          list={newRows}
          columns={columns}
          page={page}
          setPage={setPage}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
          count={totalRolPermissions}
        />
      </div>

      <ModalComponent open={open} setOpen={setOpen}>
        <Detalles setOpen={setOpen} rol={rol} />
      </ModalComponent>
    </>
  );
}