
type ProgressBarProps = {
  ratio: number;
};

const ProgressBar = ({ ratio } : ProgressBarProps) => {
  return (
    <div className="relative w-full h-full flex flex-col-reverse select-none bg-gray-400">
      {/* Zone Bleu en Bas */}
      <div
        className="bg-blue-600 w-full transition-all duration-500 flex justify-center items-center"
        style={{ height: `${ratio}%`}}
      >
        <div className="text-8xl font-black text-gray-700">
          PLAYER 2
        </div>
      </div>

      {/* Zone Rouge en Haut */}
      <div
        className="bg-red-600 w-full transition-all duration-500 flex justify-center items-center"
        style={{ height: `${100 - ratio}%`}}
      >
        <div className="text-8xl font-black text-gray-700">
          PLAYER 1
        </div>
      </div>

      {/* Ligne Blanche */}
      <div
        className="absolute left-0 right-0 h-3 border-y-2 border-black bg-white"
        style={{ bottom: `${ratio}%`, transform: "translateY(50%)" }}
      >
      </div>
    </div>
  )
}

export default ProgressBar