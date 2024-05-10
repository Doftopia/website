"use client";
import React, { useState, useEffect } from "react";
import Frame from "../ui/Frame";
import axios from "axios";

interface Achievement {
  id: number;
  AchievementName: string;
  AchievementDesc: string;
}

export const DetailedAchievement: React.FC = ({}) => {
  const [achievement, setAchievement] = useState<Achievement | null>(null);
  const path = typeof window !== "undefined" ? window.location.pathname : "";
  const achievementId = path.split("/").pop();

  useEffect(() => {
    if (!achievementId) return; // Add a check here to ensure achievementId exists

    const fetchAchievement = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/achievements?id=${achievementId}`
        );
        if (response.data.data && response.data.data.length > 0) {
          // Check if data exists and is not empty
          setAchievement(response.data.data[0]); // Update state with the first achievement from the response
        }
      } catch (error) {
        console.error("Error fetching achievement:", error);
      }
    };

    fetchAchievement();
  }, [achievementId]);

  return (
    <>
      <Frame>{achievement && <h1>{achievement.AchievementDesc}</h1>}</Frame>
    </>
  );
};
