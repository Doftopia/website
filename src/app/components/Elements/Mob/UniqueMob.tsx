/* eslint-disable react/jsx-key */
/* eslint-disable @next/next/no-img-element */

import React from "react";
import Frame from "@/app/components/ui/Frame";
import Image from "next/image";

interface UniqueMobProps {
  mob: any;
}

const UniqueMob: React.FC<UniqueMobProps> = ({ mob }) => {
  return (
    <Frame
      width="sm"
      className="border-orange dark:border-secondary dark:hover:border-blue border transition-all hover:-translate-y-1 hover:brightness-90"
    >
      <a
        href={`/monstres/monstre?id=${mob.id}`}
        className="w-full items-center flex flex-col"
      >
        <p className="cursor-pointer"></p>
        <div className="flex justify-center dark:text-primary pt-1 w-full font-bold">
          {mob.name}
          <div className="font-normal ml-1">
            {mob.characs[0].level !=
            mob.characs[mob.characs.length - 1].level ? (
              <p>
                {" "}
                - niveau {mob.characs[0].level} a{" "}
                {mob.characs[mob.characs.length - 1].level}
              </p>
            ) : (
              <p> - niveau {mob.characs[0].level}</p>
            )}
          </div>
        </div>
        <Image src={mob.img} alt={mob.name} height={70} width={70} />
      </a>
    </Frame>
  );
};

export default UniqueMob;
