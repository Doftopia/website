/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { error } from "console";
import Navbar from "./components/Navbar/navbar";
import XpCalculator from "./components/XpCalculator/XpCalculator";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";

const Home: React.FC = async () => {
  // const [items, setItems] = useState<any[]>([]);
  // const [characs, setCharacs] = useState<any[]>([]);
  // const [characsDisplay, setCharacsDisplay] = useState<any[]>([]);
  let skip = 0;
  let characteristics: any[] = [];

  // useEffect(() => {
  //   fetchItems();
  // });

  const session = await getServerSession(authOptions);

  // const fetchItems = async () => {
  //   // try {
  //   //   const response = await axios.get(
  //   //     `https://api.dofusdb.fr/items?$limit=50&$skip=${skip}`
  //   //   );
  //   //   setItems((prevItems) => [...prevItems, ...response.data.data]);
  //   //   let characsPerItem: any[] = [];

  //   //   response.data.data.forEach((arrayResponse: any) => {
  //   //     arrayResponse.effects.forEach((charac: any) => {
  //   //       characsPerItem.push(charac.characteristic);
  //   //     });
  //   //     characteristics.push(characsPerItem);
  //   //     characsPerItem = [];
  //   //   });
  //   //   skip += 50;

  //   //   setCharacs([...characs, ...characteristics]);
  //   // } catch (error) {
  //   //   // console.log(error);
  //   // }

  //   let characsItem: String[];
  //   characsItem = [];

  //   for (let i = 0; i < characteristics.length; i++) {
  //     for (let y = 0; y < characteristics[i].length; y++) {
  //       // try {
  //       //   const response = await axios.get(
  //       //     `https://api.dofusdb.fr/characteristics?id=${characteristics[i][y]}`
  //       //   );
  //       //   let responseData = response.data.data;
  //       //   responseData.forEach((data: any) => {
  //       //     // console.log(`${characteristics[i][y]} = ${data.name.fr}`);
  //       //     characsItem.push(data.name.fr);
  //       //   });
  //       // } catch (error) {
  //       //   // console.log(error);
  //       // }
  //     }
  //     setCharacsDisplay((prevCharacItem) => [
  //       ...prevCharacItem,
  //       ...characsItem,
  //     ]);
  //     // console.log(characsItem);
  //     // console.log("\n");
  //     characsItem = [];
  //   }
  // };

  return (
    <>
      <header className="w-[33rem]">
        <Navbar />
      </header>
      {/* {items.map((item: any, index: number) => (
        <div key={index}>
          <img src={item.imgset[0].url} alt={item.name.fr} />
          <h1>Nom de l&apos;objet : {item.name.fr}</h1>
          <h2>Description de l&pos;objet : {item.description.fr}</h2>
          <h2>Type de l&pos;objet : {item.type.name.fr}</h2>
          <h2>{characsDisplay}</h2>
        </div>
      ))} */}
      <div>
        <XpCalculator />
        {session && <h1>Bonjour {session.user.username}</h1>}
      </div>
    </>
  );
};

export default Home;
