import type { NextPage } from "next";
import { ConflipMainPage } from './_components/ConflipMainPage'
import { getMetadata } from "~~/utils/scaffold-stark/getMetadata";

export const metadata = getMetadata({
  title: "Coninflip",
  description:
    "Interactive and decentralized CoinFlip game built on the Starknet blockchain.",
});

const Debug: NextPage = () => {
  return (
    <>
        <ConflipMainPage />
    </>
  );
};

export default Debug;
