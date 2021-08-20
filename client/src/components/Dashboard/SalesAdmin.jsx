import 'date-fns';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import TextField from '@material-ui/core/TextField';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
    root: {
      width: 400,
    },
    margin: {
      height: theme.spacing(3),
    },
    rootInput: {
        '& > *': {
          margin: theme.spacing(1),
          width: '25ch',
        },
      },
    div: {
        width: '95%',
        margin: '30px 40px',
    }
  }));
  
  const marks = [
    {
      value: 0,
      label: '0%',
    },
    {
      value: 20,
      label: '20%',
    },
    {
      value: 50,
      label: '50%',
    },
    {
        value: 100,
        label: '100%',
      },
  ];
  
  function valuetext(value) {
    return `${value}%`;
  }
  

export default function SalesAdmin() {
    const classes = useStyles();

    const categories = useSelector(state => state.root.allCategories)
    const [selectedDate, setSelectedDate] = React.useState(new Date());
    const [stateCategories, setStateCategories] = React.useState([]);


    const handleDateChange = (date) => {
        setSelectedDate(date);
    };


  const handleChange = (event) => {
    console.log('CHANGE', event.target.checked)
    if (!stateCategories[event.target.name]){
        setStateCategories({
            ...stateCategories,
            [event.target.name] : true,
        })
    }else {
      setStateCategories({
          ...stateCategories,
          [event.target.name] : !stateCategories[event.target.name],
      })
    }
  };


  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <div className={classes.div}>
      <Grid justifyContent="space-evenly" container spacing={3}>
          <Grid item xs={12} justifyContent="center">
            <h2>Crea tu Descuento!</h2>
          </Grid>
          <Grid item xs={3}>
        <KeyboardDatePicker
          margin="normal"
          id="date-picker-dialog"
          label="Fecha de descuento"
          format="MM/dd/yyyy"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        </Grid>
        <Grid item xs={3}>
        <form className={classes.rootInput} noValidate autoComplete="off">
            <TextField id="outlined-basic" label="Precio Base"     variant="outlined" type="number" InputProps={{ inputProps: { min: 0, max: 99999 } }}/>
        </form>
        </Grid>
        <Grid item xs={6}>
        <div className={classes.root}>
        <Typography id="discrete-slider-custom" gutterBottom>
        Porcentaje de Descuento
        </Typography>
        <Slider
        defaultValue={20}
        getAriaValueText={valuetext}
        aria-labelledby="discrete-slider-custom"
        step={5}
        valueLabelDisplay="auto"
        marks={marks}
      />
      </div>
      </Grid>
      <FormControl component="fieldset">
      <FormLabel component="legend">Productos</FormLabel>
      <FormGroup>
          <Grid item xs={12}>
          {
              categories?.map(c => (
                  <FormControlLabel
                    control={<Switch checked={stateCategories[c.name]} onChange={handleChange} name={c.name} />}
                    label={c.name}
                  />
              ))
          }
          </Grid>
      </FormGroup>
    </FormControl>
      </Grid>
      </div>
    </MuiPickersUtilsProvider>
  );
}
