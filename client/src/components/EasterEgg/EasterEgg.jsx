import { useDispatch, useSelector } from "react-redux";
import React, { useState } from "react";
import { FaHandRock, FaHandScissors, FaHandPaper } from "react-icons/fa";
import "./EasterEgg.css";

export default function EasterEgg() {
  const dispatch = useDispatch();
  const usuario = useSelector((state) => state.session.user);
  const address = useSelector((state) => state.cart.address);
  const [score, SetScore] = useState(0);
  const [play, SetPlay] = useState(0);
  const [robot, SetRobot] = useState("default");
  const [pick, SetPick] = useState("");
  const playWithIA = (pick, robot) => {
    if (robot === pick) {
      return "draw";
    }
    if (pick === "paper") {
      if (robot === "scissors") {
        return "lose";
      }
      if (robot === "rock") {
        return "win";
      }
    }
    if (pick === "scissors") {
      if (robot === "paper") {
        return "win";
      }
      if (robot === "rock") {
        return "lose";
      }
    }
    if (pick === "rock") {
      if (robot === "paper") {
        return "lose";
      }
      if (robot === "scissors") {
        return "win";
      }
    }
  };
  return (
    <div>
      <h2>{score}</h2>
      <div className="gameIcon">
        <FaHandRock />
      </div>
      <div className="gameIcon">
        <FaHandPaper />
      </div>
      <div className="gameIcon">
        <FaHandScissors />
      </div>
    </div>
  );
}
