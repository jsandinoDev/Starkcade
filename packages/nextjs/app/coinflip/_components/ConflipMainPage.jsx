"use client";

import { useEffect } from "react";

export const ConflipMainPage = () => {

    return (
        <div className="relative flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">

            {/* Overlay for effect */}
            <div className="absolute inset-0 bg-opacity-50 bg-black"></div>

            <div className="relative text-center text-white z-10 px-4">
                {/* Header Text */}
                <h1 className="text-5xl md:text-6xl font-extrabold mb-4 animate__fadeInUp delay-1000">
                    Welcome to the Arcade of the Future
                </h1>
                <p className="text-xl mb-8 animate__fadeInUp delay-2000">
                    Experience the world of Web3 gaming with decentralized play and rewards
                </p>

                {/* Image with animation */}
                <div className="mx-auto mb-10 animate__bounceInUp delay-3000">
                    <img
                        src="/coin-removebg.png"
                        alt="Web3 Arcade Coin"
                        className="w-72 h-72 md:w-96 md:h-96 mx-auto"
                    />
                </div>

                {/* Call-to-Action Button */}
                <button className="px-6 py-3 bg-yellow-500 text-black rounded-full text-lg font-semibold hover:bg-yellow-400 transition duration-300 animate__fadeInUp delay-4000">
                    Start Playing Now
                </button>
            </div>
        </div>
    )
}
