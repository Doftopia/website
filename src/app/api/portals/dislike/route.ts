import { NextResponse, NextRequest } from "next/server";
import { authOptions } from "../../../../../lib/auth";
import { getServerSession } from "next-auth";
import { prisma } from "../../../../../lib/prisma";

export const POST = async (req: NextRequest, res: NextResponse) => {
  const session = await getServerSession({ req, ...authOptions });
  if (session === null) {
    return NextResponse.json({ redirect: "/sign-in" });
  }

  const { name, server, pos, updaterName, userId, portalId } = await req.json();

  try {
    const user = await prisma.user.findFirst({
      where: { username: updaterName },
    });
    if (!user) {
      console.log(user);
      return NextResponse.error();
    }

    const existingDislike = await prisma.dislike.findFirst({
      where: {
        userId: user.id,
        portal: {
          name: name,
          server: server,
        },
      },
    });

    if (existingDislike) {
      await prisma.dislike.delete({
        where: {
          id: existingDislike.id,
        },
      });
      await prisma.portail.update({
        where: { id: portalId },
        data: {
          dislikeCount: {
            decrement: 1,
          },
        },
      });

      return NextResponse.json({ redirect: "/outils/portails" });
    } else {
      await prisma.dislike.create({
        data: {
          portalId: portalId,
          userId: parseInt(userId),
          wrongPos: pos,
        },
      });

      const updatedPortal = await prisma.portail.update({
        where: { id: portalId },
        data: {
          dislikeCount: {
            increment: 1,
          },
        },
      });

      if (updatedPortal.dislikeCount === 3) {
        await prisma.portail.update({
          where: { id: portalId },
          data: {
            position: "Inconnu",
            lastUpdate: new Date(),
            updaterName: "Inconnu",
            dislikeCount: 0,
          },
        });
      }
      return NextResponse.json({ redirect: "/outils/portails" });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
};
