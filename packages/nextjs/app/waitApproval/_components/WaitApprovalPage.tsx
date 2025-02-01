import ApprovalSVG from "./ApprovalSVG";
import Image from "next/image";

export const WaitApprovalPage = () => {
    return (
        <div className="relative flex justify-center items-center min-h-screen text-white overflow-hidden">
            <div className="relative text-center p-4 space-y-6 -z-5 w-full flex flex-col justify-center items-center gap-8">
                <div className="relative w-72 h-72 md:w-96 md:h-96 mx-auto">
                    <Image
                        src="/coin-removebg.png"
                        alt="Web3 Arcade Coin"
                        className="object-contain"
                        fill
                        />
                 </div>
                <div className='flex justify-center h-4 text-white text-sm uppercase'>
                    Waiting for Approval
                </div>
                <ApprovalSVG />
            </div>
        </div>
    );
}
