import React, { useState } from 'react';
import { Ficha } from './Fichas';
import { Rules } from './Rules';
import Button from "@material-ui/core/Button";
import { Score } from './Score';

const maquina = [
    'papel',
    'tijera',
    'piedra'
]

export const Table = () => {

    const [userActive, setUserActive] = useState(false);
    const [select, setSelect] = useState('');
    const [houseSelect, setHouseSelect] = useState('default');
    const [result,setResult] = useState('');
    const [score, setScore] = useState(0);

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
      }

    const house = () => {
        return new Promise ((res, rej)=> { 
            let seleccion; 
            const interval = setInterval(() => {
                 seleccion = maquina[getRandomInt(0,3)]
                setHouseSelect(seleccion)
            }, 100)
            setTimeout(()=> {
                clearInterval(interval)
                res(seleccion)
            }, 2000)
        })
    }
    
    
    const onClick = async (name) => {
        setUserActive(true)
        setSelect(name)
        const mon = await house()
        const victory = results(name, mon)
        setResult(victory);
        if(victory === 'Ganaste!'){
            setScore(score+1)
        }
    }

    const results = (select, house) => {
        if(select === house) {
            return 'Empate'
        }
        if(select === 'piedra'){
            if(house === 'papel'){
                return 'Perdiste'
            }
            if(house === 'tijera'){
                return 'Ganaste!'
            }
        }
        if(select === 'papel'){
            if(house === 'piedra'){
                return 'Ganaste!'
            }
            if(house === 'tijera'){
                return 'Perdiste'
            }
        }
        if(select === 'tijera'){
            if(house === 'piedra'){
                return 'Perdiste'
            }
            if(house === 'papel'){
                return 'Ganaste!'
            }
        }
      }


    const handleTryAgainClick = () => {
        setUserActive(false)
    }

    return (
        <div>
            {
                !userActive ? 
                (
                    <div>
                    <Ficha name='piedra' onClick={onClick}/>
                    <Ficha name='papel' onClick={onClick}/>
                    <Ficha name='tijera' onClick={onClick}/>
                    <Rules/>
                    </div>
                )
                :
                (
                    <>
                        <div>
                            <Ficha name={select}/>
                            <p>Tu Seleccion</p>
                        </div>
                        <div>
                            <Ficha name={houseSelect}/>
                            <p>Seleccion de la Montañes</p>
                        </div>
                        <div>
                            <h3>{result}</h3>
                            <Button onClick={handleTryAgainClick}>Try Again</Button>
                        </div>
                    </>
                )
            }
            <Score value={score}/>
        </div>
    )
}
