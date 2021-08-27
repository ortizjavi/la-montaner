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
        width: "90vw",
        height: '11vh',
        border: "1px solid",
        //padding: "2em",
        borderRadius: "5px",
        fontFamily: 'Poppins',
        textAlign:"center",
        alignItems: "center",
        marginTop: theme.spacing(4),
      },
    },
  }));


export default function Header () {

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                        <h1>Piedra, Papel o Tijera</h1>
                </Grid>
                <Grid item xs={12}>
                    <Table/>
                </Grid>
            </Grid>
        </div>
    )
}
