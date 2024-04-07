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
    <div className="dark:text-white flex items-center space-x-6">
      <a href="/objets" className="hover:text-primary hover:text-[#779643]">
        OBJETS
      </a>
      <a href="/panoplies" className="dark:hover:text-primary hover:text-[#779643]">
        PANOPLIES
      </a>
      <a href="/quetes" className="hover:text-primary hover:text-[#779643]">
        QUETES
      </a>
      <a href="/succes" className="hover:text-primary hover:text-[#779643]">
        SUCCES
      </a>
      <a href="/donjons" className="hover:text-primary hover:text-[#779643]">
        DONJONS
      </a>
      <a href="/items" className="hover:text-[#779643]">ITEMS</a>
      <a href="/mobs" className="hover:text-[#779643]">MOBS</a>
      <div
        className="relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <a
          className="text-black hover:text-primary focus:outline-none hover:text-[#779643]"
          onMouseEnter={handleMenuMouseEnter}
          onMouseLeave={handleMenuMouseLeave}
          href="/outils"
        >
          OUTILS
        </a>
        {(isHovered || isMenuHovered) && (
          <div
            className="absolute bg-[#cfc4ab] dark:bg-dark-3 rounded-md py-2 mt-4 space-y-2 w-48 z-10 border border-black"
            onMouseEnter={handleMenuMouseEnter}
            onMouseLeave={handleMenuMouseLeave}
          >
            <a
              href="/outils/portails"
              className="block px-4 py-2 text-black hover:hover:bg-[#779643] dark:hover:bg-[#779643]"
            >
              PORTAILS
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-black hover:hover:bg-[#779643]   dark:hover:bg-[#779643]"
            >
              CARTE RESSOURCES
            </a>
            <a
              href="/outils/xp-metiers"
              className="block px-4 py-2 text-black hover:hover:bg-[#779643]   dark:hover:bg-[#779643]"
            >
              XP METIERS
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavbarLinks;
