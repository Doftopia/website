"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Frame from "../../ui/Frame";
import ItemSet from "../Item/ItemSet";

interface ItemSet {
  setName: string;
  setId: number;
  setLevel: number;
  nmbItems: {
    characs: {
      characName: string;
      characValue: number;
      characImg: string;
    }[];
    nmbItems: number;
  }[];
}

export const ItemSetsList: React.FC = () => {
  const [itemSets, setItemSets] = useState<ItemSet[]>([]);
  const [hoveredItemSet, sethoveredItemSet] = useState<number | null>(null);

  useEffect(() => {
    const fetchItemSets = async () => {
      try {
        const response = await axios.get("http://localhost:3001/itemsets");
        setItemSets(response.data.data);
      } catch (error) {
        console.error("Error fetching item sets list");
      }
    };
    fetchItemSets();
  }, []);

  const handleItemSetClick = (itemSetId: number) => {
    window.location.href = `/set?id=${itemSetId}`;
  };

  return (
    <>
      <div className="px-4">
        <div className="py-[15rem]"></div>
        <ul>
          <div className="grid grid-cols-6 w-fit mx-auto gap-7">
            {itemSets.map((itemSet) => (
              <div
                key={itemSet.setId}
                className="w-fit hover:cursor-pointer"
                onClick={() => handleItemSetClick(itemSet.setId)}
                onMouseEnter={() => sethoveredItemSet(itemSet.setId)}
              >
                <Frame
                  width="15rem"
                  height="6rem"
                  className="border dark:border-secondary border-opacity-5 dark:hover:border-primary"
                >
                  <div className="grid h-full grid-cols-2">
                    <div className="col-span-2 mt-3">
                      <h1
                        className={` text-center mt-1 z-10 ${
                          hoveredItemSet === itemSet.setId
                            ? "text-green"
                            : "text-primary"
                        }`}
                      >
                        {itemSet.setName}
                      </h1>
                      <p className="dark:text-blue text-xs text-center italic">
                        niv.{itemSet.setLevel}
                      </p>
                    </div>
                  </div>
                </Frame>
              </div>
            ))}
          </div>
        </ul>
      </div>
    </>
  );
};
