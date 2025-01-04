export const WaitApprovalPage = () => {
    return (
        <div className="relative flex justify-center items-center min-h-screen text-white overflow-hidden">
            <div className="relative text-center p-4 space-y-6 -z-5 w-full flex flex-col justify-center items-center gap-8">
                <img
                    src="/coin-removebg.png"
                    alt="Web3 Arcade Coin"
                    className="w-24 h-24 md:w-64 md:h-64 flex justify-center"
                />
                <div className='flex justify-center h-4 text-white text-sm uppercase'>
                    Waiting for Approval
                </div>
                <svg width="158" height="42" viewBox="0 0 158 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M73.3571 0.708328H90.2857V41.4226H73.3571V0.708328ZM45.1429 0.708328H11.2857C4.51429 0.708328 0 4.10118 0 7.49404V34.6369C0 38.0298 4.51429 41.4226 11.2857 41.4226H45.1429C51.9143 41.4226 56.4286 38.0298 56.4286 34.6369V21.0655H39.5V31.244H16.9286V10.8869H56.4286V7.49404C56.4286 4.10118 51.9143 0.708328 45.1429 0.708328ZM158 10.8869V0.708328H107.214V41.4226H124.143V27.8512H146.714V17.6726H124.143V10.8869H158Z" fill="#FEF7FF" />
                </svg>
            </div>
        </div>
    );
}
