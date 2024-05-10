/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { useState } from "react";
import Frame from "../ui/Frame";
import { Button } from "../ui/Button";
import axios from "axios";
import { useSession } from "next-auth/react";
import { Input } from "../ui/Input";

export interface PortalProps {
  id: number;
  PortalName: string;
  Position: string;
  LastUpdate: Date;
  UpdaterName: string;
  PortalImage: string | null;
}

const Portal: React.FC<PortalProps> = ({
  id,
  PortalName,
  Position,
  LastUpdate,
  UpdaterName,
  PortalImage,
}) => {
  const [showForm, setShowForm] = useState(false);
  const [newPosition, setNewPosition] = useState("");
  const { data: session, status } = useSession();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewPosition(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const regexPattern = /^\[-?\d+(\.\d+)?,\s*-?\d+(\.\d+)?\]$/;

    if (!newPosition.match(regexPattern)) {
      window.alert("Cette position n'est pas valide ! [-1,2] ");
      window.location.reload();
      return;
    } else {
      try {
        const response = await axios.post(
          `/api/portals`,
          {
            server: "Draconiros",
            name: PortalName,
            updaterName: UpdaterName,
            pos: newPosition,
            userId: session?.user.id,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!response) {
          throw new Error("Failed to update portal.");
        }
        window.location.reload();
      } catch (error) {
        console.error("Error updating portal:", error);
      }
    }
  };
  const handleDislike = () => {
    try {
      axios.post(
        `/api/portals/dislike`,
        {
          server: "Draconiros",
          name: PortalName,
          UpdaterName: UpdaterName,
          pos: Position,
          userId: session?.user.id,
          portalId: id,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      window.location.reload();
    } catch (error) {
      console.error("Error updating portal:", error);
    }
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <Frame
      width="sm"
      height="sm"
      className="border border-black"
      key={PortalName}
    >
      <h1 className="font-bold text-secondary dark:text-primary ml-4 mt-2">
        Dimension {PortalName}
      </h1>
      <h2 className="text-blue ml-3">{Position}</h2>
      <p className="text-secondary ml-[15rem]">
        mis à jour {LastUpdate?.toString().slice(15, 21)}
      </p>
      <p className="text-secondary ml-[15rem]">par : {UpdaterName}</p>
      <div className="grid grid-cols-4 h-fit w-full">
        <Button className="bg-blue dark:bg-blue hover:bg-[#4163a1] w-fit mx-auto z-10">
          <img
            src="https://img.icons8.com/color/48/where.png"
            alt="fast travel"
            height={32}
            width={32}
          />
        </Button>
        <Button
          className="dark:bg-green dark:hover:bg-[#2c7d49] bg-light-green hover:bg-[#7c931f] w-fit mx-auto"
          onClick={toggleForm}
        >
          <img
            src="https://img.icons8.com/windows/32/plus.png"
            alt="add_position"
            height={32}
            width={32}
          />
        </Button>
        <Button
          className="bg-dark-red dark:bg-dark-red hover:bg-light-red w-fit mx-auto"
          onClick={handleDislike}
        >
          <img
            src="/dislike-icon.svg"
            alt="add_position"
            height={32}
            width={32}
          />
        </Button>
        <img
          className="h-48 w-32 relative bottom-[1rem] z-0"
          src={`/${PortalImage}.webp`}
          alt=""
        />
      </div>
      <div className={showForm ? "" : "hidden"}>
        <form id={`${PortalName}`} onSubmit={handleSubmit} className="">
          <div className="bottom-[2rem] grid grid-cols-2 items-center">
            <Input
              className="w-24"
              value={newPosition}
              onChange={handleInputChange}
            />
            <a href="/portails">
              <button
                type="submit"
                className="bg-orange hover:bg-[#b96f01] dark:bg-green text-white px-4 py-2 rounded-md dark:hover:bg-[#2c7d49] transition-all duration-300 ease-in-out"
              >
                Soumettre
              </button>
            </a>
          </div>
        </form>
      </div>
    </Frame>
  );
};

export default Portal;
