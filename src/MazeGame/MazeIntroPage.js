import React, { useEffect } from "react";
import "./MazeIntroPage.css";

const MazeIntroPage = ({ onContinue }) => {
  useEffect(() => {
    const handleKey = (e) => {
      if (e.code === "Space") {
        e.preventDefault();
        onContinue()
      };
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onContinue]);

  return (
    <div className="lotr-intro">
      <h1>🌋 The Quest for the Rings of Power 💍</h1>

      <p>
        In the deep shadows of Middle-earth, the Rings of Power have been
        scattered throughout the ruins of Khazad-dûm. You, a lone Elf of
        Rivendell, must brave the twisting halls, gather at least three lost rings,
        and find the Doors of Moria.
      </p>
      <p>
        The ruins can only be braved in darkness. Choose a member of your
        fellowship. They will be blindfolded - guided only by the voices of their
        friends (you cannot touch them).
      </p>
      <p>
        From this moment forth, the following words cannot be spoken: "up, down,
        left, right, north, south, east, west, forwards or backwards" in any
        language. If they are there will be a 10 second penalty for each word.
      </p>

      <p>
        Use your arrow keys to move. 🧝‍♀️ <br />
      </p>
      <p style={{ marginTop: "40px" }}>
        Press <strong>SPACEBAR</strong> to begin.
      </p>

      <p className="start-note">When you are ready... enter the darkness.</p>
    </div>
  );
};

export default MazeIntroPage;
