"use client";
import React, { useState, useEffect } from "react";
import Frame from "../../ui/Frame";
import axios from "axios";

export const DetailedQuest: React.FC = () => {
  const [quest, setQuest] = useState<any | null>(null);
  const path = typeof window !== "undefined" ? window.location.pathname : "";
  const questName = path.split("/").pop();

  useEffect(() => {
    if (!questName) return;

    const fetchQuest = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/quests?name=${questName}`
        );
        if (response.data.data && response.data.data.length > 0) {
          setQuest(response.data.data[0]); // Update state with the first quest from the response
        }
      } catch (error) {
        console.error("Error fetching quest:", error);
      }
    };

    fetchQuest();
  }, [questName]);

  return (
    <>
      {quest && (
        <Frame>
          <h1 className="text-secondary">niv.{quest.minLvl}</h1>
          <h1 className="text-primary">{quest.questName}</h1>
          <p>{quest.questDesc}</p>
        </Frame>
      )}
    </>
  );
};
