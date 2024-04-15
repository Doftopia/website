import Navbar from "@/app/components/Navbar/Navbar";
import MobDetailed from "@/app/components/Elements/Mob/DetailedMob";

const Page: React.FC = () => {
  return (
    <div className=" text-black">
      <header>
        <Navbar pageName="monstre" />
      </header>
      <div className="h-screen pt-8 mx-24">
        <MobDetailed />
      </div>
    </div>
  );
};

export default Page;
