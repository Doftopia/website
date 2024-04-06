"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Frame from "../../ui/Frame";
import Character from "../Character";

const CharactersList: React.FC = () => {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/characters");
        setCharacters(response.data.characters);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="grid grid-cols-2">
      <h1 className="text-white ml-3">Liste des personnages</h1>
      <div>
        <ul className="flex flex-wrap">
          {characters.map((character: any, index: number) => (
            <li key={index}>
              <Character
                className={character.mainchar ? "border border-green" : ""}
                name={character.name}
                level={character.level}
                race={character.race}
                server={character.server}
                link={character.link}
                image_link={character.imagelink}
                successPts={character.successPts}
                title={character.title}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CharactersList;
