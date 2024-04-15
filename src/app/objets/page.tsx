/* eslint-disable react/jsx-key */
/* eslint-disable @next/next/no-img-element */
import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Filters from "../components/Elements/Filters";

const Page: React.FC = () => {
  return (
    <>
      <div className="sticky w-full z-50">
        <Navbar pageName="objets" />
      </div>
      <div className="flex">
        <div className="min-h-screen dark:bg-dark-2 pt-8 lg:flex block w-full px-8">
          <Filters></Filters>
        </div>
      </div>
    </>
  );
};

export default Page;
