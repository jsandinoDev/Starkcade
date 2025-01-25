"use client";

import { FLIPS } from "../../assets/constants";
import { Connector, useConnect } from "@starknet-react/core";
import { useRef, useState } from "react";
import Wallet from "~~/components/scaffold-stark/CustomConnectButton/Wallet";
import { useLocalStorage } from "usehooks-ts";
import { burnerAccounts } from "~~/utils/devnetAccounts";
import { BurnerConnector } from "~~/services/web3/stark-burner/BurnerConnector";
import { useTheme } from "next-themes";
import { LAST_CONNECTED_TIME_LOCALSTORAGE_KEY } from "~~/utils/Constants";
import { BlockieAvatar } from "~~/components/scaffold-stark";
import GenericModal from "~~/components/scaffold-stark/CustomConnectButton/GenericModal";

export const ConflipConnectPage = () => {
  const loader = ({ src }: { src: string }) => {
    return src;
  };

  const modalRef = useRef<HTMLInputElement>(null);
  const [isBurnerWallet, setIsBurnerWallet] = useState(false);
  const { resolvedTheme } = useTheme();
  const isDarkMode = resolvedTheme === "dark";
  const { connectors, connect, error, status, ...props } = useConnect();
  const [_, setLastConnector] = useLocalStorage<{ id: string; ix?: number }>(
    "lastUsedConnector",
    { id: "" },
    {
      initializeWithValue: false,
    }
  );
  const [, setLastConnectionTime] = useLocalStorage<number>(
    LAST_CONNECTED_TIME_LOCALSTORAGE_KEY,
    0
  );

  const handleCloseModal = () => {
    if (modalRef.current) {
      modalRef.current.checked = false;
    }
  };

  function handleConnectWallet(
    e: React.MouseEvent<HTMLButtonElement>,
    connector: Connector
  ): void {
    if (connector.id === "burner-wallet") {
      setIsBurnerWallet(true);
      return;
    }
    connect({ connector });
    setLastConnector({ id: connector.id });
    setLastConnectionTime(Date.now());
    handleCloseModal();
  }

  function handleConnectBurner(
    e: React.MouseEvent<HTMLButtonElement>,
    ix: number
  ) {
    const connector = connectors.find(
      (it) => it.id == "burner-wallet"
    ) as BurnerConnector;
    if (connector) {
      connector.burnerAccount = burnerAccounts[ix];
      connect({ connector });
      setLastConnector({ id: connector.id, ix });
      setLastConnectionTime(Date.now());
      handleCloseModal();
    }
  }

  return (
    <div className="relative flex flex-col justify-center items-center pb-20">
      <h1 className="text-lg font-semibold mt-3 pt-4">#1 Starknet Coinflip</h1>

      <div className="flex justify-center mt-3">
        <img
          src="/coin-removebg.png"
          alt="Web3 Arcade Coin"
          className="w-48 h-48 md:w-64 md:h-64"
        />
      </div>

      <div className="flex justify-center mt-6">
        <label
          htmlFor="connect-modal"
          className="w-64 py-3 bg-yellow-500 text-black font-bold rounded-lg hover:bg-yellow-400 transition text-center"
        >
          Connect Wallet
        </label>

        <input
          ref={modalRef}
          type="checkbox"
          id="connect-modal"
          className="modal-toggle"
        />
        <GenericModal modalId="connect-modal">
          <>
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold">
                {isBurnerWallet ? "Choose account" : "Connect a Wallet"}
              </h3>
              <label
                onClick={() => setIsBurnerWallet(false)}
                htmlFor="connect-modal"
                className="btn btn-ghost btn-sm btn-circle cursor-pointer"
              >
                ✕
              </label>
            </div>
            <div className="flex flex-col flex-1 lg:grid">
              <div className="flex flex-col gap-4 w-full px-8 py-10">
                {!isBurnerWallet ? (
                  connectors.map((connector, index) => (
                    <Wallet
                      key={connector.id || index}
                      connector={connector}
                      loader={loader}
                      handleConnectWallet={handleConnectWallet}
                    />
                  ))
                ) : (
                  <div className="flex flex-col pb-[20px] justify-end gap-3">
                    <div className="h-[300px] overflow-y-auto flex w-full flex-col gap-2">
                      {burnerAccounts.map((burnerAcc, ix) => (
                        <div
                          key={burnerAcc.publicKey}
                          className="w-full flex flex-col"
                        >
                          <button
                            className={`hover:bg-gradient-modal border rounded-md text-neutral py-[8px] pl-[10px] pr-16 flex items-center gap-4 ${
                              isDarkMode ? "border-[#385183]" : ""
                            }`}
                            onClick={(e) => handleConnectBurner(e, ix)}
                          >
                            <BlockieAvatar
                              address={burnerAcc.accountAddress}
                              size={35}
                            />
                            {`${burnerAcc.accountAddress.slice(
                              0,
                              6
                            )}...${burnerAcc.accountAddress.slice(-4)}`}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </>
        </GenericModal>
      </div>

      {/* Recent Flips */}
      <div className="border-t border-gray-500 w-96 mt-6"></div>
      <h2 className="mt-7 text-lg font-semibold tracking-wide">Recent Flips</h2>
      <div className="w-full max-w-lg mt-4 rounded-xl p-4">
        <div className="space-y-2">
          {FLIPS.map((flip, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={flip.icon}
                  alt={`${flip.user} icon`}
                  className="w-12 h-10 rounded-full"
                />
                <p className="text-gray-800">
                  <span className="font-bold">{flip.user}</span> {flip.message}
                </p>
              </div>
              {/* Time */}
              <span className="text-sm text-gray-500">{flip.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};