"use client";

import React from "react";
import Frame from "../ui/Frame";

interface UniqueAchievementProps {
  id: number;
  name: string;
  description: string;
  level: number;
  classname?: string;
}

export const UniqueAchievement: React.FC<UniqueAchievementProps> = ({
  name,
  id,
  description,
  level,
  classname,
}) => {
  const handleAchievementClick = (achievementName: string) => {
    window.location.href = `${window.location.pathname}/${id}`;
  };
  return (
    <>
      <div className={classname} onClick={() => handleAchievementClick(name)}>
        <Frame width="12rem" height="5rem" key={id}>
          <h1 className="text-primary">{name}</h1>
          <h1 className="text-secondary">niv.{level}</h1>
        </Frame>
      </div>
    </>
  );
};
