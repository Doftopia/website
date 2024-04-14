/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-key */
"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import {
  Drop,
  DropsByMob,
  GroupedItems,
  GroupedMob,
  MobCharac,
} from "@/app/interfaces";

const DetailedMob: React.FC = () => {
  const searchParams = useSearchParams();
  const mobId = searchParams.get("id");
  const [mob, setMob] = useState<GroupedMob[]>([]);
  const [drops, setDrops] = useState<GroupedItems[]>([]);
  const [dropPourcentage, setDropPourcentage] = useState<Drop[]>([]);
  const router = useRouter();
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

  useEffect(() => {
    fetchMob(mobId!);
    fetchDropsFromMob(mobId!);
  }, [mobId]);

  async function fetchMob(mobId: string) {
    try {
      const mobResponse = await axios.get(
        `http://localhost:3001/mobs?id=${mobId}`
      );
      setMob(mobResponse.data.data);
    } catch (error) {
      console.error(`Error fetching mob ${error}`);
    }
  }

  async function fetchDropsFromMob(mobId: string) {
    let filters = "";
    try {
      const dropsResponse = await axios.get(
        `http://localhost:3001/mobs-drop?mobId=${mobId}`
      );
      let drops = dropsResponse.data.data[0];

      const groupedPourcentage: Drop[] = [];
      for (const drop of drops.dropsId) {
        filters += `id=${drop.id}&`;
        groupedPourcentage.push({
          dropPourcentage: drop.dropPourcentage,
          criteria: drop.criteria,
          id: drop.id,
        });
      }
      const itemResponse = await axios.get(
        `http://localhost:3001/items?${filters}`
      );
      setDrops(itemResponse.data.data);
      setDropPourcentage(groupedPourcentage);
    } catch (error) {
      console.error(`Error fetching drops ${error}`);
    }
  }

  return (
    <div className="h-screen pt-8 mx-24">
      {mob.map((mob: GroupedMob) => (
        <div className="dark:border-blue border rounded-sm text-sm pl-4 pt-2 bg-[#cfc4ab] grid text-primary dark:bg-dark-3 mb-4 px-3">
          <p className="text-lg font-bold">
            {mob.name}
            <img src={mob.img} alt={mob.name} />
          </p>
          <div>
            {mob.characs[0].level !=
            mob.characs[mob.characs.length - 1].level ? (
              <p>
                Niveau {mob.characs[0].level} a{" "}
                {mob.characs[mob.characs.length - 1].level}
              </p>
            ) : (
              <p>Niveau {mob.characs[0].level}</p>
            )}
          </div>
          <div className="flex flex-wrap mt-2">
            {stats.map((stat: string, index: number) => (
              <div className="mr-3">
                <p
                  className={
                    mob.characs[0][stat] < 0 ||
                    mob.characs[mob.characs.length - 1][stat] < 0
                      ? "text-red-500"
                      : "text-sm"
                  }
                >
                  {mob.characs[0][stat] !=
                  mob.characs[mob.characs.length - 1][stat] ? (
                    <div className="flex items-center">
                      <img
                        src={`https://dofusdb.fr/icons/characteristics/tx_${icons[index]}.png`}
                        alt={stat}
                        className="mr-1"
                      />
                      <p>
                        {mob.characs[0][stat]} à{" "}
                        {mob.characs[mob.characs.length - 1][stat]}{" "}
                        {stat_french_name[index]}
                      </p>
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <img
                        src={`https://dofusdb.fr/icons/characteristics/tx_${icons[index]}.png`}
                        alt={stat}
                        className="mr-1"
                      />
                      <p>
                        {mob.characs[0][stat]} {stat_french_name[index]}
                      </p>
                    </div>
                  )}
                </p>
              </div>
            ))}
          </div>
          <br />
        </div>
      ))}
      <div>
        {drops[0] && dropPourcentage[0] && (
          <div>
            <p className="font-bold text-blue">Butins</p>
            <div className="flex flex-wrap border-t text-primary border-blue bg-[#cfc4ab] dark:bg-dark-3 mb-4 mt-1 px-3 py-2">
              {drops.map((drop: GroupedItems, index: number) => (
                <div>
                  {dropPourcentage[index].criteria == 1 && (
                    <div
                      className="flex dark:hover:bg-green dark:hover:text-black pr-2 flex-col pl-3 cursor-pointer rounded-lg transition-all pt-1"
                      onClick={() =>
                        router.push(`/objets/objet?id=${drop.itemId}`)
                      }
                    >
                      <p className="font-bold flex">
                        {drop.itemName}{" "}
                        <p className="font-normal"> - niveau {drop.level}</p>
                      </p>
                      <p>{dropPourcentage[index].dropPourcentage}%</p>
                      <img
                        src={drop.img}
                        alt={drop.itemName}
                        className="mr-1 size-16"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
            <p className="font-light text-red">Butins conditionnés </p>
            <div className="flex flex-wrap border-t border-blue py-2 dark:bg-dark-3 dark:text-secondary bg-[#cfc4ab] mt-1 pl-2">
              {drops.map((drop: GroupedItems, index: number) => (
                <div>
                  {dropPourcentage[index].criteria == 0 && (
                    <div
                      className="flex hover:bg-green hover:text-black  pr-2 flex-col pl-3 rounded-lg transition-all pt-1"
                      onClick={() =>
                        router.push(`/objets/objet?id=${drop.itemId}`)
                      }
                    >
                      <p className="font-bold flex">
                        {drop.itemName}{" "}
                        <p className="font-normal"> - niveau {drop.level}</p>
                      </p>
                      <p>{dropPourcentage[index].dropPourcentage}%</p>
                      <img
                        src={drop.img}
                        alt={drop.itemName}
                        className="mr-1 size-16"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailedMob;
