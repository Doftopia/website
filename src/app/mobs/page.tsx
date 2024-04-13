/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-key */
"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar/Navbar";
import { GroupedMob } from "../interfaces";

const Page: React.FC = () => {
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
  const router = useRouter();
  const [nameFilter, setNameFilter] = useState<string>("");

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

  const redirectMob = (mobId: string) => {
    router.push(`/mobs/mob?id=${mobId}`);
  };

  const handleNameFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNameFilter(event.target.value);
  };

  useEffect(() => {
    fetchMobs();
  }, [nameFilter]);

  return (
    <div className="bg-[#a7a18d]">
      <Navbar pageName="Home" />
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
            <div
              className="flex flex-col items-center cursor-pointer w-full bg-[#cfc4ab] border-[#3eb167] border transition-all hover:-translate-y-1 hover:brightness-90"
              onClick={() => redirectMob(mob.id)}
            >
              <p className="cursor-pointer"></p>
              <div className="flex justify-center pt-1 w-full font-bold">
                {mob.name}
                <div className="font-normal ml-1">
                  {mob.characs[0].level !=
                  mob.characs[mob.characs.length - 1].level ? (
                    <p>
                      {" "}
                      - niveau {mob.characs[0].level} a{" "}
                      {mob.characs[mob.characs.length - 1].level}
                    </p>
                  ) : (
                    <p> - niveau {mob.characs[0].level}</p>
                  )}
                </div>
              </div>
              <img src={mob.img} alt={mob.name} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
