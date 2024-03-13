/* eslint-disable @next/next/no-img-element */
import React from "react";
import { useState } from "react";

interface ThemeSwitcherProps {}

const ThemeSwitcher: React.FC<ThemeSwitcherProps> = () => {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  const handleThemeSwitch = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
  };

  const darkImagePath = "/tofu_noir.png";
  const lightImagePath = "/tofu.png";

  const imagePath = theme === "dark" ? darkImagePath : lightImagePath;

  return (
    <>
      <button onClick={handleThemeSwitch}>
        <img src={imagePath} alt="theme" width={45} height={45} />
      </button>
    </>
  );
};

export default ThemeSwitcher;
