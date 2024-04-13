"use client";
import Navbar from "../components/Navbar/Navbar";
import Item from "../components/Item/Item";
import axios from 'axios';
// import { useEffect } from "react";
import { useState } from "react";
import { Characteristic, GroupedItems } from "../interfaces";

const Page: React.FC = () => {
    const [item, setItem] = useState<GroupedItems[]>([]);

    const fetchItems = async () => {
        try {
            const itemsResponse = await axios.get(`http://localhost:3000/items?id=180`);
            setItem(itemsResponse.data.data);
        } catch (error) {
            console.error(`Error fetching items ${error}`);
        }
    }
    fetchItems();

    return (
        <div className="bg-[#a7a18d] h-screen">
            <Navbar pageName="Home"/>
            <p>Disclaimer: Je n'ai pas les vrais probas donc surement pas tres coherent.</p>
            {/* <Item PageName={item}/> */}
            <div className="mt-4 mx-8">
                {item.map((item: GroupedItems) => (
                    <div>
                        {item.itemName}
                        <img src={item.imgHighRes} alt="" className="size-44"/>
                        <div className="mt-4">
                            {item.characteristics.map((charac: Characteristic) => (
                                <div>
                                    {charac.characTo ? (
                                        <div>
                                            <div className="flex items-center w-full">
                                                <p>{charac.characFrom} - {charac.characTo}</p>
                                                <button className="w-20 bg-white rounded-lg mx-2">Base</button>
                                                <button className="w-20 bg-white rounded-lg mr-2">Pa</button>
                                                <button className="w-20 bg-white rounded-lg mr-2">Ra</button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div>
                                            <div className="flex items-center w-full">
                                                <p>{charac.characFrom}</p>
                                                <button className="w-20 bg-white rounded-lg mx-2">Base</button>
                                                <button className="w-20 bg-white rounded-lg mr-2">Pa</button>
                                                <button className="w-20 bg-white rounded-lg mr-2">Ra</button>
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