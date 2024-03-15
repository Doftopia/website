"use client";
import axios from "axios";
import React, { useState, useEffect } from "react";

const Home: React.FC = () => {
    const [items, setItems] = useState<any[]>([]);

    const fetchItems = async() => {
        try {
            const responseItems = await axios.get(`http://localhost:3000/items`);   
            setItems((prevItem) => [...prevItem, ...responseItems.data.data]);
            console.log(responseItems.data.data);
            
        } catch (error) {
            console.log(error);
        }
    }
    
    useEffect(() => {
        fetchItems();
      }, []);
  
      return (
        <div>
          <input type="text"></input>
          {items.map((item: any, index: number) => (
            <div key={index}>
              <img src={item.img} alt={item.name} />
              <h2>{item.name}</h2>
              <h3>{item.description}</h3>
              <h3>niveau {item.level}</h3>
              <h3>{item.type}</h3>
              {item.effects.map((effect: any, idx: number) => (
                effect.characteristic !== -1 && (
                  <div key={idx}>
                    <img src={effect.characImg} alt={effect.characName} />
                    {/* chat gpt a cook ca. Si effect.to == 0 alors on affiche juste effect.from et effect.characName */}
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