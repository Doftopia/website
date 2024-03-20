"use client";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';

const Page: React.FC = () => {
    const [items, setItems] = useState<any[]>([]);
    const [nameFilter, setNameFilter] = useState<string>(""); 
    const router = useRouter();

    const redirectItem = (itemId: string) => {
        router.push(`/items/item?id=${itemId}`);
    }

    const fetchItems = async () => {
        try {
            const responseItems = await axios.get(`http://localhost:3000/items`, {
                params: {
                    limit: 50,
                    name: nameFilter,
                    offset: items.length,
                },
            });
            setItems(responseItems.data.data); 
        } catch (error) {
            console.log("Error fetching items:", error);
        }
    }

    useEffect(() => {
        fetchItems();
    }, [nameFilter]); 

    const handleNameInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNameFilter(event.target.value);
    };

    return (
        <div className="bg-gray-800 min-h-screen">
            <input
                type="text"
                value={nameFilter}
                onChange={handleNameInputChange}
                placeholder="Filter by item name"
            />
            <div className="grid gap-3 mx-4 2xl:grid-cols-4 2xl:mx-52 lg:grid-cols-3 lg:mx-44 md:grid-cols-2 md:mx-28 sm:grid-cols-1 sm:mx-16">
              {items.map((item: any, index: number) => (
                <div key={index} className="bg-gray-900 text-white px-3 pb-2 rounded-sm border-black border hover:brightness-150">
                <div className="flex justify-between mt-4 pb-3 mb-4">
                  <div className="flex flex-col">
                    <h2 className="font-bold cursor-pointer" onClick={() => redirectItem(item.itemId)}>{item.name}</h2>
                    <h3 className="text-sm mb-5 text-gray-500">{item.type} - niveau {item.level}</h3>
                  </div>
                  <img src={item.img} alt={item.name} draggable='false' className="size-24 bg-gray-800 p-2 rounded-sm border border-black"/>
                </div>                  
                <div>
                </div>
                    {item.itemDmg[0] && (
                        <div className="text-sm">
                            <>
                                {/* <p className="text-gray-500">Degats d'arme</p> */}
                                {item.itemDmg.map((itemDmg: any) => (
                                    <div className="flex items-center">
                                        <img src={itemDmg.img} alt={itemDmg.name} className="mr-1" draggable='false'/>
                                        <p>{itemDmg.from} à {itemDmg.to} {itemDmg.name}</p>
                                    </div>
                                ))}
                            </>
                        </div>
                        )}
                    {item.effects[0] && (
                        <>
                        <div className="border-t border-gray-800 pt-3 mt-3">
                            {item.effects.map((effect: any, idx: number) => (
                                <div key={idx} className="flex items-center">
                                    {effect.characteristic !== -1 && (
                                        <>
                                            <p className={effect.from < 0 || effect.to < 0 ? "text-red-500 text-sm" : "text-sm"}> 
                                                {effect.to ? (
                                                    <>
                                                        <div className="flex">
                                                            <img src={effect.characImg} alt={effect.characName} className="mr-1 size-6" draggable='false'/>
                                                            <p>{effect.from} à {effect.to} {effect.characName}</p>
                                                        </div>
                                                    </>
                                                ) : (
                                                    <>
                                                        <div className="flex">
                                                            <img src={effect.characImg} alt={effect.characName} className="mr-1 size-6" draggable='false'/>
                                                            <p>{effect.from} {effect.characName}</p>
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
                    
                    {item.criteria && (
                        <div className="text-sm border-t border-gray-800 mt-3 pt-2 mb-1">
                            {item.criteria}
                        </div>
                    )}
                  </div>
              ))}
            </div>
        </div>
    );
};

export default Page;
