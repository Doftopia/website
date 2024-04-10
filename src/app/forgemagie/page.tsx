"use client";
import Navbar from "../components/Navbar/Navbar";
import Item from "../components/Item/Item";
import axios from 'axios';
import { useEffect, useState } from "react";
import { Characteristic, GroupedItems } from "../interfaces";

const Page: React.FC = () => {
    const [item, setItem] = useState<GroupedItems[]>([]);

    const runes = [
        { characteristic: 'Initiative', name: 'Ini', base: 10, pa: 30, ra: 100 },
        { characteristic: 'Poids portable', name: 'Pod', base: 10, pa: 30, ra: 100 },
        { characteristic: 'Vitalité', name: 'Vi', base: 3, pa: 10, ra: 30 },
        { characteristic: 'Force', name: 'Fo', base: 1, pa: 3, ra: 10 },
        { characteristic: 'Intelligence', name: 'Ine', base: 1, pa: 3, ra: 10 },
        { characteristic: 'Agilité', name: 'Age', base: 1, pa: 3, ra: 10 },
        { characteristic: 'Chance', name: 'Cha', base: 1, pa: 3, ra: 10 },
        { characteristic: '% Dommage', name: 'Do Per', base: 1, pa: 3, ra: 10 },
        { characteristic: '% Dommage au piège', name: 'Pi Per', base: 1, pa: 3, ra: 10 },
        { characteristic: 'Résistance fixe Neutre', name: 'Ré Neutre', base: 1, pa: 3, ra: null },
        { characteristic: 'Résistance fixe Terre', name: 'Ré Terre', base: 1, pa: 3, ra: null },
        { characteristic: 'Résistance fixe Feu', name: 'Ré Feu', base: 1, pa: 3, ra: null },
        { characteristic: 'Résistance fixe Eau', name: 'Ré Eau', base: 1, pa: 3, ra: null },
        { characteristic: 'Résistance fixe Air', name: 'Ré Air', base: 1, pa: 3, ra: null },
        { characteristic: 'Résistance en % Neutre', name: 'Ré Per Neutre', base: 1, pa: null, ra: null },
        { characteristic: 'Résistance en % Terre', name: 'Ré Per Terre', base: 1, pa: null, ra: null },
        { characteristic: 'Résistance en % Feu', name: 'Ré Per Feu', base: 1, pa: null, ra: null },
        { characteristic: 'Résistance en % Eau', name: 'Ré Per Eau', base: 1, pa: null, ra: null },
        { characteristic: 'Résistance en % Air', name: 'Ré Per Air', base: 1, pa: null, ra: null },
        { characteristic: 'Sagesse', name: 'Sa', base: 1, pa: 3, ra: 10 },
        { characteristic: 'Prospection', name: 'Prospe', base: 1, pa: 3, ra: null },
        { characteristic: 'Tacle', name: 'Tac', base: 1, pa: 3, ra: null },
        { characteristic: 'Fuite', name: 'Fui', base: 1, pa: 3, ra: null },
        { characteristic: 'Dommage élémentaire Neutre', name: 'Do Neutre', base: 1, pa: 3, ra: null },
        { characteristic: 'Dommage élémentaire Terre', name: 'Do Terre', base: 1, pa: 3, ra: null },
        { characteristic: 'Dommage élémentaire Feu', name: 'Do Feu', base: 1, pa: 3, ra: null },
        { characteristic: 'Dommage élémentaire Eau', name: 'Do Eau', base: 1, pa: 3, ra: null },
        { characteristic: 'Dommage élémentaire Air', name: 'Do Air', base: 1, pa: 3, ra: null },
        { characteristic: 'Retrait PM', name: 'Ret Pme', base: 1, pa: 3, ra: null },
        { characteristic: 'Retrait PA', name: 'Ret Pa', base: 1, pa: 3, ra: null },
        { characteristic: 'Résistance PM', name: 'Ré Pme', base: 1, pa: 3, ra: null },
        { characteristic: 'Résistance PA', name: 'Ré Pa', base: 1, pa: 3, ra: null },
        { characteristic: 'Dommage de Poussée', name: 'Do Pou', base: 1, pa: 3, ra: null },
        { characteristic: 'Résistance Poussée', name: 'Ré Pou', base: 1, pa: 3, ra: null },
        { characteristic: 'Résistance Critique', name: 'Ré Cri', base: 1, pa: 3, ra: null },
        { characteristic: 'Dommage aux pièges', name: 'Pi', base: 1, pa: 3, ra: null },
        { characteristic: 'Dommage', name: 'Do', base: 1, pa: null, ra: null },
        { characteristic: 'Soin', name: 'So', base: 1, pa: null, ra: null },
        { characteristic: 'Invocation', name: 'Invo', base: 1, pa: null, ra: null },
        { characteristic: 'Coups critiques', name: 'Cri', base: 1, pa: null, ra: null },
        { characteristic: 'Renvoi de dommage', name: 'Do Ren', base: 1, pa: null, ra: null },
        { characteristic: 'Portée', name: 'Po', base: 1, pa: null, ra: null },
        { characteristic: 'PM', name: 'Ga Pme', base: 1, pa: null, ra: null },
        { characteristic: 'PA', name: 'Ga Pa', base: 1, pa: null, ra: null },
        { characteristic: 'Arme de chasse', name: 'Rune de chasse', base: null, pa: null, ra: null }
    ];

        
    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        try {
            const itemsResponse = await axios.get(`http://localhost:3000/items?id=180`);
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
                        <div className="mt-4 bg-[#cfc4ab] mx-3">
                        <div className="flex bg-[#796f5a] align-middle">
                            <p className="w-1/6">Min</p>
                            <p className="w-1/6">Max</p>
                            <p className="w-1/6">Effets</p>
                            <button className="w-1/6">Base</button>
                            <button className="w-1/6">Pa</button>
                            <button className="w-1/6">Ra</button>
                        </div>
                            {item.characteristics.map((charac: Characteristic, characIndex: number) => (
                                <div>
                                    {charac.characTo ? (
                                        <div>
                                            <div className="flex w-full align-middle">
                                                <p className="w-1/6">{charac.characFrom}</p>
                                                <p className="w-1/6">{charac.characTo}</p>
                                                <p className="w-1/6">{charac.effectValue} {charac.characName} </p>
                                                <button className="px-1 rounded-lg w-1/6" onClick={() => addBase(itemIndex, characIndex)}>x</button>
                                                <button className="px-1 rounded-lg w-1/6" onClick={() => addPa(itemIndex, characIndex)}>x</button>
                                                <button className="px-1 rounded-lg w-1/6" onClick={() => addRa(itemIndex, characIndex)}>x</button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div>   
                                            <div className="flex w-full align-middle">
                                                <p className="w-1/6">{charac.characFrom}</p>
                                                <p className="w-1/6">x</p>
                                                <p className="w-1/6">{charac.effectValue} {charac.characName} </p>
                                                <button className="px-1 rounded-lg w-1/6" onClick={() => addBase(itemIndex, characIndex)}>x</button>
                                                <button className="px-1 rounded-lg w-1/6" onClick={() => addPa(itemIndex, characIndex)}>x</button>
                                                <button className="px-1 rounded-lg w-1/6" onClick={() => addRa(itemIndex, characIndex)}>x</button>
                                            </div> 
                                        </div>
                                    )}
                                </div>

                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Page;