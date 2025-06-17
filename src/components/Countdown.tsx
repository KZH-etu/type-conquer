import { useEffect, useState } from "react";

type CountdownProps = {
  onFinish: () => void;
};

const steps = ["3", "2", "1", "GO!"];

const Countdown = ({ onFinish }: CountdownProps) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < steps.length - 1) {
      const timeout = setTimeout(() => setIndex(i => i + 1), 1000);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(onFinish, 1000);
      return () => clearTimeout(timeout);
    }
  }, [index, onFinish]);

  return (
    <div
      style={{
        zIndex: 1000,
        position: "fixed",
        top: 0, left: 0, right: 0, bottom: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(255,255,255,0.7)",
        pointerEvents: "none"
      }}
    >
      <span className="text-9xl font-black text-blue-700 drop-shadow-lg select-none">
        {steps[index]}
      </span>
    </div>
  );
};

export default Countdown;