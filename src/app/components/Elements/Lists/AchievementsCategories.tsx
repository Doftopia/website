"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

interface Achievement {
  id: number;
  name: string;
}

const cat = {
  donjons: "3",
  elevage: "5",
  exploration: "6",
  metiers: "7",
  quetes: "8",
  evenements: "9",
  general: "15",
  monstres: "25",
  compagnons: "142",
  kolizeum: "62",
};

export const AchievementsCategories: React.FC = ({}) => {
  const [categories, setCategories] = useState<Achievement[]>([]);
  const path = typeof window !== "undefined" ? window.location.pathname : "";

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        let url = "";
        const reqUrl =
          "http://localhost:3001/achievements-categories?parentId=";
        switch (path) {
          case "/succes/donjons":
            url = reqUrl + cat.donjons;
            break;
          case "/succes/elevage":
            url = reqUrl + cat.elevage;
            break;
          case "/succes/exploration":
            url = reqUrl + cat.exploration;
            break;
          case "/succes/metiers":
            url = reqUrl + cat.metiers;
            break;
          case "/succes/quetes":
            url = reqUrl + cat.quetes;
            break;
          case "/succes/evenements":
            url = reqUrl + cat.evenements;
            break;
          case "/succes/general":
            url = reqUrl + cat.general;
            break;
          case "/succes/monstres":
            url = reqUrl + cat.monstres;
            break;
          case "/succes/compagnons":
            url = reqUrl + cat.compagnons;
            break;
          case "/succes/kolizeum":
            url = reqUrl + cat.kolizeum;
            break;
          default:
            url = reqUrl + 0;
            break;
        }
        const response = await axios.get(url);
        setCategories(response.data.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, [path]);

  const handleCategoryClick = (categoryId: number, categoryName: string) => {
    window.location.href = `/succes/${categoryName
      .toLowerCase()
      .replace(/é/g, "e")}`
      .replace(/è/g, "e")
      .replace(/ê/g, "e");
  };

  const handlePreviousPage = () => {
    window.location.href = "/succes";
  };

  return (
    <>
      <div className="mt-10 px-4 w-full">
        <button onClick={() => handlePreviousPage()}>Retour</button>
        <h1 className="text-white p-2">Catégories</h1>
        <ul>
          {categories.map((category) => (
            <div
              key={category.id}
              onClick={() => handleCategoryClick(category.id, category.name)}
              className="p-2 mx-2 mt-4 dark:bg-dark-3 text-white hover:cursor-pointer hover:p-3"
            >
              <li>{category.name}</li>
            </div>
          ))}
        </ul>
      </div>
    </>
  );
};
