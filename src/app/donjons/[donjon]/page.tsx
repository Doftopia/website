

import React from "react";
import { DetailedDungeon } from "@/app/components/Elements/dungeons/DetailedDungeon";
import Navbar from "@/app/components/Navbar/Navbar";

const page: React.FC = () => {
  return (
    <>
      <header>
        <Navbar pageName="donjons" />
      </header>
      <div className="px-4">
        <h1 className="mt-4 text-white p-2">Donjon</h1>
        <DetailedDungeon />
      </div>
    </>
  );
};

export default page;
