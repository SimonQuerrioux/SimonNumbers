import { useState } from "react";

export function Random() {
  const [fact, setFact] = useState({});

  async function getRandomFact() {
    const response = await fetch("http://numbersapi.com/random?json");
    const data = await response.json();
    setFact(data);
  }
  return;
}
