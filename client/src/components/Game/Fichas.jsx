import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width:"20vw",
        height:"20vh",
      },
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
  }));


export const Ficha = ({name='default', onClick}) => {
    
    const classes = useStyles();

    const handleClick = () => {
      if(onClick){
        onClick(name)
      }
    }
    
    return (
        <div className={classes.root} onClick={handleClick}>
            <IconButton>
                {name}
            </IconButton>
        </div>
    )
}
