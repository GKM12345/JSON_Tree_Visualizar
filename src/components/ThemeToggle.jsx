import { useEffect, useState } from "react";
import DarkIcon from "../assets/toggleDark.svg";
import LightIcon from "../assets/toggleLight.svg";

export default function ThemeToggle() {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="w-10 h-10 rounded-full flex items-center justify-center bg-white dark:bg-slate-800 border shadow-sm"
      aria-label="Toggle theme"
    >
      <img
        src={theme === "dark" ? LightIcon : DarkIcon}
        alt={theme === "dark" ? "Dark mode" : "Light mode"}
      />
    </button>
  );
}
