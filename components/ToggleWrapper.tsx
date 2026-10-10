"use client";
import { useDarkMode } from "@/context/ThemeContent";
import { Moon, Sun } from "lucide-react";
import React from "react";

const ToggleWrapper = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  return (
    <div onClick={() => toggleDarkMode()}>
      {!isDarkMode ? (
        <button
          type="button"
          aria-label="toggle"
          className="relative flex h-12 w-12 hover:bg-stone-50 transistion-all border border-stone-100 cursor-pointer items-center justify-center rounded-full transition"
        >
          <Sun size={20} strokeWidth={1.8} />
        </button>
      ) : (
        <button
          type="button"
          aria-label="toggle"
          className="relative flex h-12 w-12 hover:bg-stone-50 transistion-all border border-stone-100 cursor-pointer items-center justify-center rounded-full transition"
        >
          <Moon size={20} strokeWidth={1.8} />
        </button>
      )}
    </div>
  );
};

export default ToggleWrapper;
