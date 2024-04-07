import NavbarLinks from "./NavbarLinks";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../lib/auth";
import { buttonVariants } from "../ui/Button";
import Link from "next/link";
import ThemeSwitcher from "./ThemeSwitcher";
// import SignOutButton from "./SignOutButton";
// import ProfileButton from "./ProfileButton";
import Image from "next/image";
// import { prisma } from "../../../../lib/prisma";

interface NavbarProps {
  pageName: string;
}

const Navbar = ({ pageName }: NavbarProps) => {
  // const session = await getServerSession({ ...authOptions });
  // if (!session) {
  //   return;
  // }
  // const user = await prisma.user.findUnique({
  //   where: { username: session.user.username },
  // });
  // if (!user) {
  //   return;
  // }

  return (
    <nav className="bg-[#cfc4ab] shadow-xl border-white border-b dark:bg-dark-1 py-1 fixed w-full justify-center gap-10 flex items-center text-black text-sm">
          <a href="/"><Image src="/doftopia_logo.png" alt="logo" height={56} width={56} /></a>
          <NavbarLinks />
          <ThemeSwitcher />
        {/* <div className="flex items-center space-x-4">
          <p></p> */}
          {/* {session?.user ? (
            pageName === "profil" ? (
              <SignOutButton />
            ) : (
              <ProfileButton text={`${user.username}`} />
            )
          ) : (
            <Link
              className={`${buttonVariants()} bg-[#ec8e02] hover:bg-[#b86d00] h-12 w-32`}
              href="/sign-in"
            >
              Sign in
            </Link>
          )} */}
        {/* </div> */}
    </nav>
  );
};

export default Navbar;
