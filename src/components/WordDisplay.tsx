import { useEffect, useRef, useState } from "react";

type WordDisplayProps = {
  word: string;
  typed: string;
  ratio: number; // position verticale %
};

const WordDisplay = ({word, typed, ratio}: WordDisplayProps) => {
  const [visible, setVisible] = useState(false);
  const [startFromLeft, setStartFromLeft] = useState(true);
  const [arrived, setArrived] = useState(false);

  useEffect(() => {
    if(!word){
      setVisible(false);
      setArrived(false);
      return;
    }

    setStartFromLeft(Math.random() < 0.5);
    setVisible(false);
    setArrived(false);
    const moveTimeout = setTimeout(() => setVisible(true), 50);
    const appearTimeout = setTimeout(() => setArrived(true), 1000);
    return () => {
      clearTimeout(moveTimeout);
      clearTimeout(appearTimeout);
    };
  }, [word]);

  // Position verticale de la ligne blanche (en px ou %)
  const topPosition = `calc(100% - ${ratio}%)`;

  return (
    <div
      className="absolute bg-white px-6 py-3 text-6xl font-bold shadow-xl border-black border-2"
      style={{
        top: topPosition,
        left: visible ? "50%" : startFromLeft ? "-150%" : "150%",
        transform: "translate(-50%, -50%)",
        transition: "left 0.7s ease",
        whiteSpace: "nowrap",
        borderRadius: "0.3rem",
        fontFamily: "monospace",
        userSelect: "none",
        pointerEvents: "none",
      }}
    >
      {word.split("").map((char, index) => (
        <span
          key={index}
          className={
            index < typed.length
              ? `text-green-600 font-extrabold`
              : index === typed.length
              ? "text-black"
              : "text-gray-400"
          }
        >
          {char}
        </span>
      ))}
    </div>
  )
}

export default WordDisplay