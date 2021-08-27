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
import { 
  getUsers, 
  deleteUser, 
  newAdmin, 
  resetUser
} from "../../redux/actions/types/adminActions";
import "./UsersTable.css";
import { ROLE } from '../../utils/constants';
import swal from "sweetalert";
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';

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

function createData(_id, name, code, population, density, actions, reset) {
  return { _id, name, code, population, density, actions, reset };
}

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
  actionsColumn: {
    display: 'flex',
    justifyContent: 'center'
  },
  actionButtons: {
    width: '25%',
    minWidth: '25%',
    maxWidth: '25%',
    fontSize: '0.75rem'
  },
  resetedUser: {
    color: 'green'
  }
});

export default function UsersTable() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const users = useSelector((state) => state.admin.users);
  const filterUser = users?.filter(u => ROLE.USER === u.role );
  const rows = filterUser?.map((o) => {
    return createData(o._id, o.name, o.role, o.email, o.picture, "actions", o.reset);
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

  const handleDelete = (e, row) => {
    e.preventDefault();
    const res= (getUser(row))
    swal({
      title:`Estas seguro que quieres eliminar la cuenta de ${res.name}?`,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willAdmin) => {
      if (willAdmin){
        dispatch(deleteUser(res));
        swal(`${res.name} ya no es usuario de La Montañes!`, {
          icon: "success",
        });
      }
    })
  };
  const handleAdmin = (row) => {
    const user = getUser(row);
    swal({
      title:`Estas seguro que quieres hacer administrador a ${user.name}?`,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willAdmin) => {
      if (willAdmin){
        dispatch(newAdmin(user));
        swal(`${user.name} es un administrador!`, {
          icon: "success",
        });
      }
    })
  };
  const handleReset = (row) => {
    const user = getUser(row);
    swal({
      title:`Estas seguro que quieres forzar un reseteo de contraseña a ${user.name}?`,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willAdmin) => {
      if (willAdmin){
        dispatch(resetUser(getUser(row)))
        swal(`${user.name} deberá cambiar su contraseña la próxima vez!`, {
          icon: "success",
        });
      }
    })
  };

  function getUser(row){
    return users.find(user => user._id === row._id);
  }

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
              .map((row, index) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number" ? (
                            column.format(value)
                          ) : value && value.length > 40 ? (
                            <img src={value} alt="user" height="50px" />
                          ) : value === "actions" ? (
                            <div className={classes.actionsColumn} >
                              { row.reset ?
                              (
                                <div className={`${classes.actionButtons} botonUT`}>
                                    <DoneOutlineIcon className={classes.resetedUser}/>
                                </div>
                              ):
                              <Button
                                variant="contained"
                                color="primary"
                                className={`${classes.actionButtons} botonUT`}
                                onClick={() => handleReset(row)}
                              >
                                Resetear contraseña
                              </Button>
                              }
                              <Button
                                variant="contained"
                                color="secondary"
                                className={`${classes.actionButtons} botonUT`}
                                onClick={() => handleAdmin(row)}
                              >
                                Hacer Admin
                              </Button>
                              <Button
                                variant="contained"
                                className={`${classes.actionButtons} eliminar`}
                                onClick={(e) => handleDelete(e, row)}
                              >
                                Eliminar
                              </Button>
                            </div>
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
