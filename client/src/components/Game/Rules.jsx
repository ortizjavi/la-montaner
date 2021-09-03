import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from "@material-ui/core/Modal";
import Button from '@material-ui/core/Button';
import imageRules from '../../img/imageRules.png';
import "./game.css";

function getModalStyle() {
  const top = 25;
  const left = 15;

  return {
    top: `${top}%`,
    left: `${left}%`,
  };
}

const useStyles = makeStyles((theme) => ({
  rules: {
    height: "20%",
  },
  paper: {
    position: "absolute",
    width: 10,
    left: 10,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));




export const Rules = () => {
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };

    return (
      <div>
            <Button
                onClick={handleOpen}
                variant="contained"
                color="#a52a2a"
            >Reglas
            </Button>
            <div className="modal">
            <Modal
                 open={open}
                 onClose={handleClose}
                 aria-labelledby="simple-modal-title"
                 aria-describedby="simple-modal-description">
                    <div style={modalStyle} className="imgModal">
                  <img src={imageRules} alt="reglas"/>
                 </div>
             </Modal>
             </div> 
        </div>
    )
}
