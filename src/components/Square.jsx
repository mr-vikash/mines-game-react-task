import "./Square.css";
import DiamondEffect from "../assets/Sound/diamond.wav";
import BombEffect from "../assets/Sound/bomb.wav";
import diamondIcon from "../assets/diamond.png";
import bombIcon from "../assets/bomb.png";
import { useEffect, useState } from "react";

function Square({ mine, setGameOver, gameOver, setScore, replay }) {
  const [image, setImage] = useState(null);
  const [clicked, setClicked] = useState(false)
  const [isBouncing, setIsBouncing] = useState(false);

  useEffect(() => {
    if (gameOver) {
      if (mine) {
        setImage(bombIcon);
        setScore(0);
      } else {
        setImage(diamondIcon);
      }
    }
  }, [gameOver, mine]);

  useEffect(() => {
    if (replay) {
      setClicked(false);
      setImage(null);
    }
  }, [replay]);

  function clickHandler() {
    if (gameOver || clicked) return;

    setClicked(true);

    setIsBouncing(true);
    setTimeout(() => setIsBouncing(false), 1000); 

    if (!mine) {
      setScore((prevValue) => prevValue + 100);
      setImage(diamondIcon);
      const sound = new Audio(DiamondEffect);
      sound.play();
    } else {
      setImage(bombIcon);
      const sound = new Audio(BombEffect);
      sound.play();
      setGameOver(true);
    }
  }

  return (
    <div>
      <div
        className={`square-item ${isBouncing ? "pop-out" : ""} ${
          clicked && !mine ? "clicked" : "hover"
        }`}
        onClick={clickHandler}
      >
        {image && <img height={90} width={90} src={image} alt="icon" />}
      </div>
    </div>
  );
}

export default Square;
