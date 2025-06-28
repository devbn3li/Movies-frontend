"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { MdDarkMode, MdLightMode } from "react-icons/md";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="relative inline-flex items-center h-8 rounded-full w-14 bg-gray-300 dark:bg-gray-700 transition-colors"
    >
      <span
        className={`${
          theme === "dark" ? "translate-x-7" : "translate-x-1"
        } flex items-center justify-center w-6 h-6 transform bg-white dark:bg-black rounded-full transition-transform`}
      >
        {theme === "dark" ? <MdLightMode /> : <MdDarkMode />}
      </span>
    </button>
  );
}
