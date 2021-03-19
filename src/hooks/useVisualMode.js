import { useState } from "react";

export default function useVisualMode(initial) {
  const [history, setHistory] = useState([initial]);
  // the rest of your code //

  const transition = (newMode, replace = false) => {
    // setMode(newMode)
    if (replace) {
      setHistory(prev => [...prev.slice(0, -1), newMode]);
      return;
    }

    setHistory([...history, newMode])
  }

  const back = () => {
    if (history.length < 2) {
      return;
    }

    const newHistory = [...history];
    newHistory.pop();
    setHistory(newHistory)
  };

  const mode = (history.slice(-1)[0])
  
  return { mode, transition, back };
};