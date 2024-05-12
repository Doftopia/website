import { exec } from "child_process";
import { NextResponse } from "next/server";
import { authOptions } from "../../../../../../lib/auth";
import { getServerSession } from "next-auth";
import { prisma } from "../../../../../../lib/prisma";

interface CharacterChalls {
  success_points: string;
  success_progress: string;
  success_categories: { [key: string]: string };
  last_success: string;
  imagelink: string;
  title: string;
}

export const fetchCompletionData = async (req: Request) => {
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

  const characterData: CharacterChalls[] = [];

  try {
    const characters = await prisma.personnage.findMany({
      where: { userId: user.id },
    });

    for (const character of characters) {
      const url = `https://www.dofus.com/fr/mmorpg/communaute/annuaires/pages-persos/${character.link}/succes`;
      exec(
        `python src/app/api/characters/fetcher/challs/script.py ${url}`,
        async (error, stdout, stderr) => {
          if (error) {
            console.error(`exec error: ${error}`);
            return;
          }
          const data = JSON.parse(stdout);
          characterData.push(data);

          await prisma.personnage.update({
            where: { id: character.id },
            data: {
              completion: parseInt(data.success_progress),
              successPts: parseInt(data.success_points),
              imagelink: data.image,
              title: data.titre,
              lastSucces: data.last_succes,
            },
          });
        }
      );
    }
  } catch (error) {
    console.error(error);
  }

  await new Promise((resolve) => setTimeout(resolve, 2100));

  return NextResponse.json({ characters: characterData });
};
