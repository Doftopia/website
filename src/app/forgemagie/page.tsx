"use client";
import Navbar from "../components/Navbar/Navbar";
import Item from "../components/Item/Item";
import axios from 'axios';
import { useEffect, useState } from "react";
import { Characteristic, GroupedItems } from "../interfaces";

const Page: React.FC = () => {
    const [item, setItem] = useState<GroupedItems[]>([]);
    const [reliquat, setReliquat] = useState<number>(0);

    interface Rune {
        characteristic: string;
        base: number | null;
        pa: number | null;
        ra: number | null;
    }

    interface Runes {
        [key: string]: Rune;
      }
      

    const runes: Runes = {
        'Initiative': { characteristic: 'Initiative', base: 10, pa: 30, ra: 100 },
        'Pod': { characteristic: 'Poids portable', base: 10, pa: 30, ra: 100 },
        'Vitalité': { characteristic: 'Vitalité', base: 3, pa: 10, ra: 30 },
        'Puissance': { characteristic: 'Puissance', base: 3, pa: 10, ra: 30 },
        'Force': { characteristic: 'Force', base: 1, pa: 3, ra: 10 },
        'Intelligence': { characteristic: 'Intelligence', base: 1, pa: 3, ra: 10 },
        'Agilité': { characteristic: 'Agilité', base: 1, pa: 3, ra: 10 },
        'Chance': { characteristic: 'Chance', base: 1, pa: 3, ra: 10 },
        'Do Per': { characteristic: '% Dommage', base: 1, pa: 3, ra: 10 },
        'Pi Per': { characteristic: '% Dommage au piège', base: 1, pa: 3, ra: 10 },
        'Ré Neutre': { characteristic: 'Résistance fixe Neutre', base: 1, pa: 3, ra: null },
        'Ré Terre': { characteristic: 'Résistance fixe Terre', base: 1, pa: 3, ra: null },
        'Ré Feu': { characteristic: 'Résistance fixe Feu', base: 1, pa: 3, ra: null },
        'Ré Eau': { characteristic: 'Résistance fixe Eau', base: 1, pa: 3, ra: null },
        'Ré Air': { characteristic: 'Résistance fixe Air', base: 1, pa: 3, ra: null },
        'Ré Per Neutre': { characteristic: 'Résistance en % Neutre', base: 1, pa: null, ra: null },
        'Ré Per Terre': { characteristic: 'Résistance en % Terre', base: 1, pa: null, ra: null },
        'Ré Per Feu': { characteristic: 'Résistance en % Feu', base: 1, pa: null, ra: null },
        'Ré Per Eau': { characteristic: 'Résistance en % Eau', base: 1, pa: null, ra: null },
        'Ré Per Air': { characteristic: 'Résistance en % Air', base: 1, pa: null, ra: null },
        'Sagesse': { characteristic: 'Sagesse', base: 1, pa: 3, ra: 10 },
        'Prospection': { characteristic: 'Prospection', base: 1, pa: 3, ra: null },
        'Tacle': { characteristic: 'Tacle', base: 1, pa: 3, ra: null },
        'Fuite': { characteristic: 'Fuite', base: 1, pa: 3, ra: null },
        '(dommages Neutre)': { characteristic: 'Dommage élémentaire Neutre', base: 1, pa: 3, ra: null },
        'Dommage  Terre': { characteristic: 'Dommage élémentaire Terre', base: 1, pa: 3, ra: null },
        'Dommage  Feu': { characteristic: 'Dommage élémentaire Feu', base: 1, pa: 3, ra: null },
        'Dommage  Eau': { characteristic: 'Dommage élémentaire Eau', base: 1, pa: 3, ra: null },
        'Dommage  Air': { characteristic: 'Dommage élémentaire Air', base: 1, pa: 3, ra: null },
        'Retrait PM': { characteristic: 'Retrait PM', base: 1, pa: 3, ra: null },
        'Ret Pa': { characteristic: 'Retrait PA', base: 1, pa: 3, ra: null },
        'Ré Pme': { characteristic: 'Résistance PM', base: 1, pa: 3, ra: null },
        'Ré Pa': { characteristic: 'Résistance PA', base: 1, pa: 3, ra: null },
        'Do Pou': { characteristic: 'Dommage de Poussée', base: 1, pa: 3, ra: null },
        'Ré Pou': { characteristic: 'Résistance Poussée', base: 1, pa: 3, ra: null },
        'Résistance Critiques': { characteristic: 'Résistance Critique', base: 1, pa: 3, ra: null },
        'Pi': { characteristic: 'Dommage aux pièges', base: 1, pa: 3, ra: null },
        'Do': { characteristic: 'Dommage', base: 1, pa: null, ra: null },
        'So': { characteristic: 'Soin', base: 1, pa: null, ra: null },
        'Invo': { characteristic: 'Invocation', base: 1, pa: null, ra: null },
        'Critique': { characteristic: 'Coups critiques', base: 1, pa: null, ra: null },
        'Do Ren': { characteristic: 'Renvoi de dommage', base: 1, pa: null, ra: null },
        'Portée': { characteristic: 'Portée', base: 1, pa: null, ra: null },
        'PM': { characteristic: 'PM', base: 1, pa: null, ra: null },
        'PA': { characteristic: 'PA', base: 1, pa: null, ra: null },
        'Rune de chasse': { characteristic: 'Arme de chasse', base: null, pa: null, ra: null }
    };
    
    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        try {
            const itemsResponse = await axios.get(`http://localhost:3000/items?id=11718`);
            for (const item of itemsResponse.data.data[0].characteristics) {
                if (item.characTo === null) {
                    item.effectValue = item.characFrom;
                } else {
                    const randomValue = (Math.round(item.characFrom + Math.random() * (item.characTo - item.characFrom)));
                    item.effectValue = randomValue;
                }
            }
            setItem(itemsResponse.data.data);
        } catch (error) {
            console.error(`Error fetching items ${error}`);
        }
    }

    const addBase = async (itemIndex: number, characIndex: number) => {
        setItem(prevItems => {
            const newItems = [...prevItems];
            newItems[itemIndex].characteristics[characIndex].effectValue += 1;
            return newItems;
        });
    }

    const addPa = async (itemIndex: number, characIndex: number) => {
        setItem(prevItems => {
            const newItems = [...prevItems];
            newItems[itemIndex].characteristics[characIndex].effectValue += 1*3;
            return newItems;
        });
    }

    const addRa = async (itemIndex: number, characIndex: number) => {
        setItem(prevItems => {
            const newItems = [...prevItems];
            newItems[itemIndex].characteristics[characIndex].effectValue += 1*5;
            return newItems;
        });
    }

    return (
        <div className="bg-[#a7a18d] h-screen">
            <Navbar pageName="Home"/>
            <p>Disclaimer: Je n'ai pas les vrais probas donc surement pas tres coherent.</p>
            <div className="mt-4 mx-8">
                {item.map((item: GroupedItems, itemIndex: number) => (
                    <div className="">
                        {item.itemName}
                        <img src={item.imgHighRes} alt="" className="size-44"/>
                        Reliquat: {reliquat}
                        <div className="mt-4 mx-3">
                        <div className="border border-black">
                        <div className="flex bg-[#796f5a] align-middle">
                            <p className="w-1/6">Min</p>
                            <p className="w-1/6">Max</p>
                            <p className="w-1/6">Effets</p>
                            <button className="w-1/6">Base</button>
                            <button className="w-1/6">Pa</button>
                            <button className="w-1/6">Ra</button>
                        </div>
                            {item.characteristics.map((charac: Characteristic, characIndex: number) => (
                                <div className={characIndex % 2 == 0 ? "bg-[#cfc4ab]" : "bg-white"}>
                                    {charac.characTo ? (
                                        <div>
                                            <div className="flex w-full align-middle">
                                                <p className="w-1/6">{charac.characFrom}</p>
                                                <p className="w-1/6">{charac.characTo}</p>
                                                <p className="w-1/6">{charac.effectValue} {charac.characName} </p>
                                                {/* <button className="px-1 rounded-lg w-1/6" onClick={() => addBase(itemIndex, characIndex)}>{runes[charac.characName].base}</button>
                                                {runes[charac.characName].pa && (
                                                    <button className="px-1 rounded-lg w-1/6" onClick={() => addPa(itemIndex, characIndex)}>{runes[charac.characName].pa}</button>
                                                )}
                                                {runes[charac.characName].ra && (
                                                    <button className="px-1 rounded-lg w-1/6" onClick={() => addRa(itemIndex, characIndex)}>{runes[charac.characName].ra}</button>
                                                )} */}
                                            </div>
                                        </div>
                                    ) : (
                                        <div>   
                                            <div className="flex w-full align-middle">
                                                <p className="w-1/6">{charac.characFrom}</p>
                                                <p className="w-1/6">{charac.characFrom}</p>
                                                <p className="w-1/6">{charac.effectValue} {charac.characName} </p>
                                                <button className="px-1 rounded-lg w-1/6" onClick={() => addBase(itemIndex, characIndex)}>{runes[charac.characName].base}</button>
                                                {runes[charac.characName].pa && (
                                                    <button className="px-1 rounded-lg w-1/6" onClick={() => addPa(itemIndex, characIndex)}>{runes[charac.characName].pa}</button>
                                                )}
                                                {runes[charac.characName].ra && (
                                                    <button className="px-1 rounded-lg w-1/6" onClick={() => addRa(itemIndex, characIndex)}>{runes[charac.characName].ra}</button>
                                                )}
                                            </div> 
                                        </div>
                                    )}
                                </div>

                            ))}
                        </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Page;