/* eslint-disable @next/next/no-img-element */
"use client";

import React, { HTMLInputTypeAttribute, useState } from "react";
import Frame from "../../ui/Frame";
import axios from "axios";
import { Input } from "../../ui/Input";
import { get } from "http";
import Image from "next/image";

const XpCalculator = () => {
  const [selectedJob, setSelectedJob] = useState("");
  const [craftableItems, setCraftableItems] = useState([]);
  const [xp, setXp] = useState<number>(398001);
  const [playerLevel, setPlayerLevel] = useState<number | "">("");

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

  const fetchCraftableItems = async (jobId: number, playerLevel: number) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/recipes?jobId=${jobId}&lvl=${playerLevel}`
      );
      setCraftableItems(response.data.data);
    } catch (error) {
      console.error("Error fetching craftable items:", error);
    }
  };

  const handleJobChange = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedJob(event.target.value);
    if (event.target.value && xp !== 0) {
      fetchCraftableItems(parseInt(event.target.value), xp);
    }
  };
  //Guess the level of a player based on his experience
  const getLevel = (xp: number) => {
    if (xp === 0) {
      return 0;
    }

    if (xp > 398000) {
      return 200;
    }

    if (xp < 0) {
      return 0;
    }

    return Math.round((xp / 10) ** 0.5);
  };
  //return the experience needed to reach the level
  const getExpUntilNextLevel = (level: number) => {
    return Math.round(10 * level * (level - 1));
  };

  //return the experience granted by the item depending of the player level
  const itemXp = (expRecette: number, playerLevel: number) => {
    return expRecette / (0.1 * (playerLevel - expRecette) ** 1.1);
  };

  const calculateCraftingXP = (itemLevel: number, crafterLevel: number) => {
    // Determine the base XP for the item level
    let baseXP = 20; // Base XP for levels 1-20
    if (itemLevel > 20) {
      baseXP = 20 * Math.floor((itemLevel - 1) / 10);
    }

    // Determine the level difference between crafter and item
    const levelDifference = crafterLevel - itemLevel;

    // Adjust XP based on level difference
    let adjustedXP = baseXP;

    if (levelDifference > 0) {
      // Decrease XP if crafter level exceeds item level
      adjustedXP -= Math.min(4, levelDifference) * 2;
      if (levelDifference > 4 && levelDifference % 10 === 0) {
        adjustedXP /= 2;
      }
    } else if (levelDifference < 0) {
      // Halve XP if crafter level is lower than item level
      adjustedXP /= Math.pow(2, Math.ceil(-levelDifference / 10));
    }

    // Ensure XP is not negative
    adjustedXP = Math.max(0, adjustedXP);

    return adjustedXP;
  };
  const handleXpChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const xpValue = parseInt(event.target.value); // Convertir la valeur en nombre entier
    setXp(xpValue); // Mettre à jour l'état de l'XP
    const level = getLevel(xpValue); // Appeler la fonction getLevel avec la valeur de l'XP
    setPlayerLevel(level);

    if (selectedJob) {
      fetchCraftableItems(parseInt(selectedJob), level);
    }
  };

  const handleClickItem = (itemId: number) => {
    window.location.href = `/objets/objet?id=${itemId}`;
  };

  return (
    <>
      <Image
        src="/kamasbag.png"
        alt=""
        width={200}
        height={237}
        className="absolute top-[24.1rem] z-0 opacity-45 left-[18.9rem]"
      ></Image>
      <Image
        src="/ternette.png"
        alt=""
        width={768}
        height={830}
        className="absolute top-[3.5rem] z-0 opacity-30 right-[3.9rem]"
      ></Image>
      <Frame
        size="lg"
        height="16rem"
        className="border border-green shadow-xl mx-auto mt-[15rem] z-10"
      >
        <h1 className="ml-6 mt-2 text-primary text-sm mb-6">
          Recettes possibles
        </h1>
        <div className="flex justify-center">
          <div className="flex flex-col items-center">
            <label className="text-primary mr-[9.5rem]" htmlFor="job">
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
            <p className="text-secondary">
              {" "}
              renseignez vos points d&apos;experience
            </p>
            <Input
              type="text"
              placeholder="votre montant d'xp"
              defaultValue={xp}
              className="mt-2 mb-2 w-[50%]"
              onChange={handleXpChange}
            ></Input>
            <p className="text-white">Niveau de métier : {getLevel(xp)}</p>
          </div>
        </div>
      </Frame>
      <div className="mt-4 grid grid-cols-3 mx-auto w-fit gap-x-[4rem]">
        {craftableItems.map((item: any, index: number) => (
          <Frame
            key={item.id}
            width="fit"
            height="fit"
            className="border border-blue"
          >
            <h2 className="text-white pb-1 ml-2">
              {item.craftedName}
              {"   "}
              <span className="text-secondary ml-3 text-sm">
                {" "}
                niv.{item.recipeLevel} -{" "}
                {calculateCraftingXP(item.recipeLevel, getLevel(xp))}xp
              </span>
            </h2>

            <ul className="mt-2 text-white grid gap-x-[2rem] grid-cols-3">
              {item.recipe.map((recipeItem: any) => (
                <li
                  key={item.id}
                  className="dark:hover:bg-green rounded-lg hover:cursor-pointer"
                  onClick={() => handleClickItem(recipeItem.itemId)}
                >
                  <img
                    src={recipeItem.itemImg}
                    alt={recipeItem.itemName}
                    className="w-6 h-6 inline-block mr-2"
                  />
                  x {recipeItem.quantity} {recipeItem.itemName}
                </li>
              ))}
            </ul>
          </Frame>
        ))}
      </div>
    </>
  );
};

export default XpCalculator;
