/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-key */
"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { GroupedMob } from "@/app/interfaces";
import UniqueMob from "../Mob/UniqueMob";

const MobList: React.FC = () => {
  const router = useRouter();
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
    <div className="h-full text-black pt-8">
      <input
        type="text"
        name="Mobs"
        placeholder="Chercher monstres"
        className="text-black outline-none w-1/2 h-8 mb-4 mx-8 pl-2 border border-[#3eb167]"
        onChange={handleNameFilter}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5 mx-8 gap-5">
        {mobs.map((mob: GroupedMob) => (
          <UniqueMob mob={mob} />
        ))}
      </div>
    </div>
  );
};

export default MobList;
