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
      <Frame width="fit" height="6rem" key={id}>
        <div
          className={`grid h-full grid-cols-2 border  ${
            isHovered ? "border-green" : "border-secondary border-opacity-50"
          }`}
        >
          <Image
            src={img ? img : ""}
            alt=""
            width={78}
            height={78}
            className={`absolute z-0 mt-[0.2rem] col-span-1 ${
              isHovered ? "opacity-100" : "opacity-35"
            }`}
          />
          <div className="ml-[6rem]">
            <h1
              className={`${isHovered ? "text-green" : "text-primary"} text-sm`}
            >
              {name}
            </h1>
            <h1
              className={`${
                isHovered ? "text-blue" : "text-primary"
              } text-xs italic`}
            >
              niv.{level}
            </h1>
          </div>
        </div>
      </Frame>
    </div>
  );
};
