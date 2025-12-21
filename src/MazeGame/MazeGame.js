import React, { useEffect, useState } from "react";
import "./MazeGame.css"; // Add styles in separate CSS
import ReactAudioPlayer from "react-audio-player";

const DOOR_POS = { x: 16, y: 1 }; // Change to { x: 16, y: 1 } if that's your actual door

// prettier-ignore
const MAZE = [
  ['#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#'],
  ['#', 'P', ' ', ' ', '#', ' ', ' ', ' ', 'R', ' ', ' ', ' ', ' ', ' ', '#', ' ', 'D', '#', '#'],
  ['#', ' ', '#', ' ', '#', ' ', '#', ' ', '#', ' ', '#', '#', '#', ' ', '#', ' ', '#', '#', '#'],
  ['#', ' ', '#', ' ', '#', ' ', ' ', ' ', '#', ' ', ' ', '#', ' ', ' ', '#', ' ', 'R', '#', '#'],
  ['#', ' ', '#', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '#', ' ', ' ', ' ', ' ', ' ', '#', '#'],
  ['#', ' ', '#', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '#', ' ', ' ', ' ', ' ', ' ', '#', '#'],
  ['#', ' ', '#', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '#', ' ', ' ', ' ', ' ', ' ', '#', '#'],
  ['#', ' ', '#', ' ', 'R', ' ', ' ', ' ', ' ', ' ', ' ', '#', ' ', 'R', ' ', ' ', ' ', '#', '#'],
  ['#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#'],
];

