"use client";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';

const Page: React.FC = () => {
    const [items, setItems] = useState<string[]>([]);
    const [nameFilter, setNameFilter] = useState<string>(); 
    const router = useRouter();
    const [effectFilter, setEffectFilter] = useState<string[]>([]);

    const redirectItem = (itemId: string) => {
        router.push(`/items/item?id=${itemId}`);
    }

    const redirectSet = (setId: string) => {
        router.push(`/set?id=${setId}`);
    }

    const fetchItems = async () => {
        try {
            const responseItems = await axios.get(`http://localhost:3000/items`, {
                params: {
                    limit: 200,
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

    const filterEffect = (effect: number) => {
        const button = document.getElementById(effect.toString());
        if (effectFilter.includes(effect.toString())) {
            setEffectFilter(effectFilter.filter(item => item !== effect.toString()));
            button.style.fontWeight = 'normal';
            button.style.color = 'white';
        } else {
            button.style.fontWeight = 'bolder';
            button.style.color = 'rgb(144,238,144)';
            setEffectFilter([...effectFilter, effect.toString()]);
        }
    }


    const clearFilterEffect = () => {
        setEffectFilter([]);
        const buttons = document.querySelectorAll('.filter-button')
        buttons.forEach(button => {
            button.style.color = '';
            button.style.fontWeight = '';
        });
    }

    return (
        <div className="bg-gray-800 min-h-screen pt-7 flex">
            <div className="flex w-3/12 h-fit py-3 px-4 bg-gray-900 mx-8 text-white flex-col fixed text-sm transition-all">
                <input type="text" value={nameFilter} onChange={handleNameInputChange} placeholder="Rechercher" className="rounded-lg w-13 h-9 mt-1 outline-none pl-3 bg-gray-700 text-white"/>
                <div className="grid grid-cols-2 mt-6 w-fit">
                    <div className="bg-gray-800 border border-black w-fit pl-2 pr-8 py-1">
                        <p className="mb-2 mt-1">Primaires</p>
                        <button onClick={() => filterEffect(1)} id='1' className="filter-button flex hover:font-bold">
                            <img src="https://dofusdb.fr/icons/characteristics/tx_actionPoints.png" alt="lifePoints" className="size-6 mr-1"></img>
                            PA</button>
                        <button onClick={() => filterEffect(23)} id="23" className="filter-button flex hover:font-bold">
                            <img src="https://dofusdb.fr/icons/characteristics/tx_movementPoints.png" alt="lifePoints" className="size-6 mr-1"></img>
                            PM
                        </button>
                        <button onClick={() => filterEffect(19)} id="19" className="filter-button flex hover:font-bold">
                            <img src="https://dofusdb.fr/icons/characteristics/tx_range.png" alt="lifePoints" className="size-6 mr-1"></img>
                            PO</button>
                        <button onClick={() => filterEffect(11)} id="11" className="filter-button flex hover:font-bold">
                            <img src="https://dofusdb.fr/icons/characteristics/tx_vitality.png" alt="lifePoints" className="size-6 mr-1"></img>
                            Vitalite</button>
                        <button onClick={() => filterEffect(14)} id='14' className="filter-button flex hover:font-bold">
                            <img src="https://dofusdb.fr/icons/characteristics/tx_agility.png" alt="lifePoints" className="size-6 mr-1"></img>
                            Agilite</button>
                        <button onClick={() => filterEffect(13)} id='13' className="filter-button flex hover:font-bold">
                            <img src="https://dofusdb.fr/icons/characteristics/tx_chance.png" alt="lifePoints" className="size-6 mr-1"></img>
                            Chance</button>
                        <button onClick={() => filterEffect(10)} id='10' className="filter-button flex hover:font-bold">
                            <img src="https://dofusdb.fr/icons/characteristics/tx_strength.png" alt="lifePoints" className="size-6 mr-1"></img>
                            Force</button>
                        <button onClick={() => filterEffect(15)} id='15' className="filter-button flex hover:font-bold">
                            <img src="https://dofusdb.fr/icons/characteristics/tx_intelligence.png" alt="lifePoints" className="size-6 mr-1"></img>
                            Intelligence</button>
                        <button onClick={() => filterEffect(25)} id='25' className="filter-button flex hover:font-bold">
                            <img src="https://dofusdb.fr/icons/characteristics/tx_damagesPercent.png" alt="lifePoints" className="size-6 mr-1"></img>
                            Puissance</button>
                        <button onClick={() => filterEffect(18)} id='18' className="filter-button flex hover:font-bold">
                            <img src="https://dofusdb.fr/icons/characteristics/tx_crit.png" alt="lifePoints" className="size-6 mr-1"></img>
                            Critique</button>
                        <button onClick={() => filterEffect(12)} id='12' className="filter-button flex hover:font-bold">
                            <img src="https://dofusdb.fr/icons/characteristics/tx_wisdom.png" alt="lifePoints" className="size-6 mr-1"></img>
                            Sagesse</button>
                    </div>
                    <div className="bg-gray-800 border border-black w-fit pl-2 pr-8 py-1">
                        <p className="mb-2 mt-1">Secondaires</p>
                        <button onClick={() => filterEffect(82)} id='82' className="filter-button flex hover:font-bold">
                            <img src="https://dofusdb.fr/icons/characteristics/tx_attackAP.png" alt="lifePoints" className="size-6 mr-1"></img>
                            Retrait PA</button>
                        <button onClick={() => filterEffect(27)} id='27' className="filter-button flex hover:font-bold">
                            <img src="https://dofusdb.fr/icons/characteristics/tx_dodgeAP.png" alt="lifePoints" className="size-6 mr-1"></img>
                            Esquive PA</button>
                        <button onClick={() => filterEffect(83)} id='83' className="filter-button flex hover:font-bold">
                            <img src="https://dofusdb.fr/icons/characteristics/tx_attackMP.png" alt="lifePoints" className="size-6 mr-1"></img>
                            Retrait PM</button>
                        <button onClick={() => filterEffect(28)} id='28' className="filter-button flex hover:font-bold">
                            <img src="https://dofusdb.fr/icons/characteristics/tx_dodgeMP.png" alt="lifePoints" className="size-6 mr-1"></img>
                            Retrait PA</button>
                        <button onClick={() => filterEffect(49)} id='49' className="filter-button flex hover:font-bold">
                            <img src="https://dofusdb.fr/icons/characteristics/tx_heal.png" alt="lifePoints" className="size-6 mr-1"></img>
                            Soins</button>
                        <button onClick={() => filterEffect(79)} id='79' className="filter-button flex hover:font-bold">
                            <img src="https://dofusdb.fr/icons/characteristics/tx_tackle.png" alt="lifePoints" className="size-6 mr-1"></img>
                            Tacle</button>
                        <button onClick={() => filterEffect(78)} id='78' className="filter-button flex hover:font-bold">
                            <img src="https://dofusdb.fr/icons/characteristics/tx_escape.png" alt="lifePoints" className="size-6 mr-1"></img>
                            Fuite</button>
                        <button onClick={() => filterEffect(44)} id='44' className="filter-button flex hover:font-bold">
                            <img src="https://dofusdb.fr/icons/characteristics/tx_initiative.png" alt="lifePoints" className="size-6 mr-1"></img>
                            Initiative</button>
                        <button onClick={() => filterEffect(26)} id='26' className="filter-button flex hover:font-bold">
                            <img src="https://dofusdb.fr/icons/characteristics/tx_summonableCreaturesBoost.png" alt="lifePoints" className="size-6 mr-1"></img>
                            Invocation</button>
                        <button onClick={() => filterEffect(48)} id='48' className="filter-button flex hover:font-bold">
                            <img src="https://dofusdb.fr/icons/characteristics/tx_prospecting.png" alt="lifePoints" className="size-6 mr-1"></img>
                            Prospection</button>
                        <button onClick={() => filterEffect(40)} id='40' className="filter-button flex hover:font-bold">
                            <img src="https://dofusdb.fr/icons/characteristics/tx_pods.png" alt="lifePoints" className="size-6 mr-1"></img>
                            Pods</button>
                    </div>
                </div>
                <div className="grid grid-cols-2 mt-6 w-fit">
                    <div className="bg-gray-800 border border-black w-fit pl-2 pr-8 py-1">
                        Dommages
                        <button onClick={() => filterEffect(16)} id='16' className="filter-button flex hover:font-bold">
                            <img src="https://dofusdb.fr/icons/characteristics/tx_damage.png" alt="lifePoints" className="size-6 mr-1"></img>
                            Dommages</button>
                        <button onClick={() => filterEffect(86)} id='86' className="filter-button flex hover:font-bold">
                            <img src="https://dofusdb.fr/icons/characteristics/tx_criticalDamage.png" alt="lifePoints" className="size-6 mr-1"></img>
                            Dommages critiques</button>
                        <button onClick={() => filterEffect(92)} id='92' className="filter-button flex hover:font-bold">
                            <img src="https://dofusdb.fr/icons/characteristics/tx_neutral.png" alt="lifePoints" className="size-6 mr-1"></img>
                            Dmg Neutre</button>
                        <button onClick={() => filterEffect(88)} id='88' className="filter-button flex hover:font-bold">
                            <img src="https://dofusdb.fr/icons/characteristics/tx_strength.png" alt="lifePoints" className="size-6 mr-1"></img>
                            Dmg Terre</button>
                        <button onClick={() => filterEffect(89)} id='89' className="filter-button flex hover:font-bold">
                            <img src="https://dofusdb.fr/icons/characteristics/tx_intelligence.png" alt="lifePoints" className="size-6 mr-1"></img>
                            Dmg Feu</button>
                        <button onClick={() => filterEffect(90)} id='90' className="filter-button flex hover:font-bold">
                            <img src="https://dofusdb.fr/icons/characteristics/tx_chance.png" alt="lifePoints" className="size-6 mr-1"></img>
                            Dmg Eau</button>
                        <button onClick={() => filterEffect(91)} id='91' className="filter-button flex hover:font-bold">
                            <img src="https://dofusdb.fr/icons/characteristics/tx_agility.png" alt="lifePoints" className="size-6 mr-1"></img>
                            Dmg Air</button>
                    </div>
                    <div className="bg-gray-800 border border-black w-fit pl-2 pr-8 py-1">
                        Resistances
                        <button onClick={() => filterEffect(58)} id='58' className="filter-button flex hover:font-bold">
                            <img src="https://dofusdb.fr/icons/characteristics/tx_neutral.png" alt="lifePoints" className="size-6 mr-1"></img>
                            Neutre (fixe)</button>
                        <button onClick={() => filterEffect(37)} id='37' className="filter-button flex hover:font-bold">
                            <img src="https://dofusdb.fr/icons/characteristics/tx_neutral.png" alt="lifePoints" className="size-6 mr-1"></img>
                            Neutre (%)</button>
                        <button onClick={() => filterEffect(54)} id='54' className="filter-button flex hover:font-bold">
                            <img src="https://dofusdb.fr/icons/characteristics/tx_strength.png" alt="lifePoints" className="size-6 mr-1"></img>
                            Terre (fixe)</button>
                        <button onClick={() => filterEffect(33)} id='33' className="filter-button flex hover:font-bold">
                            <img src="https://dofusdb.fr/icons/characteristics/tx_strength.png" alt="lifePoints" className="size-6 mr-1"></img>
                            Terre (%)</button>
                        <button onClick={() => filterEffect(55)} id='55' className="filter-button flex hover:font-bold">
                            <img src="https://dofusdb.fr/icons/characteristics/tx_intelligence.png" alt="lifePoints" className="size-6 mr-1"></img>
                            Feu (fixe)</button>
                        <button onClick={() => filterEffect(34)} id='34' className="filter-button flex hover:font-bold">
                            <img src="https://dofusdb.fr/icons/characteristics/tx_intelligence.png" alt="lifePoints" className="size-6 mr-1"></img>
                            Feu (%)</button>
                        <button onClick={() => filterEffect(56)} id='56' className="filter-button flex hover:font-bold">
                            <img src="https://dofusdb.fr/icons/characteristics/tx_chance.png" alt="lifePoints" className="size-6 mr-1"></img>
                            Eau (fixe)</button>
                        <button onClick={() => filterEffect(35)} id='35' className="filter-button flex hover:font-bold">
                            <img src="https://dofusdb.fr/icons/characteristics/tx_chance.png" alt="lifePoints" className="size-6 mr-1"></img>
                            Eau (%)</button>
                        <button onClick={() => filterEffect(57)} id='57' className="filter-button flex hover:font-bold">
                            <img src="https://dofusdb.fr/icons/characteristics/tx_agility.png" alt="lifePoints" className="size-6 mr-1"></img>
                            Air (fixe)</button>
                        <button onClick={() => filterEffect(36)} id='36' className="filter-button flex hover:font-bold">
                            <img src="https://dofusdb.fr/icons/characteristics/tx_agility.png" alt="lifePoints" className="size-6 mr-1"></img>
                            Air (%)</button>
                    </div>
                </div>
                <button onClick={() => clearFilterEffect()} id='ResetFilters'>Reset filters</button>
            </div>
            <div className="flex justify-end w-full mr-10">
            <div className="grid gap-3 mx-4 grid-cols-3">
              {items.map((item: any, index: number) => (
                <div key={index} className="bg-gray-900 text-white px-3 pb-2 rounded-sm border-black border">
                <div className="flex justify-between pt-3 pb-3 mb-4 w-96">
                  <div className="flex flex-col transition-all">
                    <h2 className="font-bold cursor-pointer hover:text-gray-300" onClick={() => redirectItem(item.itemId)}>{item.itemName}</h2>
                    <h3 className="text-sm text-gray-500">{item.type} - niveau {item.level}</h3>
                    <h3 className="text-sm mb-5 text-green-300 cursor-pointer hover:text-green-600" onClick={() => redirectSet(item.setID)}>{item.setName}</h3>
                  </div>
                  <img src={item.img} alt={item.itemName} draggable='false' className="size-24 bg-gray-800 p-2 rounded-sm border border-black"/>
                </div>                  
                <div>
                </div>
                    {item.characteristics[0] && (
                        <>
                        <div className="border-t border-gray-800 pt-3">
                            {item.characteristics.map((charac: any, idx: number) => (
                                <div key={idx} className="flex items-center">
                                    {charac.characId > 0 && (
                                        <>
                                            <p className={charac.characFrom < 0 || charac.chracTo < 0 ? "text-red-500 text-sm" : "text-sm"}> 
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
    );
};

export default Page;
