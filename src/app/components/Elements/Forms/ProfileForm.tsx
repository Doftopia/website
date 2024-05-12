"use client";

import { Button } from "../../ui/Button";
import Frame from "../../ui/Frame";
import { useState, useEffect } from "react";
import { Input } from "../../ui/Input";
import axios from "axios";

interface Character {
  id: number;
  name: string;
  mainChar: boolean;
}
interface ProfileFormProps {
  id?: number;
  name?: string;
  pseudoAnkama: string;
  email?: string;
  password?: string;
  character?: string;
}

const ProfileForm: React.FC<ProfileFormProps> = ({
  id,
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
  const [showUpdateConfirmation, setShowUpdateConfirmation] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

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
    <div className="text-primary ml-[4rem] mt-6">
      <div className="">
        <p>Nom d&apos;utilisateur</p>
        <p className="text-blue ml-3">{name}</p>
      </div>
      <div className="">
        <p>Pseudo Ankama</p>
        <p className="text-green ml-3">{pseudoAnkama}</p>
      </div>
      <div className="">
        <p>Email</p>
        <p className="text-blue ml-3">{email}</p>
      </div>
      <div className="">
        <p>Mot de passe</p>
        <p className="text-blue ml-3">********</p>
      </div>
      <div className="">
        <p>Votre personnage principal</p>
        <p className="text-green ml-3">{mainChar?.name}</p>
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

  const handleDeleteConfirmation = async () => {
    try {
      await axios.post("/api/user/delete", {
        id: id,
        name: name,
        email: email,
      });
      window.location.href = "/";
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Frame height="30rem" width="28rem" className="border border-secondary">
        {!showForm ? (
          texts()
        ) : (
          <form className="text-primary ml-[6rem]">
            <div className="mb-4">
              <p className="ml-[1rem]">Nom d&apos;utilisateur</p>
              <Input
                type="text"
                id="name"
                placeholder={name}
                className="w-[14rem] ml-2 bg-dark-3 py-1 px-2 rounded"
              />
            </div>
            <div className="mb-4">
              <p className="ml-[1rem]">Pseudo Ankama</p>
              <Input
                id="pseudoAnkama"
                type="text"
                value={pseudoAnkama}
                placeholder="Pseudo Ankama"
                className="w-[14rem] ml-2 bg-dark-3 py-1 px-2 rounded"
              />
            </div>
            <div className="mb-4">
              <p className="ml-[1rem]">Email</p>
              <Input
                type="email"
                id="email"
                value={email}
                placeholder="Email"
                className="w-[14rem] ml-2 bg-dark-3 py-1 px-2 rounded"
              />
            </div>
            <div className="mb-4">
              <p className="ml-[1rem]">Mot de passe</p>
              <Input
                type="password"
                id="password"
                value={password}
                placeholder="Password"
                className="w-[14rem] ml-2 bg-dark-3 py-1 px-2 rounded"
              />
            </div>
          </form>
        )}
        <Button
          onClick={toggleForm}
          className="relative bg-blue hover:bg-[#4163a1] ml-[15rem] w-24 py-2"
        >
          Changer le profil
        </Button>
      </Frame>

      <div className={showForm ? "" : "hidden"}>
        <Frame width="28rem" className="">
          <p className="text-primary relative bottom-[2.7rem] ml-4">
            Selectionnez un personnage principal
          </p>
          <select
            name="character"
            id="character"
            onChange={handleCharacterChange}
            value={selectedCharacter}
            className="w-full bg-dark-3 mb-4 text-primary py-1 px-2 rounded"
          >
            {characters.map((char) => (
              <option key={char.id} value={char.id}>
                {char.name}
              </option>
            ))}
          </select>
          <div className="grid grid-cols-2 gap-4">
            <button
              className="bg-green w-full py-2"
              onClick={() => setShowUpdateConfirmation(true)}
            >
              Changer mes infos
            </button>
            <button
              className="hover:bg-light-red bg-dark-red w-full py-2"
              onClick={() => setShowDeleteConfirmation(true)}
            >
              Supprimer mon compte
            </button>
          </div>
        </Frame>
      </div>

      {/* Update Confirmation Popup */}
      {showUpdateConfirmation && (
        <div className="fixed inset-0 flex items-center z-50 justify-center">
          <div className="dark:bg-dark-1 p-4 rounded-md shadow-lg">
            <p className="text-primary">Confirmer la mise à jour</p>
            <p className="text-primary text-sm text-center">
              Êtes-vous sûr de vouloir mettre à jour vos informations ?
            </p>
            <div className="flex justify-between mx-10 mt-4">
              <button
                onClick={() => setShowUpdateConfirmation(false)}
                className="text-dark-red font-bold text-sm hover:bg-dark-2 hover:p-1 rounded-md"
              >
                ANNULER
              </button>
              <button
                onClick={handleFormSubmit}
                className="text-green text-sm font-bold hover:bg-dark-2 hover:p-1 rounded-md"
              >
                CONFIRMER
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Popup */}
      {showDeleteConfirmation && (
        <div className="fixed inset-0 flex items-center z-50 justify-center">
          <div className="dark:bg-dark-1 p-4 rounded-md shadow-lg">
            <p className="text-primary">Confirmer la suppression</p>
            <p className="text-primary text-sm text-center">
              Êtes-vous sûr de vouloir supprimer votre compte ?
            </p>
            <div className="flex justify-between mx-10 mt-4">
              <button
                onClick={() => setShowDeleteConfirmation(false)}
                className="text-dark-red font-bold text-sm hover:bg-dark-2 hover:p-1 rounded-md"
              >
                ANNULER
              </button>
              <button
                onClick={handleDeleteConfirmation}
                className="text-green text-sm font-bold hover:bg-dark-2 hover:p-1 rounded-md"
              >
                CONFIRMER
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileForm;
