/* eslint-disable react/prop-types */
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';

export const SkeletonComponent = ({columns}) => {

  // const columns = [
  //   { id: 'nombre', label: 'Nombres', minWidth: 170 },
  //   { id: 'apellido', label: 'Apellidos', minWidth: 100 },
  //   { id: 'usuario', label: 'Usuario', minWidth: 170, align: 'right' },
  //   { id: 'auxiliar', label: 'Auxiliar', minWidth: 170, align: 'right' },
  //   { id: 'agencia', label: 'Agencia', minWidth: 170, align: 'right' },
  //   { id: 'accion', label: 'Acciones', minWidth: 170, align: 'right' },
  // ];

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((item) => (
              <TableCell
                key={item.id}
                align={item.align}
                style={{ minWidth: item.minWidth, color: '#1e3a8a', fontWeight: 800 }}>
                {item.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {[...Array(5)].map((_, index) => (
            <TableRow key={index}>
              {columns.map((item) => (
                <TableCell key={item.id}>
                  <Skeleton variant="text" />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}