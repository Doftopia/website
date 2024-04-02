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
      <a href="/objets" className="hover:text-primary hover:text-[#779643] hover:font-bold">
        Objets
      </a>
      <a href="/panoplies" className="dark:hover:text-primary hover:text-[#779643] hover:font-bold">
        Panoplies
      </a>
      <a href="/quetes" className="hover:text-primary hover:text-[#779643] hover:font-bold">
        Quêtes
      </a>
      <a href="/succes" className="hover:text-primary hover:text-[#779643] hover:font-bold">
        Succès
      </a>
      <a href="/donjons" className="hover:text-primary hover:text-[#779643] hover:font-bold">
        Donjons
      </a>
      <a href="/items" className="hover:text-[#779643] hover:font-bold">Items</a>
      <a href="/mobs" className="hover:text-[#779643] hover:font-bold">Mobs</a>
      <div
        className="relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <a
          className="text-white hover:text-primary focus:outline-none hover:text-[#779643] hover:font-bold"
          onMouseEnter={handleMenuMouseEnter}
          onMouseLeave={handleMenuMouseLeave}
          href="/outils"
        >
          Outils
        </a>
        {(isHovered || isMenuHovered) && (
          <div
            className="absolute bg-gray-900 dark:bg-dark-3 rounded-md py-2 mt-4 space-y-2 w-48 z-10 border border-black"
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
