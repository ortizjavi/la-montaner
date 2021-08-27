import React from 'react';
import Paper from '@material-ui/core/Paper';

export const Score = ({value = 0 }) => {
    return (
        <div className="scores">
            <Paper elevation={3}>
            <h3>Tu Puntaje</h3>
            <b>{value}</b>
            </Paper>
        </div>
    )
}
