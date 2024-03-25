import Navbar from "../components/Navbar/navbar";
import AchievementsList from "../components/tools/Lists/AchievementsList";

const Page: React.FC = () => {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <div className="w-fit">
        <AchievementsList />
      </div>
    </>
  );
};

export default Page;
