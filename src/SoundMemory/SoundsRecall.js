// SoundGame.js
import React, { useState } from 'react';
import { animalSounds } from './animalSounds';

const animals = ['cow', 'duck', 'pig', 'falcon', 'crow'];

const SoundsRecall = ({onWin}) => {
  const correctOrder = animalSounds.map(s => s.name);
  const reversedOrder = [...correctOrder].reverse();

  const [guessIndex, setGuessIndex] = useState(0);
  const [guesses, setGuesses] = useState([]);
  const [finished, setFinished] = useState(false);

  const handleGuess = (animal) => {
    const newGuesses = [...guesses, animal];
    setGuesses(newGuesses);

    if (animal === reversedOrder[guessIndex]) {
      if (guessIndex + 1 === reversedOrder.length) {
        setFinished(true);
      } else {
        setGuessIndex(i => i + 1);
      }
    } else {
      alert('❌ Wrong guess. Try again from the start!');
      setGuesses([]);
      setGuessIndex(0);
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>{reversedOrder}</h1>
      <h1>🐾 Guess the Animals in Reverse Order</h1>
      {finished ? (
        onWin()
      ) : (
        <p>Guess #{guessIndex + 1} of {reversedOrder.length}</p>
      )}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
        {animals.map(animal => (
          <button key={animal} onClick={() => handleGuess(animal)}>
            <img src={`/animals/${animal}.png`} alt={animal} width="80" />
            <div>{animal}</div>
          </button>
        ))}
      </div>
      <div style={{ marginTop: '1rem' }}>
        <h3>Your guesses:</h3>
        <p>{guesses.join(' → ')}</p>
      </div>
    </div>
  );
};

export default SoundsRecall;
