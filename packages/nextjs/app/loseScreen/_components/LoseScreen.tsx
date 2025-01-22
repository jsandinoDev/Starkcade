"use client";

import { useRouter } from "next/navigation";

export const LoseScreen = () => {
  const router = useRouter();

  const handlePlayAgain = () => {
    router.push("/coinflip");
  };

  return (
    <div className="relative flex justify-center items-center min-h-screen text-white overflow-hidden">
      <div className="relative text-center p-4 space-y-6 -z-5">
        <div className="flex justify-center">
          <img
            src="/sad_coin.png"
            alt="Sad Coin"
            className="w-48 h-48 md:w-64 md:h-64 mx-auto"
          />
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl font-bold">YOU LOST</h1>
          <p className="text-red-500 text-xl">You just got rugged</p>
        </div>

        <div className="w-[312px] mx-auto border-t border-white/30 my-8"></div>

        <div className="flex justify-center">
          <button
            onClick={handlePlayAgain}
            className="w-[312px] py-3 bg-yellow-500 text-black border-2 rounded-full font-bold uppercase hover:bg-yellow-400 transition"
          >
            PLAY AGAIN
          </button>
        </div>
      </div>
    </div>
  );
}; 