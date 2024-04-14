/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-key */
import Navbar from "../components/Navbar/Navbar";
import Mob from "../components/Elements/Lists/MobList";

const Page: React.FC = () => {
  return (
    <div className="bg-[#a7a18d] dark:bg-dark-2">
      <Navbar pageName="monstres" />
      <Mob />
    </div>
  );
};

export default Page;
