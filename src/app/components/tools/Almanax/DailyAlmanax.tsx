/* eslint-disable @next/next/no-img-element */

"use client";
import React, { useEffect, useState } from "react";
import Frame from "../../ui/frame";
import axios from "axios";

const DailyAlmanax: React.FC = () => {
  const [almanaxData, setAlmanaxData] = useState<any>(null);

  useEffect(() => {
    const fetchAlmanax = async () => {
      try {
        const currentDate = new Date().toISOString().split("T")[0];
        const response = await axios.get(
          `https://api.dofusdu.de/dofus2/fr/almanax/${currentDate}`
        );
        setAlmanaxData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAlmanax();
  }, []);

  return (
    <Frame height="sm">
      <p className="text-center font-bold text-white">
        Almanax du {new Date().toLocaleDateString("fr-FR")}
      </p>
      {almanaxData && (
        <>
          <div
            id="tribute"
            className="grid grid-cols-3 w-fit ml-4 items-center"
          >
            <img
              className="col-span-1"
              src={almanaxData.tribute.item.image_urls.hq}
              height={56}
              width={56}
              alt=""
            />
            <div id="col-2" className="col-span-2">
              <p className="text-sm text-slate-600 my-auto">
                {almanaxData.tribute.quantity}x {almanaxData.tribute.item.name}
              </p>
              <p className="text-xs text-slate-600 mb-1 ml-4">
                {almanaxData.tribute.item.subtype}
              </p>
            </div>
          </div>
          <p className="text-[#779643] font-bold">Bonus</p>
          <p className="text-xs text-slate-600 font-bold">
            {almanaxData.bonus.type.name}
          </p>
          <p className="text-sm text-slate-600">
            {almanaxData.bonus.description}
          </p>
        </>
      )}
    </Frame>
  );
};

export default DailyAlmanax;
