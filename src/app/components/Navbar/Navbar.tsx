import { getServerSession } from "next-auth";
import { authOptions } from "../../../../lib/auth";
import { prisma } from "../../../../lib/prisma";
import { NavbarContent } from "./NavbarContent";

interface NavbarProps {
  pageName: string;
}

const Navbar = async ({ pageName }: NavbarProps) => {
  const session = await getServerSession({ ...authOptions });
  if (!session) {
    return;
  }
  const user = await prisma.user.findUnique({
    where: { username: session.user.username },
  });

  return (
    <>
      <NavbarContent session={session} user={user} pageName={pageName} />
    </>
  );
};

export default Navbar;
