/* eslint-disable @next/next/no-img-element */
"use client";

import React, { HTMLInputTypeAttribute, useState } from "react";
import Frame from "../ui/Frame";
import axios from "axios";

const XpCalculator = () => {
  const [selectedJob, setSelectedJob] = useState("");
  const [craftableItems, setCraftableItems] = useState([]);

  const jobs = {
    bucheron: { name: "Bucheron", id: 2 },
    paysan: { name: "Paysan", id: 28 },
    mineur: { name: "Mineur", id: 24 },
    pecheur: { name: "Pecheur", id: 36 },
    chasseur: { name: "Chasseur", id: 41 },
    alchimiste: { name: "Alchimiste", id: 26 },
    bijoutier: { name: "Bijoutier", id: 16 },
    tailleur: { name: "Tailleur", id: 27 },
    cordonnier: { name: "Cordonnier", id: 15 },
    bricoleur: { name: "Bricoleur", id: 65 },
    façonneur: { name: "Façonneur", id: 60 },
    forgeron: { name: "Forgeron", id: 11 },
    sculpteur: { name: "Sculpteur", id: 13 },
    costumage: { name: "Cosotumage", id: 64 },
    joaillomage: { name: "Joaillomage", id: 63 },
    cordomage: { name: "Cordomage", id: 62 },
    sculptemage: { name: "Sculptemage", id: 48 },
  };

  const handleJobChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSelectedJob(event.target.value);
    try {
      const response = await axios.get(
        `http://localhost:3001/recipes?jobId=${event.target.value}`
      );
      setCraftableItems(response.data.data);
    } catch (error) {
      console.error("Error fetching craftable items:", error);
    }
  };

  const getLevel = (xp: number) => {
    return;
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
          <div className="flex flex-col items-center">
            <label className="text-white" htmlFor="job">
              Métier
            </label>
            <select
              id="job"
              className="w-34 h-8 mt-2 rounded-sm"
              onChange={handleJobChange}
              value={selectedJob}
            >
              <option value="">Sélectionnez un métier</option>
              {Object.values(jobs).map((job: any, index: number) => (
                <option key={index} value={job.id}>
                  {job.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </Frame>

      <div className="mt-4">
        {craftableItems.map((item: any, index: number) => (
          <div key={index} className="mb-4">
            <h2 className="text-white">
              Objet à fabriquer : {item.recipe[0].itemName}
            </h2>
            <ul className="mt-2 text-white">
              {item.recipe.map((recipeItem: any, recipeIndex: number) => (
                <li key={recipeIndex}>
                  <img
                    src={recipeItem.itemImg}
                    alt={recipeItem.itemName}
                    className="w-6 h-6 inline-block mr-2"
                  />
                  {recipeItem.itemName} (Quantité : {recipeItem.quantity})
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
};

export default XpCalculator;
