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

interface DetailedAchievementProps {
  classname?: string;
}

interface Challenge {
  id: number;
  name: { fr: string };
  description: { fr: string };
  img: string;
}

export const DetailedAchievement: React.FC<DetailedAchievementProps> = ({
  classname,
}) => {
  const [achievement, setAchievement] = useState<Achievement | null>(null);
  const [challenge, setChallenge] = useState<Challenge | null>(null);
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
          setAchievement(response.data.data[0]);

          const achievementDesc = response.data.data[0].AchievementDesc;
          const challengeIdMatch = achievementDesc.match(/\[challenge,(\d+)\]/);
          if (challengeIdMatch) {
            const challengeId = challengeIdMatch[1];
            const challengeResponse = await axios.get(
              `https://api.dofusdb.fr/challenges?id=${challengeId}`
            );
            if (
              challengeResponse.data.data &&
              challengeResponse.data.data.length > 0
            ) {
              setChallenge(challengeResponse.data.data[0]);
            }
          }
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
        <>
          <Frame className={classname}>
            <div className="grid grid-cols-2 w-fit">
              <Image
                src={achievement.AchievementImg}
                alt=""
                width={64}
                height={64}
              />
              <h1 className="text-primary font-bold mt-2">
                {achievement.AchievementName}
              </h1>
            </div>
            <p className="text-secondary">
              {achievement.AchievementDesc.replace(
                /\[challenge,(\d+)\]/g,
                `${challenge ? challenge.name.fr : "Challenge"}`
              )}
            </p>
          </Frame>

          {challenge && (
            <Frame className={classname}>
              <h1 className="text-blue font-bold ml-2 mt-2">
                {challenge.name.fr}
              </h1>
              <p className="text-primary ml-2">{challenge.description.fr}</p>
            </Frame>
          )}
        </>
      )}
    </>
  );
};
