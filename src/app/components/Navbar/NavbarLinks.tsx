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
      <a href="/items" className="hover:text-[#779643]">OBJETS</a>
      <a href="/mobs" className="hover:text-[#779643]">MONSTRES</a>
      <a href="/forgemagie" className="hover:text-[#779643]">FORGEMAGIE</a>
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
      <div
        className="relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
      </div>
    </div>
  );
};

export default NavbarLinks;
