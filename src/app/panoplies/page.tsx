import React from "react";
import Navbar from "@/app/components/Navbar/Navbar";
import { ItemSetsList } from "../components/Elements/Lists/ItemSetsLists";
import Image from "next/image";

const Page = () => {
  return (
    <>
      <header>
        <Navbar pageName="succes"></Navbar>
      </header>
      <main>
        <Image
          src="/sramgod.png"
          alt=""
          width={768}
          height={830}
          className="absolute top-[3.5rem] z-0 opacity-30 left-[25rem]"
        ></Image>
        <h1 className="text-primary p-2 text-xl mt-[3rem] text-center">
          Liste des ensembles d&apos;objets
        </h1>
        <ItemSetsList />
      </main>
    </>
  );
};

export default Page;
