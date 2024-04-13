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
    <div className="dark:text-white flex items-center space-x-4">
      <a href="/items" className="hover:text-[#779643]">
        OBJETS
      </a>
      <a href="/mobs" className="hover:text-[#779643]">
        MONSTRES
      </a>
      <a href="/forgemagie" className="hover:text-[#779643]">
        FORGEMAGIE
      </a>
      <a href="/panoplies" className="dark:hover:text-primary">
        Panoplies
      </a>
      <a href="/quetes" className="hover:text-primary">
        Quêtes
      </a>
      <a href="/succes" className="hover:text-primary">
        Succès
      </a>
      <a href="/donjons" className="hover:text-primary">
        Donjons
      </a>
      <div
        className="relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <a
          className="text-white hover:text-primary focus:outline-none"
          onMouseEnter={handleMenuMouseEnter}
          onMouseLeave={handleMenuMouseLeave}
          href="/outils"
        >
          Outils
        </a>
        {(isHovered || isMenuHovered) && (
          <div
            className="absolute bg-[#a7a18d] dark:bg-dark-3 rounded-md py-2 mt-4 space-y-2 w-48 z-10"
            onMouseEnter={handleMenuMouseEnter}
            onMouseLeave={handleMenuMouseLeave}
          >
            <a
              href="/outils/portails"
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
              href="/outils/xp-metiers"
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
