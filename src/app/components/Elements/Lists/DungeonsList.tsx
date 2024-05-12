"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Frame from "../../ui/Frame";
import Image from "next/image";

interface Dungeon {
  name: string;
  lvl: string;
}

interface Achievement {
  AchievementId: number;
  AchievementName: string;
  AchievementDesc: string;
  AchievementLevel: number;
  AchievementImg: string;
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

  const [hoveredDungeon, setHoveredDungeon] = useState<number | null>(null);

  const handleDungeonClick = (dungeonName: string) => {
    window.location.href = `${window.location.pathname}/${dungeonName}`;
  };

  return (
    <>
      <div className="px-4">
        <ul>
          <div className="grid grid-cols-5 w-fit mx-auto gap-7">
            {dungeons.map((achievement) => (
              <div
                key={achievement.AchievementId}
                onMouseEnter={() =>
                  setHoveredDungeon(achievement.AchievementId)
                }
                onMouseLeave={() => setHoveredDungeon(null)}
                onClick={() =>
                  handleDungeonClick(
                    achievement.AchievementName.replace("(Solo)", "")
                  )
                }
                className="hover:cursor-pointer w-fit"
              >
                <Frame
                  width="13rem"
                  height="5rem"
                  className="border dark:border-blue border-opacity-5 dark:hover:border-green"
                >
                  <div className="grid h-full grid-cols-2">
                    <Image
                      src={achievement.AchievementImg}
                      alt=""
                      width={78}
                      height={78}
                      className={`absolute z-0 mt-[0.2rem] col-span-1 ${
                        hoveredDungeon === achievement.AchievementId
                          ? "opacity-100 "
                          : "opacity-35"
                      }`}
                    />
                    <div className="col-span-2 ml-[4rem]">
                      <h1 className="text-primary text-sm text-center mt-1 z-10">
                        {achievement.AchievementName.replace("(Solo)", "")}
                      </h1>
                      <h1 className="dark:text-blue text-xs text-center">
                        niv.{achievement.AchievementLevel}
                      </h1>
                    </div>
                  </div>
                </Frame>
              </div>
            ))}
          </div>
        </ul>
      </div>
    </>
  );
};
