import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../../../../lib/auth";
import { getServerSession } from "next-auth";
import { prisma } from "../../../../../lib/prisma";

export const POST = async (req: NextResponse, res: NextRequest) => {
  const session = await getServerSession({ req, ...authOptions });
  if (!session) {
    return console.error("No session found");
  }
  const { id, name, server } = await req.json();

  await prisma.personnage.delete({
    where: { id: id, name: name, server: server },
  });

  return NextResponse.json({ id, name, server });
};
