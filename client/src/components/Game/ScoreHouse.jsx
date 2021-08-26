import React from 'react'

export const ScoreHouse = ({value = 0 }) => {
    return (
        <div>
            <h3>Score Montañes</h3>
            <p>{value}</p>
        </div>
    )
}