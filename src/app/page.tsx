"use client";
import axios from "axios";
import React, { useState, useEffect } from "react";

const Home: React.FC = () => {
    const [items, setItems] = useState<any[]>([]);
    const [nameFilter, setNameFilter] = useState<string>(""); 

    const fetchItems = async () => {
        try {
            const responseItems = await axios.get(`http://localhost:3000/items`, {
                params: {
                    name: nameFilter,
                },
            });
            setItems(responseItems.data.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchItems();
    }, [nameFilter]); 

    const handleNameInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNameFilter(event.target.value);
    };

    return (
        <div>
            <input
                type="text"
                value={nameFilter}
                onChange={handleNameInputChange}
                placeholder="Filter by item name"
            />
            {items.map((item: any, index: number) => (
              <div key={index} className="bg-black">                    
              <img src={item.img} alt={item.name} />
                    <h2>{item.name}</h2>
                    <h3>{item.description}</h3>
                    <h3>niveau {item.level}</h3>
                    <h3>{item.type}</h3>
                    {item.effects.map((effect: any, idx: number) => (
                        effect.characteristic !== -1 && (
                            <div key={idx}>
                                <img src={effect.characImg} alt={effect.characName} />
                                {effect.to ? (
                                    <>
                                        {effect.from} a {effect.to} {effect.characName}
                                    </>
                                ) : (
                                    <>
                                        {effect.from} {effect.characName}
                                    </>
                                )}
                            </div>
                        )
                    ))}
                </div>
            ))}
        </div>
    );
};

export default Home;
