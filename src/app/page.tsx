"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

const Home: React.FC = () => {
  const [items, setItems] = useState<any[]>([]);
  let skip = 0;

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get(`https://api.dofusdb.fr/items?$limit=50&$skip=${skip}`);
      skip+=50;
      setItems(prevItems => [...prevItems, ...response.data.data]);
      console.log(response.data.data[0].effects[0].characteristic);
      try {
        const responseCharacs = await axios.get(`https://api.dofusdb.fr/characteristics?id=${response.data.data[0].effects[0].characteristic}`);
        console.log(responseCharacs.data.data[0].name.fr);
      } catch (error) {
        console.log(error, "Item has no characteristics");
      }
    } catch (error) { 
      console.log(error);
    } 
  };

  const handleScroll = () => {
    const scrollTop = document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    if (scrollTop + windowHeight >= documentHeight) {
      fetchItems();
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      {items.map((item: any, index: number) => (
        <div key={index}>
          <img src={item.imgset[0].url} alt={item.name.fr} />
          <h1>Nom de l'objet : {item.name.fr}</h1>
          <h2>Description de l'objet : {item.description.fr}</h2>
        </div>
      ))}
    </div>
  );
};

export default Home;
