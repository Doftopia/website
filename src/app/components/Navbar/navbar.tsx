/* eslint-disable @next/next/no-img-element */
import NavbarLinks from "./NavbarLinks";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../lib/auth";
import { buttonVariants } from "../ui/Button";
import Link from "next/link";
import ThemeSwitcher from "./ThemeSwitcher";
import SignOutButton from "./SignOutButton";
import Image from "next/image";

interface NavbarProps {
  pageName: string;
}

const Navbar = async () => {
  const session = await getServerSession(authOptions);

  return (
    <nav className="bg-[#796f5a] shadow-lg dark:bg-[#2f2f25] w-full p-2">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="w-[12rem] grid grid-cols-2">
          <a href="/">
            <Image src="/doftopia_logo.png" alt="logo" height={56} width={56} />
          </a>
          <NavbarLinks />
        </div>
        <div className="flex items-center space-x-4">
          {session?.user ? (
            <SignOutButton />
          ) : (
            <Link
              className={`${buttonVariants()} bg-[#ec8e02] hover:bg-[#b86d00] h-12 w-32`}
              href="/sign-in"
            >
              Sign in
            </Link>
          )}
          <ThemeSwitcher />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
