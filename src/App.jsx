import { useEffect, useState } from "react";

export default function App() {
  const [fact, setFact] = useState({});

  async function getRandomFact() {
    const response = await fetch("http://numbersapi.com/random?json");
    const data = await response.json();
    setFact(data);
  }

  useEffect(() => {
    getRandomFact();
  }, []);

  return <p>{fact.text}</p>;
}
