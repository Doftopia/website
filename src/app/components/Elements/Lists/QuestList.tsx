"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Frame from "../../ui/Frame";

export const QuestList: React.FC = ({}) => {
  const path = typeof window !== "undefined" ? window.location.pathname : "";
  const [quests, setQuests] = useState([]);
  useEffect(() => {
    const fetchQuests = async () => {
      const response = await axios.get(
        `http://localhost:3001/quests?categoryName=${path.split("/").pop()}`
      );
      setQuests(response.data.data);
    };
    fetchQuests();
  }, [path]);
  return (
    <div className="grid grid-cols-4 w-fit gap-x-4 mx-auto">
      {quests.map((quest: any) => (
        <a
          href={`/quetes/${path.split("/").pop()}/${quest.questName}`}
          key={quest.id}
          className="w-fit"
        >
          <Frame size="sm" height="5rem" key={quest.id}>
            <h1 className="text-primary">{quest.questName}</h1>
            <p className="text-secondary text-sm">{quest.categoryName}</p>
            <p className="text-primary">niv.{quest.minLvl}</p>

            <p>{quest.questDescription}</p>
          </Frame>
        </a>
      ))}
    </div>
  );
};
