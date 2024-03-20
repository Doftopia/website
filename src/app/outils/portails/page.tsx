/* eslint-disable @next/next/no-img-element */
import React from "react";
import Navbar from "@/app/components/Navbar/navbar";
import Frame from "@/app/components/ui/frame";
import Image from "next/image";

import { Button } from "@/app/components/ui/button";
import { prisma } from "../../../../lib/prisma";
import { map } from "zod";

const Page = async () => {
  const portals = await prisma.portail.findMany({
    where: { server: "Draconiros" },
  });

  return (
    <>
      <header>
        <Navbar />
      </header>
      <div className="mx-auto grid grid-cols-2 w-fit">
        {portals.map((portal) => (
          <Frame key={portal.name}>
            <h1 className="font-bold text-white ml-4 mt-2">
              Dimension {portal.name}
            </h1>
            <h2>{portal.position}</h2>
            <p>mis à jour {portal.lastUpdate.toString().slice(4, 25)}</p>
            <p>par : {portal.updaterName}</p>
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
                src={`/${portal.image}.webp`}
                alt=""
              />
            </div>
          </Frame>
        ))}
      </div>
    </>
  );
};

export default Page;
