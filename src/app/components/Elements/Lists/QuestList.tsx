"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Frame from "../../ui/Frame";

export const QuestList: React.FC = ({}) => {
  const path = typeof window !== "undefined" ? window.location.pathname : "";
  const [quests, setQuests] = useState([]);
  const [isHovered, setIsHovered] = useState<number | null>(null);

  useEffect(() => {
    const fetchQuests = async () => {
      const response = await axios.get(
        `http://localhost:3001/quests?categoryName=${path.split("/").pop()}`
      );
      setQuests(response.data.data);
    };
    fetchQuests();
  }, [path]);

  const handleCategoryClick = (questName: string) => {
    window.location.href = `/quetes/${path.split("/").pop()}/${questName}`;
  };

  return (
    <div className="grid grid-cols-4 w-fit gap-x-4 mx-auto">
      {quests.map((quest: any) => (
        <div
          onClick={() => handleCategoryClick(quest.questName)}
          key={quest.id}
          onMouseEnter={() => setIsHovered(quest.questName)}
          onMouseLeave={() => setIsHovered(null)}
        >
          <Frame
            size="sm"
            height="5rem"
            key={quest.questName}
            className={`border cursor-pointer ${
              isHovered === quest.questName
                ? " border-green"
                : " border-secondary border-opacity-50"
            }`}
          >
            <div className="grid grid-cols-6">
              <div className="col-span-4">
                <h1
                  className={`${
                    isHovered === quest.questName
                      ? "text-green"
                      : "text-primary"
                  } col-span-1 ml-2`}
                >
                  {quest.questName}
                </h1>
              </div>

              <p
                className={`text-sm italic ${
                  isHovered === quest.questName ? "text-green" : "text-blue"
                } ml-4`}
              >
                niv.{quest.minLvl}
              </p>
            </div>

            <p className={`text-sm text-blue ml-4`}>{quest.categoryName}</p>

            <p>{quest.questDescription}</p>
          </Frame>
        </div>
      ))}
    </div>
  );
};
