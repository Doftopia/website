import Navbar from "../../components/Navbar/Navbar";

import { QuestList } from "@/app/components/Elements/Lists/QuestList";

const Page: React.FC = () => {
  return (
    <div>
      <header>
        <Navbar pageName="quetes" />
      </header>
      <main>
        <h1 className="text-primary mt-8">Quêtes</h1>
        <div className="w-full mx-auto">
          <QuestList />
        </div>
      </main>
    </div>
  );
};

export default Page;
