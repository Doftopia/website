import axios from "axios";
import * as cheerio from "cheerio";
import { NextResponse } from "next/server";
import { authOptions } from "../../../../lib/auth";
import { getServerSession } from "next-auth";
import { prisma } from "../../../../lib/prisma";

interface Character {
  name: string;
  level: string;
  server: string;
  link?: string;
}

export const GET = async (req: Request) => {
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
  const headers = {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
  };
  const response = await axios.get(url, { headers });
  const $ = cheerio.load(response.data);
  const charactersTable = $(".ak-block-persos tbody tr");
  const characters: Character[] = [];

  charactersTable.each((_, element) => {
    const name = $(element).find("td:nth-child(1) a").text();
    const level = $(element).find("td:nth-child(3)").text();
    const server = $(element).find("td:nth-child(4)").text();
    const link = $(element).find("td:nth-child(1) a").attr("href");

    characters.push({ name, level, server, link });
  });

  return NextResponse.json({ characters: characters });
};
