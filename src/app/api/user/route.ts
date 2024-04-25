import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";
import { hash } from "bcrypt";
import * as z from "zod";

//validation schema

const userSchema = z.object({
  username: z
    .string()
    .min(1, "Username is required")
    .min(5, { message: "Username must be at least 5 characters long" })
    .max(32, { message: "Username must be at most 32 characters long" }),
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters long")
    .max(32, "Password must be at most 32 characters long"),
  // confirmPassword: z.string().min(1, "Confirm Password is required"),
  ankamaUsername: z.string(),
});
// .refine((data) => data.password === data.confirmPassword, {
//   path: ["confirmPassword"],
//   message: "Passwords do not match",
// });

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, username, password, ankamaUsername } =
      userSchema.parse(body);

    //check if email exists
    const existingUser = await prisma.user.findUnique({
      where: { email: email },
    });
    if (existingUser) {
      return NextResponse.json(
        { user: null, message: "Account with this email already exists" },
        { status: 409 }
      );
    }

    const existingUsername = await prisma.user.findUnique({
      where: { username: username },
    });
    if (existingUsername) {
      return NextResponse.json(
        { user: null, message: "Username already exists" },
        { status: 409 }
      );
    }

    const hashedPassword = await hash(password, 10);
    const NewUser = await prisma.user.create({
      data: {
        email: email,
        username: username,
        password: hashedPassword,
        ankamaUsername: ankamaUsername,
      },
    });
    const { password: newUserPassword, ...rest } = NewUser;

    return NextResponse.json(
      { user: rest, message: "New User Registered" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong " },
      { status: 500 }
    );
  }
}
