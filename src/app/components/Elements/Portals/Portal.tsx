/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { useState } from "react";
import Frame from "../../ui/Frame";
import { Button } from "../../ui/Button";
import { Input } from "../../ui/Input";
import axios from "axios";

interface PortalProps {
  PortalName: string;
  Position: string;
  LastUpdate: Date;
  UpdaterName: string;
  PortalImage: string | null;
}

const Portal: React.FC<PortalProps> = ({
  PortalName,
  Position,
  LastUpdate,
  UpdaterName,
  PortalImage,
}) => {
  const [showForm, setShowForm] = useState(false);
  const [newPosition, setNewPosition] = useState("");
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewPosition(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `/api/portals`,
        {
          server: "Draconiros",
          name: PortalName,
          UpdaterName: UpdaterName,
          pos: newPosition,
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
  };
  //
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
      <h1 className="font-bold text-primary ml-4 mt-2">
        Dimension {PortalName}
      </h1>
      <h2 className="text-blue ml-3">{Position}</h2>
      <p className="text-secondary ml-[15rem]">
        mis à jour {LastUpdate.toString().slice(15, 21)}
      </p>
      <p className="text-secondary ml-[15rem]">par : {UpdaterName}</p>
      <div className="grid grid-cols-3 w-fit">
        <Button className="dark:bg-green w-fit mx-auto">
          <img
            src="https://img.icons8.com/color/48/where.png"
            alt="fast travel"
            height={32}
            width={32}
          />
        </Button>
        <Button className="bg-[#ec8e02] w-fit mx-auto" onClick={toggleForm}>
          <img
            src="https://img.icons8.com/windows/32/plus.png"
            alt="add_position"
            height={32}
            width={32}
          />
        </Button>
        <img
          className="h-48 w-32 relative bottom-[1rem]"
          src={`/${PortalImage}.webp`}
          alt=""
        />
      </div>
      <div className={showForm ? "" : "hidden"}>
        <form id={`${PortalName}`} onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 items-center w-fit mx-auto">
            <Input
              className="w-24"
              value={newPosition}
              onChange={handleInputChange}
            />
            <a href="/portails">
              <button
                type="submit"
                className="mt-2 bg-[#779643] text-white px-4 py-2 rounded-md hover:bg-[#445527]"
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
