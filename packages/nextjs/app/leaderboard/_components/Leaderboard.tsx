"use client";
import Image from "next/image";
import { CONNECTED_USERS, LEADERBOARD, LIVE_STATS } from "~~/app/assets/constants";

export default function Leaderboard() {
  const handleButtonClick = () => {
    console.log("GO BACK");
  };
  const handleRefreshClick = () => {
    console.log("Refresh");
  };

  return (
    <div className="relative flex justify-center items-center min-h-screen overflow-hidden w-full p-8 sm:p-12">
      <div className="w-full grid grid-cols-12 gap-y-12 gap-x-0 md:gap-8 max-w-6xl">
        {/* Leaderboard */}
        <div className="w-auto md:w-full col-span-12 md:col-span-6 h-auto bg-[#ece6f0] rounded-[28px] py-[24px] px-[16px] lg:px-[24px]">
          <h2 className="text-2xl mb-10 w-full text-gray-800">LEADERBOARD</h2>
          <div className="space-y-1">
            {LEADERBOARD.map((leaderboard, index) => (
              <div
                key={index}
                className={`flex items-center justify-between pb-1  ${index < ((LEADERBOARD as unknown as Array<any>).length - 1) ? "border-b border-gray-400 " : ""}`}
              >
                <div className="flex items-center gap-2">
                  <Image
                    alt={leaderboard.imageAlt}
                    src={leaderboard.imageSrc}
                    width={48}
                    height={48}
                    className="w-8 flex-none rounded-full border border-yellow-500/50 h-auto"
                  />
                  <p className="text-gray-800 text-sm sm:text-md md:text-sm lg:text-md">
                    <span className="font-bold">{leaderboard.username}</span>{" has won"}
                    <span className="font-bold"> {leaderboard.amount}</span>{" STRK"}
                  </p>
                </div>
                <p className="text-[#333] text-xs">{leaderboard.time} minutes ago</p>
              </div>
            ))}
          </div>
          <div className="mt-5 flex justify-end w-full">
            <button
              className="w-auto py-3 px-8 bg-yellow-500 text-black font-bold rounded-lg hover:bg-yellow-400 transition"
              onClick={handleRefreshClick}
            >
              REFRESH
            </button>
          </div>
        </div>
        {/* Live Stats */}
        <div className="w-auto md:w-full col-span-12 md:col-span-6 h-auto bg-[#ece6f0] rounded-[28px] py-[24px] px-[16px] lg:px-[24px]">
          <h2 className="text-2xl mb-10 w-full text-gray-800">LIVE STATS</h2>
          <div className="space-y-1">
            {LIVE_STATS.map((livestat, index) => (
              <div
                key={index}
                className={`flex items-center justify-between pb-1  ${index < ((LIVE_STATS as unknown as Array<any>).length - 1) ? "border-b border-gray-400 " : ""}`}
              >
                <div className="flex items-center gap-2">
                  <Image
                    alt={livestat.imageAlt}
                    src={livestat.imageSrc}
                    width={48}
                    height={48}
                    className="w-8 flex-none rounded-full border border-yellow-500/50 h-auto"
                  />
                  <p className="text-gray-800 text-sm sm:text-md md:text-sm lg:text-md">
                    <span className="font-bold">{livestat.username}</span>{" just played"}
                    <span className="font-bold"> {livestat.amount}</span>{" STRK"}
                  </p>
                </div>
                <p className="text-[#333] text-xs">{livestat.time} minutes ago</p>
              </div>
            ))}
          </div>
          <div className="mt-5 flex justify-end w-full">
            <button
              className="w-auto py-3 px-8 bg-yellow-500 text-black font-bold rounded-lg hover:bg-yellow-400 transition"
              onClick={handleRefreshClick}
            >
              REFRESH
            </button>
          </div>
        </div>
        {/* Connected Users */}
        <div className="w-full md:col-start-3 md:col-end-11 col-span-12 md:col-span-8 h-auto bg-[#ece6f0] rounded-[28px] py-[24px] px-[16px] lg:px-[24px]">
          <h2 className="text-2xl mb-10 w-full text-gray-800">CONNECTED USERS</h2>
          <div className="space-y-1">
            {CONNECTED_USERS.map((connected_user, index) => (
              <div
                key={index}
                className={`flex items-center justify-between pb-1  ${index < ((CONNECTED_USERS as unknown as Array<any>).length - 1) ? "border-b border-gray-400 " : ""}`}
              >
                <div className="flex items-center gap-2">
                  <Image
                    alt={connected_user.imageAlt}
                    src={connected_user.imageSrc}
                    width={48}
                    height={48}
                    className="w-8 flex-none rounded-full border border-yellow-500/50 h-auto"
                  />
                  <p className="text-gray-800 text-sm sm:text-md md:text-sm lg:text-md">
                    <span className="font-bold">{connected_user.username}</span>{" is live"}
                  </p>
                </div>
                <p className="text-[#333] text-xs">{connected_user.time} minutes ago</p>
              </div>
            ))}
          </div>
          <div className="mt-5 flex justify-end w-full">
            <button
              className="w-full py-3 px-8 bg-yellow-500 text-black font-bold rounded-lg hover:bg-yellow-400 transition"
              onClick={handleButtonClick}
            >
              GO BACK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
