"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter, usePathname } from "next/navigation";
import page from "@/app/donjons/page";
import Navbar from "@/app/components/Navbar/Navbar";

const Category: React.FC = () => {
  const [achievements, setAchievements] = useState<any[]>([]);
  const router = useRouter();
  const pathname = usePathname().slice(8);

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const response = await axios.get(`https://api.dofusdb.fr/achievements`);
        setAchievements(response.data.data);
      } catch (error) {}
    };

    fetchAchievements();
  }, []);

  return (
    <>
      <div>
        <h1 className="text-white">{pathname.replace("'", "&apos;")}</h1>
        {achievements.map(
          (achievement) =>
            achievement.parent === pathname && (
              <div key={achievement.id}>
                <p className="text-white">{achievement.name.fr}</p>
              </div>
            )
        )}
      </div>
    </>
  );
};

export default Category;
