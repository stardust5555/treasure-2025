import React, { useEffect, useState } from "react";
import "./MazeGame.css";

const SIZE = 11;
const EMPTY = 0;
const WALL = 1;

const MazeGame = ({ onWin }) => {
  const [grid, setGrid] = useState(generateMaze);
  const [player, setPlayer] = useState({ x: 0, y: 0 });

  function generateMaze() {
    // const maze = Array(SIZE)
    //   .fill(0)
    //   .map(() => Array(SIZE).fill(EMPTY));
    // for (let y = 0; y < SIZE; y++) {
    //   for (let x = 0; x < SIZE; x++) {
    //     if (
    //       Math.random() < 0.25 &&
    //       !(x === 0 && y === 0) &&
    //       !(x === SIZE - 1 && y === SIZE - 1)
    //     ) {
    //       maze[y][x] = WALL;
    //     }
    //   }
    // }
    // return maze;

    // prettier-ignore
    const staticMaze = [
  [EMPTY, WALL,  EMPTY, EMPTY, EMPTY, WALL,  EMPTY, EMPTY, EMPTY, WALL,  EMPTY],
  [EMPTY, WALL,  EMPTY, WALL,  EMPTY, WALL,  EMPTY, WALL,  EMPTY, WALL,  EMPTY],
  [EMPTY, EMPTY, EMPTY, WALL,  EMPTY, EMPTY, EMPTY, WALL,  EMPTY, EMPTY, EMPTY],
  [WALL,  WALL,  WALL, WALL,  WALL,  WALL,  EMPTY, WALL,  WALL,  WALL,  WALL],
  [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, WALL, EMPTY, EMPTY, EMPTY],
  [EMPTY, WALL,  WALL,  WALL,  WALL,  WALL,  WALL,  WALL,  WALL,  WALL,  EMPTY],
  [EMPTY, WALL,  EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, WALL,  EMPTY],
  [EMPTY, WALL,  EMPTY, WALL,  WALL,  EMPTY,  WALL,  WALL,  EMPTY, WALL,  EMPTY],
  [EMPTY, EMPTY, EMPTY, WALL,  EMPTY, EMPTY, WALL, WALL,  WALL, EMPTY, WALL],
  [WALL,  WALL,  EMPTY, WALL,  EMPTY, WALL,  EMPTY, EMPTY,  EMPTY,  EMPTY,  WALL],
  [EMPTY, EMPTY, WALL, EMPTY, EMPTY, EMPTY,  EMPTY, WALL, WALL, EMPTY,  EMPTY],
];
    return staticMaze;
  }

  const movePlayer = (dx, dy) => {
    const newX = player.x + dx;
    const newY = player.y + dy;
    if (
      newX >= 0 &&
      newY >= 0 &&
      newX < SIZE &&
      newY < SIZE &&
      grid[newY][newX] === EMPTY
    ) {
      setPlayer({ x: newX, y: newY });
    }
  };

  const handleKeyDown = (e) => {
    const moves = {
      ArrowUp: () => movePlayer(0, -1),
      ArrowDown: () => movePlayer(0, 1),
      ArrowLeft: () => movePlayer(-1, 0),
      ArrowRight: () => movePlayer(1, 0),
      w: () => movePlayer(0, -1),
      s: () => movePlayer(0, 1),
      a: () => movePlayer(-1, 0),
      d: () => movePlayer(1, 0),
    };

    if (moves[e.key]) {
      e.preventDefault(); // 🚫 stop the page from scrolling
      moves[e.key]();
    }
  };

  // useEffect(() => {
  //   window.addEventListener("keydown", handleKeyDown);
  //   const interval = setInterval(() => {
  //     setGrid(generateMaze);
  //   }, 10000);
  //   return () => {
  //     window.removeEventListener("keydown", handleKeyDown);
  //     clearInterval(interval);
  //   };
  // }, [player]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [player]);

  const reachedGoal = player.x === SIZE - 1 && player.y === SIZE - 1;

  return (
    <div className="maze-game">
      {reachedGoal ? onWin() : <h2>Get the guy to the door</h2>}
      <div className="maze-grid">
        {grid.map((row, y) => (
          <div className="maze-row" key={y}>
            {row.map((cell, x) => {
              const isPlayer = player.x === x && player.y === y;
              const isGoal = x === SIZE - 1 && y === SIZE - 1;
              return (
                <div key={x} className="maze-cell">
                  {isPlayer ? "🧍" : isGoal ? "🚪" : cell === WALL ? "🌳" : ""}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MazeGame;
