/* eslint-disable @next/next/no-img-element */
import React from "react";

interface ThemeSwitcherProps {
  theme: "dark" | "light";
}

const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ theme }) => {
  const darkImagePath = "/chemin/vers/limage_sombre.png";
  const lightImagePath = "/chemin/vers/limage_claire.png";

  const imagePath = theme === "dark" ? darkImagePath : lightImagePath;

  return (
    <>
      <button>
        <img src={imagePath} alt="theme" />
      </button>
    </>
  );
};

export default ThemeSwitcher;
