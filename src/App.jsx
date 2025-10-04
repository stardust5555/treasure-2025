import { useState } from "react";
import PasswordForm from "./StarWars/PasswordForm";
import MazeIntroPage from "./MazeGame/MazeIntroPage";
import MazeGame from "./MazeGame/MazeGame";

function App() {
  const [level, setLevel] = useState(0);

  // const goToSoundsRecall = () => setLevel(9);
  const goToMazeIntro = () => setLevel(1);
  const goToMazeGame = () => setLevel(2);
  const goToKeyUnlock = () => setLevel(2);
  // const goToBomberman = () => setLevel(3);
  // const goToQuiz = () => setLevel(4);
  // const winGame = () => alert("🎉 You completed the treasure hunt!");

  return (
    <div style={{ textAlign: "center" }}>
      {level === 0 && <PasswordForm onUnlock={goToMazeIntro} />}
      {level === 1 && <MazeIntroPage onContinue={goToMazeGame} />}
      {level === 2 && <MazeGame onWin={goToKeyUnlock} />}
      {/* {level === 0 && <SoundsIntro onContinue={goToSoundsRecall}/>}
      {level === 9 && <SoundsRecall onWin={goToKeyUnlock} />} */}
      {/* {level === 0 && <MazeIntroPage onContinue={goToMazeGame} />}
      {level === 1 && <MazeGame onWin={goToKeyUnlock} />} */}
      {/* {<KeyUnlock onUnlock={goToBomberman} />} */}
      {/* {<Bomberman onWin={goToQuiz} />} */}
      {/* {level === 4 && <Quiz onComplete={winGame} />} */}
    </div>
  );
}

export default App;
