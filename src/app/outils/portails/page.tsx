/* eslint-disable @next/next/no-img-element */
import React from "react";
import Navbar from "@/app/components/Navbar/Navbar";
import { prisma } from "../../../../lib/prisma";
import Portal from "@/app/components/Elements/Portal";

const Page = async () => {
  const portals = await prisma.portail.findMany({
    where: { server: "Draconiros" },
  });

  return (
    <>
      <header>
        <Navbar pageName="portails" />
      </header>
      <div className="mx-auto grid grid-cols-2 w-fit">
        {portals.map((portal) => (
          <Portal
            key={portal.name}
            PortalName={portal.name}
            Position={portal.position}
            LastUpdate={portal.lastUpdate}
            UpdaterName={portal.updaterName}
            PortalImage={portal.image}
          />
        ))}
      </div>
    </>
  );
};

export default Page;
