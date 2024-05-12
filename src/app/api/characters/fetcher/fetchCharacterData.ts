import axios from "axios";
import * as cheerio from "cheerio";
import { NextResponse } from "next/server";
import { authOptions } from "../../../../../lib/auth";
import { getServerSession } from "next-auth";
import { prisma } from "../../../../../lib/prisma";
import { headers } from "../../../../../lib/headers";

export interface Character {
  name: string;
  level: string;
  server: string;
  link: string | undefined;
  race?: string;
  completion?: number;
}

export const fetchCharacterData = async (req: Request) => {
  const session = await getServerSession({ ...authOptions });
  if (!session) {
    return console.error("No session found");
  }
  const user = await prisma.user.findUnique({
    where: { username: session.user.username },
  });
  if (!user) {
    console.log("No user found");
    return;
  }
  const ankamaUsername = user.ankamaUsername?.toString();

  const url = `https://account.ankama.com/fr/profil-ankama/${ankamaUsername?.toUpperCase()}`;
  const response = await axios.get(url, { headers });
  const $ = cheerio.load(response.data);
  const charactersTable = $(".ak-block-persos tbody tr");
  const characters: Character[] = [];

  charactersTable.each((_, element) => {
    const name = $(element).find("td:nth-child(1) a").text();
    const level = $(element).find("td:nth-child(3)").text().split(" ")[1];
    const server = $(element).find("td:nth-child(4)").text();
    const link = $(element).find("td:nth-child(1) a").attr("href");
    const race = $(element).find("td:nth-child(2)").text();

    characters.push({ name, level, server, link, race });
  });

  // console.log(characters);
  for (const character of characters) {
    const existingCharacter = await prisma.personnage.findFirst({
      where: { name: character.name, server: character.server },
    });

    if (existingCharacter) {
      if (parseInt(existingCharacter.level) < parseInt(character.level)) {
        await prisma.personnage.update({
          where: { id: existingCharacter.id },
          data: { level: character.level },
        });
      }
    } else {
      try {
        await prisma.personnage.create({
          data: {
            name: character.name,
            level: character.level,
            server: character.server,
            link: character.link ? character.link.slice(66) : "",
            userId: user.id,
            race: character.race,
            completion: character.completion,
          },
        });
        // console.log(`Character ${character.name} added`);
      } catch (error) {
        console.log(error);
      }
    }
  }

  return NextResponse.json({ characters: characters });
};
