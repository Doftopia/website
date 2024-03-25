"use client";

import React from "react";
import Frame from "../../ui/frame";
import { Button } from "../../ui/button";

const XpCalculator = () => {
  const jobs = [
    "Bûcheron",
    "Paysan",
    "Mineur",
    "Pêcheur",
    "Chasseur",
    "Alchimiste",
    "Bijoutier",
    "Tailleur",
    "Cordonnier",
    "Bricoleur",
    "Façonneur",
    "Forgeron",
    "Sculpteur",
    "Costumage",
    "Joaillomage",
    "Cordomage",
    "Sculptemage",
  ];

  const calculateXp = (level: number, item: number) => {
    return 10 * Math.pow(item - level - 1, 2) + 10 * (level - 1);
  };

  const clicked = () => {
    console.log("clicked");
  };

  return (
    <>
      <Frame>
        <h1 className="ml-2 mt-2 text-center text-white">XP Calculator</h1>
        <div className="flex justify-center">
          <div className="grid grid-cols-3 mt-20 gap-4">
            <div className="flex flex-col items-center">
              <label className="text-white" htmlFor="job">
                Metier
              </label>
              <select id="job" className="w-30 h-8 mt-2 rounded-sm">
                {jobs.map((job, index) => (
                  <option key={index} value={job}>
                    {job}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col items-center">
              <label className="text-white" htmlFor="level">
                Niveau
              </label>
              <input
                type="number"
                id="level"
                key={"level"}
                className="w-20 h-8 mt-2 rounded-md"
                placeholder="Niveau"
                min={1}
              />
            </div>
            <div className="flex flex-col items-center">
              <label className="text-white" htmlFor="item">
                Objet
              </label>
              <input
                type="text"
                id="item"
                key={"item"}
                className="w-32 h-8 mt-2 rounded-md"
                placeholder="Objet"
                min={1}
              />
            </div>
          </div>
        </div>

        <Button
          variant={"defaultBold"}
          onClick={clicked}
          className="mx-auto mt-2 font-bold"
        >
          Calculer
        </Button>
      </Frame>
    </>
  );
};

export default XpCalculator;
