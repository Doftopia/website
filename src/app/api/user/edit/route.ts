import { NextResponse, NextRequest } from "next/server";
import { prisma } from "../../../../../lib/prisma";
import { authOptions } from "../../../../../lib/auth";
import { getServerSession } from "next-auth";

export const POST = async (req: NextRequest, res: NextResponse) => {
  const session = await getServerSession({ req, ...authOptions });
  if (!session) {
    return console.error("No session found");
  }

  const user = await prisma.user.findUnique({
    where: { username: session.user.username },
  });
  if (!user) {
    return console.error("No user found");
  }

  const { name, pseudoAnkama, email, password, character } = await req.json();
  const changeAccount = async () => {
    await prisma.user.update({
      where: { username: user.username },
      data: {
        username: name,
        ankamaUsername: pseudoAnkama,
        email: email,
        password: password,
      },
    });
  };

  const changeCharacter = async (userId: number, newCharacterId: number) => {
    await prisma.personnage.updateMany({
      where: { userId, mainChar: true },
      data: { mainChar: false },
    });

    await prisma.personnage.update({
      where: { userId, id: newCharacterId },
      data: { mainChar: true },
    });
  };
  changeCharacter(user.id, parseInt(character));
  changeAccount();
  return NextResponse.redirect("http://localhost:3000/profil");
};

export const GET = async (req: NextRequest, res: NextResponse) => {
  return NextResponse.redirect("http://localhost:3000/404");
};
