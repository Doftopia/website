/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-key */
"use client";
import { useState } from "react";
import { Characteristic, GroupedItems } from "@/app/interfaces";
import axios from "axios";

interface FmToolInterface {
  item?: GroupedItems[];
  key?: number;
}

const FmTool: React.FC<FmToolInterface> = (key) => {
  const [items, setItems] = useState<GroupedItems[]>([]);

  const fetchItems = async () => {
    try {
      const itemsResponse = await axios.get(
        `http://localhost:3001/items?id=180`
      );
      setItems(itemsResponse.data.data);
    } catch (error) {
      console.error(`Error fetching items ${error}`);
    }
  };
  fetchItems();
  return (
    <>
      {items.map((item: GroupedItems) => (
        <div>
          {item.itemName}
          <img src={item.imgHighRes} alt={`${key}`} className="size-44" />
          <div className="mt-4">
            {item.characteristics.map((charac: Characteristic) => (
              <div>
                {charac.characTo ? (
                  <div>
                    <div className="flex items-center w-full">
                      <p>
                        {charac.characFrom} - {charac.characTo}
                      </p>
                      <button className="w-20 bg-white rounded-lg mx-2">
                        Base
                      </button>
                      <button className="w-20 bg-white rounded-lg mr-2">
                        Pa
                      </button>
                      <button className="w-20 bg-white rounded-lg mr-2">
                        Ra
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center w-full">
                      <p>{charac.characFrom}</p>
                      <button className="w-20 bg-white rounded-lg mx-2">
                        Base
                      </button>
                      <button className="w-20 bg-white rounded-lg mr-2">
                        Pa
                      </button>
                      <button className="w-20 bg-white rounded-lg mr-2">
                        Ra
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  );
};

export default FmTool;
