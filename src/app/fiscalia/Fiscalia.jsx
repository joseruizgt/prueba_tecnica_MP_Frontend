import { Box, Button, Fab, ThemeProvider, createTheme } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { GESTION_FISCALIAS } from "../../@utilities/constants";
import { InputSearch2, MenuItems, ModalComponent, TableComponent } from "../../@components";
import { encriptItem } from "../../@utilities/manager";
import { useFiscalia } from "./hooks/useFiscalia";
import { Detalles } from "./Detalles";


export const Fiscalia = () => {
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
  const { listFiscalia, totalFiscalia, listFiscaliaH } = useFiscalia();
  const navigate = useNavigate();
  //ESTADOS
  const [newRows, setNewRows] = useState();
  const [optionsMenu, setOptionsMenu] = useState({ idItem: null, option: null, open: false, ejecucion: false });
  const [open, setOpen] = useState(false);
  const [fiscalia, setFiscalia] = useState({});
  const [controlador, setControlador] = useState(false);
  let watchItems = watch();
  //PAGINACION
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  //COLUMNAS DE LA TABLA
  const columns = [
    { id: 'fiscalia', label: 'Fiscalia', minWidth: 170, align: 'center' },
    { id: 'descripcion', label: 'Descripción', minWidth: 100, align: 'center' },
    { id: 'fecha_creacion', label: 'Fecha de creación', minWidth: 170, align: 'center' },
    { id: 'accion', label: 'Acciones', minWidth: 170, align: 'right' },
  ];
  //OPCIONES DEL MENU DE ACCIONES PARA REGISTROS ACTIVOS
  const optionsMenuItems = [
    {
      icono: <EditIcon />,
      accion: GESTION_FISCALIAS.menuItem2
    }
  ];
  //ACCIONES DE LA TABLA PARA USUARIOS ACTIVOS Y DESHABILITADOS
  const acciones = (idFiscalia) => {
    return (
      <ThemeProvider theme={theme}>
        <div className='flex justify-end'>
          <Button onClick={() => modalVisualizar(idFiscalia)} variant="outlined">{GESTION_FISCALIAS.accion1}</Button>
          <MenuItems id={idFiscalia} selectOption={setOptionsMenu} options={optionsMenuItems} />
        </div>
      </ThemeProvider>
    )
  }
  //MODAL PARA VISUALIZAR INFO DE LA FISCALIA
  const modalVisualizar = (id) => {
    setFiscalia(listFiscalia.find(item => item.idFiscalia === id));
    setOpen(true);
  }

  const lista = (search) => {
    listFiscaliaH(search, rowsPerPage, page);
  }

  const formatearFecha = (fecha) => {
    const d = new Date(fecha);
    const dia = d.getDate().toString().padStart(2, '0');
    const mes = (d.getMonth() + 1).toString().padStart(2, '0');
    const anio = d.getFullYear();

    return `${dia}/${mes}/${anio}`;
  }

  //APERTURA DE MODAL QUE SE MANEJA SOBRE EL MENUITEMS
  useEffect(() => {
    if (!optionsMenu.ejecucion) {
      setFiscalia(optionsMenu.idItem ? listFiscalia.find(item => item.idAgencia === optionsMenu.idItem) : {});
      if (optionsMenu.option === GESTION_FISCALIAS.menuItem2) {
        navigate(`/administracion/fiscalia/editar/${encriptItem(optionsMenu.idItem)}`)
      }
    } else {
      setPage(1);
      setValue('busqueda', '');
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
    listFiscalia.forEach(item => {
      rows.push({
        idFiscalia: item.idFiscalia,
        fiscalia: item.fiscalia,
        descripcion: item.descripcion,
        fecha_creacion: formatearFecha(item.fecha_creacion),
        accion: acciones(item.idFiscalia)
      })
    });
    setNewRows(rows);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listFiscalia])

  return (
    <>
      <div>
        <h2 className='font-extrabold text-3xl text-blue-900'>
          {GESTION_FISCALIAS.title}
        </h2>
      </div>
      <ThemeProvider theme={theme}>
        <div className='my-8 w-full'>
          <div>
            <InputSearch2 register={register} name='busqueda' etiqueta='Buscar fiscalía' textoBusqueda='Por nombre de fiscalía' />
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
          count={totalFiscalia}
        />
      </div>

      <Box sx={{ '& > :not(style)': { m: 1 } }}>
        <Fab color="success" aria-label="add" sx={{ position: 'fixed', bottom: '20px', right: '20px' }} onClick={() => navigate('/administracion/fiscalia/crear')}>
          <AddIcon />
        </Fab>
      </Box>

      <ModalComponent open={open} setOpen={setOpen}>
        <Detalles setOpen={setOpen} fiscalia={fiscalia} />
      </ModalComponent>
    </>
  );
}