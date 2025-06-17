import { useState, useEffect, useCallback } from "react";

const WORDS = ["react", "component", "typescript", "keyboard", "hook", "ref"];

type GameState = "waiting" | "typing" | "won" | "draw";

export default function useGameLogic() {
  const [currentWord, setCurrentWord] = useState("");
  const [typedText, setTypedText] = useState("");
  const [zoneRatio, setZoneRatio] = useState(50);
  const [gameState, setGameState] = useState<GameState>("waiting");

  const startRound = useCallback(() => {
    const word = WORDS[Math.floor(Math.random() * WORDS.length)];
    setCurrentWord(word);
    setTypedText("");
    setGameState("typing");
  }, []);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if(gameState !== "typing") return;
      const nextChar = currentWord[typedText.length];
      if (e.key.toLowerCase() === nextChar) {
         setTypedText((prev) => prev + e.key.toLowerCase());
      }
    },
    [currentWord, typedText, gameState]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    if (gameState === "typing" && typedText === currentWord && currentWord !== "") {
      setZoneRatio((prev) => {
        const newRatio = Math.min(prev + 5, 100);
        if (newRatio === 100){
          setGameState("won");
        } else {
          setGameState("waiting");
        }
        return newRatio;
      })
    }
  }, [typedText, currentWord, gameState]);

  // Démarrage automatique d’un nouveau round après attente
  useEffect(() => {
    if (gameState === "waiting") {
      const timeout = setTimeout(() => {
        startRound();
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [gameState, startRound]);

  // Fonction pour reset la partie
  const resetGame = () => {
    setZoneRatio(50);
    setGameState("waiting");
    setTypedText("");
    setCurrentWord("");
  };

  return {
    currentWord,
    typedText,
    zoneRatio,
    gameState,
    resetGame,
  };
}