import type { NextPage } from "next";
import { getMetadata } from "~~/utils/scaffold-stark/getMetadata";
import { LoseScreen } from "./_components/LoseScreen";


export const metadata = getMetadata({
  title: "Lose Screen",
  description: "Better luck next time!",
});

const Lose: NextPage = () => {
  return (
    <>
      <LoseScreen />
    </>
  );
};

export default Lose; 