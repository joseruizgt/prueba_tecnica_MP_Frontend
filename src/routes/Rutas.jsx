import WidgetsIcon from '@mui/icons-material/Widgets';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import FeedIcon from '@mui/icons-material/Feed';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ReduceCapacityIcon from '@mui/icons-material/ReduceCapacity';
import RuleFolderIcon from '@mui/icons-material/RuleFolder';
// import TuneIcon from '@mui/icons-material/Tune';
import BusinessIcon from '@mui/icons-material/Business';
import WorkIcon from '@mui/icons-material/Work';
import DescriptionIcon from '@mui/icons-material/Description';
import { tagPermisosAdministracion, tagPermisosInicio, tagPermisosOrdenes, tagPermisosReportes } from '../@tags/tagPermisos';
import { getPermissionsUser } from '../@utilities/manager';

export const rutasDinamicas = () => {
    let permisos = getPermissionsUser();
    let Rutas = [];
    if (permisos !== null) {
        //INICIO
        let inicio = permisos.some(item => item === tagPermisosInicio.inicio);
        //ADMINISTRACION DEL SISTEMA
        let administracion = permisos.some(item => item === tagPermisosAdministracion.administracion);
        let gestion_usuarios = permisos.some(item => item === tagPermisosAdministracion.gestion_usuarios);
        let manejo_roles = permisos.some(item => item === tagPermisosAdministracion.manejo_roles);
        let permisosModulo = permisos.some(item => item === tagPermisosAdministracion.permisos);
        let control_fiscalias = permisos.some(item => item === tagPermisosAdministracion.control_fiscalias);
        let puestos = permisos.some(item => item === tagPermisosAdministracion.puestos);
        //ORDENES DE COMPRA
        let expedientes = permisos.some(item => item === tagPermisosOrdenes.Orden_compra);
        let registro_expedientes = permisos.some(item => item === tagPermisosOrdenes.vales);

        //REPORTES
        let reportes = permisos.some(item => item === tagPermisosReportes.reportes);

        if (inicio) {
            Rutas.push({
                nombre: 'Inicio',
                icono: <WidgetsIcon />,
                ruta: '/',
                llave: '/',
            })
        } if (administracion) {
            let administracionAux = {
                nombre: 'Administración',
                icono: <AdminPanelSettingsIcon />,
                ruta: '/administracion/usuario',
                llave: 'administracion',
                subrutas: []
            }
            if (puestos) {
                administracionAux.ruta = '/administracion/puesto'
                administracionAux.subrutas.unshift({
                    nombre: 'Puestos',
                    icono: <WorkIcon />,
                    ruta: '/administracion/puesto',
                    llave: 'puesto',
                    subrutas: []
                });
            } if (control_fiscalias) {
                administracionAux.ruta = '/administracion/fiscalia'
                administracionAux.subrutas.unshift({
                    nombre: 'Control de fiscalías',
                    icono: <BusinessIcon />,
                    ruta: '/administracion/fiscalia',
                    llave: 'fiscalia',
                    subrutas: []
                })

            } if (permisosModulo) {
                administracionAux.ruta = '/administracion/permiso'
                administracionAux.subrutas.unshift({
                    nombre: 'Permisos',
                    icono: <RuleFolderIcon />,
                    ruta: '/administracion/permiso',
                    llave: 'permiso',
                    subrutas: []
                },)
            } if (manejo_roles) {
                administracionAux.ruta = '/administracion/rol'
                administracionAux.subrutas.unshift({
                    nombre: 'Manejo de roles',
                    icono: <ReduceCapacityIcon />,
                    ruta: '/administracion/rol',
                    llave: 'rol',
                    subrutas: []
                })
            } if (gestion_usuarios) {
                administracionAux.ruta = '/administracion/usuario'
                administracionAux.subrutas.unshift({
                    nombre: 'Gestión de usuarios',
                    icono: <PeopleAltIcon />,
                    ruta: '/administracion/usuario',
                    llave: 'usuario',
                    subrutas: []
                })
            }
            Rutas.push({ ...administracionAux });
        } if (expedientes) {
            let ordenesAux = {
                nombre: 'Expedientes',
                icono: <FeedIcon />,
                ruta: '/expedientes/expediente',
                llave: 'expedientes',
                subrutas: []
            }
            if (registro_expedientes) {
                ordenesAux.ruta = '/expedientes/expediente'
                ordenesAux.subrutas.unshift({
                    nombre: 'Registro',
                    icono: <DescriptionIcon />,
                    ruta: '/expedientes/expediente',
                    llave: 'expediente',
                    subrutas: []
                });
            }
            Rutas.push({ ...ordenesAux });

        } if (reportes) {
            Rutas.push({
                nombre: 'Reportes',
                icono: <ContentPasteSearchIcon />,
                ruta: '/reporteria',
                llave: 'reporteria',
                subrutas: []
            })
        }
    }
    return Rutas;
}