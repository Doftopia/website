import { DetailedQuest } from "@/app/components/Elements/quests/DetailedQuest";
import Navbar from "../../../components/Navbar/Navbar";

const Page: React.FC = () => {
  return (
    <div>
      <header>
        <Navbar pageName="quetes" />
      </header>
      <main>
        <h1 className="text-primary mt-8">Quêtes</h1>
        <div className="w-full mx-auto">
          <DetailedQuest />
        </div>
      </main>
    </div>
  );
};

export default Page;
