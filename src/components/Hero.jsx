import React from "react";
import challengesArray from "../Challenges";
import Timer from "./Timer";
import sampleLinks from '../sampleLinks';
import YoutubeSampler from "./YoutubeSampler";
import Sampleoftheweek from "./sampleoftheweek";


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
        <button onClick={randomize}>Click for a challenge!</button>
        <h3>{challengesArray[challenge]}</h3>
        {challenge === 3 && <Timer duration={600000} />}
        {challenge === 1 && <YoutubeSampler sampleLinks={sampleLinks}/>}
        {challenge === 0 && <Sampleoftheweek/>}
      </section>
    </>
  );
}