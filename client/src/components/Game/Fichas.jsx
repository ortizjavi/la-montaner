import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import { FaHandRock, FaHandScissors, FaHandPaper } from "react-icons/fa";
import "./game.css";
const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "20vw",
      height: "20vh",
    },
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

export const Ficha = ({ name = "default", onClick }) => {
  const handleClick = () => {
    if (onClick) {
      onClick(name);
    }
  };

  return (
    <>
      {onClick ? (
        <div className="gameIcon" onClick={handleClick}>
          <IconButton>
            {name === "tijera" ? (
              <img
                src="https://cdn.discordapp.com/attachments/871916095873896448/880528030613774336/tijera.png"
                className="gameIconsvg"
                alt="tijeras"
              />
            ) : name === "papel" ? (
              <img
                src="https://cdn.discordapp.com/attachments/871916095873896448/880528021130461224/papel.png"
                className="gameIconsvg"
                alt="tijeras"
              />
            ) : (
              <img
                src="https://cdn.discordapp.com/attachments/871916095873896448/880528025781956678/piedra.png"
                className="gameIconsvg"
                alt="tijeras"
              />
            )}
          </IconButton>
        </div>
      ) : (
        <div className="resultIcon" onClick={handleClick}>
          <IconButton>
            {name === "tijera" ? (
              <img
                src="https://cdn.discordapp.com/attachments/871916095873896448/880528030613774336/tijera.png"
                className="resultIconsvg"
                alt="tijeras"
              />
            ) : name === "papel" ? (
              <img
                src="https://cdn.discordapp.com/attachments/871916095873896448/880528021130461224/papel.png"
                className="resultIconsvg"
                alt="tijeras"
              />
            ) : (
              <img
                src="https://cdn.discordapp.com/attachments/871916095873896448/880528025781956678/piedra.png"
                className="resultIconsvg"
                alt="tijeras"
              />
            )}
          </IconButton>
        </div>
      )}
    </>
  );
};
