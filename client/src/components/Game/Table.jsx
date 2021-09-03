import React, { useEffect, useState } from "react";
import { Ficha } from "./Fichas";
import { Rules } from "./Rules";
import Button from "@material-ui/core/Button";
import { Score } from "./Score";
import Grid from "@material-ui/core/Grid";
import { ScoreHouse } from "./ScoreHouse";
import swal from "sweetalert";
import { useDispatch, useSelector } from "react-redux";
import { getSales, winGame } from "../../redux/actions/types/adminActions";
import "./game.css";
import PiedraPapelTijera from '../../img/PiedraPapelTijera.png';
import gameGif from '../../img/gameGif.gif';


const maquina = ["papel", "tijera", "piedra"];




export const Table = () => {
  const dispatch = useDispatch();

  const [userActive, setUserActive] = useState(false);
  const [select, setSelect] = useState("");
  const [houseSelect, setHouseSelect] = useState("default");
  const [result, setResult] = useState("");
  const [score, setScore] = useState(0);
  const [scoreHouse, setScoreHouse] = useState(0);


  
  useEffect(() => {
    dispatch(getSales())
  }, [dispatch])
  
  const sales = useSelector(state => state.cart.sales)

  const discount = () => {
    for(let i=0; i<sales?.length ; i++ ){
      if(sales[i].price=== 0){
        return sales[i].discount
      }
    }
  }

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  const house = () => {
    return new Promise((res, rej) => {
      let seleccion;
      const interval = setInterval(() => {
        seleccion = maquina[getRandomInt(0, 3)];
        setHouseSelect(seleccion);
      }, 100);
      setTimeout(() => {
        clearInterval(interval);
        res(seleccion);
      }, 2000);
    });
  };

  const onClick = async (name) => {
    setResult("");
    setUserActive(true);
    setSelect(name);
    const mon = await house();
    const victory = results(name, mon);
    endGame();
    setResult(victory);
    if (victory === "Ganaste!") {
      setScore(score + 1);
    }
    if (victory === "Perdiste") {
      setScoreHouse(scoreHouse + 1);
    }
  };

  const results = (select, house) => {
    if (select === house) {
      return "Empate";
    }
    if (select === "piedra") {
      if (house === "papel") {
        return "Perdiste";
      }
      if (house === "tijera") {
        return "Ganaste!";
      }
    }
    if (select === "papel") {
      if (house === "piedra") {
        return "Ganaste!";
      }
      if (house === "tijera") {
        return "Perdiste";
      }
    }
    if (select === "tijera") {
      if (house === "piedra") {
        return "Perdiste";
      }
      if (house === "papel") {
        return "Ganaste!";
      }
    }
  };
  const endGame = () => {
    const descuento = discount()
    console.log(descuento)
    if (score === 3) {
      dispatch(winGame());
      swal(
        "Ganaste!",
        `Vas a tener disponible un ${descuento}% de descuento en tu carrito!`,
        "success"
      );
      setScore(0);
      setScoreHouse(0);
    }
    if (scoreHouse === 3) {
      swal("Perdiste :(", "Puedes volver a intentarlo!", "error");
      setScore(0);
      setScoreHouse(0);
    }
  };

  const handleTryAgainClick = () => {
    endGame();
    setUserActive(false);
  };

  return (
    <div  >
      <Grid container spacing={4} justifyContent="center" alignItems="center" >
      <Grid item xs={12}>
          <div className="imgtitle scores">
          <Score value={score} />
            <img src={PiedraPapelTijera} alt=""/>
          <ScoreHouse value={scoreHouse} />
          </div>
      </Grid>
        <Grid item xs={12} className="scores" >
          <Rules />
        </Grid>
        {!userActive ? (
        <Grid item xs={12}>
          <div className="countFichas">
            <Ficha name="piedra" onClick={onClick} />
            <Ficha name="papel" onClick={onClick} />
            <Ficha name="tijera" onClick={onClick} />
          </div>
          </Grid>
        ) : (
          <div className="countFichas">
            <div>
              <Ficha name={select} />
              <p className="seleccionM">Tu Selección</p>
            </div>
            <div>
              { result === "Perdiste" 
              ?
              <h3
                className={
                  result === "Ganaste!"
                    ? "win"
                    : result === "Perdiste"
                    ? "lose"
                    : "same"
                }
              >
                {result} &#128531; 
              </h3>
              :
              result === "Ganaste!"
              ? 
              <h3
                className={
                  result === "Ganaste!"
                    ? "win"
                    : result === "Perdiste"
                    ? "lose"
                    : "same"
                }
              >
                {result} &#127881;
              </h3>
              :
              <h3
              className={
                result === "Ganaste!"
                  ? "win"
                  : result === "Perdiste"
                  ? "lose"
                  : "same"
              }
              >
              {result} 
            </h3>
              }
              {
                result !== "" ?
              <Button
                onClick={handleTryAgainClick}
                variant="contained"
                color="primary"
              >
                Try Again
              </Button>
              :null
            }
              </div>
            <div>
              <Ficha name={houseSelect} />
              <p className="seleccionM">Selección de la Montañes</p>
              </div>
            
           
          </div>
        )}
      </Grid>
    </div>
  );
};
