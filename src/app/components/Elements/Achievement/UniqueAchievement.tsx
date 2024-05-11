"use client";

import React, { useState } from "react";
import Frame from "../../ui/Frame";
import Image from "next/image";

interface UniqueAchievementProps {
  id: number;
  name: string;
  description: string;
  level: number;
  classname?: string;
  img?: string;
}

export const UniqueAchievement: React.FC<UniqueAchievementProps> = ({
  name,
  id,
  description,
  level,
  classname,
  img,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleAchievementClick = (achievementName: string) => {
    window.location.href = `${window.location.pathname}/${id}`;
  };

  return (
    <div
      className="hover:cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => handleAchievementClick(name)}
    >
      <Frame width="12rem" height="6rem" key={id}>
        <Image
          src={img ? img : ""}
          alt=""
          width={45}
          height={45}
          className={`absolute z-0 mt-[0.8rem] ${
            isHovered ? "opacity-100" : "opacity-35"
          }`}
        />
        <div className="ml-[4rem]">
          <h1 className="text-primary">{name}</h1>
          <h1 className="text-secondary">niv.{level}</h1>
        </div>
      </Frame>
    </div>
  );
};
