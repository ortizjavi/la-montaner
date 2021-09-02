import React from 'react';
import Paper from '@material-ui/core/Paper';
import "./game.css";

export const Score = ({value = 0 }) => {
    return (
        <div className="scores">
            <Paper elevation={3} className="paper">
            <h3>Vos</h3>
            <p>-----------</p>
            <h2>{value}</h2>
            </Paper>
        </div>
    )
}
