"use client";

import { Button } from "../../ui/Button";
import Frame from "../../ui/Frame";
import { useState, useEffect, use } from "react";
import { Input } from "../../ui/Input";
import { set } from "zod";
import axios from "axios";

interface Character {
  id: number;
  name: string;
}

const ProfileForm: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [characters, setCharacters] = useState<Character[]>([]);

  useEffect(() => {
    const fetchChars = async () => {
      try {
        const response = await axios.get("/api/characters");
        setCharacters(response.data.characters);
      } catch (error) {
        console.error(error);
      }
    };
    fetchChars();
  }, []);

  const texts = () => (
    <div className="text-primary">
      <p>Username</p>
      <p>Pseudo Ankama</p>
      <p>Email</p>
      <p>Password</p>
      <p>Votre personnage principal</p>
    </div>
  );

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <div>
      <Frame height="30rem" width="28rem">
        {!showForm ? (
          texts()
        ) : (
          <form className="w-40">
            <Input type="text" placeholder="Username" />
            <Input type="text" placeholder="Pseudo Ankama" />
            <Input type="email" placeholder="Email" />
            <Input type="password" placeholder="Password" />
          </form>
        )}
        <Button onClick={toggleForm} className="bg-blue w-24">
          Changer le profil
        </Button>
      </Frame>
      <Frame width="28rem" className={showForm ? "" : "hidden"}>
        <select name="" id="" className="w-44 bg-dark-3 mb-6 text-primary">
          {characters.map((char) => (
            <option key={char.id} value={char.id}>
              {char.name}
            </option>
          ))}
        </select>
        <div className="grid grid-cols-2">
          <Button className="bg-green w-[6rem]">Changer mes infos</Button>
          <Button className="bg-red w-[7rem]">Supprimer mon compte</Button>
        </div>
      </Frame>
    </div>
  );
};

export default ProfileForm;
