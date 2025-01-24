import React from "react";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";

const ToggleMode = () => {
  const { setTheme, theme } = useTheme(); 
  const isDarkMode = theme === "dark"; 

  const toggleMode = () => {
    theme == "dark" ? setTheme("light") : setTheme("dark"); 
  };

  console.log("Current Theme:", theme);

  return (
    <button className="btn btn-ghost" onClick={toggleMode}>
      {isDarkMode ? (
        <MoonIcon className="h-6 w-6 text-yellow-400" />
      ) : (
        <SunIcon className="h-6 w-6 text-yellow-400" />
      )}
    </button>
  );
};

export default ToggleMode;
