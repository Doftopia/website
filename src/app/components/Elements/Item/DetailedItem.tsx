/* eslint-disable react/jsx-key */
/* eslint-disable @next/next/no-img-element */
"use client";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Characteristic,
  Drop,
  GroupedItems,
  GroupedMob,
  GroupedRecipes,
  Item,
  Jobs,
  MobDrop,
  Recipe,
} from "@/app/interfaces";
import Image from "next/image";

const DetailedItem: React.FC = () => {
  const searchParams = useSearchParams();
  const itemId = searchParams.get("id");
  const [item, setItem] = useState<GroupedItems[]>([]);
  const [recipes, setRecipes] = useState<GroupedRecipes[]>([]);
  const [job, setjob] = useState<String>("");
  const [mobs, setMobs] = useState<GroupedMob[]>([]);

  useEffect(() => {
    if (itemId) {
      fetchItem();
      fetchMobDrop();
    }
  }, [itemId]);

  const router = useRouter();
  const redirectSet = (setId: string) => {
    router.push(`/set?id=${setId}`);
  };

  const fetchItem = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/items?id=${itemId}`
      );

      const recipesResponse = await axios.get(
        `http://localhost:3001/recipes?resultId=${itemId}`
      );
      // recipesResponse.data.data.forEach((recipe: GroupedRecipes) => {
      //     recipe.itemLevel = recipe.itemLevel.split(',')[0];

      //     recipe.recipe.forEach((item: Recipe) => {
      //         console.log(item.itemName);
      //         if (item.itemName.includes(',')) {
      //             item.itemName = item.itemName.split(',')[0];
      //             item.itemImg = item.itemImg.split(',')[0];
      //         }
      //     });
      // });
      console.log(recipesResponse.data.data);

      let jobsResponse: Jobs | any;
      try {
        jobsResponse = await axios.get(
          `http://localhost:3001/jobs?id=${recipesResponse.data.data[0].jobId}`
        );
        setjob(jobsResponse.data.data[0].jobName);
      } catch (error) {
        console.error(error);
      }
      console.log(recipesResponse.data.data);

      setRecipes(recipesResponse.data.data);
      setItem(response.data.data);
    } catch (error) {
      console.error(`Error fetching item ${error}`);
    }
  };

  const fetchMobDrop = async () => {
    try {
      const groupedMobs: GroupedMob[] = [];
      let filters = "";
      const dropsReponse = await axios.get(
        `http://localhost:3001/mobs-drop?dropId=${itemId}`
      );
      dropsReponse.data.data.forEach((drop: MobDrop) => {
        filters += `id=${drop.mobId}&`;
      });
      const mobResponse = await axios.get(
        `http://localhost:3001/mobs?${filters}`
      );
      setMobs(mobResponse.data.data);
    } catch (error) {
      console.error(`Error fetching mob drop ${error}`);
    }
  };

  const redirectRecipeItem = async (id: number) => {
    router.push(`/objets/objet?id=${id}`);
  };

  return (
    <>
      <div className="mt-10 lg:w-full">
        {item.map((item: GroupedItems, index: number) => (
          <div
            key={index}
            className="bg-light-2 dark:bg-dark-3 text-black px-3 pb-2 rounded-sm border-orange dark:border-blue border"
          >
            <div className="flex justify-between pt-3 pb-3 mb-4">
              <div className="flex flex-col transition-all">
                <h2 className="font-bold cursor-pointer dark:text-primary w-fit">
                  {item.itemName}
                </h2>
                <h3 className=" text-secondary">
                  <span className=" text-light-green dark:text-green">
                    {item.type}
                  </span>{" "}
                  - niv. {item.level}
                </h3>
                <h3
                  className=" mb-5 dark:text-blue cursor-pointer text-light-green dark:hover:text-green"
                  onClick={() => redirectSet(item.setID.toString())}
                >
                  z{item.setName}
                </h3>
              </div>
              <Image
                src={item.imgHighRes}
                alt={item.itemName}
                draggable="false"
                className="p-2 rounded-sm"
                width={128}
                height={128}
              />
            </div>
            <h3 className="mb-6 dark:text-secondary">{item.description}</h3>
            {item.characteristics.map((charac: Characteristic) => (
              <div>
                {charac.characId < 0 && (
                  <div>
                    <div className="flex dark:text-primary ">
                      {charac.effectId == 101 ? (
                        <div className="flex items-center">
                          <Image
                            src="https://dofusdb.fr/icons/characteristics/tx_actionPoints.png"
                            className="mr-2"
                            alt="PA"
                            draggable="false"
                            width={28}
                            height={28}
                          />
                          <p>-1 pa</p>
                        </div>
                      ) : (
                        <div className="flex">
                          <Image
                            src={charac.characImg}
                            alt="x"
                            className="mr-2"
                            draggable="false"
                            width={28}
                            height={28}
                          />
                          <p className="">
                            {charac.characFrom} à {charac.characTo}{" "}
                            {charac.characName}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
            {item.characteristics.map((charac: Characteristic, idx: number) => (
              <div key={idx} className="flex dark:text-primary items-center">
                {charac.characId >= 0 && (
                  <p
                    className={
                      charac.characFrom < 0 || charac.characTo < 0
                        ? "text-red"
                        : ""
                    }
                  >
                    {charac.characTo ? (
                      <>
                        <div className="flex items-center">
                          {charac.characFrom === null ? (
                            <div className="flex ">
                              <Image
                                src={charac.characImg}
                                alt="x"
                                className="mr-1"
                                draggable="false"
                                width={28}
                                height={28}
                              />
                              <p>
                                {charac.characTo} {charac.characName}
                              </p>
                            </div>
                          ) : (
                            <div className="flex">
                              {charac.effectId != 983 && (
                                <div className="flex">
                                  <Image
                                    src={charac.characImg}
                                    alt="x"
                                    className="mr-1"
                                    draggable="false"
                                    width={24}
                                    height={24}
                                  />
                                  <p>
                                    {charac.characFrom} à {charac.characTo}{" "}
                                    {charac.characName}
                                  </p>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </>
                    ) : (
                      <>
                        {charac.effectId !== null && (
                          <div className="flex items-center ">
                            {charac.effectId == 110 ||
                            charac.effectId == 139 ? (
                              <>
                                <div className="flex items-center ">
                                  <p>
                                    rend {charac.characFrom} {charac.characName}
                                  </p>
                                </div>
                              </>
                            ) : (
                              <div className="flex items-center ">
                                {charac.effectId == 795 ? (
                                  <p className=" text-[#d45c40]">
                                    Arme de chasse
                                  </p>
                                ) : (
                                  <div className="flex items-center ">
                                    {charac.effectId != 984 &&
                                      charac.effectId != 981 && (
                                        <div className="flex">
                                          <img
                                            src={charac.characImg}
                                            alt="x"
                                            className="mr-1 size-6"
                                            draggable="false"
                                          />
                                          <p>
                                            {charac.characFrom}{" "}
                                            {charac.characName}
                                          </p>
                                        </div>
                                      )}
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        )}
                      </>
                    )}
                  </p>
                )}
              </div>
            ))}
            {item.apCost && (
              <>
                <div className="dark:text-secondary mt-3 pt-3 mb-1">
                  <p className="flex">
                    <p className=" mr-1">Coût </p>
                    {item.apCost} PA
                  </p>
                  {item.minRange !== item.maxRange ? (
                    <p className="flex">
                      <p className=" mr-1">Portée </p>
                      {item.minRange}-{item.maxRange}
                    </p>
                  ) : (
                    <p className="flex">
                      <p className=" mr-1">Portée </p>
                      {item.maxRange}
                    </p>
                  )}
                  <p className="flex">
                    <p className=" mr-1">Utilisation par tour </p>
                    {item.nmbCast}
                  </p>
                  <p className="flex">
                    <p className=" mr-1">Critique </p>
                    {item.criticalHitProbability}%
                  </p>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
      <div className="flex flex-col mt-3 lg:mt-10 gap-3">
        {recipes.map((recipe: GroupedRecipes) => (
          <div className="bg-light-2 dark:bg-dark-3 h-fit pt-3 pr-10 border border-light-green dark:border-blue pl-2">
            <div key={recipe.resultItemId}>
              <p className="mb-2 font-bold text-light-green dark:text-green">
                {job} niv.
                {item.map((item: GroupedItems, index: number) => item.level)}
              </p>
              {recipe.recipe.map((item: Recipe, index: number) => (
                <div
                  key={index}
                  className="flex flex-row items-center cursor-pointer hover:font-bold dark:text-primary dark:hover:text-black  hover:bg-light-green dark:hover:bg-green pr-4 w-80 rounded-lg transition-all"
                  onClick={() => redirectRecipeItem(item.itemId)}
                >
                  <Image
                    src={item.itemImg}
                    alt={item.itemName}
                    draggable="false"
                    width={44}
                    height={44}
                  />
                  <p className="ml-2">
                    {item.quantity} {item.itemName}
                  </p>
                </div>
              ))}
              <br></br>
            </div>
          </div>
        ))}
        <div>
          {mobs.length > 0 && (
            <div>
              <div className="flex flex-wrap border-orange dark:border-blue bg-light-2 dark:bg-dark-3 dark:text-primary border pt-2 pl-2 pb-2 pr-2">
                {mobs.map((mob: GroupedMob) => (
                  <div className="flex flex-row cursor-pointer hover:font-bold hover:bg-orange dark:hover:bg-green hover:text-black pr-4 rounded-lg transition-all w-fit">
                    <div
                      onClick={() => {
                        router.push(`/monstres/monstre?id=${mob.id}`);
                      }}
                      className="cursor-pointer flex pr-3"
                    >
                      <img src={mob.img} alt="mob_img" />
                      <p className="flex items-center hover:text-white">
                        {mob.name}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default DetailedItem;
