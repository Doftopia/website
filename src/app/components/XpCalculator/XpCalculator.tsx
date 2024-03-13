"use client";

import React from "react";

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

  return (
    <div className="h-36 w-72 bg-slate-300">
      <h1 className="ml-2 mt-2">XP Calculator</h1>
      <div className="flex justify-center">
        <select className="w-24 h-8 mt-2 ml-2 rounded-sm" defaultValue="">
          {jobs.map((job, index) => (
            <option key={index} value={job}>
              {job}
            </option>
          ))}
        </select>

        <input
          type="number"
          className="w-14 h-8 mt-2 ml-2 rounded-md"
          placeholder="Level"
          min={1}
        />
        <input
          type="text"
          className="w-24 font-[8px] h-8 mt-2 ml-2 rounded-md"
          placeholder="item"
        />
      </div>

      <button className="w-16 h-8 mt-2 ml-2 bg-slate-400 hover:bg-slate-600 rounded-md">
        Calculate
      </button>
    </div>
  );
};

export default XpCalculator;
