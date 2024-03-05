"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

const Home: React.FC = () => {
  const [itemName, setItemName] = useState<string>("");

  useEffect(() => {
    async function fetchItemData() {
      try {
        const responseItem = await axios.get(
          "https://api.dofusdb.fr/items?id=2469"
        );
        setItemName(responseItem.data.data[0].name.fr);
        const responseRecipe = await axios.get(
          `https://api.dofusdb.fr/recipes/${responseItem.data.data[0].id}`
        );
      } catch (error) {}
    }

    fetchItemData();
  }, []);

  return (
    <div>
      <h1>
        Nom de l{"'"}objet : {itemName}
      </h1>
      <div>
        <h2>Recette de l{"'"}objet :</h2>
        <ul></ul>
      </div>
    </div>
  );
};

export default Home;
