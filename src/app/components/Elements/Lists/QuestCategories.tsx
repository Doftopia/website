import axios from "axios";
import Frame from "../../ui/Frame";

export const QuestCategories: React.FC = async ({}) => {
  const categories = await axios.get("http://localhost:3001/quests-categories");

  return (
    <div className="grid grid-cols-4">
      {categories.data.data.map((category: any) => (
        <a
          key={category.id}
          className="w-fit"
          href={`/quetes/${category.questCategory
            .replace("é", "e")
            .replace("è", "e")
            .replace("ê", "e")
            .toLowerCase()}`}
        >
          <Frame size="sm" height="3rem" key={category.id}>
            <h1 className="text-primary text-center my-auto">
              {category.questCategory}
            </h1>
          </Frame>
        </a>
      ))}
    </div>
  );
};
