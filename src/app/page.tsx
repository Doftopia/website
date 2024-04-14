import Navbar from "./components/Navbar/Navbar";
import DailyAlmanax from "./components/Elements/DailyAlmanax";
import MainCharacter from "./components/Elements/MainCharacter";

const Home: React.FC = async () => {
  return (
    <>
      <header>
        <Navbar pageName="Home" />
        <div className="h-6 mt-2 dark:bg-blue font-bold text-center text-black">
          <p>
            le site est encore en travaux ! la majeure partie des
            fonctionnalités est en cours de dévelopement !{" "}
          </p>
        </div>
      </header>

      <div className="ml-3 mt-[4rem]">
        <DailyAlmanax />
        <MainCharacter />
      </div>
    </>
  );
};

export default Home;
