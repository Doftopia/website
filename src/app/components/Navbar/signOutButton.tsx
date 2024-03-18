"use client";

import React from "react";
import { Button } from "../ui/button";
import { signOut } from "next-auth/react";

const signOutButton: React.FC = () => {
  return (
    <>
      <Button className="h-12 w-32 bg-red-500" onClick={() => signOut()}>
        Sign out
      </Button>
    </>
  );
};

export default signOutButton;
