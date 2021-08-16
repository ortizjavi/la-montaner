import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../redux/actions/types/productActions";
import "./UsersTable.css";
const columns = [
  {
    id: "density",
    label: "Imagen",
    minWidth: 60,
    align: "right",
  },
  { id: "name", label: "Nombre", minWidth: 170 },
  { id: "code", label: "Rol", minWidth: 100 },
  {
    id: "population",
    label: "E-mail",
    minWidth: 170,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "actions",
    label: "Acciones",
    minWidth: 170,
    align: "center",
  },
];

function createData(name, code, population, density, actions) {
  return { name, code, population, density, actions };
}

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
});

export default function UsersTable() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const users = useSelector((state) => state.cart.users);
  const rows = users?.map((o) => {
    return createData(o.name, o.role, o.email, o.picture, "actions");
  });
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const deleteUser = () => {
    console.log("eliminar");
  };
  const admin = () => {
    console.log("sos admin");
  };
  const resetPassword = () => {
    console.log("revisa tu correo");
  };

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number" ? (
                            column.format(value)
                          ) : value && value.length > 40 ? (
                            <img src={value} alt="user" height="50px" />
                          ) : value === "actions" ? (
                            <>
                              <Button
                                variant="contained"
                                color="primary"
                                className="botonUT"
                                onClick={resetPassword}
                              >
                                Resetaer contraseña
                              </Button>
                              <Button
                                variant="contained"
                                color="secondary"
                                className="botonUT"
                                onClick={admin}
                              >
                                Hacer Admin
                              </Button>
                              <Button
                                variant="contained"
                                className="eliminar"
                                onClick={deleteUser}
                              >
                                Eliminar
                              </Button>
                            </>
                          ) : (
                            value
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      {rows && (
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}
    </Paper>
  );
}
