"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Frame from "../../ui/Frame";

const Characters: React.FC = () => {
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
    <div className="w-[34rem]">
      <h1 className="text-white ml-3">Liste des personnages</h1>
      <ul className="flex flex-wrap ml-2">
        {characters.map((character: any, index: number) => (
          <li key={index} className="p-2 w-44">
            <a
              href={`https://www.dofus.com/fr/mmorpg/communaute/annuaires/pages-persos/${character.link}`}
              className="text-yellow-500"
            >
              <Frame width="sm" height="sm mr-2" className="m-2" key={index}>
                {character.name}{" "}
                <span className="text-blue-400">Lv. {character.level}</span>{" "}
                <span className="text-blue-400">
                  {character.completion}% succès
                </span>{" "}
                <span className="text-[#779643]">{character.server}</span>{" "}
              </Frame>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Characters;
