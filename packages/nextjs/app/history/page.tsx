"use client"
import { useAccountConnection } from "~~/hooks/starkcade/useAccountConnection";
import TransactionHistory from "./_components/TransactionHistory";
import type { NextPage } from "next";
import TransactionConnectPage from "./_components/TransactionConnectPage";

const Debug: NextPage = () => {
  const { accountAddress, status } = useAccountConnection();
  return (
    <>
      { status === "connected" ? <TransactionHistory address={accountAddress} /> : <TransactionConnectPage /> }
    </>   
  );
};

export default Debug;

