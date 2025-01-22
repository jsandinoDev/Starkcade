import type { NextPage } from "next";
import { getMetadata } from "~~/utils/scaffold-stark/getMetadata";
import { WinScreen } from "./_components/WinScreen";


export const metadata = getMetadata({
  title: "Win Screen",
  description: "You won the game!",
});

const Win: NextPage = () => {
  return (
    <>
      <WinScreen />
    </>
  );
};

export default Win; 