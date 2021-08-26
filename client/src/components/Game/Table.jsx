import React, { useState } from 'react';
import { Ficha } from './Fichas';
import { Rules } from './Rules';
import Button from "@material-ui/core/Button";
import { Score } from './Score';
import Grid from '@material-ui/core/Grid';
import { ScoreHouse } from './ScoreHouse';
import swal from "sweetalert";
import { useDispatch } from "react-redux";
import { winGame } from '../../redux/actions/types/adminActions';

const maquina = [
    'papel',
    'tijera',
    'piedra'
]

export const Table = () => {

    const dispatch = useDispatch();

    const [userActive, setUserActive] = useState(false);
    const [select, setSelect] = useState('');
    const [houseSelect, setHouseSelect] = useState('default');
    const [result,setResult] = useState('');
    const [score, setScore] = useState(0);
    const [scoreHouse, setScoreHouse] = useState(0);

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
        if(victory === 'Perdiste'){
            setScoreHouse(scoreHouse+1)
        }
        endGame();
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

    const endGame = () => {
        if(score === 3){
            dispatch(winGame());
            swal("Ganaste!", "Vas a tener disponible el descuento en tu carrito!", "success");
            setScore(0);
            setScoreHouse(0);
        }
        if(scoreHouse === 3){
            swal ( "Perdiste :(" ,  "Podes volver a intentarlo!" ,  "error" )
            setScore(0);
            setScoreHouse(0);
        }
    }


    const handleTryAgainClick = () => {
        setUserActive(false)
    }

    return (
        <div>
            <Grid container spacing={3} 
                justifyContent="center"
                alignItems="center">
            {
                !userActive ? 
                (
                    <div>
                    <Grid item xs={4} 
                        direction="row"
                        justifyContent="center"
                        alignItems="center">
                            <div>
                    <Ficha name='piedra' onClick={onClick}/>
                    </div>
                    <Ficha name='papel' onClick={onClick}/>
                    <Ficha name='tijera' onClick={onClick}/>
                    </Grid>
                   {/*  <Rules/> */}
                    </div>
                )
                :
                (
                    <Grid item xs={4} 
                        direction="row"
                        justifyContent="center"
                        alignItems="center">
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
                        </Grid>
                )
            }
            <Grid item xs={6} >
            <Score value={score}/>
            <ScoreHouse value={scoreHouse}/>
            </Grid>
            </Grid>
        </div>
    )
}
