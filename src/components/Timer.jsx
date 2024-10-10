import React, { useState, useEffect } from "react";

export default function Timer({ duration }) {
  const [time, setTime] = useState(duration);
  const [isStarted, setIsStarted] = useState(false);
  const [isPaused, setIsPaused] = useState(false); // New state for pause

  useEffect(() => {
    let timer;
    if (isStarted && !isPaused && time > 0) {
      timer = setTimeout(() => {
        setTime(prevTime => prevTime - 1000);
      }, 1000);
    }

    // Cleanup function to clear the timeout
    return () => clearTimeout(timer);
  }, [isStarted, isPaused, time]);

  const startTimer = () => {
    setIsStarted(true);
    setIsPaused(false); // Start the timer if it was paused
  };

  const pauseTimer = () => {
    setIsPaused(!isPaused); // Toggle pause state
  };

  const resetTimer = () => {
    setIsStarted(false);
    setIsPaused(false);
    setTime(duration); // Reset to the initial duration
  };

  const getFormattedTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const totalMinutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const minutes = totalMinutes % 60;

    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <>
      <button onClick={startTimer}>Start</button>
      <button onClick={pauseTimer}>{isPaused ? 'Resume' : 'Pause'}</button>
      <button onClick={resetTimer}>Reset</button>
      <h3>{getFormattedTime(time)}</h3>
    </>
  );
}