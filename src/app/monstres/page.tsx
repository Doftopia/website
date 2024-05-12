/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-key */
import Navbar from "../components/Navbar/Navbar";
import MobList from "../components/Elements/Lists/MobList";

const Page: React.FC = () => {
  return (
    <div className="">
      <Navbar pageName="monstres" />
      <MobList />
    </div>
  );
};

export default Page;
