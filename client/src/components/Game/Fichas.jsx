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
    <div className="gameIcon" onClick={handleClick}>
      <IconButton>
        {name === "tijera" ? (
          <FaHandScissors />
        ) : name === "papel" ? (
          <FaHandPaper />
        ) : (
          <FaHandRock />
        )}
      </IconButton>
    </div>
  );
};
