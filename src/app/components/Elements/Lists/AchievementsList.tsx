"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { UniqueAchievement } from "../Achievement/UniqueAchievement";

interface Achievement {
  AchievementId: number;
  AchievementName: string;
  AchievementDesc: string;
  AchievementLevel: number;
  AchievementImg: string;
}

export const AchievementsList: React.FC = ({}) => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const path = typeof window !== "undefined" ? window.location.pathname : "";

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        let url = "";
        const reqUrl = "http://localhost:3001/achievements?categoryId=";
        if (path === "/succes") {
          url = "http://localhost:3001/achievements";
        } else {
          const categoryName = path.split("/").pop();
          url = `http://localhost:3001/achievements?category=${categoryName}`;
        }
        const response = await axios.get(url);
        setAchievements(response.data.data);
      } catch (error) {
        console.error("Error fetching achievements:", error);
      }
    };

    fetchAchievements();
  }, [path]);

  const handleAchievementClick = (achievementId: number) => {
    window.location.href = `${window.location.pathname}/${achievementId}`;
  };

  return (
    <>
      <div className="px-4">
        <h1 className="text-white p-2">Achievements List</h1>
        <ul>
          <div className="grid grid-cols-5">
            {achievements.map((achievement) => (
              <div
                key={achievement.AchievementId}
                onClick={() =>
                  handleAchievementClick(achievement.AchievementId)
                }
              >
                <UniqueAchievement
                  id={achievement.AchievementId}
                  name={achievement.AchievementName}
                  description={achievement.AchievementDesc}
                  level={achievement.AchievementLevel}
                  classname="hover:bg-blue"
                  img={achievement.AchievementImg}
                />
              </div>
            ))}
          </div>
        </ul>
      </div>
    </>
  );
};
