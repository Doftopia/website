import { NextResponse } from "next/server";
import { authOptions } from "../../../../lib/auth";
import { getServerSession } from "next-auth";
import { prisma } from "../../../../lib/prisma";
import { fetchCharacterData } from "./fetcher/fetchCharacterData";
import { fetchCompletionData } from "./fetcher/challs/fetchCompletionData";

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

  fetchCharacterData(req);
  fetchCompletionData(req);

  const characters = await prisma.personnage.findMany({
    where: { userId: user.id },
  });

  return NextResponse.json({ characters: characters });
};
