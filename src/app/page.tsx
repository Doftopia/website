"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

const Home: React.FC = () => {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    async function fetchItemData() {
      try {
        const response = await axios.get("https://api.dofusdb.fr/items?$limit=50");
        setItems(response.data.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchItemData();
  }, []);

  return (
    <div>
      {items.map((item: any, index: number) => (
        <div key={index}>
          <img src={item.imgset[0].url} alt={item.name.fr} />
          <h1>Nom de l'objet : {item.name.fr}</h1>
          <h2>Description de l'objet: {item.description.fr}</h2>
        </div>
      ))}
    </div>
  );
};

export default Home;
