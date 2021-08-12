import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import { Form } from './Form'

 export const ModalDialog = ({ open, handleClose }) => {

    return (
        <Dialog open={open} handleClose={handleClose}>
            <Form handleClose={handleClose} />
        </Dialog>
    )
}

