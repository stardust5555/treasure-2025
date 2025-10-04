import React, { useState, useRef, useEffect } from 'react';
import './KeyUnlock.css';

const correctKeys = ['111111', '222222', '333333', '444444', '555555'];

export default function KeyUnlock({ onUnlock }) {
  const [inputs, setInputs] = useState(Array(5).fill().map(() => Array(6).fill('')));
  const [errorKeys, setErrorKeys] = useState([]);

  const inputRefs = useRef(
    Array(5)
      .fill()
      .map(() => Array(6).fill().map(() => React.createRef()))
  );

  const handleChange = (rowIndex, colIndex, value) => {
    if (!/^\d?$/.test(value)) return;

    const updated = inputs.map(arr => [...arr]);
    updated[rowIndex][colIndex] = value;
    setInputs(updated);

    // Move focus to next box
    if (value && colIndex < 5) {
      inputRefs.current[rowIndex][colIndex + 1]?.focus();
    }
  };

  const handleKeyDown = (e, rowIndex, colIndex) => {
    if (e.key === 'Backspace' && !inputs[rowIndex][colIndex] && colIndex > 0) {
      inputRefs.current[rowIndex][colIndex - 1]?.focus();
    }
  };

  const checkKeys = () => {
    const userKeys = inputs.map(keyArr => keyArr.join(''));
    const remaining = [...correctKeys];
    const errors = [];

    userKeys.forEach((key, i) => {
      const matchIndex = remaining.indexOf(key);
      if (matchIndex !== -1) {
        remaining.splice(matchIndex, 1);
      } else {
        errors.push(i);
      }
    });

    setErrorKeys(errors);

    if (errors.length === 0) {
      onUnlock();
    }
  };

  return (
    <div className="key-unlock">
      <h1 className="title">THE FIRST FIVE KEYS</h1>
      <h3>ENTER THE FIRST FIVE KEYS IN ORDER TO UNLOCK THE NEXT CLUE</h3>
      {inputs.map((keyRow, rowIndex) => (
        <div key={rowIndex}>
          <div className="key-label">Key Number {rowIndex + 1}</div>
          <div className="code-container">
            {keyRow.map((digit, colIndex) => (
              <input
                key={colIndex}
                className={`code-box ${errorKeys.includes(rowIndex) ? 'incorrect' : 'correct'}`}
                value={digit}
                onChange={(e) =>
                  handleChange(rowIndex, colIndex, e.target.value)
                }
                onKeyDown={(e) => handleKeyDown(e, rowIndex, colIndex)}
                ref={(el) => {
                  inputRefs.current[rowIndex][colIndex] = el;
                }}
                maxLength={1}
              />
            ))}
          </div>
          {errorKeys.includes(rowIndex) && (
            <div className="error">❌ Incorrect key</div>
          )}
        </div>
      ))}
      <button className="unlock-button" onClick={checkKeys}>
        Unlock
      </button>
    </div>
  );
}
