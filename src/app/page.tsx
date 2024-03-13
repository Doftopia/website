"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

const Home: React.FC = () => {
  const [items, setItems] = useState<any[]>([]);
  const [effects, setEffects] = useState<string[]>([]);

  let skip = 0;

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get(`https://api.dofusdb.fr/items?$limit=10&$skip=${skip}`);
      setItems(prevItems => [...prevItems, ...response.data.data]);
      skip += 50;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchEffects();
  }, [items]);

  const fetchEffects = async () => {
    let filterCharacs: string[] = [];
  
    items.forEach((item) => {
      item.effects.forEach((effect: any) => {
        if (!filterCharacs.includes(effect.characteristic)) {
          filterCharacs.push(effect.characteristic);
        }
      });
    });

    try {
      const response = await axios.get(`https://api.dofusdb.fr/characteristics?id=${filterCharacs.join('&id=')}`);
      
      const characMap: { [key: string]: string } = {};
      response.data.data.forEach((data: any) => {
        characMap[data.id] = data.name.fr;
      });

      const updatedEffects = items.reduce((acc: string[], item) => {
        const itemEffects = item.effects.map((effect: any) => ({
          ...effect,
          characteristic: characMap[effect.characteristic]
        }));
        return [...acc, ...itemEffects];
      }, []);

      setEffects(updatedEffects);
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <div>
      {items.map((item: any, index: number) => (
        <div key={index}>
          <img src={item.imgset[0].url} alt={item.name.fr} />
          <h1>Nom de l'objet : {item.name.fr}</h1>
          <h2>Description de l'objet : {item.description.fr}</h2>
          <h2>Type de l'objet : {item.type.name.fr}</h2>
          {item.effects.map((effect: any, index2: number) => (
            <h2 key={index2}>
              {effect.characteristic} from {effect.from} to {effect.to}
            </h2>
          ))}
        </div>
      ))}
      <br />
      {effects.map((effect: any, index: number) => (
        <div key={index}>
          {effect.characteristic}
        </div>
      ))}
    </div>
  );
};

export default Home;
