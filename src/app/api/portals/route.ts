import { NextResponse, NextRequest } from "next/server";
import { authOptions } from "../../../../lib/auth";
import { getServerSession } from "next-auth";
import { prisma } from "../../../../lib/prisma";

export const POST = async (req: NextRequest, res: NextResponse) => {
  const session = await getServerSession({ req, ...authOptions });

  const { name, server, pos } = await req.json();
  // console.log(name, server, pos);

  await prisma.portail.update({
    where: { name: name, server: server },
    data: { position: pos, lastUpdate: new Date() },
  });

  return NextResponse.json({ redirect: "/outils/portails" });
};
