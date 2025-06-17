import React from 'react'
import type { GameState } from '../hooks/useGameLogic';

type ModalResultProps = {
  gameState: GameState;
  resetGame: () => void;
  setShowCountdown: React.Dispatch<React.SetStateAction<boolean>>
};

export const ModalResult = ({ gameState, resetGame, setShowCountdown }: ModalResultProps) => {

  const getTitle = () => {
    if (gameState === "won") return "Victoire !";
    if (gameState === "draw") return "Égalité !";
    if (gameState === "lost") return "Défaite !";
    return "";
  };

  const getEmoji = () => {
    if (gameState === "won") return "🏆";
    if (gameState === "draw") return "🤝";
    if (gameState === "lost") return "💀";
    return "";
  };

  const getColor = () => {
    if (gameState === "won") return "text-green-600 border-green-400 shadow-green-200";
    if (gameState === "draw") return "text-yellow-600 border-yellow-400 shadow-yellow-200";
    if (gameState === "lost") return "text-red-600 border-red-400 shadow-red-200";
    return "";
  };

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-black bg-opacity-60"
      style={{ pointerEvents: "auto" }}
    >
      <div
        className={`relative flex flex-col items-center justify-center px-16 py-12 rounded-3xl border-4 bg-gradient-to-br from-white via-gray-50 to-blue-100 shadow-2xl ${getColor()}`}
      >
        <span className="text-7xl mb-4 animate-bounce">{getEmoji()}</span>
        <h2 className={`text-6xl font-extrabold mb-2 drop-shadow-lg ${getColor()}`}>{getTitle()}</h2>
        <p className="mb-8 text-xl text-gray-700 font-mono">Merci d’avoir joué à <span className="font-black text-blue-700">Type Conquer</span> !</p>
        <button
          onClick={() => { resetGame(); setShowCountdown(true); }}
          className="mt-2 px-8 py-4 text-2xl font-bold rounded-xl bg-gradient-to-r from-blue-600 to-blue-400 text-white shadow-lg hover:from-blue-700 hover:to-blue-500 transition-all duration-200"
        >
          Rejouer
        </button>
      </div>
    </div>
  )
}
