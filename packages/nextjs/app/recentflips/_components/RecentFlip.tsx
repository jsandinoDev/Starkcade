"use client";
import Image from "next/image";

const flips = [
  {
    imageSrc: "/happy_coin.png",
    description: "You flipped 0.01 and doubled",
    time: "5",
    imageAlt: "Happy Coin",
  },
  {
    imageSrc: "/sad_coin.png",
    description: "You flipped 2.5 and got rugged",
    time: "7",
    imageAlt: "Sad Coin",
  },
  {
    imageSrc: "/happy_coin.png",
    description: "You flipped 6 and doubled",
    time: "10",
    imageAlt: "Happy Coin",
  },
];

export default function RecentFlip() {
  const handleButtonClick = () => {
    console.log("GO BACK button clicked");
  };

  return (
    <div className="relative flex justify-center items-center min-h-screen overflow-hidden">
      <div className="recentflip w-[40%] max-w-[560px] min-w-[280px] h-auto">
        <h2 className="text-2xl mb-10 w-full text-gray-800">MY RECENT FLIPS</h2>
        <div className="space-y-1">
          {flips.map((flip, index) => (
            <div
              key={index}
              className={`flex items-center justify-between pb-1  ${index < 2 ? "border-b border-gray-400 " : ""}`}
            >
              <div className="flex items-center gap-4">
                <Image
                  alt={flip.imageAlt}
                  src={flip.imageSrc}
                  width={49}
                  height={51}
                  className="w-12 h-auto"
                />
                <p className="text-gray-800">
                  <span className="font-bold">
                    {flip.description.split(" ")[0]}
                  </span>{" "}
                  {flip.description.split(" ").slice(1).join(" ")}
                </p>
              </div>
              <p className="text-[#333] text-xs">{flip.time} minutes ago</p>
            </div>
          ))}
        </div>
        <div className="mt-5 mb-5 ">
          <button
            className="w-full py-3 bg-yellow-500 text-black font-bold rounded-lg hover:bg-yellow-400 transition"
            onClick={handleButtonClick}
          >
            GO BACK
          </button>
        </div>
      </div>
    </div>
  );
}
