import { useState, useEffect, useCallback } from "react";

const WORDS = ["react", "component", "typescript", "keyboard", "hook", "ref"];

export type GameState = "countdown" | "typing" | "waiting" | "won" | "draw" | "lost";

export default function useGameLogic() {
  const [currentWord, setCurrentWord] = useState("");
  const [typedText, setTypedText] = useState("");
  const [zoneRatio, setZoneRatio] = useState(50);
  const [gameState, setGameState] = useState<GameState>("countdown");
  const [wordIndex, setWordIndex] = useState(0);

  const startRound = useCallback(() => {
    setWordIndex(0);
    setZoneRatio(50);
    setGameState("countdown");
    setTypedText("");
    setCurrentWord("");
  }, []);

  // Lance le round après le décompte
  const startTyping = useCallback(() => {
    setGameState("typing");
    setCurrentWord(WORDS[0]);
    setTypedText("");
    setWordIndex(0);
  }, []);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if(gameState !== "typing") return;
      const nextChar = currentWord[typedText.length];
      if (e.key.toLowerCase() === nextChar) {
         setTypedText((prev) => prev + e.key);
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
          if (wordIndex + 1 < WORDS.length) {
            setTimeout(() => {
              setWordIndex(wordIndex + 1);
              setCurrentWord(WORDS[wordIndex + 1]);
              setTypedText("");
            }, 700);
          }else {
            setTimeout(() => {
              if (newRatio > 50) setGameState('won');
              else if (newRatio < 50) setGameState('lost');
              else setGameState('draw');
            }, 700);
          }
        }
        return newRatio;
      })
    }
  }, [typedText, currentWord, gameState, wordIndex]);

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
    setGameState("countdown");
    setTypedText("");
    setCurrentWord("");
    setWordIndex(0);
  };

  return {
    currentWord,
    typedText,
    zoneRatio,
    gameState,
    resetGame,
    startTyping,
  };
}