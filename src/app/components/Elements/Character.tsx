"use client";
import React, { useState } from "react";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Frame from "../ui/Frame";
import Image from "next/image";
import { Button } from "../ui/Button";
import axios from "axios";

interface CharacterProps {
  id: number;
  index?: number;
  name?: string;
  level?: number;
  race: string;
  server?: string;
  link?: string;
  className?: string;
  image_link: string | StaticImport;
  successPts?: number;
  title: string;
}

const Character: React.FC<CharacterProps> = ({
  id,
  index,
  className,
  name,
  race,
  server,
  level,
  link,
  image_link,
  successPts,
  title,
}) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const path = typeof window !== "undefined" ? window.location.pathname : "";

  const openConfirmation = () => {
    setShowConfirmation(true);
  };

  const closeConfirmation = () => {
    setShowConfirmation(false);
  };

  const charDeletion = async () => {
    closeConfirmation();
    axios.post("/api/characters/delete", { id, name, server });
    window.location.reload();
  };

  const isProfilePage = path === "/profil";

  return (
    <div>
      <div>
        <a
          href={`https://www.dofus.com/fr/mmorpg/communaute/annuaires/pages-persos/${link}`}
          className="text-secondary dark:text-primary"
        >
          <Frame
            width="17rem"
            className={`m-2 grid grid-cols-2 ${className}`}
            key={index}
          >
            <div className="mx-auto my-auto">
              <Image
                width={50}
                height={50}
                src={image_link}
                alt="character-icon"
              ></Image>
            </div>
            <div className="relative mt-2 right-5">
              {" "}
              <p className="text-sm">{name}</p>
              <p className="font-Concert_One text-white text dark:text-blue text-xs">
                {" "}
                {title}{" "}
              </p>
              <p className="text-secondary dark:text-primary mt-3 bottom-2 relative text-sm">
                Lv. {level}
              </p>{" "}
              <div className="grid grid-cols-2">
                <p className="text-secondary dark:text-primary text-sm my-auto">
                  {race}
                </p>{" "}
                <div className="grid w-fit ml-6 grid-cols-2">
                  <Image
                    className="my-auto"
                    src="/icone_succes.png"
                    width={30}
                    height={30}
                    alt="icon"
                  />
                  <span className="text-secondary text-sm my-auto text-center">
                    {successPts}
                  </span>
                </div>
              </div>
              <span className="text-secondary relative bottom-2">{server}</span>{" "}
            </div>
          </Frame>
        </a>
      </div>
      {isProfilePage && ( // Render delete button only if on /profil page
        <Button
          className="hover:bg-light-red relative bottom-[8rem] left-[1.4rem]"
          onClick={openConfirmation}
        >
          X
        </Button>
      )}

      {showConfirmation && (
        <div className="fixed inset-0 flex items-center z-50 justify-center">
          <div className="dark:bg-dark-1 p-4 rounded-md shadow-lg">
            <p className="text-primary">Est ce que tu veux vraiment</p>
            <p className="text-primary text-sm text-center">
              supprimer ton personnage ?
            </p>

            <div className="flex justify-between mx-10 mt-4">
              <button
                onClick={closeConfirmation}
                className="text-dark-red font-bold text-sm hover:bg-dark-2 hover:p-1 rounded-md"
              >
                NON
              </button>
              <button
                onClick={charDeletion}
                className="text-green text-sm font-bold hover:bg-dark-2 hover:p-1 rounded-md"
              >
                OUI
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Character;
