import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { useSelector, useDispatch } from "react-redux";
import Button from "@material-ui/core/Button";
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import AddressModal from './Address';
import LoginForm from '../ModalDialog/LoginForm';
import Pay from '../Pay/Pay';
import swal from "sweetalert";
import './Address.css';
import { createOrder } from '../../redux/actions/types/productActions';

function getModalStyle() {
  const top = 15;
  const left = 25;

  return {
    top: `${top}%`,
    left: `${left}%`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 700,
    left: 70,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  root: {
    width: "100%",
  },
  button: {
    marginRight: theme.spacing(1),
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  completed: {
    display: "inline-block",
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return [
    "Logueate o Registrate",
    "Añade una dirección de envio",
    "Metodo de pago",
  ];
}


export default function HorizontalNonLinearAlternativeLabelStepper() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState(new Set());
  const [skipped, setSkipped] = React.useState(new Set());
  const steps = getSteps();
  const [modalStyle] = React.useState(getModalStyle());
  const [open, setOpen] = React.useState(false);
  const usuario = useSelector((state) => state.session.user);
  const cart = useSelector((state) => state.cart);
  const { cartItems, address } = cart;

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const totalSteps = () => {
    return getSteps().length;
  };

  const skippedSteps = () => {
    return skipped.size;
  };

  const completedSteps = () => {
    return completed.size;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps() - skippedSteps();
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? steps.findIndex((step, i) => !completed.has(i))
        : activeStep + 1;

    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = new Set(completed);
    newCompleted.add(activeStep);
    setCompleted(newCompleted);

    if (completed.size !== totalSteps() - skippedSteps()) {
      handleNext();
    }
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted(new Set());
    setSkipped(new Set());
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  function isStepComplete(step) {
    return completed.has(step);
  }

  const [state, setState] = React.useState('local');
  const [statePay, setStatePay] = React.useState('efectivo');

  const handleChange = (e) => {
    setState(e.target.value);
    console.log(state);
  };

  const handleChangePay = (e) => {
    setStatePay(e.target.value)
    console.log(state)
  };

  const handlePay = (e) => {
    e.preventDefault();
    console.log(cart);
    console.log(usuario._id)

    if(statePay === 'efectivo'){
      swal({
        title: "Gracias por tu compra!",
        icon: "success",
      })
      dispatch(createOrder(cartItems, usuario._id, address));
      setOpen(false);
    }
    else{
      dispatch(createOrder(cartItems, usuario._id, address, true));
    }
  };

  return (
    <div className={classes.root}>
      <button type="button" onClick={handleOpen}>
        Comprar!
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
      <Stepper alternativeLabel nonLinear activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const buttonProps = {};
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepButton
                onClick={handleStep(index)}
                completed={isStepComplete(index)}
                {...buttonProps}
              >
                {label}
              </StepButton>
            </Step>
          );
        })}
      </Stepper>
      { activeStep === 0 ?
        !usuario.role?(<LoginForm/>)
        :handleComplete(0)
        : activeStep === 1 ? (
           <div>
          <FormControl variant="outlined" className={classes.root}>
          <InputLabel htmlFor="outlined-age-native-simple"
          >Metodo de Envio</InputLabel>
          <Select
            native
            value={state}
            onChange={(e) => handleChange(e)}
            label="Envio"
          >
            <option value={'local'}>Retiro en el local</option>
            <option value={'domicilio'}>Envio a domicilio</option>
          </Select>
        </FormControl>
          {state === 'domicilio' ?
             <AddressModal/> 
             :
             <h4>Direccion del local</h4>
          }
             </div>
         )
         : 
         <div>
         <FormControl variant="outlined" className={classes.root}>
         <InputLabel htmlFor="outlined-age-native-simple">Metodo de Pago</InputLabel>
         <Select
           native
           value={statePay}
           onChange={(e) => handleChangePay(e)}
           label="Pago"
         >
           <option value={'efectivo'}>Efectivo</option>
           <option value={'mp'}>Otros medios</option>
         </Select>
       </FormControl>
       </div>
      }
      <div>
        {allStepsCompleted() ? (
          <div>
            <Button onClick={handleReset}>Reset</Button>
          </div>
        ) : (
          <div>
            <div className= "buttonsContainer"> 
              <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                Back
              </Button>
              {activeStep !== steps.length &&
                (completed.has(activeStep) ? (
                  <Typography variant="caption" className={classes.completed}>
                    Step {activeStep + 1} already completed
                  </Typography>
                ) : (
                  <div>
                    {completedSteps() === totalSteps() - 1 
                    ? 
                    <Button
                    className={classes.button}
                    onClick={handlePay}
                    variant="contained"
                    color="primary"
                    >
                      Ir a pagar
                    </Button>
                    : 
                    activeStep === 1 && (state === 'local' || address?.length > 0)
                    &&
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleComplete}
                        className={classes.button}
                      >
                      Siguiente
                      </Button>
                    
               }
              </div>
                ))}
            </div>
            </div>
          )}
          </div>
          </div>
      </Modal>
    </div>
  );
}
