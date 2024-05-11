"use client";
import React, { useState, useEffect } from "react";
import Frame from "../../ui/Frame";
import axios from "axios";
import Image from "next/image";

interface Achievement {
  id: number;
  AchievementName: string;
  AchievementDesc: string;
  AchievementImg: string;
}

export const DetailedAchievement: React.FC = ({}) => {
  const [achievement, setAchievement] = useState<Achievement | null>(null);
  const path = typeof window !== "undefined" ? window.location.pathname : "";
  const achievementId = path.split("/").pop();

  useEffect(() => {
    if (!achievementId) return;

    const fetchAchievement = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/achievements?id=${achievementId}`
        );
        if (response.data.data && response.data.data.length > 0) {
          // Check if data exists and is not empty
          setAchievement(response.data.data[0]);
        }
      } catch (error) {
        console.error("Error fetching achievement:", error);
      }
    };

    fetchAchievement();
  }, [achievementId]);

  return (
    <>
      {achievement && (
        <Frame>
          <div className="grid grid-cols-2 w-fit">
            <Image
              src={achievement.AchievementImg}
              alt=""
              width={64}
              height={64}
            />
            <h1 className="text-primary font-bold">
              {achievement.AchievementName}
            </h1>
          </div>
          <p className="text-secondary">
            {achievement.AchievementDesc.replace(/\[challenge,(\d+)\]/g, "$1")}
          </p>
        </Frame>
      )}
    </>
  );
};
