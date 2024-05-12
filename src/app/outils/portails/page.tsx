/* eslint-disable @next/next/no-img-element */
import React from "react";
import Navbar from "@/app/components/Navbar/Navbar";
import { prisma } from "../../../../lib/prisma";
import Portal from "@/app/components/Elements/Portal";
import { Provider } from "@/app/components/Provider";
import Image from "next/image";
const Page = async () => {
  const portals = await prisma.portail.findMany({
    where: { server: "Draconiros" },
  });

  return (
    <>
      <Provider>
        <header>
          <Navbar pageName="portails" />
        </header>
        <div className="mx-auto grid grid-cols-2 mt-[5rem] w-fit">
          <Image
            src="/deesse.png"
            alt=""
            width={768}
            height={830}
            className="absolute top-[7.2rem] z-0 opacity-45 left-[3.9rem]"
          ></Image>
          <Image
            src="/zobal.png"
            alt=""
            width={768}
            height={830}
            className="absolute top-[3.5rem] z-0 opacity-30 right-[3.9rem]"
          ></Image>
          {portals.map((portal) => (
            <div key={portal.id} className="z-10">
              <Portal
                id={portal.id}
                key={portal.name}
                PortalName={portal.name}
                Position={portal.position}
                LastUpdate={portal.lastUpdate}
                UpdaterName={portal.updaterName}
                PortalImage={portal.image}
              />
            </div>
          ))}
        </div>
      </Provider>
    </>
  );
};

export default Page;