export default function MazeGame() {
  const [maze, setMaze] = useState(MAZE.map((row) => [...row]));
  const [playerPos, setPlayerPos] = useState({ x: 1, y: 1 });
  const [coins, setCoins] = useState(0);
  const [gameMessage, setGameMessage] = useState("");
  const [doorUnlocked, setDoorUnlocked] = useState(false);
  const [currentRiddleIndex, setCurrentRiddleIndex] = useState(0);
  const [currentRiddle, setCurrentRiddle] = useState(null);
  const [riddleMode, setRiddleMode] = useState(false);
  const [riddleAnswer, setRiddleAnswer] = useState("");

  const riddles = [
    {
      question:
        "If a doctor gives you 3 pills and tells you to take one every hour, how many hours will they last? (Please type your answer as a number)",
      audio: null,
      answer: "2",
    },
    {
      question:
        "What number do you get when you multiply all numbers on a phone keypad? (Please type your answer as a number)",
      audio: null,
      answer: "0",
    },
    {
      question:
        "What movie is this from: a) 'Kuch Kuch Hota Hai', b) 'Kabhi Khushi Kabie Gham', c) 'Kal Ho Naa Ho' or  d) 'Mohabbatein'?",
      audio: "koi.mp3",
      answer: "a",
    },
    {
      question:
        "What movie is this from: a) 'Chandni', b) 'Maine Pyar Kiya', c) 'Qayamat Se Qayamat Tak' or  d) 'Mohabbatein'?",
      audio: "mohabbatein.mp3",
      answer: "d",
    },
    {
      question:
        "What movie is this from: a) 'Om Shanti Om', b) 'Main Hoon Na', c) 'Dil To Pagal Hai' or  d) 'Mohabbatein'?",
      audio: "checkThat.mp3",
      answer: "b",
    },
    {
      question:
        "What movie is this from: a) 'Chandni', b) 'Maine Pyar Kiya', c) 'Qayamat Se Qayamat Tak' or  d) 'Mohabbatein'?",
      audio: "qsqt.mp3",
      answer: "c",
    },
    {
      question:
        "What movie is this from: a) 'Om Shanti Om', b) 'Main Hoon Na', c) 'Dil To Pagal Hai' or  d) 'Mohabbatein'?",
      audio: "dilToPagalHai.mp3",
      answer: "b",
    },
    {
      question:
        "Which artist wrote this song: a) 'U2', b) 'Whitney Houston', c) 'Alicia Keys' or  d) 'Elton John'?",
      audio: "alicia.mp3",
      answer: "c",
    },
  ];

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (riddleMode) return;

      let dx = 0,
        dy = 0;
      switch (e.key) {
        case "ArrowUp":
          dy = -1;
          e.preventDefault();
          break;
        case "ArrowDown":
          dy = 1;
          e.preventDefault();
          break;
        case "ArrowLeft":
          dx = -1;
          e.preventDefault();
          break;
        case "ArrowRight":
          dx = 1;
          e.preventDefault();
          break;
        default:
          return;
      }

      const newX = playerPos.x + dx;
      const newY = playerPos.y + dy;
      const nextTile = maze[newY]?.[newX];
      if (!nextTile || nextTile === "#") return;

      const newMaze = maze.map((row) => [...row]);

      const wasOnDoor =
        playerPos.x === DOOR_POS.x && playerPos.y === DOOR_POS.y;
      newMaze[playerPos.y][playerPos.x] = wasOnDoor ? "D" : " ";

      if (nextTile === "R") {
        setCoins((prev) => prev + 1);
        setGameMessage("You picked up a ring 💍!");
      } else if (nextTile === "D") {
        if (coins >= 3) {
          if (currentRiddleIndex < riddles.length) {
            setCurrentRiddle(riddles[currentRiddleIndex]);
            setRiddleMode(true);
            setGameMessage(
              `🧙‍♂️ Riddle ${currentRiddleIndex + 1} of ${
                riddles.length
              } awaits you...`
            );
          } else {
            setGameMessage("✨ You have passed all trials. The gate opens! 🏆");
            // You could show a win screen or animate the door
          }
        } else {
          setGameMessage("Collect all 3 rings before approaching the door!");
          return;
        }
      } else {
        setGameMessage("");
      }

      newMaze[newY][newX] = "P";
      setMaze(newMaze);
      setPlayerPos({ x: newX, y: newY });
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
    // eslint-disable-next-line
  }, [playerPos, maze, coins, riddleMode]);

  const handleRiddleSubmit = () => {
    const answer = riddleAnswer.trim().toLowerCase();
    const correctAnswer = currentRiddle.answer.toLowerCase();

    if (answer === correctAnswer) {
      const nextIndex = currentRiddleIndex + 1;

      if (nextIndex >= riddles.length) {
        // 🎉 Player wins after 5 riddles
        setGameMessage(
          "🏆 You have answered all riddles. The doors swing open!"
        );
        setDoorUnlocked(true);
        setRiddleMode(false);
        setCurrentRiddle(null);
      } else {
        // ✅ Correct answer, move to next riddle
        setGameMessage(`✅ Correct. Riddle ${nextIndex + 1} awaits...`);
        setCurrentRiddle(riddles[nextIndex]);
        setCurrentRiddleIndex(nextIndex);
        setRiddleAnswer("");
      }
    } else {
      // ❌ Wrong answer
      setGameMessage("🚫 That is not the answer. You shall not pass!");

      if (coins > 0) {
        setCoins((prev) => prev - 1);

        // Find empty tiles to place the dropped ring
        const emptySpots = [];
        maze.forEach((row, y) => {
          row.forEach((cell, x) => {
            if (cell === " ") {
              emptySpots.push({ x, y });
            }
          });
        });

        if (emptySpots.length > 0) {
          const randomSpot =
            emptySpots[Math.floor(Math.random() * emptySpots.length)];
          const newMaze = maze.map((row) => [...row]);
          newMaze[randomSpot.y][randomSpot.x] = "R";
          setMaze(newMaze);
        }

        // Exit riddle mode if player drops below 3 rings
        if (coins - 1 < 3) {
          setRiddleMode(false);
          setCurrentRiddle(null);
          setGameMessage(
            "💍 A ring slips from your grasp... Seek it once more before returning."
          );
        }
      }

      setRiddleAnswer("");
    }
  };

  return (
    <div className="lotr-container">
      <h1>🧙‍♂️ You shall not pass</h1>
      <h2>Rings Collected: {coins}/3</h2>

      <div className="maze-grid">
        {maze.map((row, y) => (
          <div key={y} className="maze-row">
            {row.map((tile, x) => {
              const isPlayer = playerPos.x === x && playerPos.y === y;
              const isDoor = DOOR_POS.x === x && DOOR_POS.y === y;

              let display = "";
              if (isDoor && !isPlayer) display = "🚪";
              else if (tile === "#") display = "🌳";
              else if (tile === "R") display = "💍";
              else if (isPlayer && isDoor) display = "🧝‍♀️"; // Player on door
              else if (isPlayer) display = "🧝‍♀️";

              return (
                <span
                  key={x}
                  className={`maze-tile ${isDoor ? "door-glow" : ""}`}
                >
                  {display}
                </span>
              );
            })}
          </div>
        ))}
      </div>

      {riddleMode && currentRiddle && (
        <div className="riddle-box">
          <h3>🧝 Riddle of the Gate</h3>
          <p>{currentRiddle.question}</p>
          {currentRiddle.audio && (
            <ReactAudioPlayer src={currentRiddle.audio} controls />
          )}
          <input
            type="text"
            value={riddleAnswer}
            onChange={(e) => setRiddleAnswer(e.target.value)}
          />
          <button onClick={handleRiddleSubmit}>Answer</button>
        </div>
      )}

      <p className="game-message">{gameMessage}</p>

      {doorUnlocked && (
        <div>
          <h2 className="victory-message">🎉 You escaped the Mines of Moria</h2>
          <h2 className="victory-message">
            Quietly make your way to the big tree.
          </h2>
        </div>
      )}
    </div>
  );
}
