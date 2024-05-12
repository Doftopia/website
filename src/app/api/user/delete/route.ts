import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../../../../lib/auth";
import { getServerSession } from "next-auth";
import { prisma } from "../../../../../lib/prisma";

export const POST = async (req: NextResponse, res: NextRequest) => {
  const session = await getServerSession({ req, ...authOptions });
  if (!session) {
    return console.error("No session found");
  }
  const { id, name, email } = await req.json();

  await prisma.personnage.deleteMany({
    where: { userId: id },
  });

  await prisma.user.delete({
    where: { id: id, username: name, email: email },
  });

  return NextResponse.json({
    message: `Account ${name} , [id : ${id}] deleted`,
  });
};
