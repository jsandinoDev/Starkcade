"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

interface ResultScreenProps {
  isWin?: boolean;
}

export const ResultScreen = ({ isWin = true }: ResultScreenProps) => {
  const router = useRouter();
  const [mockWin, setMockWin] = useState(isWin);

  const handlePlayAgain = () => {
    router.push("/coinflip");
  };

  const toggleResult = () => {
    setMockWin(!mockWin);
  };

  return (
    <div className="relative flex justify-center items-center min-h-screen text-white overflow-hidden">
      <div className="relative text-center p-4 space-y-6 -z-5 max-w-sm mx-auto">
        <div className="flex justify-center">
          <Image
            src={mockWin ? "/happy_coin.png" : "/sad_coin.png"}
            alt={mockWin ? "Happy Coin" : "Sad Coin"}
            className="w-32 h-32 md:w-48 md:h-48 mx-auto"
            width={128}
            height={128}
          />
        </div>

        <div className="space-y-4">
          <h1 className="text-2xl font-bold">
            {mockWin ? "YOU WON" : "YOU LOST"}
          </h1>
          <p className={mockWin ? "text-green-500 text-sm" : "text-red-500 text-sm"}>
            {mockWin ? "CONGRATS" : "You just got rugged"}
          </p>
        </div>

        <div className="w-[280px] mx-auto border-t border-white/30 my-8"></div>

        <div className="flex flex-col gap-4 justify-center">
          <button
            onClick={handlePlayAgain}
            className="w-[280px] py-3 bg-yellow-500 text-black border-2 rounded-full font-bold uppercase hover:bg-yellow-400 transition"
          >
            PLAY AGAIN
          </button>
          
          <button
            onClick={toggleResult}
            className="text-sm text-gray-400 hover:text-gray-300"
          >
            Toggle Result
          </button>
        </div>
      </div>
    </div>
  );
}; 