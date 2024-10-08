import React from "react";
import {useState} from "react";
import {useEffect} from "react";

export default function Timer({duration}){
  const [time,setTime] = useState(duration)

  useEffect(()=>{
    setTimeout(()=>{
      setTime(time-1000)
    },1000)
  }, [time])
  return(
    <>
      <h2>{time}</h2>
    </>
  )
}