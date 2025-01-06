"use client"
import Image from "next/image";

export default function RecentFlip() {
    const flips = [
        { imageSrc: "/happy_coin.png", description: "You flipped 0.01 and doubled", time: "5", imageAlt: "Happy Coin" },
        { imageSrc: "/sad_coin.png", description: "You flipped 2.5 and got rugged", time: "7", imageAlt: "Sad Coin" },
        { imageSrc: "/happy_coin.png", description: "You flipped 6 and doubled", time: "10", imageAlt: "Happy Coin" },
    ];

    const handleButtonClick = () => {
        console.log("GO BACK button clicked");
    };

    return (
        <div className="relative flex justify-center items-center min-h-screen overflow-hidden">
            <div className="recentflip w-[40%] max-w-[560px] min-w-[280px] h-auto">
                <h2 className="text-2xl mb-10 w-full">
                    MY RECENT FLIPS
                </h2>
                <div className="space-y-1">
                    {flips.map((flip, index) => (
                        <div key={index} className={`flex items-center justify-between pb-1  ${index < 2 ? "border-b border-gray-400 " : ""}`}>
                            <div className="flex items-center gap-4">
                                <Image
                                    alt={flip.imageAlt}
                                    src={flip.imageSrc}
                                    width={49}
                                    height={51}
                                    className="w-12 h-auto"
                                />
                                <p className="text-sm">{flip.description}</p>
                            </div>
                            <p className="text-[#333] text-xs">{flip.time} minutes ago</p>
                        </div>
                    ))}
                </div>
                <div className="mt-5 mb-5 ">
                    <button
                        className="bg-[rgba(242, 199, 28, 1)] text-sm font-semibold w-full 
                        h-10 btns"
                        onClick={handleButtonClick}
                    >
                        GO BACK
                    </button>
                </div>
            </div>
        </div>
    );
}

