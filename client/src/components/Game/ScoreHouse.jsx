import React from 'react';
import Paper from '@material-ui/core/Paper';
import "./game.css";

export const ScoreHouse = ({value = 0 }) => {
    return (
        <div className="scores">
            <Paper elevation={3} className="paper">
            <h4>La Montañes</h4>
            <p>-------</p>
            <h3>{value}</h3>
            </Paper>
        </div>
    )
}