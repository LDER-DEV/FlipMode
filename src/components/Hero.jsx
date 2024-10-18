import React from "react";
import { Link } from 'react-router-dom';
import challengesArray from "../Challenges";
import Timer from "./Timer";
import sampleLinks from '../sampleLinks';

export default function Hero() {
  const [challenge, setChallenge] = React.useState(0);
  
  function randomize() {
    const randomNumber = Math.floor(Math.random() * 8);
    setChallenge(randomNumber);
  }

  return (
    <>
      <section>
        <h1>FlipMode</h1>
        <h2>Click for a challenge!</h2>
        <button onClick={randomize}>GO!</button>
        <h3>{challengesArray[challenge]}</h3>
        {challenge === 3 && <Timer duration={600000} />}
       {challenge === 1 && <Link to="/download">Go to Download</Link>}
      </section>
    </>
  );
}