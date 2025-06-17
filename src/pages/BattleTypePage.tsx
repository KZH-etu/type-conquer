import { useState } from "react";
import ProgressBar from "../components/ProgressBar"
import WordDisplay from "../components/WordDisplay"
import useGameLogic from "../hooks/useGameLogic";
import Countdown from "../components/Countdown";
import { ModalResult } from "../components/ModalResult";

const BattleTypePage = () => {
  const { currentWord, typedText, zoneRatio, gameState, resetGame, startTyping } = useGameLogic();
  const [showCountdown, setShowCountdown] = useState(true);

  const handleCountdownFinish = () => {
    setShowCountdown(false);
    startTyping();
  };

  const isGameOver = ["won", "draw", "lost"].includes(gameState);

  return (
    <div className="h-screen w-full flex relative bg-gray-100 overflow-hidden">
      <ProgressBar ratio={zoneRatio}/>

      {/* Affiche le mot seulement si pas de countdown ni de modal */}
      {!showCountdown && !isGameOver && (
        <WordDisplay word={currentWord} typed={typedText} ratio={zoneRatio} />
      )}

      {/* Modal de résultat uniquement si la partie est finie */}
      {isGameOver && (
        <ModalResult gameState={gameState} resetGame={resetGame} setShowCountdown={setShowCountdown} />
      )}

      {/* Countdown au début */}
      {showCountdown && <Countdown onFinish={handleCountdownFinish} />}
    </div>
  )
}

export default BattleTypePage