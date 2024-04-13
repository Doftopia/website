"use client";

import React from "react";
import Frame from "../ui/Frame";
import { Button } from "../ui/Button";

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
      <Frame
        size="lg"
        height="16rem"
        className="border border-secondary shadow-xl"
      >
        <h1 className="ml-2 mt-2 text-center text-white">XP Calculator</h1>
        <div className="flex justify-center">
          <div className="grid grid-cols-4 mt-20 gap-4">
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
            <div className="flex flex-col items-center">
              <label className="text-white" htmlFor="qty">
                Quantité
              </label>
              <input
                type="number"
                id="qty"
                key="qty"
                className="w-14 h-8 mt-2 rounded-md"
                placeholder="Qté"
                min={0}
              />
            </div>
          </div>
        </div>

        <Button
          variant={"default"}
          onClick={clicked}
          className="mx-auto mt-2 dark:bg-green dark:hover:bg-[#2c7d49] font-bold bg-"
        >
          Calculer
        </Button>
      </Frame>
    </>
  );
};

export default XpCalculator;
