/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-key */
"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import {
  Characteristic,
  GroupedItems,
  Charac,
  NmbItems,
  GroupedNmbItems,
} from "@/app/interfaces";
import * as mysql from "mysql2/promise";

const ItemSet: React.FC = () => {
  const searchParams = useSearchParams();
  const setId = searchParams.get("id");
  const [itemsSet, setItemsSet] = useState<GroupedItems[]>([]);
  const [items, setItems] = useState<GroupedItems[]>([]);

  useEffect(() => {
    if (setId) {
      fetchItem();
    }
  }, [setId]);

  const router = useRouter();

  const redirectItem = (itemId: string) => {
    router.push(`/items/item?id=${itemId}`);
  };

  const fetchItem = async () => {
    const response = await axios.get(
      `http://localhost:3001/itemSets?id=${setId}`
    );
    setItemsSet(response.data.data);
    const itemsResponse = await axios.get(
      `http://localhost:3001/items?setId=${setId}`
    );
    setItems(itemsResponse.data.data);
  };

  return (
    <div>
      <div className=" text-black pt-10">
        <div className="px-8">
          {(itemsSet as mysql.RowDataPacket).map((itemSet: GroupedNmbItems) => (
            <div className="mb-8">
              <div className="gap-8 justify-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                <div className="bg-light-2 w-full dark:text-primary dark:bg-dark-3 border-orange border py-2 px-3">
                  <p className="font-bold">
                    {itemSet.setName} - niveau {itemSet.setLevel}{" "}
                  </p>
                  {(items as mysql.RowDataPacket).map((item: GroupedItems) => (
                    <div
                      className="mt-3 flex items-center cursor-pointer hover:font-bold dark:hover:bg-green hover:bg-light-green hover:text-white rounded-lg transition-all p-1"
                      onClick={() => redirectItem(item.itemId.toString())}
                    >
                      <img
                        src={item.imgHighRes}
                        alt={item.itemName}
                        draggable="false"
                        className="size-16 mr-2"
                      />
                      <h3>{item.type}</h3>
                    </div>
                  ))}
                </div>
                {itemSet.nmbItems.map((nmbItem: NmbItems) => (
                  <div className="bg-light-2 dark:bg-dark-3 dark:text-primary w-full rounded-sm pl-2 pr-6 pb-3 border border-light-green dark:border-green">
                    <p className="mt-3 mb-2">Bonus {nmbItem.nmbItems} items</p>
                    {nmbItem.characs.map((charac: Charac) => (
                      <div className="items-center flex ml-1">
                        <img
                          src={charac.characImg}
                          alt={charac.characName}
                          className="mr-2"
                        />
                        <p>
                          {charac.characValue} {charac.characName}
                        </p>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ItemSet;
