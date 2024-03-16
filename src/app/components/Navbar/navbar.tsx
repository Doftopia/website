"use client";

import React, { useState } from "react";
import ThemeSwitcher from "./ThemeSwitcher";

interface NavbarProps {
  pageName: string;
}

const Navbar = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isMenuHovered, setIsMenuHovered] = useState(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    clearTimeout(timeoutId!);
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    const id = setTimeout(() => {
      setIsHovered(false);
    }, 250);
    setTimeoutId(id);
  };

  const handleMenuMouseEnter = () => {
    clearTimeout(timeoutId!);
    setIsMenuHovered(true);
  };

  const handleMenuMouseLeave = () => {
    setIsMenuHovered(false);
  };

  return (
    <nav className="bg-gray-800 w-full p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <a href="#" className="text-white hover:text-gray-300">
            Accueil
          </a>
          <a href="#" className="text-white hover:text-gray-300">
            À Propos
          </a>
          <a href="#" className="text-white hover:text-gray-300">
            Quêtes
          </a>
          <div
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <button
              className="text-white hover:text-gray-300 focus:outline-none"
              onMouseEnter={handleMenuMouseEnter}
              onMouseLeave={handleMenuMouseLeave}
            >
              Outils
            </button>
            {(isHovered || isMenuHovered) && (
              <div
                className="absolute bg-gray-700 rounded-md py-2 mt-2 space-y-2 w-48 z-10"
                onMouseEnter={handleMenuMouseEnter}
                onMouseLeave={handleMenuMouseLeave}
              >
                <a
                  href="#"
                  className="block px-4 py-2 text-white hover:bg-gray-600"
                >
                  Outil 1
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-white hover:bg-gray-600"
                >
                  Maps
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-white hover:bg-gray-600"
                >
                  Jobs Calculator
                </a>
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <a
            href="/sign-in"
            className="text-white hover:text-gray-300 focus:outline-none"
          >
            Login
          </a>
          <ThemeSwitcher />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
