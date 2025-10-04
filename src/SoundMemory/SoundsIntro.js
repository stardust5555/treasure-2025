// SoundIntro.js
import React, { useEffect, useState } from 'react';
import { animalSounds } from './animalSounds';

const SoundsIntro = ({onContinue}) => {
  const [countdown, setCountdown] = useState(2);
  const [started, setStarted] = useState(false);
  const [soundStarted, setSoundStarted] = useState(false);


  useEffect(() => {
    if (countdown > 0) {
      const interval = setInterval(() => {
        setCountdown(c => c - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setSoundStarted(true);
    }
  }, [countdown]);

  useEffect(() => {
    if (soundStarted) {
      // Play sounds in sequence
      const playSounds = async () => {
        for (let i = 0; i < animalSounds.length; i++) {
          const sound = new Audio(animalSounds[i].src);
          await new Promise((res) => {
            sound.play();
            sound.onended = res;
          });
        }
        // Move to game page and pass the sound order
        onContinue()
      };
      playSounds();
    }
  }, [soundStarted]);

  return (

  <div style={{ textAlign: 'center' }}>
    {!started ? (
      <>
        <button onClick={() => setStarted(true)}>Start</button>
      </>
    ) : (
      <>
    <div style={{ textAlign: 'center' }}>
      <h1>🧠 Animal Memory Game</h1>
      <p>You have 30 seconds to think of a strategy.</p>
      <p>20 sounds will play. You must guess them in reverse order.</p>
      <p>Any form of note taking is banned.</p>
      <h2>⏳ {countdown} seconds remaining</h2>
    </div>
      </>
    )}
  </div>
);



};

export default SoundsIntro;
