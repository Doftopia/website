"use client";

import { Button } from "../../ui/Button";
import Frame from "../../ui/Frame";
import { useState, useEffect } from "react";
import { Input } from "../../ui/input";
import axios from "axios";

interface Character {
  id: number;
  name: string;
  mainChar: boolean;
}
interface ProfileFormProps {
  name?: string;
  pseudoAnkama: string;
  email?: string;
  password?: string;
  character?: string;
}

const ProfileForm: React.FC<ProfileFormProps> = ({
  name,
  pseudoAnkama,
  email,
  password,
  character,
}) => {
  const [showForm, setShowForm] = useState(false);
  const [characters, setCharacters] = useState<Character[]>([]);
  const mainChar = characters.find((char) => char.mainChar === true);
  const [selectedCharacter, setSelectedCharacter] = useState<string>("");
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
      <div className="">
        <p>Nom d&apos;utilisateur</p>
        <p className="text-blue">{name}</p>
      </div>
      <div className="">
        <p>Pseudo Ankama</p>
        <p className="text-green">{pseudoAnkama}</p>
      </div>
      <div className="">
        <p>Email</p>
        <p className="text-blue">{email}</p>
      </div>
      <div className="">
        <p>Mot de passe</p>
        <p className="text-blue">********</p>
      </div>
      <div className="">
        <p>Votre personnage principal</p>
        <p className="text-green">{mainChar?.name}</p>
      </div>
    </div>
  );

  const handleCharacterChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedCharacter(event.target.value);
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const handleFormSubmit = async () => {
    try {
      const newName = (document.getElementById("name") as HTMLInputElement)
        ?.value;
      const newPseudoAnkama = (
        document.getElementById("pseudoAnkama") as HTMLInputElement
      )?.value;
      const newEmail = (document.getElementById("email") as HTMLInputElement)
        ?.value;
      const newPassword = (
        document.getElementById("password") as HTMLInputElement
      )?.value;
      await axios.post(
        "/api/user/edit",
        {
          name: newName ? newName : name,
          pseudoAnkama: newPseudoAnkama ? newPseudoAnkama : pseudoAnkama,
          email: newEmail ? newEmail : email,
          password: newPassword ? newPassword : password,
          character: selectedCharacter,
        },
        { headers: { "Content-Type": "application/json" } }
      );
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Frame height="30rem" width="28rem">
        {!showForm ? (
          texts()
        ) : (
          <form className="w-40 text-primary">
            <div>
              <p>Nom d&apos;utilisateur</p>
              <Input type="text" id="name" placeholder={name} className="" />
            </div>
            <div>
              <p>Pseudo Ankama</p>
              <Input
                id="pseudoAnkama"
                type="text"
                value={pseudoAnkama}
                placeholder="Pseudo Ankama"
              />
            </div>
            <div>
              <p>Email</p>
              <Input
                type="email"
                id="email"
                value={email}
                placeholder="Email"
              />
            </div>
            <p>Mot de passe</p>
            <Input
              type="password"
              id="password"
              value={password}
              placeholder="Password"
            />
          </form>
        )}
        <Button onClick={toggleForm} className="bg-blue w-24">
          Changer le profil
        </Button>
      </Frame>
      <Frame width="28rem" className={showForm ? "" : "hidden"}>
        <select
          name="character"
          id="character"
          onChange={handleCharacterChange}
          value={selectedCharacter}
          className="w-44 bg-dark-3 mb-6 text-primary"
        >
          {characters.map((char) => (
            <option key={char.id} value={char.id}>
              {char.name}
            </option>
          ))}
        </select>
        <div className="grid grid-cols-2">
          <Button className="bg-green w-[6rem]" onClick={handleFormSubmit}>
            Changer mes infos
          </Button>
          <Button className="bg-red w-[7rem]">Supprimer mon compte</Button>
        </div>
      </Frame>
    </div>
  );
};

export default ProfileForm;
