/* eslint-disable react/jsx-key */
/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import { GroupedItems } from "@/app/interfaces";
import { useRouter } from "next/navigation";
import UniqueItem from "../Item/UniqueItem";

interface ItemInterface {
  item: GroupedItems[];
}

const ItemList: React.FC<ItemInterface> = ({ item }: ItemInterface) => {
  const router = useRouter();
  const redirectItem = (itemId: string) => {
    router.push(`/objets/objet?id=${itemId}`);
    router.refresh();
  };
  const items = item;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:mx-8 box-border gap-3 xl:grid-cols-3 2xl:grid-cols-4">
      {items.map((item: GroupedItems, index: number) => (
        <a key={index} onClick={() => redirectItem(item.itemId.toString())}>
          <UniqueItem item={item} index={index} />
        </a>
      ))}
    </div>
  );
};

export default ItemList;
