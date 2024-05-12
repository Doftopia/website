/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import Frame from "../ui/Frame";
import axios from "axios";

const DailyAlmanax: React.FC = () => {
  const [almanaxData, setAlmanaxData] = useState<any>(null);

  function formatDate(date: Date) {
    const months = [
      "Janvier",
      "Février",
      "Mars",
      "Avril",
      "Mai",
      "Juin",
      "Juillet",
      "Août",
      "Septembre",
      "Octobre",
      "Novembre",
      "Décembre",
    ];

    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();

    return `${day.toString().padStart(2, "0")} ${months[monthIndex]} ${year}`;
  }

  const currentDate = new Date();
  const formattedDate = formatDate(currentDate);

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

  const handleClick = async () => {
    if (almanaxData && almanaxData.tribute && almanaxData.tribute.item) {
      try {
        const tribItemId = almanaxData.tribute.item.ankama_id;
        // const response = await axios.get(
        //   `http://localhost:3001/items?name=${tribItemId}`
        // );
        window.location.href = `/objets/objet?id=${tribItemId}`;
      } catch (error) {
        console.error("Error fetching item:", error);
      }
    }
  };

  return (
    <Frame
      width="33rem"
      height="20rem"
      className="border shadow-lg bg-light-2 dark:border-primary border-light-green"
    >
      <div className="text-center text-white font-bold">
        <p>OFFRANDE DU JOUR</p>
        <p className="font-medium text-sm">{formattedDate}</p>
      </div>
      {almanaxData && (
        <>
          <a className="w-fit mx-auto" onClick={handleClick} href="#">
            <Frame
              height="6rem"
              width="22rem"
              className="rounded-md hover:shadow-lg bg-light-1"
            >
              <div
                id="tribute"
                className="grid grid-cols-3 w-fit ml-6 my-1 items-center"
              >
                <Frame
                  height="4rem"
                  width="4rem"
                  className="items-center bg-light-2 hover:border hover:border-light-green border border-secondary dark:hover:border-green justify-center"
                >
                  {" "}
                  <img
                    className="col-span-1"
                    src={almanaxData.tribute.item.image_urls.hq}
                    height={56}
                    width={56}
                    alt=""
                  />
                </Frame>

                <div id="col-2" className="col-span-2">
                  <p className="text-sm text-secondary dark:text-primary ml-2 my-auto font-bold">
                    {almanaxData.tribute.quantity}x{" "}
                    {almanaxData.tribute.item.name}
                  </p>
                  <p className="text-xs text-secondary font-bold mb-1 ml-2">
                    {almanaxData.tribute.item.subtype}
                  </p>
                </div>
              </div>
            </Frame>
          </a>
          <p className="text-light-green dark:text-green font-bold ml-2">
            Bonus
          </p>
          <p className="text-xs text-secondary dark:text-primary ml-2 font-bold">
            {almanaxData.bonus.type.name}
          </p>
          <Frame
            size="lg"
            className="border border-light-green dark:border-secondary bg-light-2"
          >
            {" "}
            <p className="text-sm text-secondary ml-2">
              {almanaxData.bonus.description}
            </p>
          </Frame>
        </>
      )}
    </Frame>
  );
};

export default DailyAlmanax;
