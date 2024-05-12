import React from "react";
import Navbar from "../components/Navbar/Navbar";
import { AchievementsList } from "../components/Elements/Lists/AchievementsList";
import { DungeonsList } from "../components/Elements/Lists/DungeonsList";

const FolderComponent: React.FC<{ folderName: string }> = ({ folderName }) => {
  return <div>{folderName}</div>;
};

const page: React.FC = () => {
  return (
    <>
      <header>
        <Navbar pageName="donjons" />
      </header>
      <main>
        <h1 className="text-primary p-2 mt-[5rem] text-center text-xl py-[5rem]">
          Liste des Donjons
        </h1>
        <DungeonsList />
      </main>
    </>
  );
};

export default page;
