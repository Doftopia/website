import Navbar from "../components/Navbar/Navbar";
import { AchievementsCategories } from "../components/Elements/Lists/AchievementsCategories";

const Page: React.FC = () => {
  return (
    <>
      <header>
        <Navbar pageName="succes" />
      </header>
      <div className="px-4">
        <div className="grid grid-cols-5 ">
          <div className="w-full">
            <AchievementsCategories />
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
