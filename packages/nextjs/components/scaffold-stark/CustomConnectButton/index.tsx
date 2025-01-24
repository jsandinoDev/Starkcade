"use client";

// @refresh reset
import { Balance } from "../Balance";
import { AddressInfoDropdown } from "./AddressInfoDropdown";
import { AddressQRCodeModal } from "./AddressQRCodeModal";
import { WrongNetworkDropdown } from "./WrongNetworkDropdown";
import { useAutoConnect, useNetworkColor } from "~~/hooks/scaffold-stark";
import { useTargetNetwork } from "~~/hooks/scaffold-stark/useTargetNetwork";
import { getBlockExplorerAddressLink } from "~~/utils/scaffold-stark";
import { useAccount, useNetwork } from "@starknet-react/core";
import { Address } from "@starknet-react/chains";
import { useEffect, useState } from "react";
import ConnectModal from "./ConnectModal";

/**
 * Custom Connect Button (Simplified for Intuitiveness)
 */
export const CustomConnectButton = () => {
  useAutoConnect();
  const networkColor = useNetworkColor(); // Get the color of the network for UI styling
  const { targetNetwork } = useTargetNetwork(); // Get the target network configuration
  const { account, status, address: accountAddress } = useAccount(); // Get wallet account details
  const [accountChainId, setAccountChainId] = useState<bigint>(0n); // Store wallet's current chain ID
  const { chain } = useNetwork(); // Get the current network information

  const blockExplorerAddressLink = accountAddress
    ? getBlockExplorerAddressLink(targetNetwork, accountAddress)
    : undefined;

  useEffect(() => {
    if (account) {
      const getChainId = async () => {
        const chainId = await account.channel.getChainId();
        setAccountChainId(BigInt(chainId as string));
      };

      getChainId();
    }
  }, [account]);

  // Show connect modal when the wallet is disconnected
  if (status === "disconnected") return <ConnectModal />;

  // Show wrong network dropdown if the wallet is on the wrong network
  if (accountChainId !== targetNetwork.id) {
    return <WrongNetworkDropdown />;
  }

  // Handle connected state (redesigned)
  return (
    <div className="flex items-center gap-4">
      {/* Button showing balance and intuitive connection status */}
      <button className="flex items-center bg-gray-800 text-yellow-500 px-6 py-3 rounded-lg shadow-md hover:bg-gray-700">
        {/* Wallet status */}
        <div className="flex items-center gap-2">
          <Balance
            address={accountAddress as Address}
            className="text-sm font-semibold"
          />
          <span className="text-sm font-semibold">Connected</span>
        </div>
      </button>

      {/* Dropdown for additional wallet options */}
      <AddressInfoDropdown
        address={accountAddress as Address}
        displayName={""}
        ensAvatar={""}
        blockExplorerAddressLink={blockExplorerAddressLink}
      />
    </div>
  );
};
