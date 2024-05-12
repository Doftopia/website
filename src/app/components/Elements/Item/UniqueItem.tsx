/* eslint-disable react/jsx-key */
/* eslint-disable @next/next/no-img-element */

"use client";

import React from "react";
import Frame from "@/app/components/ui/Frame";
import { useRouter } from "next/navigation";
import { Characteristic, GroupedItems } from "@/app/interfaces";
import Image from "next/image";

interface ItemProps {
  index?: number;
  item: GroupedItems;
}

const UniqueItem: React.FC<ItemProps> = ({ index, item }) => {
  const [hoveredItem, setHoveredItem] = React.useState<boolean>(false);
  const router = useRouter();
  const redirectItem = (itemId: string) => {
    router.push(`/objets/objet?id=${itemId}`);
  };

  const redirectSet = (setId: string) => {
    router.push(`/set?id=${setId}`);
  };
  return (
    <>
      <Frame
        className="hover:brightness-90 hover:-translate-y-2 border dark:border-secondary dark:hover:border-primary border-orange dark:text-primary transition-all cursor-pointer"
        key={index}
        width="auto"
        height="auto"
      >
        <div className="flex justify-between pt-3 w-full">
          <div className="flex flex-col transition-all">
            <h2
              className="relative left-2 font-bold cursor-pointer hover:text-green"
              onClick={() => redirectItem(item.itemId.toString())}
            >
              {item.itemName}
            </h2>
            <h3 className="relative left-3 text-sm text-secondary">
              {item.type} - niv.{item.level}
            </h3>
            <h3
              className="text-sm mb-5cursor-pointer hover:text-green text-gray-500"
              onClick={() => redirectSet(item.setID.toString())}
            >
              {item.setName}
            </h3>
          </div>
          <Image
            src={item.imgHighRes}
            alt={item.itemName}
            className="p-1"
            draggable="false"
            width={80}
            height={80}
          />
        </div>
        <div>
          {item.characteristics[0].characId == -1 && <div></div>}
          {item.apCost && (
            <div className="text-sm mb-1 ml-2">
              <p className="flex">
                <p className="text-secondary mr-1">Coût </p>
                {item.apCost} PA
              </p>
              {item.minRange !== item.maxRange ? (
                <p className="flex">
                  <p className="text-secondary mr-1">Portée </p>
                  {item.minRange}-{item.maxRange}
                </p>
              ) : (
                <p className="flex">
                  <p className="text-secondary mr-1">Portée </p>
                  {item.maxRange}
                </p>
              )}
              <p className="flex">
                <p className="text-secondary mr-1">Utilisation par tour </p>
                {item.nmbCast}
              </p>
              <p className="flex">
                <p className="text-secondary mr-1">Critique </p>
                {item.criticalHitProbability}%
              </p>
            </div>
          )}
          {item.characteristics[0].characId == -1 && (
            <div className="mt-4"></div>
          )}
          {item.characteristics.map((charac: Characteristic) => (
            <div>
              {charac.characId < 0 && (
                <div>
                  <div className="flex text-sm ml-3">
                    {charac.effectId == 101 ? (
                      <div className="flex text-sm items-center">
                        <Image
                          src="https://dofusdb.fr/icons/characteristics/tx_actionPoints.png"
                          className="mr-2"
                          alt="PA"
                          width={28}
                          height={28}
                        />
                        <p>-1 pa</p>
                      </div>
                    ) : (
                      <div className="flex text-sm">
                        <Image
                          src={charac.characImg}
                          alt="x"
                          className="mr-2"
                          draggable="false"
                          width={28}
                          height={28}
                        />
                        <p>
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

          {item.characteristics[0].characId == -1 && (
            <div className="mb-3"></div>
          )}
          {item.characteristics.map((charac: Characteristic, idx: number) => (
            <div key={idx} className="flex">
              {charac.characId >= 0 && (
                <p
                  className={
                    charac.characFrom < 0 || charac.characTo < 0
                      ? "text-red-500 text-sm"
                      : "text-sm "
                  }
                >
                  {charac.characTo ? (
                    <>
                      <div>
                        {charac.characFrom === null ? (
                          <div className="flex">
                            <Image
                              src={charac.characImg}
                              alt="x"
                              className="mr-2"
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
                                  className="mr-2 size-5"
                                  draggable="false"
                                  width={28}
                                  height={28}
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
                        <div className="flex">
                          {charac.effectId == 110 || charac.effectId == 139 ? (
                            <>
                              <div className="flex text-sm">
                                <p>
                                  rend {charac.characFrom} {charac.characName}
                                </p>
                              </div>
                            </>
                          ) : (
                            <div className="flex text-sm">
                              {charac.effectId == 795 ? (
                                <p className=" text-orange-400">
                                  Arme de chasse
                                </p>
                              ) : (
                                <div className="flex text-sm">
                                  {charac.effectId != 984 &&
                                    charac.effectId != 981 &&
                                    charac.effectId != 826 &&
                                    charac.effectId != 600 &&
                                    charac.effectId != 193 &&
                                    charac.effectId != 206 &&
                                    charac.effectId != 1155 &&
                                    charac.effectId != 149 &&
                                    charac.effectId != 732 &&
                                    charac.effectId != 649 &&
                                    charac.effectId != 731 &&
                                    charac.effectId != 760 &&
                                    charac.effectId != 146 &&
                                    charac.effectId != 811 &&
                                    charac.effectId != 724 &&
                                    charac.effectId != 705 &&
                                    charac.effectId != 623 &&
                                    charac.effectId != 2818 &&
                                    charac.effectId != 620 &&
                                    charac.effectId != 30 && (
                                      <div className="flex">
                                        <Image
                                          src={charac.characImg}
                                          alt="x"
                                          className="mr-2"
                                          draggable="false"
                                          height={28}
                                          width={28}
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
        </div>
      </Frame>
    </>
  );
};

export default UniqueItem;
