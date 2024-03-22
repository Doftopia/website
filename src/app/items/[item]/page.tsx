"use client";
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import { any } from 'prop-types';
import { useEffect, useState } from 'react';

const Page: React.FC = () => {
    const searchParams = useSearchParams();
    const itemId = searchParams.get('id');
    const [item, setItem] = useState<any[]>([]);

    useEffect(() => {
        fetchItem();
    })

    const fetchItem = async () => {
        const response = await axios.get(`http://localhost:3000/items?id=${itemId}`);
        setItem(response.data.data);
    }
    
    return (
        <div className='h-screen bg-gray-800 pt-10 flex justify-center'>
              {item.map((item: any, index: number) => (
                <div key={index} className="bg-gray-900 text-white px-3 pb-2 rounded-sm border-black border w-1/4  pr-4 h-fit">
                <div className="mt-4 pb-3 mb-4 flex ">
                  <div className="flex flex-col">
                    <h2 className="font-bold">{item.itemName}</h2>
                    <h3 className="mb-5 text-gray-500">{item.itemType} - niveau {item.itemLevel}</h3>
                    <img src={item.bigImg} alt={item.itemName} draggable='false' className="size-60 bg-gray-800 p-2 rounded-sm border border-black"/>
                  </div>
                </div>                  
                <div>
                </div>
                    {item.weaponDmg[0] && (   
                        <div>
                            <div className='border-b border-gray-800 pb-3 mb-'>
                                {item.itemDescription}
                            </div>
                            <div className="">
                                <>
                                    {item.weaponDmg.map((itemDmg: any) => (
                                        <div className="flex items-center">
                                            <img src={itemDmg.img} alt={itemDmg.name} className="mr-1" draggable='false'/>
                                            <p>{itemDmg.from} à {itemDmg.to} {itemDmg.name}</p>
                                        </div>
                                    ))}
                                </>
                            </div>
                        </div>
                        )}
                    {item.itemCharacs[0] && (
                        <>
                        <div className="border-t border-gray-800 pt-3 mt-3">
                            {item.itemCharacs.map((effect: any, idx: number) => (
                                <div key={idx} className="flex items-center">
                                    {effect.characteristic !== -1 && (
                                        <>
                                            <p className={effect.from < 0 || effect.to < 0 ? "text-red-500" : ""}> 
                                                {effect.to ? (
                                                    <>
                                                        <div className="flex">
                                                            <img src={effect.characImg} alt={effect.characName} className="mr-1" draggable='false'/>
                                                            <p>{effect.from} à {effect.to} {effect.characName}</p>
                                                        </div>
                                                    </>
                                                ) : (
                                                    <>
                                                        <div className="flex">
                                                            <img src={effect.characImg} alt={effect.characName} className="mr-1" draggable='false'/>
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
                                <div className="border-t border-gray-800 mt-3 pt-3 mb-1">
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
                        <div className="border-t border-gray-800 mt-3 pt-2 mb-1">
                            {item.criteria}
                        </div>
                    )}
                    <div className='text-white mt-10'>
                        {item.recipeItemsIds}
                        <br></br>
                        {item.recipeItemsQuantities}
                    </div>
                  </div>
              ))}
        </div>
    )
};

export default Page;