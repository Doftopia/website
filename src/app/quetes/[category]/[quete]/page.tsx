import { DetailedQuest } from "@/app/components/Elements/quests/DetailedQuest";
import Navbar from "../../../components/Navbar/Navbar";

const Page: React.FC = () => {
  return (
    <div>
      <header>
        <Navbar pageName="quetes" />
      </header>
      <main>
        <div className="w-full mx-auto">
          <DetailedQuest />
        </div>
      </main>
    </div>
  );
};

export default Page;
