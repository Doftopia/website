"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Frame from "../../ui/frame";
import router from "next/router";

const AchievementsList: React.FC = () => {
  const [achievements, setAchievements] = useState<any[]>([]);

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const response = await axios.get(
          `https://api.dofusdb.fr/achievement-categories?$limit=50`
        );
        setAchievements(response.data.data);
      } catch (error) {}
    };

    fetchAchievements();
  }, []);

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-white p-2">Catégories des succès </h1>
      {achievements.map(
        (achievement) =>
          achievement.parent === null && (
            <Frame
              key={achievement.id}
              width="sm"
              height="sm mr-2"
              className="m-2"
            >
              <a
                href={`/succes/${achievement.name.fr.toLowerCase()}`}
                key={achievement.id}
                className="text-white w-fit"
              >
                <p className="text-sm"> {achievement.name.fr.parent}</p>
              </a>
            </Frame>
          )
      )}
    </div>
  );
};

export default AchievementsList;
