import React, { useState } from "react";
import Image from "next/image";

interface CoinFlipProps {
  src: string;
}

const CoinFlip: React.FC<CoinFlipProps> = ({ src }) => {
  const [isFlipping, setIsFlipping] = useState(false);

  const handleFlip = () => {
    setIsFlipping(true);
    setTimeout(() => {
      setIsFlipping(false);
    }, 3000);
  };

  return (
    <div className="flex flex-col items-center">
      <div
        onClick={handleFlip}
        className={`w-48 h-48 md:w-64 md:h-64 mx-auto cursor-pointer ${
          isFlipping ? "animate-flip" : ""
        }`}
      >
        <div className="relative w-24 h-24">
          <Image src={src} alt="Coin" className="object-contain" fill />
        </div>
      </div>
    </div>
  );
};

export default CoinFlip;
