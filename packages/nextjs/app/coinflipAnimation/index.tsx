import React, { useState } from "react";

interface CoinFlipProps {
  src: string;
}

const CoinFlip: React.FC<CoinFlipProps> = ({ src }) => {
  const [isFlipping, setIsFlipping] = useState(false);

  const handleFlip = () => {
    setIsFlipping(true);
    setTimeout(() => {
      setIsFlipping(false); // Reset after animation
    }, 3000); // Matches animation duration
  };

  return (
    <div className="flex flex-col items-center">
      <div
        onClick={handleFlip}
        className={`w-48 h-48 md:w-64 md:h-64 mx-auto cursor-pointer ${
          isFlipping ? "animate-flip" : ""
        }`}
      >
        <img src={src} alt="Coin" className="w-full h-full object-contain" />
      </div>
    </div>
  );
};

export default CoinFlip;
