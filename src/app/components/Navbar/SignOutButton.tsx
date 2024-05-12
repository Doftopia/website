"use client";

import React from "react";
import { Button } from "../ui/Button";
import { signOut } from "next-auth/react";

const signOutButton: React.FC = () => {
  return (
    <>
      <Button
        className="h-12 w-32 py-1 px-2 bg-dark-red hover:bg-light-red"
        onClick={() => signOut()}
      >
        Sign out
      </Button>
    </>
  );
};

export default signOutButton;
