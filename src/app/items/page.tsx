"use client";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';

const Page: React.FC = () => {
    const [items, setItems] = useState<any[]>([]);
    const [nameFilter, setNameFilter] = useState<string>(""); 
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();

    const redirectItem = (itemId: string) => {
        router.push(`/items/item?id=${itemId}`);
    }

    const fetchItems = async () => {
        try {
            setLoading(true);
            const responseItems = await axios.get(`http://localhost:3000/items?limit=100`, {
                params: {
                    name: nameFilter,
                    offset: items.length, 
                },
            });
            setItems(responseItems.data.data); 
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchItems();
    }, [nameFilter]); 

    useEffect(() => {
        fetchItems();
    }); 

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
                <div className="flex  justify-between mt-4 pb-3 mb-4 border-white border-b">
                  <div className="flex flex-col">
                    <h2 className="font-bold cursor-pointer" onClick={() => redirectItem(item.itemId)}>{item.name}</h2>
                    <h3 className="text-sm mb-5 text-gray-400">{item.type} - niveau {item.level}</h3>
                  </div>
                  <img src={item.img} alt={item.name} draggable='false' className="size-24 bg-gray-800 p-2 rounded-sm border border-black"/>
                </div>                  
                      {item.effects.map((effect: any, idx: number) => (
                          effect.characteristic !== -1 && (
                              <div key={idx} className="flex items-center">
                                  <img src={effect.characImg} alt={effect.characName} className="mr-1 size-7" draggable='false'/>
                                  <p className={effect.from < 0 || effect.to < 0 ? "text-red-500 text-sm" : "text-sm"}> 
                                    {effect.to ? (
                                        <>
                                            {effect.from} à {effect.to} {effect.characName}
                                        </>
                                    ) : (
                                        <>
                                            {effect.from} {effect.characName}
                                        </>
                                    )}
                                  </p>
                              </div>
                          )
                      ))}
                  </div>
              ))}
            </div>
        </div>
    );
};

export default Page;
