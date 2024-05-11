"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Frame from "../../ui/Frame";

interface Dungeon {
  name: string;
  lvl: string;
}

interface Achievement {
  AchievementId: number;
  AchievementName: string;
  AchievementDesc: string;
  AchievementLevel: number;
}

export const DungeonsList: React.FC = () => {
  const [dungeons, setDungeons] = useState<Achievement[]>([]);

  useEffect(() => {
    const fetchDungeons = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/achievements?category=donjons"
        );
        setDungeons(response.data.data);
      } catch (error) {
        console.error("Error fetching dungeons list");
      }
    };
    fetchDungeons();
  }, []);

  const handleDungeonClick = (dungeonName: string) => {
    window.location.href = `${window.location.pathname}/${dungeonName}`;
  };
  return (
    <>
      <div className="px-4">
        <h1 className="text-white p-2">Liste des donjons</h1>
        <ul>
          <div className="grid grid-cols-5">
            {dungeons.map((achievement) => (
              <div
                key={achievement.AchievementId}
                onClick={() =>
                  handleDungeonClick(
                    achievement.AchievementName.replace("(Solo)", "")
                  )
                }
                className="hover:cursor-pointer w-fit"
              >
                <Frame width="12rem" height="5rem">
                  <h1 className="text-primary">
                    {achievement.AchievementName.replace("(Solo)", "")}
                  </h1>
                  <h1 className="text-secondary">
                    niv.{achievement.AchievementLevel}
                  </h1>
                </Frame>
              </div>
            ))}
          </div>
        </ul>
      </div>
    </>
  );
};
