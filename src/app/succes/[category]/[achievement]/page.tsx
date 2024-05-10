import React from "react";
import Navbar from "@/app/components/Navbar/Navbar";
import { DetailedAchievement } from "@/app/components/Achievement/DetailedAchievement";

const Page = () => {
  return (
    <>
      <header>
        <Navbar pageName="succes"></Navbar>
      </header>
      <main>
        <DetailedAchievement />
      </main>
    </>
  );
};

export default Page;
