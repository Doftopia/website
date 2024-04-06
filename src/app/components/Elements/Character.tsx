/* eslint-disable @next/next/no-img-element */
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Frame from "../ui/Frame";
import Image from "next/image";

interface CharacterProps {
  index?: number;
  name?: string;
  level?: number;
  race: string;
  server?: string;
  link?: string;
  className?: string;
  image_link: string | StaticImport;
  successPts?: number;
  title: string;
}

const Character: React.FC<CharacterProps> = ({
  index,
  className,
  name,
  race,
  server,
  level,
  link,
  image_link,
  successPts,
  title,
}) => {
  return (
    <div>
      <a
        href={`https://www.dofus.com/fr/mmorpg/communaute/annuaires/pages-persos/${link}`}
        className="text-primary"
      >
        <Frame
          width="17rem"
          className={`m-2 grid grid-cols-2 ${className}`}
          key={index}
        >
          <div className="mx-auto">
            <Image
              width={80}
              height={60}
              src={image_link}
              alt="character-icon"
            ></Image>
          </div>
          <div className="relative mt-2 right-5">
            {" "}
            <p className="text-sm">{name}</p>
            <p className="font-Concert_One text-blue text-xs"> {title} </p>
            <p className="text-primary mt-3 bottom-2 relative text-sm">
              Lv. {level}
            </p>{" "}
            <div className="grid grid-cols-2">
              <p className="text-primary text-sm my-auto">{race}</p>{" "}
              <div className="grid w-fit ml-6 grid-cols-2">
                <Image
                  className="my-auto"
                  src="/icone_succes.png"
                  width={30}
                  height={30}
                  alt="icon"
                />
                <span className="text-secondary text-sm my-auto text-center">
                  {successPts}
                </span>
              </div>
            </div>
            <span className="text-secondary relative bottom-2">{server}</span>{" "}
          </div>
        </Frame>
      </a>
    </div>
  );
};

export default Character;
