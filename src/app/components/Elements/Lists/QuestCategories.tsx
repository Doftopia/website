"use client";
import axios from "axios";
import Frame from "../../ui/Frame";
import React, { useState, useEffect } from "react";
import { access } from "fs";

interface QuestCategory {
  id: number;
  questCategory: string;
}

export const QuestCategories: React.FC = () => {
  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null);
  const [categories, setCategories] = useState<QuestCategory[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/quests-categories"
        );
        setCategories(response.data.data);
      } catch (error) {
        console.error("Error fetching categories list");
      }
    };
    fetchCategories();
  }, []);

  const handleCategoryClick = (categoryName: string) => {
    window.location.href = `/quetes/${categoryName
      .replace("é", "e")
      .replace("è", "e")
      .replace("ê", "e")
      .toLowerCase()}`;
  };

  return (
    <div className="grid grid-cols-4 w-fit gap-x-10 mx-auto">
      {categories.map((category: any) => (
        <div
          key={category.id}
          onMouseEnter={() => setHoveredCategory(category.questCategory)}
          onMouseLeave={() => setHoveredCategory(null)}
        >
          <Frame
            size="sm"
            height="3rem"
            key={category.questCategory}
            className={`cursor-pointer ${
              hoveredCategory === category.questCategory
                ? "border border-green "
                : "border border-secondary"
            }`}
          >
            <h1
              className={`text-primary text-center my-auto ${
                hoveredCategory === category.questCategory ? "" : ""
              }`}
            >
              {category.questCategory}
            </h1>
          </Frame>
        </div>
      ))}
    </div>
  );
};
