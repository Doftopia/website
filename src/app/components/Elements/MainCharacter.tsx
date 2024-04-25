import React from "react";
import Frame from "../ui/Frame";
import { prisma } from "../../../../lib/prisma";
import { authOptions } from "../../../../lib/auth";
import { getServerSession } from "next-auth";
import Character from "./Character";

const MainCharacter = async () => {
  const user = await getServerSession({ ...authOptions });
  if (!user) {
    return <></>;
  }
  const mainChar = await prisma.personnage.findFirst({
    where: { mainChar: true, userId: parseInt(user.user.id) },
  });
  if (!mainChar) {
    return <></>;
  }
  return (
    <div className="grid grid-cols-2 w-[34rem]">
      <Character
        name={mainChar.name}
        level={parseInt(mainChar.level)}
        race={mainChar.race ?? ""}
        server={mainChar.server}
        link={mainChar.link}
        image_link={mainChar.imagelink ?? ""}
        successPts={mainChar.successPts ?? 0}
        title={mainChar.title ?? ""}
        className="border-y border-l dark:border-y-green dark:border-l-green border-y-light-green border-l-light-green"
      ></Character>
      <Frame width="16rem">
        <div className="grid grid-cols-7 h-full border-y border-r dark:border-y-green dark:border-l-green dark:border-r-green border-y-light-green border-r-light-green">
          <div className="h-5/6 w-[2px] bg-opacity-10 my-auto bg-secondary dark:bg-primary col-span-1"></div>
          <div className="text-secondary dark:text-primary col-span-6 ml-2 mt-5">
            <p>Dernier succès obtenu</p>
            <p className="text-white">{mainChar.lastSucces}</p>
          </div>
        </div>
      </Frame>
    </div>
  );
};

export default MainCharacter;
