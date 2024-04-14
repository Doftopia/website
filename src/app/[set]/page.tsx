import ItemSet from "@/app/components/Elements/Item/ItemSet";
import Navbar from "@/app/components/Navbar/Navbar";

const Page: React.FC = () => {
  return (
    <>
      <div>
        <Navbar pageName="Home" />
      </div>
      <div className="bg-[#a7a18d] dark:bg-dark-2 h-full pb-10">
        <ItemSet />
      </div>
    </>
  );
};

export default Page;
