"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { TRANSACTIONS } from "../../assets/constants";
export default function TransactionHistory({ address }: { address: `0x${string}` | undefined }) {
    const router = useRouter();
    const [name, setName] = useState("");
  
  const handleSave = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    console.log("Saving name:", name);
  };
  const handleButtonClick = () => {
    router.back();
  };

  return (
    <div className="relative flex flex-col justify-center items-center min-h-screen overflow-hidden">
      <div className="relative text-center p-4 space-y-6 -z-5 w-full flex flex-col justify-center items-center gap-4">
        <div className='flex justify-center h-4 text-4xl'>
          {name || "User Profile"}
        </div>
        <Image
          src="/coin-removebg.png"
          alt="Web3 Arcade Coin"
          width={256}
          height={256}
          className="w-24 h-24 md:w-64 md:h-64 flex justify-center"
        />
         <div className='flex justify-center h-4 text-4xl'>
          {name || "Coinflip Expert"}
        </div>
        <hr className="border-t-2 max-w-xl border-gray-300 flex justify-center w-1/2" />
      </div>
        { address && <p className="my-5 dark:text-white text-yellow-500">Wallet {address}</p>}
      <div className="recentflip w-[40%] max-w-[560px] min-w-[280px] h-auto">
        <h2 className="text-2xl w-full text-gray-800">Transaction History</h2>
        <div className="space-y-1">
          {TRANSACTIONS.map((transaction, index) => (
            <div
              key={index}
              className={`flex items-center justify-between pb-1 last-of-type:border-0 border-b border-gray-400`}
            >
              <div className="flex items-center gap-4">
                <p className="text-gray-800">
                    <span className="mr-1">You</span>
                  <span className="">
                    {transaction.message.split(" ")[0]}
                  </span>{" "}
                  {transaction.message.split(" ").slice(1).join(" ")}
                </p>
              </div>
              <p className="text-[#333] text-xs">{transaction.time} minutes ago</p>
            </div>
          ))}
        </div>
      </div>
        <div className="mt-5 mb-5 w-full max-w-xl">
          <button
            className="w-full py-3 bg-yellow-500 text-black font-bold rounded-lg hover:bg-yellow-400 transition"
            onClick={handleButtonClick}
          >
            GO BACK
          </button>
        </div>
    </div>
  );
}
