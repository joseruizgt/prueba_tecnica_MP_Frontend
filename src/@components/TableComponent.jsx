/* eslint-disable react/prop-types */
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material";
import { SkeletonComponent } from "./SkeletonComponent";

export const TableComponent = ({ list, columns, page, setPage, rowsPerPage, setRowsPerPage, count }) => {

    const handleChangePage = (event, newPage) => {
        // console.log(newPage + 1, 'newPage');
        setPage(newPage + 1);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(1);
    };

    return (
        <>
            {
                list ?
                    list.length > 0 ?
                        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                            <TableContainer sx={{ maxHeight: 440 }}>
                                <Table stickyHeader aria-label="sticky table">
                                    <TableHead>
                                        <TableRow>
                                            {columns.map((column) => (
                                                <TableCell
                                                    key={column.id}
                                                    align={column.align}
                                                    style={{ minWidth: column.minWidth, color: '#1e3a8a', fontWeight: 800 }}
                                                >
                                                    {column.label}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {list
                                            // .slice((page - 1) * rowsPerPage, (page - 1) * rowsPerPage + rowsPerPage)
                                            .map((row) => {
                                                return (
                                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.idUsuario}>
                                                        {columns.map((column) => {
                                                            const value = row[column.id];
                                                            return (
                                                                <TableCell key={column.id} align={column.align}>
                                                                    {column.format && typeof value === 'number'
                                                                        ? column.format(value)
                                                                        : value}
                                                                </TableCell>
                                                            );
                                                        })}
                                                    </TableRow>
                                                );
                                            })}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 20]}
                                component="div"
                                count={count}
                                rowsPerPage={rowsPerPage}
                                page={page - 1}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                                labelRowsPerPage="Registros por página"
                                labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
                            />
                        </Paper> :
                        <div className="text-gray-400 font-bold w-full flex justify-center">
                            <h2>Sin registros</h2>
                        </div>
                    : <SkeletonComponent columns={columns} />
            }

        </>
    )
}
