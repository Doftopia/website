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
        <DungeonsList />
      </main>
    </>
  );
};

export default page;
