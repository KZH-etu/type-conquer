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
  const [bounced, setBounced] = useState<number[]>([]);
  const prevTypedLength = useRef(0);

  useEffect(() => {
    if(!word){
      setVisible(false);
      setArrived(false);
      setBounced([]);
      prevTypedLength.current = 0;
      return;
    }

    setStartFromLeft(Math.random() < 0.5);
    setVisible(false);
    setArrived(false);
    setBounced([]);
    prevTypedLength.current = 0;
    const moveTimeout = setTimeout(() => setVisible(true), 50);
    const appearTimeout = setTimeout(() => setArrived(true), 1000);
    return () => {
      clearTimeout(moveTimeout);
      clearTimeout(appearTimeout);
    };
  }, [word]);

  // Animation de rebond sur chaque lettre validée
  useEffect(() => {
    if (typed.length > prevTypedLength.current) {
      setBounced((prev) => [...prev, typed.length - 1]);
    }
    prevTypedLength.current = typed.length;
  }, [typed]);

  // Position verticale de la ligne blanche (en px ou %)
  const topPosition = `calc(100% - ${ratio}%)`;

  console.log(bounced);

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
              ? `text-green-600 font-extrabold ${bounced.includes(index) ? "animate-char-bounce" : ""}`
              : index === typed.length
              ? "text-black"
              : "text-gray-400"
          }
          onAnimationEnd={() => {
            setBounced((prev) => prev.filter(i => i !== index));
          }}
        >
          {char}
        </span>
      ))}
    </div>
  )
}

export default WordDisplay