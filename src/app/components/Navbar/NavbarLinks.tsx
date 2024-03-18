"use client";
import { useState } from "react";

const NavbarLinks = () => {
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
    <div className="flex items-center space-x-4">
      <a href="#" className="text-white hover:text-gray-300">
        Objets
      </a>
      <a href="#" className="text-white hover:text-gray-300">
        Panoplies
      </a>
      <a href="#" className="text-white hover:text-gray-300">
        Quêtes
      </a>
      <a href="#" className="text-white hover:text-gray-300">
        Succès
      </a>
      <a href="#" className="text-white hover:text-gray-300">
        Donjons
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
            className="absolute bg-[#a7a18d] dark:bg-[#494944] rounded-md py-2 mt-4 space-y-2 w-48 z-10"
            onMouseEnter={handleMenuMouseEnter}
            onMouseLeave={handleMenuMouseLeave}
          >
            <a
              href="/tools/portails"
              className="block px-4 py-2 text-white hover:bg-[#ec8e02] dark:hover:bg-[#779643]"
            >
              Portails
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-white hover:bg-[#ec8e02] dark:hover:bg-[#779643]"
            >
              Carte Ressources
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-white hover:bg-[#ec8e02] dark:hover:bg-[#779643]"
            >
              Xp Métiers
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavbarLinks;
