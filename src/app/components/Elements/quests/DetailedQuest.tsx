"use client";
import React, { useState, useEffect } from "react";
import Frame from "../../ui/Frame";
import axios from "axios";

export const DetailedQuest: React.FC = () => {
  const [quest, setQuest] = useState<any | null>(null);
  const [stepsDescriptions, setStepsDescriptions] = useState<string[]>([]);
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
          const questData = response.data.data[0];
          setQuest(questData);
          const steps = questData.steps || [];
          const descriptions: string[] = [];
          for (const stepId of steps) {
            const stepResponse = await axios.get(
              `http://localhost:3001/quests-steps?id=${stepId}`
            );
            if (
              stepResponse.data.data &&
              stepResponse.data.data.length > 0 &&
              stepResponse.data.data[0].description
            ) {
              descriptions.push(stepResponse.data.data[0].description);
            }
          }
          setStepsDescriptions(descriptions);
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
        <Frame height="fit" className="mx-auto mt-[5rem] ">
          <h1 className="text-primary text-center">
            {quest.questName}{" "}
            <span className="italic text-sm text-blue">niv.{quest.minLvl}</span>
          </h1>
          <h1 className="text-primary"></h1>
          <p>{quest.questDesc}</p>
          <ul className="mt-[2rem] ml-2">
            {stepsDescriptions.map((description, index) => (
              <li className="text-secondary" key={index}>
                {description}
              </li>
            ))}
          </ul>
        </Frame>
      )}
    </>
  );
};
