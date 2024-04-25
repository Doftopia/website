"use client";

import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/Form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../../ui/Input";
import { Button } from "../../ui/Button";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
// import GoogleSignInButton from "../GoogleSignInButton";

const FormSchema = z.object({
  email: z.string().min(1, "Adresse mail requise").email("Invalid email"),
  password: z
    .string()
    .min(1, "Il faut un mot de passe")
    .min(8, "Le mot de passe doit faire au moins 8 caractères"),
});

const SignInForm = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    const signInData = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });
    if (signInData?.error) {
      console.log(signInData.error);
    } else {
      router.push("/");
      console.log("Signed in");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-green">Email</FormLabel>
                <FormControl>
                  <Input placeholder="mail@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-primary">Mot de passe</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="••••••••••" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          className="w-full text-white dark:bg-dark-2 dark:hover:bg-green dark:hover:text-black hover:font-bold mt-6"
          type="submit"
        >
          Se connecter
        </Button>
      </form>
      <div className="mx-auto my-4 text-primary flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-green after:ml-4 after:block after:h-px after:flex-grow after:bg-green">
        ou
      </div>
      {/* <GoogleSignInButton>Sign in with Google</GoogleSignInButton> */}
      <p className="text-center text-sm text-primary mt-2">
        si tu n&apos;as pas de compte tu peux{" "}
        <Link className="text-blue hover:underline" href="/sign-up">
          en créer un
        </Link>
      </p>
    </Form>
  );
};

export default SignInForm;
