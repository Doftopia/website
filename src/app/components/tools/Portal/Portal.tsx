/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { useState, useEffect } from "react";
import Frame from "../../ui/frame";
import { Button } from "../../ui/button";

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
  return (
    <>
      {" "}
      <Frame key={PortalName}>
        <h1 className="font-bold text-white ml-4 mt-2">
          Dimension {PortalName}
        </h1>
        <h2 className="text-white">{Position}</h2>
        <p className="text-white">
          mis à jour {LastUpdate.toString().slice(4, 25)}
        </p>
        <p className="text-white">par : {UpdaterName}</p>
        <div className="grid grid-cols-3 w-fit">
          <Button className="bg-[#16a34a] w-fit mx-auto">
            <img
              src="https://img.icons8.com/color/48/where.png"
              alt="fast travel"
              height={32}
              width={32}
            />
          </Button>
          <Button className="bg-[#FFCC02] w-fit mx-auto">
            <img
              src="https://img.icons8.com/windows/32/plus.png"
              alt="add_position"
              height={32}
              width={32}
            />
          </Button>
          <img
            className="h-48 w-32 relative bottom-[2rem]"
            src={`/${PortalImage}.webp`}
            alt=""
          />
        </div>
      </Frame>
    </>
  );
};

export default Portal;
