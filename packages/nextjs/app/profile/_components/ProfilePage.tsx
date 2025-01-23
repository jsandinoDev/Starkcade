"use client";

import React from 'react'
import Link from "next/link";
import { ChevronDownIcon, ChevronRightIcon, CurrencyDollarIcon, CircleStackIcon, UsersIcon } from "@heroicons/react/24/solid";


export const ProfilePage = () => {
    const [profileName, setProfileName] = React.useState('USER PROFILE');
    const [name, setName] = React.useState('');
    const [profileDropdown, setProfileDropdown] = React.useState(false);
    // Add simple behavior to the ProfilePage component that allows users to save their profile name limited to frontend.
    const handleSave = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>{
        e.preventDefault();
        setProfileName(name);
        setName('');
    }
    const handeProfileDropdownClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>{
        e.preventDefault();
        setProfileDropdown(!profileDropdown);
    }
    const PROFILE_LINKS = [
        {name: "Transaction History", href: "#"},
        {name: "Recent Flips", href: "#"},
        {name: "Switch Account", href: "#"},
        {name: "Leaderboard", href: "/leaderboard"},
        {name: "Disconnect", href: "#"},
    ];
    return (
        <div className="relative flex justify-center items-center min-h-screen text-white overflow-hidden">
            <div className="w-full absolute p-8 right-0 flex flex-col space-y-1.5 items-end justify-end top-0">
                <button  onClick={(event) => {
                    handeProfileDropdownClick(event);
                }} className="w-fit py-2 px-4 bg-yellow-500 text-black text-sm font-bold rounded-full hover:bg-yellow-400 transition">Profile</button>
                {profileDropdown && (
                    <div className="z-[9999] flex flex-col space-y-2 max-w-[200px] w-full min-w-[180px]">
                        <div className="bg-yellow-500/10 rounded-lg px-2 border border-yellow-600/75 w-full flex flex-col items-start justify-start space-y-0 divide-y divide-yellow-600/50">
                            <div className="w-full items-center justify-between flex flex-row space-x-4 py-1.5">
                                <div className="flex flex-row items-center justify-start space-x-2">
                                    <CircleStackIcon className="w-3 h-3 text-yellow-500" />
                                    <span className="text-yellow-500 text-xs font-normal">1,234</span>
                                </div>
                                <span className="text-white text-[10px] text-center font-bold">Total Flips</span>
                            </div>
                            <div className="w-full items-center justify-between flex flex-row space-x-4 py-1.5">
                                <div className="flex flex-row items-center justify-start space-x-2">
                                    <CurrencyDollarIcon className="w-3 h-3 text-yellow-500" />
                                <span className="text-yellow-500 text-xs font-normal">$12,345.67</span>
                                </div>
                                <span className="text-white text-[10px] text-center font-bold">Total Winnings</span>
                            </div>
                            <div className="w-full items-center justify-between flex flex-row space-x-4 py-1.5">
                                <div className="flex flex-row items-center justify-start space-x-2">
                                    <UsersIcon className="w-3 h-3 text-yellow-500" />
                                <span className="text-yellow-500 text-xs font-normal">567</span>
                                </div>
                                <span className="text-white text-[10px] text-center font-bold">Active Users</span>
                            </div>
                        </div>
                        <ul className="w-full flex flex-col -space-y-0.5">
                        {PROFILE_LINKS.map((link, index) => (
                        <Link key={link.name} href={link.href} className="w-full py-2 px-4 border border-[#999] cursor-pointer shadow-sm drop-shadow flex flex-row space-x-2 justify-between items-center rounded-md bg-[#fefefe]">
                            <span className="font-semibold text-sm text-[#333]">{link.name}</span>
                            <ChevronRightIcon className="w-4 h-4 text-[#000]"/>
                        </Link>
                        ))}
                        </ul>
                    </div>
                )}
            </div>
            <div className="relative text-center p-4 space-y-6 -z-5 w-full flex flex-col justify-center items-center gap-4">
                {/* User name  */}
                <div className='flex justify-center h-4 text-white text-4xl'>
                    {profileName}
                </div>
                <img
                    src="/coin-removebg.png"
                    alt="Web3 Arcade Coin"
                    className="w-24 h-24 md:w-64 md:h-64 flex justify-center"
                />
                <input 
                    type='text' 
                    placeholder='Coinflip Expert' 
                    onChange={(event) => {
                        setName(event.target.value);
                    }}
                    value={name}
                    className='w-64 h-12 text-yellow-500 text-center bg-transparent rounded-md text-lg border border-white placeholder-yellow-500 focus:outline-none focus:border-yellow-500 caret-yellow-500' 
                />
                <hr className="border-t-2 border-gray-300 flex justify-center w-1/2" />
                {/* Save button  */}
                <button className="w-1/2 py-3 bg-yellow-500 text-black font-bold rounded-lg hover:bg-yellow-400 transition" onClick={(event) => {
                    handleSave(event);
                }}>
                    Save
                </button>
            </div>
        </div>
    );
}
