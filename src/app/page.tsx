import Navbar from "./components/Navbar/Navbar";
import DailyAlmanax from "./components/Elements/DailyAlmanax";
import MainCharacter from "./components/Elements/MainCharacter";
import Image from "next/image";

const Home: React.FC = async () => {
  return (
    <>
      <header>
        <Navbar pageName="Home" />
        <div className="h-6 mt-2 dark:bg-blue bg-orange font-bold text-center text-black">
          <p>
            le site est encore en travaux ! la majeure partie des
            fonctionnalités est en cours de développement !{" "}
          </p>
        </div>
      </header>

      <div className="mt-[5rem] grid grid-cols-2 w-fit mx-auto gap-x-[5rem]">
        <DailyAlmanax />
        <MainCharacter />
      </div>

      <div className="relative bottom-[12rem] left-[22rem] mx-auto w-[592px] h-[593px]">
        <Image
          src={"/eliotrope.png"}
          width={592}
          height={593}
          alt=""
          className="mx-auto"
        />
      </div>
    </>
  );
};

export default Home;
