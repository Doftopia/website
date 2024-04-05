"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Navbar from "../components/Navbar/Navbar";
import { Characteristic, GroupedItems, Charac, NmbItems, Item, GroupedNmbItems } from "../interfaces";
import * as mysql from "mysql2/promise";


const Page: React.FC = () => {
    const searchParams = useSearchParams();
    const setId = searchParams.get('id');
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
    }

    const fetchItem = async () => {
        const response = await axios.get(`http://localhost:3000/itemSets?id=${setId}`);
        setItemsSet(response.data.data);
        const itemsResponse = await axios.get(`http://localhost:3000/items?setId=${setId}`);
        setItems(itemsResponse.data.data);
    }

    return (
        <div>

        <Navbar pageName="Home"/>

        <div className="bg-gray-800 h-full pb-10 pt-14">
        <div className=" text-white pt-10">
            {(itemsSet as mysql.RowDataPacket).map((itemSet: GroupedNmbItems) => (
                <div>
                  <div className="flex gap-8 justify-center">
                    <div className="bg-gray-900 w-fit rounded-sm border border-black pl-2 pr-6 pb-3 pt-3">
                        <p className="font-bold">{itemSet.setName} - niveau {itemSet.setLevel} </p>
                        {(items as mysql.RowDataPacket).map((item: Item) => (
                            <div className="mt-3 flex items-center cursor-pointer hover:font-bold hover:bg-[#779643]" onClick={() => redirectItem(item.itemId)}>
                                <img src={item.imgHighRes} alt={item.itemName} draggable='false' className="size-16 mr-2"/>
                                <h3>{item.type}</h3>
                            </div>
                        ))}
                    </div>
                      {itemSet.nmbItems.map((nmbItem: NmbItems) => (
                          <div className="bg-gray-900 w-fit rounded-sm border border-black pl-2 pr-6 pb-3">
                              <p className="mt-3 mb-2">Bonus {nmbItem.nmbItems} items</p>
                              {nmbItem.characs.map((charac: Charac) => (
                                  <div className="items-center flex ml-1">
                                      <img src={charac.characImg} alt={charac.characName} className="mr-2"/>
                                      <p>{charac.characValue} {charac.characName}</p>
                                  </div>
                              ))}
                          </div>
                      ))}
                  </div>
              </div>
              ))}
            <div className="grid gap-3 mx-4 grid-cols-4 pt-10">
              {items.map((item: GroupedItems, index: number) => (
                  <div key={index} className="bg-gray-900 text-white px-3 pb-2 rounded-sm border-black border">
                <div className="flex justify-between pt-3 pb-3 mb-4 w-full">
                  <div className="flex flex-col transition-all">
                    <h2 className="font-bold cursor-pointer hover:text-gray-300" onClick={() => redirectItem(item.itemId.toString())}>{item.itemName}</h2>
                    <h3 className="text-sm text-gray-500">{item.type} - niveau {item.level}</h3>
                    <h3 className="text-sm mb-5 text-[#779643] cursor-pointer">{item.setName}</h3>
                  </div>
                  <img src={item.imgHighRes} alt={item.itemName} draggable='false' className="size-24 bg-gray-800 p-2 rounded-sm border border-black"/>
                </div>                  
                <div>
                </div>
                {(item as mysql.RowDataPacket).characteristics.map((charac: Characteristic) => (
                <div>
                    {charac.characId < 0 && (
                        <div>
                            <div className="flex items-center">
                                <img src={charac.characImg} alt='x' className="mr-1 size-8" draggable='false'/>
                                <p>{charac.characFrom} à {charac.characTo} {charac.characName}</p>
                            </div>
                        </div>
                    )}
                </div>
             ))}
                    {item.characteristics[0] && (
                        <>
                        <div className="border-t border-gray-800 pt-3">
                            {item.characteristics.map((charac: Characteristic, idx: number) => (
                                <div key={idx} className="flex items-center">
                                    {charac.characId > 0 && (
                                        <>
                                            <p className={charac.characFrom < 0 || charac.characTo < 0 ? "text-red-500 text-sm" : "text-sm"}> 
                                                {charac.characTo ? (
                                                    <>
                                                        <div className="flex items-center">
                                                            <img src={charac.characImg} alt='x' className="mr-1 size-6" draggable='false'/>
                                                            <p>{charac.characFrom} à {charac.characTo} {charac.characName}</p>
                                                        </div>
                                                    </>
                                                ) : (
                                                    <>
                                                        <div className="flex items-center">
                                                            <img src={charac.characImg} alt='x' className="mr-1 size-6" draggable='false'/>
                                                            <p>{charac.characFrom} {charac.characName}</p>
                                                        </div>
                                                    </>
                                                )}
                                            </p>
                                        </>
                                    )}
                                </div>
                            ))}
                        </div>
                        </>
                    )}
                    
                    {item.apCost && (
                        <>
                                <div className="text-sm border-t border-gray-800 mt-3 pt-3 mb-1">
                                    <p className="flex"><p className="text-gray-500 mr-1">Coût </p>{item.apCost} PA</p>
                                    {item.minRange !== item.maxRange ? (
                                        <p className="flex"><p className="text-gray-500 mr-1">Portée </p>{item.minRange}-{item.maxRange}</p>
                                        ) : (
                                            <p className="flex"><p className="text-gray-500 mr-1">Portée </p>{item.maxRange}</p>
                                            )}
                                    <p className="flex"><p className="text-gray-500 mr-1">Utilisation par tour </p>{item.nmbCast}</p>
                                    <p className="flex"><p className="text-gray-500 mr-1">Critique </p>{item.criticalHitProbability}%</p>
                                </div>
                        </>
                    )}
                  </div>
              ))}
              </div>
        </div>
    </div>
    </div>
    )
};

export default Page;