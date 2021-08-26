import React from 'react'

export const Score = ({value = 0 }) => {
    return (
        <div>
            <h3>Score</h3>
            <p>{value}</p>
        </div>
    )
}
