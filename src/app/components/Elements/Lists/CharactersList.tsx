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
    <>
      <ul className="grid grid-cols-3">
        {characters.map((character: any, index: number) => (
          <li key={index}>
            <Character
              id={character.id}
              className={
                character.mainChar == 1
                  ? "border border-green"
                  : "border border-secondary"
              }
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
    </>
  );
};

export default CharactersList;
