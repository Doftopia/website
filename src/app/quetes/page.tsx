import React from "react";
import Navbar from "../components/Navbar/Navbar";

const FolderComponent: React.FC<{ folderName: string }> = ({ folderName }) => {
  return <div>{folderName}</div>;
};

const page: React.FC = () => {
  return (
    <>
      <header>
        <Navbar/>
      </header>
    </>
  );
};

export default page;
