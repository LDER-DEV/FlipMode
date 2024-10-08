import React from "react"
import challengesObj from "../Challenges"
import Timer from "./Timer"

export default function Hero(){
  const [challenge, setChallenge] = React.useState(0)
  
  function randomize(){
    const randomNumber = Math.floor(Math.random() * 8)
      setChallenge(randomNumber)
  }

  return(
    <>
      <section>
        <h1>Click for a challenge!</h1>
        <button onClick={randomize}>GO!</button>
        <h2>{challengesObj[challenge]}</h2>
        {challenge == 3 && <Timer duration ={60000}/>}
      </section>
    </>
  )
}