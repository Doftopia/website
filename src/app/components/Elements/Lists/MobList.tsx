/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-key */
"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { GroupedMob } from "@/app/interfaces";
import UniqueMob from "../Mob/UniqueMob";

const MobList: React.FC = () => {
  const [nameFilter, setNameFilter] = useState<string>("");
  const [mobs, setMobs] = useState<any[]>([]);
  const stats: string[] = [
    "ap",
    "mp",
    "lifePoints",
    "paDodge",
    "pmDodge",
    "wisdom",
    "strength",
    "intelligence",
    "chance",
    "agility",
    "earthResistance",
    "airResistance",
    "waterResistance",
    "fireResistance",
    "neutralResistance",
  ];
  const stat_french_name: string[] = [
    "PA",
    "PM",
    "Vitalite",
    "Esquive PA",
    "Esquive PM",
    "Sagesse",
    "Force",
    "Intelligence",
    "Chance",
    "Agilite",
    "% Terre",
    "% Air",
    "% Eau",
    "% Feu",
    "% Neutre",
  ];
  const icons: string[] = [
    "actionPoints",
    "movementPoints",
    "vitality",
    "dodgeAP",
    "dodgeMP",
    "wisdom",
    "strength",
    "intelligence",
    "chance",
    "agility",
    "strength",
    "agility",
    "chance",
    "intelligence",
    "neutral",
  ];

  const fetchMobs = async () => {
    try {
      const response = await axios.get("http://localhost:3001/mobs", {
        params: {
          limit: 140,
          name: nameFilter,
        },
      });
      setMobs(response.data.data);
    } catch (error) {
      console.error(`Error fetching mobs ${error}`);
    }
  };

  const handleNameFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNameFilter(event.target.value);
  };

  useEffect(() => {
    fetchMobs();
  }, [nameFilter]);

  return (
    <>
      <div className="mx-auto w-[38rem] mt-[3rem]">
        <p className="text-primary text-xl text-center">Liste des Monstres</p>
        <input
          type="text"
          name="Mobs"
          placeholder="Chercher un monstre"
          className="text-black outline-none h-8 ml-[11.7rem] pl-2 border-2 dark:border-blue"
          onChange={handleNameFilter}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5 mx-8 gap-5">
        {mobs.map((mob: GroupedMob) => (
          <UniqueMob mob={mob} key={mob.id} />
        ))}
      </div>
    </>
  );
};

export default MobList;
