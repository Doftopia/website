"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Frame from "../../ui/Frame";

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
              <a
                href={`https://www.dofus.com/fr/mmorpg/communaute/annuaires/pages-persos/${character.link}`}
                className="text-primary"
              >
                <Frame width="17rem" className="m-2" key={index}>
                  {character.name}{" "}
                  <span className="text-blue">Lv. {character.level}</span>{" "}
                  <span className="text-blue">{character.race}</span>{" "}
                  <span className="text-green">{character.server}</span>{" "}
                </Frame>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CharactersList;
