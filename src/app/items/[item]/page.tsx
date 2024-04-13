/* eslint-disable react/jsx-key */
/* eslint-disable @next/next/no-img-element */
import React from "react";
import DetailedItem from "@/app/components/Elements/Item/DetailedItem";
import Navbar from "@/app/components/Navbar/Navbar";
import {
  Characteristic,
  Drop,
  GroupedItems,
  GroupedMob,
  GroupedRecipes,
  Item,
  Jobs,
  MobDrop,
  Recipe,
} from "@/app/interfaces";

const Page: React.FC = () => {
  return (
    <>
      <Navbar pageName="objet" />
      <DetailedItem />
    </>
  );
};

export default Page;
