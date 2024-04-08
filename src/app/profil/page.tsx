import React from "react";
import { Button } from "../components/ui/Button";
import Navbar from "../components/Navbar/Navbar";
import Frame from "../components/ui/Frame";
import { authOptions } from "../../../lib/auth";
import { prisma } from "../../../lib/prisma";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Characters from "../components/Elements/Lists/CharactersList";
import ProfileForm from "../components/Elements/Forms/ProfileForm";

interface ProfileProps {
  username: string;
  email: string;
  password: string;
  profileImage: string;
  bio: string;
}

const Profile: React.FC<ProfileProps> = async () => {
  const session = await getServerSession({ ...authOptions });
  if (!session) {
    return redirect("/sign-in");
  }

  const user = await prisma.user.findUnique({
    where: { username: session?.user.username },
  });
  if (!user) {
    return redirect("/sign-in");
  }
  return (
    <>
      <header>
        <Navbar pageName="profil" />
      </header>
      <main>
        <div className="grid w-fit grid-cols-3">
          <div>
            <ProfileForm />
          </div>
          <div className="col-span-2">
            <Characters />
          </div>
        </div>
      </main>
    </>
  );
};

export default Profile;
