import React from "react";
import Navbar from "@/app/components/Navbar/Navbar";
import { AchievementsList } from "@/app/components/Elements/Lists/AchievementsList";
import { AchievementsCategories } from "@/app/components/Elements/Lists/AchievementsCategories";

// const Category: React.FC<{ currentPage: string }> = ({ currentPage }) => {
//   const getCategoryFromUrl = (url: string) => {
//     const parsedUrl = new URL(url);
//     const pathname = parsedUrl.pathname;
//     const parts = pathname.split("/");
//     const category = parts[parts.length - 1];
//     return category;
//   };
//   const category = getCategoryFromUrl(currentPage);

//   return (
//     <header>
//       <Navbar pageName=""></Navbar>
//     </header>
//   );
// };

// export default Category;

const Page = () => {
  return (
    <>
      <header>
        <Navbar pageName=""></Navbar>
      </header>
      <main>
        <div className="px-4">
          <div className="grid grid-cols-3 ">
            <div className="col-span-1">
              <AchievementsCategories />
            </div>
            <div className="col-span-2 w-full">
              <AchievementsList />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Page;
