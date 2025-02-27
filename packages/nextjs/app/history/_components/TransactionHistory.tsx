"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { TRANSACTIONS } from "../../assets/constants";

export default function TransactionHistory({
  address,
}: {
  address: `0x${string}` | undefined;
}) {
  const router = useRouter();

  const [name, setName] = useState(() => {
    const savedName = localStorage.getItem("userName");
    return savedName ?? "Coinflip Expert";
  });

  useEffect(() => {
    const savedName = localStorage.getItem("userName");
    if (!savedName) {
      router.push("/profile");
    }
  }, [router]);

  const handleSave = (event: React.MouseEvent) => {
    event.preventDefault();
    console.log("Saving name:", name);
  };

  const handleButtonClick = () => {
    router.back();
  };

  const shortenAddress = (address: string) => {
    return address.slice(0, 6) + "..." + address.slice(-4);
  };

  const processMessage = (message: string) => {
    return message.split(" ").map((word, i) => {
      if (word.startsWith("0x") && word.length > 10) {
        return (
          <span key={i}>
            <span className="block sm:hidden">{shortenAddress(word)}</span>
            <span className="hidden sm:inline">{word}</span>
          </span>
        );
      }
      return word + " ";
    });
  };

  return (
    <div className="relative flex flex-col justify-center items-center min-h-screen overflow-hidden">
      <div className="relative text-center p-4 space-y-6 -z-5 w-full flex flex-col justify-center items-center gap-4">
        <div className="flex justify-center h-4 text-4xl">
          User Profile
        </div>
        <div className="relative w-24 h-24 md:w-64 md:h-64 mx-auto">
          <Image
            src="/coin-removebg.png"
            alt="Web3 Arcade Coin"
            className="object-contain"
            fill
          />
        </div>
        <div className="flex justify-center h-4 text-4xl">
          {name}
        </div>
        <hr className="border-t-2 max-w-xl border-gray-300 flex justify-center w-1/2" />
      </div>

      {address && (
        <p className="my-5 dark:text-white text-yellow-500">
          <span className="block md:hidden">
            Wallet {address?.slice(0, 6) + "..." + address?.slice(-4)}
          </span>
          <span className="hidden md:block">
            Wallet {address}
          </span>
        </p>
      )}
      <div className="w-full max-w-lg mt-4 rounded-xl p-6">
        <div className="custom-card h-auto px-8">
          <h2 className="text-2xl w-full text-gray-800">Transaction History</h2>
          <div className="space-y-1">
            {TRANSACTIONS.map((transaction, index) => (
              <div
                key={index}
                className="flex items-center justify-between pb-1 last-of-type:border-0 border-b border-gray-400"
              >
                <div className="flex items-center gap-4">
                  <p className="text-gray-800">
                    <span className="mr-1">You</span>
                    {processMessage(transaction.message)}
                  </p>
                </div>
                <p className="text-[#333] text-xs">{transaction.time} minutes ago</p>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-5 mb-5 h-auto">
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