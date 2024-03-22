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
        console.log(response.data.data);
        
        setItem(response.data.data);
    }
    
    return (
        <div className='h-screen bg-gray-800 pt-10 flex justify-center'>
              {item.map((item: any, index: number) => (
                 <div key={index} className="bg-gray-900 text-white px-3 pb-2 rounded-sm border-black border h-fit w-2/5 pb-3">
                 <div className="flex justify-between mt-4 pb-3 mb-4">
                     <div className="flex flex-col w-2/3 border-b border-gray-800">
                         <h2 className="font-bold">{item.itemName}</h2>
                         <h3 className=" mb-5 text-gray-500">{item.type} - niveau {item.level}</h3>
                         <h3 className='mb-4 text-sm'>{item.description}</h3>
                     </div>
                 <img src={item.imgHighRes} alt={item.itemName} draggable='false' className="size-44 bg-gray-800 p-2 rounded-sm border border-black"/>
             </div>                  
             <div>
             </div>
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
                     <div className=" border-t border-gray-800 mt-3 pt-2 mb-1">
                         {item.criteria}
                     </div>
                 )}
               </div>
              ))}
        </div>
    )
};

export default Page;