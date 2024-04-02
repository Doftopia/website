import React from "react";
import { Button } from "../components/ui/Button";
import Navbar from "../components/Navbar/Navbar";
import Frame from "../components/ui/Frame";
import { authOptions } from "../../../lib/auth";
import { prisma } from "../../../lib/prisma";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Characters from "../components/Elements/Lists/CharactersList";

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
        <div className="mx-auto">
          <Frame size="sm" className="text-white">
            {" "}
            <p>Mon pseudonyme : {user.username}</p>
            <p>Mon Adresse mail : {user.email} </p>
            <p>Mon mot de passe : ahahaha</p>
            <p>Mon pseudo Ankama : {user.ankamaUsername?.replace("-", "#")}</p>
            <Button>Modifier mes informations</Button>
          </Frame>
          <Characters />
        </div>
      </main>
    </>
  );
};

export default Profile;
