"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/Form";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../../ui/Input";
import { Button } from "../../ui/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";

const FormSchema = z
  .object({
    username: z
      .string()
      .min(1, "Un pseudo est requis")
      .min(5, {
        message: "Le pseudo doit faire au moins 5 caractères",
      })
      .max(32, { message: "Le pseudo doit faire moins de 32 caractères" }),
    email: z
      .string()
      .min(1, "Un email est requis")
      .email("L'email n'est pas valide"),
    password: z
      .string()
      .min(1, "Un mot de passe est requis")
      .min(8, "Le mot de passe doit faire au moins 8 caractères")
      .max(32, "Le mot de passe doit faire moins de 32 caractères"),
    confirmPassword: z
      .string()
      .min(1, "La confirmation du mot de passe est requise"),
    ankamaUsername: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Les mots de passe ne correspondent pas",
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
      ankamaUsername: "",
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-blue">
                  Nom d&apos;utilisateur
                </FormLabel>
                <FormControl>
                  <Input placeholder="johndoe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel>Adresse email</FormLabel>
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
                  <Input
                    type="password"
                    placeholder="•••••••••••••"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-primary">Confirmation</FormLabel>
                <FormControl>
                  <Input
                    placeholder="••••••••••••"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="ankamaUsername"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-blue">Ton ID Ankama</FormLabel>
                <FormControl>
                  <Input placeholder="PSEUDO-1234" type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          className="w-full text-white dark:bg-dark-2 dark:hover:bg-green hover:text-black hover:font-bold mt-6"
          type="submit"
        >
          S&apos;inscrire
        </Button>
      </form>
      <div className="mx-auto my-4 text-primary flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-green after:ml-4 after:block after:h-px after:flex-grow after:bg-green">
        ou
      </div>
      {/* <GoogleSignInButton>Sign up with Google</GoogleSignInButton> */}
      <p className="text-center text-sm text-primary mt-2">
        Si tu as déjà un compte, tu peux te{" "}
        <Link className="text-blue hover:underline" href="/sign-in">
          connecter
        </Link>
      </p>
    </Form>
  );
};

export default SignUpForm;
