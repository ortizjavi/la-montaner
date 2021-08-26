import React from 'react';
import { Button, Modal } from '@material-ui/core'

function getModalStyle() {
    const top = 15;
    const left = 25;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
    };
  }


export const Rules = () => {
    const [modalStyle] = React.useState(getModalStyle());
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
            >Reglas</Button> 
            {/* <Modal
                 open={open}
                 onClose={handleClose}
                 aria-labelledby="simple-modal-title"
                 aria-describedby="simple-modal-description"
            >
                Reglas
            </Modal> */}
        </div>
    )
}
