"use client";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';

const Page: React.FC = () => {
    const [items, setItems] = useState<string[]>([]);
    const [nameFilter, setNameFilter] = useState<string>(""); 
    const router = useRouter();
    const [effectFilter, setEffectFilter] = useState<string[]>([]);

    const redirectItem = (itemId: string) => {
        router.push(`/items/item?id=${itemId}`);
    }

    const fetchItems = async () => {
        try {
            console.log(effectFilter);
            
            const responseItems = await axios.get(`http://localhost:3000/items`, {
                params: {
                    limit: 50,
                    name: nameFilter,
                    offset: items.length,
                    effect: effectFilter,
                },
            });
            setItems(responseItems.data.data); 
        } catch (error) {
            console.log("Error fetching items:", error);
        }
    }

    useEffect(() => {
        fetchItems();
    }, [nameFilter, effectFilter]); 

    const handleNameInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNameFilter(event.target.value);
    };

    const filterEffect = (effect: string) => {
        if (effectFilter.includes(effect)) {
            setEffectFilter(effectFilter.filter(item => item !== effect));
        } else {
            if (effectFilter.length > 1) {
                setEffectFilter([...effectFilter, effect]);
            } else {
                setEffectFilter([...effectFilter, effect]);
            }
        }
        console.log(effectFilter);
    }

    return (
        <div className="bg-gray-800 min-h-screen flex justify-between pt-7">
            <div className="flex w-96 h-96 justify-center bg-gray-900 mx-8 text-white">
                <input type="text" value={nameFilter} onChange={handleNameInputChange} placeholder="Filter by item name" className="rounded-lg w-13 h-7 mt-3 outline-none pl-3 bg-gray-700 text-white"/>
                <button onClick={() => filterEffect('Points de mouvement (PM)')}>Filtrer par: PM</button>
                <button onClick={() => filterEffect("Points d'action (PA)")}>Filtrer par: PA</button>
                <button onClick={() => filterEffect("Force")}>Filtrer par: Force</button>
            </div>
            <div className="grid gap-3 mx-4 grid-cols-4">
              {items.map((item: any, index: number) => (
                <div key={index} className="bg-gray-900 text-white px-3 pb-2 rounded-sm border-black border hover:brightness-150">
                <div className="flex justify-between pt-3 pb-3 mb-4 w-72">
                  <div className="flex flex-col">
                    <h2 className="font-bold cursor-pointer" onClick={() => redirectItem(item.itemId)}>{item.itemName}</h2>
                    <h3 className="text-sm mb-5 text-gray-500">{item.type} - niveau {item.level}</h3>
                  </div>
                  <img src={item.img} alt={item.itemName} draggable='false' className="size-24 bg-gray-800 p-2 rounded-sm border border-black"/>
                </div>                  
                <div>
                </div>
                    {/* {item.weaponDmg[0] && (   
                        <div className="text-sm">
                            <>
                                {item.weaponDmg.map((itemDmg: any) => (
                                    <div className="flex items-center">
                                        <img src={itemDmg.img} alt={itemDmg.name} className="mr-1" draggable='false'/>
                                        <p>{itemDmg.from} à {itemDmg.to} {itemDmg.name}</p>
                                    </div>
                                ))}
                            </>
                        </div>
                        )} */}
                    {item.characteristics[0] && (
                        <>
                        <div className="">
                            {item.characteristics.map((charac: any, idx: number) => (
                                <div key={idx} className="flex items-center">
                                    {charac.characId > 0 && (
                                        <>
                                            <p className={charac.characFrom < 0 || charac.chracTo < 0 ? "text-red-500 text-sm" : "text-sm"}> 
                                                {charac.characTo ? (
                                                    <>
                                                        <div className="flex">
                                                            <img src={charac.characImg} alt='x' className="mr-1 size-6" draggable='false'/>
                                                            <p>{charac.characFrom} à {charac.characTo} {charac.characName}</p>
                                                        </div>
                                                    </>
                                                ) : (
                                                    <>
                                                        <div className="flex">
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
