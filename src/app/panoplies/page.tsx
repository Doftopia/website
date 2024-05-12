import React from "react";
import Navbar from "@/app/components/Navbar/Navbar";
import { ItemSetsList } from "../components/Elements/Lists/ItemSetsLists";

const Page = () => {
  return (
    <>
      <header>
        <Navbar pageName="succes"></Navbar>
      </header>
      <main>
        <ItemSetsList />
      </main>
    </>
  );
};

export default Page;
