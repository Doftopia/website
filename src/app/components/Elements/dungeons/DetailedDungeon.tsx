"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { UniqueAchievement } from "@/app/components/Elements/Achievement/UniqueAchievement";

interface Achievement {
  AchievementId: number;
  AchievementName: string;
  AchievementDesc: string;
  AchievementLevel: number;
  AchievementImg: string;
}

export const DetailedDungeon: React.FC = () => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const path = typeof window !== "undefined" ? window.location.pathname : "";
  const dungeonName = path.split("/").pop();

  useEffect(() => {
    const fetchDungeons = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/achievements?name=${dungeonName}`
        );
        const uniqueAchievements: Achievement[] = [];
        const encounteredIds: Set<number> = new Set();
        response.data.data.forEach((achievement: Achievement) => {
          if (!encounteredIds.has(achievement.AchievementId)) {
            uniqueAchievements.push(achievement);
            encounteredIds.add(achievement.AchievementId);
          }
        });
        setAchievements(uniqueAchievements);
      } catch (error) {
        console.error("Error fetching dungeons list");
      }
    };
    fetchDungeons();
  }, [dungeonName]);

  const handleAchievementClick = (achievementId: number) => {
    window.location.href = `/succes/donjons/${achievementId}`;
  };

  return (
    <>
      <div className="grid grid-cols-5 gap-y-[5rem] w-fit mx-auto">
        {achievements.map((achievement) => (
          <div
            key={achievement.AchievementId}
            className="w-fit hover:cursor-pointer"
            onClick={() => handleAchievementClick(achievement.AchievementId)}
          >
            <UniqueAchievement
              img={achievement.AchievementImg}
              id={achievement.AchievementId}
              name={achievement.AchievementName}
              description={achievement.AchievementDesc}
              level={achievement.AchievementLevel}
              classname="hover:bg-blue"
            />
          </div>
        ))}
      </div>
    </>
  );
};
