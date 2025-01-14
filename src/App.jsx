import { useState, useEffect } from "react";
import "./App.css";
import Button from "./components/Button";
import { InputBar } from "./components/InputBar";
import Square from "./components/Square";

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function App() {
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [totalScore, setTotalscore] = useState(0);
  const [bombCount, setBombCount] = useState(3);
  const [replay, setReplay] = useState(false);
  const [randomNumbers, setRandomNumbers] = useState([]);
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (!replay) {
      const squares = [];
      for (let index = 1; index < 26; index++) {
        squares.push(
          <Square
            setScore={setScore}
            gameOver={gameOver}
            setGameOver={setGameOver}
            mine={randomNumbers.includes(index)}
            key={index}
            replay={replay}
          />
        );
      }
      setItems(squares);
    }
  }, [replay, randomNumbers, gameOver]);

  useEffect(() => {
    const numbers = [];
    while (numbers.length < bombCount) {
      let randomNumber = getRandomInt(1, 25);
      if (!numbers.includes(randomNumber)) {
        numbers.push(randomNumber);
      }
    }
    setRandomNumbers(numbers);
    setReplay(true);
    setItems([]);
    setScore(0);
    setGameOver(false);
    setReplay(false);
  }, [bombCount]);

  const restartGame = () => {
    setReplay(true);
    setRandomNumbers([]);
    setItems([]);
    setScore(0);
    setBombCount(3);
    setGameOver(false);
    setReplay(false);
  };

  const handleCheckout = (e) => {
    e.preventDefault();
    setTotalscore(totalScore + score);
    restartGame();
  };

  return (
    <>
      <div className="d-flex gap-10">
        <div className="totalScore">
          <p>Your score: {totalScore}</p>
          {gameOver && <p>You lose game over...</p>}
          <p>Mines Game</p>
          <p>Total Score</p>
          <p class="point">{score}</p>
          <p>Set Difficulity</p>
          <InputBar setBombCount={setBombCount} bombCount={bombCount} />
          <p>Difficulity: {bombCount}</p>
          <Button name="Checkout" onClick={handleCheckout} />
        </div>
        <div className="parent">
          <div className="d-grid">{items}</div>
          <div
            style={{
              marginTop: "20px",
              justifyContent: "center",
            }}
          >
            <Button name="replay" onClick={restartGame} />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
