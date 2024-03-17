"use client";
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import { any } from 'prop-types';
import { useEffect, useState } from 'react';

const Page: React.FC = () => {
    const searchParams = useSearchParams();
    const itemName = searchParams.get('name');
    const [item, setItem] = useState<any[]>([]);

    useEffect(() => {
        fetchItem();
    })

    const fetchItem = async () => {
        const response = await axios.get(`http://localhost:3000/items?name=${itemName}`);
        setItem(response.data.data);
    }
    

    return (
        <div className='h-screen bg-gray-800 pt-10'>
            {item.map((item: any) => (
                <div>
                <div className="bg-gray-900 text-white px-3 pb-2 rounded-sm border-black border mx-14">  
                <div className="flex  justify-between mt-4 pb-3 mb-4 border-white border-b">
                  <div className="flex flex-col">
                    <h2 className="font-bold cursor-pointer">{item.name}</h2>
                    <h3 className="text-sm mb-5 text-gray-400">{item.type} - niveau {item.level}</h3>
                    <h3>{item.description}</h3>
                  </div>
                  <img src={item.img} alt={item.name} draggable='false' className="size-36 bg-gray-800 p-2 rounded-sm border border-black"/>
                </div>  
                    {item.effects.map((effect: any) => (
                          effect.characteristic !== -1 && (
                            <div className="flex items-center">
                                <img src={effect.characImg} alt={effect.characName} className="mr-1" draggable='false'/>
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
                <h2 className='text-white mt-12 flex justify-center font-bold text-2xl'>Recipes and panoplies later</h2>
            </div>
            ))}
        </div>
    )
};

export default Page;