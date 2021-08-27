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
        height: '8vh',
        border: "1px solid",
        //padding: "2em",
        borderRadius: "5px",
        fontFamily: 'Poppins',
        textAlign:"center",
      },
    },
  }));


export default function Header () {

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                        <h3>Piedra, Papel o Tijera</h3>
                </Grid>
                <Grid item xs={12}>
                    <Table/>
                </Grid>
            </Grid>
        </div>
    )
}
