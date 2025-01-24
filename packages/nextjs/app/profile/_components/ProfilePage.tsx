"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ChevronDownIcon,
  ChevronRightIcon,
  CurrencyDollarIcon,
  CircleStackIcon,
  UsersIcon,
} from "@heroicons/react/24/solid";
import { ProfileEditForm } from "./ProfileEditForm";

const USERNAME_MAX_LENGTH = 20;

export const ProfilePage = () => {
  // Add simple behavior to the ProfilePage component that allows users to save their profile name limited to frontend.
  // To do - implement a more robust solution that saves the user's information
  const [userName, setUserName] = useState(() => {
    const savedBalance = localStorage.getItem("userName");
    return savedBalance ?? "No Set";
  });

  const [editProfile, setEditProfile] = useState<boolean>(false);
  const [profileDropdown, setProfileDropdown] = useState<boolean>(false);
  // Add simple behavior to the ProfilePage component that allows users to save their profile name limited to frontend.

  const handleSave = (newName: string) => {
    const trimmedName = newName.trim();
    if (
      !newName ||
      trimmedName.length === 0 ||
      trimmedName.length > USERNAME_MAX_LENGTH
    ) {
      alert("Please enter a valid name");
      return;
    }
    localStorage.setItem("userName", trimmedName);
    setUserName(trimmedName);
    setEditProfile(false);
  };
  const handeProfileDropdownClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    setProfileDropdown(!profileDropdown);
  };
  const PROFILE_LINKS = [
    { name: "Transaction History", href: "#" },
    { name: "Recent Flips", href: "#" },
    { name: "Switch Account", href: "#" },
    { name: "Leaderboard", href: "/leaderboard" },
    { name: "Disconnect", href: "#" },
  ];
  return (
    <div className="relative flex justify-center items-center min-h-screen text-white overflow-hidden">
      <div className="w-full absolute p-8 right-0 flex flex-col space-y-1.5 items-end justify-end top-0">
        <button
          onClick={(event) => {
            handeProfileDropdownClick(event);
          }}
          className="w-fit py-2 px-4 bg-yellow-500 text-black text-sm font-bold rounded-full hover:bg-yellow-400 transition"
        >
          Profile
        </button>
        {profileDropdown && (
          <div className="z-[9999] flex flex-col space-y-2 max-w-[200px] w-full min-w-[180px]">
            <div className="bg-yellow-500/10 rounded-lg px-2 border border-yellow-600/75 w-full flex flex-col items-start justify-start space-y-0 divide-y divide-yellow-600/50">
              <div className="w-full items-center justify-between flex flex-row space-x-4 py-1.5">
                <div className="flex flex-row items-center justify-start space-x-2">
                  <CircleStackIcon className="w-3 h-3 text-yellow-500" />
                  <span className="text-yellow-500 text-xs font-normal">
                    1,234
                  </span>
                </div>
                <span className="text-white text-[10px] text-center font-bold">
                  Total Flips
                </span>
              </div>
              <div className="w-full items-center justify-between flex flex-row space-x-4 py-1.5">
                <div className="flex flex-row items-center justify-start space-x-2">
                  <CurrencyDollarIcon className="w-3 h-3 text-yellow-500" />
                  <span className="text-yellow-500 text-xs font-normal">
                    $12,345.67
                  </span>
                </div>
                <span className="text-white text-[10px] text-center font-bold">
                  Total Winnings
                </span>
              </div>
              <div className="w-full items-center justify-between flex flex-row space-x-4 py-1.5">
                <div className="flex flex-row items-center justify-start space-x-2">
                  <UsersIcon className="w-3 h-3 text-yellow-500" />
                  <span className="text-yellow-500 text-xs font-normal">
                    567
                  </span>
                </div>
                <span className="text-white text-[10px] text-center font-bold">
                  Active Users
                </span>
              </div>
            </div>
            <ul className="w-full flex flex-col -space-y-0.5">
              {PROFILE_LINKS.map((link, index) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="w-full py-2 px-4 border border-[#999] cursor-pointer shadow-sm drop-shadow flex flex-row space-x-2 justify-between items-center rounded-md bg-[#fefefe]"
                >
                  <span className="font-semibold text-sm text-[#333]">
                    {link.name}
                  </span>
                  <ChevronRightIcon className="w-4 h-4 text-[#000]" />
                </Link>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="relative text-center p-4 space-y-6 -z-5 w-full flex flex-col justify-center items-center gap-4">
        <div className="flex justify-center h-4 text-white text-4xl">
          {userName}
        </div>
        <img
          src="/coin-removebg.png"
          alt="Web3 Arcade Coin"
          className="w-24 h-24 md:w-64 md:h-64 flex justify-center"
        />
        {editProfile ? (
          <ProfileEditForm
            userName={userName}
            handleCancel={() => {
              setEditProfile(false);
            }}
            handleSave={handleSave}
          />
        ) : (
          <button
            className="w-[30%] py-3 bg-yellow-500 text-black font-bold rounded-lg hover:bg-yellow-400 transition"
            onClick={() => {
              setEditProfile(true);
            }}
          >
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
};
