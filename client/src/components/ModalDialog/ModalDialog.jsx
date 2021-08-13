import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import LoginForm from './LoginForm'

 export const ModalDialog = ({ open, handleClose }) => {

    return (
        <Dialog open={open} handleClose={handleClose}>
            <LoginForm handleClose={handleClose} />
        </Dialog>
    )
}

