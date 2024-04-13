/* eslint-disable react/jsx-key */
/* eslint-disable @next/next/no-img-element */
import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Filters from "../components/Elements/Filters";

const Page: React.FC = () => {
  return (
    <>
      <Navbar pageName="objets" />
      <div className="flex">
        <div className="min-h-screen bg-[#a7a18d] dark:bg-dark-2 pt-8 lg:flex block w-full px-8">
          <Filters></Filters>
        </div>
      </div>
    </>
  );
};

export default Page;
