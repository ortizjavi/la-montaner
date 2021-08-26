import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Table } from './Table';


const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      '& > *': {
        margin: theme.spacing(1),
        width: "100vw",
        height: '19vh',
        border: "1px solid",
        //padding: "2em",
        borderRadius: "5px",
      },
      paper: {
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      },
    },
  }));


export default function Header () {

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Paper elevation={3} className={classes.paper}>
                        <h1>Piedra, Papel o Tijera</h1>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Table/>
                </Grid>
            </Grid>
        </div>
    )
}
