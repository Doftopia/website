import NextAuth from "next-auth/next";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./prisma";
import { Adapter } from "next-auth/adapters";

export const { auth, handlers } = NextAuth({
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [],
});
