"use client";
import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Image from "next/image";
import Link from "next/link";
import FormField from "./FormField";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const authFormSchema = (type: FormType) => {
  return z.object({
    name: type === "sign-up" ? z.string().min(3) : z.string().optional(),
    email: z.string().email(),
    password: z.string().min(3),
  });
};

const AuthForm = ({ type }: { type: FormType }) => {
  const router = useRouter();
  const formSchema = authFormSchema(type);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (type === "sign-up") {
        toast.success("Account created successfully!.Please Sign-in.");
        router.push('/sign-in')
      } else {
        toast.success("Sign in successfully!.");
        router.push('/');
      }
    } catch (error) {
      console.log(error);
      toast.error(`There was an error: ${error}`);
    }
  }

  const isSignIn = type === "sign-in";

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="card-border lg:min-w-[566x]">
        <div className="flex flex-col gap-6 card py-14 px-10">
          <div className="flex flex-row gap-2 justify-center">
            <Image src="logo.svg" alt="logo" height={40} width={38} />
          </div>
          <h2 className="text-primary-100">Master Mock</h2>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6 w-full mt-4 form"
            >
              {!isSignIn && (
                <FormField
                  control={form.control}
                  name="name"
                  label="Name"
                  placeholder="Your name"
                />
              )}
              <FormField
                control={form.control}
                name="email"
                label="Email"
                placeholder="Your email"
                type="email"
              />
              <FormField
                control={form.control}
                name="password"
                label="Password"
                placeholder="Enter your password"
                type="password"
              />
              <Button className="btn" type="submit">
                {isSignIn ? "Sign -in" : "Create an account"}
              </Button>
            </form>
          </Form>

          <p className="text-center">
            {isSignIn ? "No account yet?" : "Have an account already"}
            <Link
              href={!isSignIn ? "/sign-in" : "/sign-up"}
              className="font-bold text-user-primary ml-1"
            >
              {!isSignIn ? "sign-in" : "sign-up"}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
