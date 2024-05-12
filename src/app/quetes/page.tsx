import Navbar from "../components/Navbar/Navbar";
import { QuestCategories } from "../components/Elements/Lists/QuestCategories";

const Page: React.FC = () => {
  return (
    <div>
      <header>
        <Navbar pageName="quetes" />
      </header>
      <main>
        <h1 className="text-primary mt-[5rem] text-center text-xl py-[5rem]">
          Catégories de quêtes
        </h1>
        <div className="w-full mx-auto">
          <QuestCategories />
        </div>
      </main>
    </div>
  );
};

export default Page;
