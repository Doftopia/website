import Navbar from "../components/Navbar/Navbar";
import AchievementsList from "../components/Elements/Lists/AchievementsList";

const Page: React.FC = () => {
  return (
    <>
      <header>
        <Navbar pageName="succes" />
      </header>
      <div className="w-fit">
        <AchievementsList />
      </div>
    </>
  );
};

export default Page;
