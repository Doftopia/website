"use client";
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';


const Page: React.FC = () => {
    const searchParams = useSearchParams();
    const itemId = searchParams.get('id');
    const [item, setItem] = useState<any[]>([]);
    const [recipes, setRecipes] = useState<any[]>([]);
    const [job, setjob] = useState<any>([]);

    useEffect(() => {
        if (itemId) {
            fetchItem();
        }
    }, [itemId]);

    const router = useRouter();
    const redirectSet = (setId: string) => {
        router.push(`/set?id=${setId}`);
    }

    const fetchItem = async () => {
        const response = await axios.get(`http://localhost:3000/items?id=${itemId}`);
        const recipesResponse = await axios.get(`http://localhost:3000/recipes?resultId=${itemId}`)
        let jobsResponse: any;
        try {
            jobsResponse = await axios.get(`http://localhost:3000/jobs?id=${recipesResponse.data.data[0].jobId}`);
            setjob(jobsResponse.data.data[0].jobName);
        } catch (error) {
            console.error(error);
        }
        setRecipes(recipesResponse.data.data);
        setItem(response.data.data);
    }
    
    return (
        <div className='bg-gray-800 h-screen flex flex-row justify-center gap-11'>
        <div className='mt-10 w-1/2'>
              {item.map((item: any, index: number) => (
                 <div key={index} className="bg-gray-900 text-white px-3 rounded-sm border-black border h-fit pb-3">
                 <div className="flex justify-between mt-4 pb-3 mb-4">
                     <div className="flex flex-col w-2/3 border-b border-gray-800">
                         <h2 className="font-bold">{item.itemName}</h2>
                         <h3 className=" mb-5 text-gray-500">{item.type} - niveau {item.level}</h3>
                        <h3 className="text-sm mb-5 text-green-300 cursor-pointer hover:text-green-600" onClick={() => redirectSet(item.setID)}>{item.setName}</h3>

                         <h3 className='mb-4'>{item.description}</h3>
                     </div>
                 <img src={item.imgHighRes} alt={item.itemName} draggable='false' className="size-44 bg-gray-800 p-2 rounded-sm border border-black"/>
             </div>                  
             <div>
             </div>
             {item.characteristics.map((charac: any, idx: number) => (
                                <div key={idx} className="flex items-center">
                                    {charac.characId > 0 ? (
                                        <>
                                            <p className={charac.characFrom < 0 || charac.chracTo < 0 ? "text-red-500" : "text-sm"}> 
                                                {charac.characTo ? (
                                                    <>
                                                        <div className="flex items-center">
                                                            <img src={charac.characImg} alt='x' className="mr-1 size-8" draggable='false'/>
                                                            <p>{charac.characFrom} à {charac.characTo} {charac.characName}</p>
                                                        </div>
                                                    </>
                                                ) : (
                                                    <>
                                                        <div className="flex items-center">
                                                            <img src={charac.characImg} alt='x' className="mr-1 size-8" draggable='false'/>
                                                            <p>{charac.characFrom} {charac.characName}</p>
                                                        </div>
                                                    </>
                                                )}
                                            </p>
                                        </>
                                    ) : (
                                        <>
                                            <div>
                                                <p>{charac.effectId}</p> 
                                            </div>
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
            {recipes.map((recipe: any) => (
                <div className='bg-gray-900 border border-black text-white mt-10 flex h-fit pt-3 pl-3 w-fit pr-10'>
                    <div key={recipe.resultItemId}>
                        <p className='mb-2 font-bold'>{job}</p>
                        {recipe.recipe.map((item: any, index: number) => (
                            <div key={index} className='flex flex-row items-center'>
                                <img src={item.itemImg} alt={item.itemName} className='size-11' draggable='false'/>
                                <p className='ml-3'>
                                    {item.quantity} {item.itemName}
                                </p>
                            </div>
                        ))}
                        <br></br>
                    </div>
                </div>
            ))}
        </div>
    )
};

export default Page;