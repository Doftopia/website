import React from "react";
import Navbar from "@/app/components/Navbar/Navbar";
import { DetailedAchievement } from "@/app/components/Elements/Achievement/DetailedAchievement";

const Page = () => {
  return (
    <>
      <header>
        <Navbar pageName="succes"></Navbar>
      </header>
      <main>
        <DetailedAchievement classname="mx-auto mt-[5rem] border border-blue" />
      </main>
    </>
  );
};

export default Page;
