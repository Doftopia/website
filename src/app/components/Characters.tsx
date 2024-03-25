"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

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
    <div>
      <h1 className="text-white">Liste des personnages</h1>
      <ul>
        {characters.map((character: any, index: number) => (
          <li key={index} className="p-2">
            <a
              href={character.link}
              className="text-yellow-500 bg-slate-900 bg-opacity-50 p-2"
            >
              <strong className="text-[#779643]"></strong> {character.name}{" "}
              <strong className="text-[#779643]"></strong>{" "}
              <span className="text-blue-500">{character.level}</span>{" "}
              <strong className="text-[#779643]">|</strong>{" "}
              <span className="text-[#779643]">{character.server}</span>{" "}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Characters;
