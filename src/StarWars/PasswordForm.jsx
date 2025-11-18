import { useState } from "react";
import "./PasswordForm.css";

const CORRECT_PASSWORD = "help";

const scrambleText = (text) => {
  const symbols = "!@#$%^&*()_+=-{}[]<>?/|~";
  return text
    .split("")
    .map(() => symbols[Math.floor(Math.random() * symbols.length)])
    .join("");
};

const PasswordForm = ({ onUnlock }) => {
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const [animating, setAnimating] = useState(false);
  const [displayText, setDisplayText] = useState("");
  const [accessGranted, setAccessGranted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (animating) return;
    setAnimating(true);
    setStatus("");
    setDisplayText("");
    setAccessGranted(false);

    let iterations = 0;
    const interval = setInterval(() => {
      if (iterations < 15) {
        setDisplayText(scrambleText(password || "●●●"));
        iterations++;
      } else {
        clearInterval(interval);
        if (password === CORRECT_PASSWORD) {
          setStatus("Victory! You’ve accessed the Rebel archives.");
          setAccessGranted(true); // unlocks the button
        } else {
          setStatus("🚫 Wrong password. Penalty applied.");
          setAccessGranted(false);
        }
        setAnimating(false);
      }
    }, 80);
  };

  return (
     <div className="password-page">
      <div className="crawl">
        <div className="title">A LONG TIME AGO IN A GALAXY FAR, FAR AWAY...</div>
        <p>        <i>The Force flows through all of time. Arrange these events in the order they happened, from ancient Jedi secrets to the Empire’s final fall. Only when time is restored will the hidden code reveal itself. Only then will the path forward become clear. Choose carefully, young Padawan. Use the force to decrypt the intergalactic code..</i></p>
      </div>

      <div className="password-form">
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={password}
            disabled={animating}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            className="pw-input"
          />
          <button type="submit" disabled={animating} className="pw-button">
            Submit
          </button>
        </form>
        <div className="output">
          {animating ? (
            <div className="animated-text">{displayText}</div>
          ) : (
            <div className="status-text">{status}</div>
          )}
        </div>
      </div>
      {accessGranted && (
        <button onClick={onUnlock}>
          Travel to a New Galaxy...
        </button>
      )}
    </div>
  );
};

export default PasswordForm;
