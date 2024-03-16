"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import router, { useRouter } from "next/navigation";

const FormSchema = z
  .object({
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
    confirmPassword: z.string().min(1, "Confirm Password is required"),
    ankamaUsername: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

const SignUpForm = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    const response = await fetch("/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: values.username,
        email: values.email,
        password: values.password,
        ankamaUsername: values.ankamaUsername,
      }),
    });

    if (response.ok) {
      router.push("/sign-in");
    } else {
      console.error("Registration failed");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col space-y-4"
      >
        <input
          type="text"
          placeholder="Username"
          {...form.register("username")}
        />
        {form.formState.errors.username && (
          <span>{form.formState.errors.username.message}</span>
        )}
        <input type="text" placeholder="Email" {...form.register("email")} />
        {form.formState.errors.email && (
          <span>{form.formState.errors.email.message}</span>
        )}
        <input
          type="password"
          placeholder="Password"
          {...form.register("password")}
        />
        {form.formState.errors.password && (
          <span>{form.formState.errors.password.message}</span>
        )}
        <input
          type="password"
          placeholder="Confirm Password"
          {...form.register("confirmPassword")}
        />
        {form.formState.errors.confirmPassword && (
          <span>{form.formState.errors.confirmPassword.message}</span>
        )}
        <input
          type="text"
          placeholder="Ankama Username"
          {...form.register("ankamaUsername")}
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpForm;
