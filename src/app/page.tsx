/* eslint-disable @next/next/no-img-element */
import axios from "axios";
import { error } from "console";
import { getServerSession } from "next-auth";
import Navbar from "./components/Navbar/Navbar";
import { authOptions } from "../../lib/auth";
import DailyAlmanax from "./components/Elements/DailyAlmanax";
import MainCharacter from "./components/Elements/MainCharacter";

const Home: React.FC = async () => {
  // const [items, setItems] = useState<any[]>([]);
  // const [characs, setCharacs] = useState<any[]>([]);
  // const [characsDisplay, setCharacsDisplay] = useState<any[]>([]);
  let skip = 0;
  let characteristics: any[] = [];

  // useEffect(() => {
  //   fetchItems();
  // });

  const session = await getServerSession(authOptions);

  // const fetchItems = async () => {
  //   // try {
  //   //   const response = await axios.get(
  //   //     `https://api.dofusdb.fr/items?$limit=50&$skip=${skip}`
  //   //   );
  //   //   setItems((prevItems) => [...prevItems, ...response.data.data]);
  //   //   let characsPerItem: any[] = [];

  //   //   response.data.data.forEach((arrayResponse: any) => {
  //   //     arrayResponse.effects.forEach((charac: any) => {
  //   //       characsPerItem.push(charac.characteristic);
  //   //     });
  //   //     characteristics.push(characsPerItem);
  //   //     characsPerItem = [];
  //   //   });
  //   //   skip += 50;

  //   //   setCharacs([...characs, ...characteristics]);
  //   // } catch (error) {
  //   //   // console.log(error);
  //   // }

  //   let characsItem: String[];
  //   characsItem = [];

  //   for (let i = 0; i < characteristics.length; i++) {
  //     for (let y = 0; y < characteristics[i].length; y++) {
  //       // try {
  //       //   const response = await axios.get(
  //       //     `https://api.dofusdb.fr/characteristics?id=${characteristics[i][y]}`
  //       //   );
  //       //   let responseData = response.data.data;
  //       //   responseData.forEach((data: any) => {
  //       //     // console.log(`${characteristics[i][y]} = ${data.name.fr}`);
  //       //     characsItem.push(data.name.fr);
  //       //   });
  //       // } catch (error) {
  //       //   // console.log(error);
  //       // }
  //     }
  //     setCharacsDisplay((prevCharacItem) => [
  //       ...prevCharacItem,
  //       ...characsItem,
  //     ]);
  //     // console.log(characsItem);
  //     // console.log("\n");
  //     characsItem = [];
  //   }
  // };

  return (
    <>
      <header className="w-full">
        <Navbar pageName="Home" />
        <div className="h-6 w-full mt-2 dark:bg-blue font-bold text-center text-black">
          <p>
            le site est encore en travaux ! la majeure partie des
            fonctionnalités est en cours de dévelopement !{" "}
          </p>
        </div>
      </header>
      {/* {items.map((item: any, index: number) => (
        <div key={index}>
          <img src={item.imgset[0].url} alt={item.name.fr} />
          <h1>Nom de l&apos;objet : {item.name.fr}</h1>
          <h2>Description de l&pos;objet : {item.description.fr}</h2>
          <h2>Type de l&pos;objet : {item.type.name.fr}</h2>
          <h2>{characsDisplay}</h2>
        </div>
      ))} */}
      <div></div>
      {/* {session && (
        <h1 className="dark:text-white text-center my-5 font-bold ">
          Bonjour {session.user.username}
        </h1>
      )} */}
      <div className="grid grid-cols-2">
        <div className="ml-3 mt-[4rem] grid-cols-1">
          <DailyAlmanax />
        </div>
      </div>
      <div className="ml-3">
        <MainCharacter />
      </div>
    </>
  );
};

export default Home;
