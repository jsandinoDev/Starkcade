import type { NextPage } from "next";
import { getMetadata } from "~~/utils/scaffold-stark/getMetadata";
import { ResultScreen } from "./_components/ResultScreen";

export const metadata = getMetadata({
  title: "Game Result",
  description: "See your game result!",
});

const Result: NextPage = () => {
  return (
    <>
      <ResultScreen />
    </>
  );
};

export default Result; 