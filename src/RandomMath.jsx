import { useState } from "react";

export function RandomMath() {
  const [factM, setFactM] = useState({});

  async function getRandomFact() {
    const response = await fetch("http://numbersapi.com/random/math?json");
    const data = await response.json();
    setFactM(data);
  }
  return;
}
