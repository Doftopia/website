import NavbarLinks from "./NavbarLinks";
import { buttonVariants } from "../ui/Button";
import Link from "next/link";
import ThemeSwitcher from "./ThemeSwitcher";
import SignOutButton from "./SignOutButton";
import ProfileButton from "./ProfileButton";
import Image from "next/image";

interface NavbarProps {
  pageName?: string;
  session: any;
  user: any;
}

export const NavbarContent: React.FC<NavbarProps> = ({
  pageName,
  session,
  user,
}) => {
  return (
    <nav className="bg-light-2 shadow-xl border-orange dark:border-green border-b dark:bg-dark-1 w-full p-2">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="w-[12rem] grid grid-cols-2">
          <a href="/">
            <Image
              src="/logo_notext.png"
              alt="logo"
              height={96}
              width={96}
              className="absolute top-0 left-0"
            />
          </a>
          <NavbarLinks />
        </div>

        <div className="flex items-center space-x-4">
          <p></p>
          {session?.user ? (
            pageName === "profil" ? (
              <SignOutButton />
            ) : (
              <>
                <ProfileButton text={`${user?.username}`} />
                <ThemeSwitcher />
              </>
            )
          ) : (
            <Link
              className={`${buttonVariants()} bg-[#ec8e02] hover:bg-[#b86d00] h-12 w-32`}
              href="/sign-in"
            >
              Sign in
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};
