import NavbarLinks from "./NavbarLinks";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../lib/auth";
import { Button } from "../ui/button";
import { buttonVariants } from "../ui/button";
import { signOut } from "next-auth/react";
import Link from "next/link";
import ThemeSwitcher from "./ThemeSwitcher";
import SignOutButton from "./signOutButton";

interface NavbarProps {
  pageName: string;
}

const Navbar = async () => {
  const session = await getServerSession(authOptions);

  return (
    <nav className="bg-[#796f5a] dark:bg-[#303024] w-full p-2">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <NavbarLinks />
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
