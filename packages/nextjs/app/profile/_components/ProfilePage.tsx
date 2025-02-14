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
import Image from "next/image";

const USERNAME_MAX_LENGTH = 20;

export const ProfilePage = () => {
  const [userName, setUserName] = useState(() => {
    const savedBalance = localStorage.getItem("userName");
    return savedBalance ?? "No Set";
  });

  const [editProfile, setEditProfile] = useState<boolean>(false);
  const [profileDropdown, setProfileDropdown] = useState<boolean>(false);

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
      <div className="relative text-center p-4 space-y-6 -z-5 w-full flex flex-col justify-center items-center gap-4">
        <div className="flex justify-center h-4 text-white text-4xl">
          {userName}
        </div>
        <div className="relative w-48 h-48 md:w-64 md:h-64 mx-auto">
            <Image
              src="/coin-removebg.png"
              alt="Web3 Arcade Coin"
              className="object-contain"
              fill
            />
          </div>
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
