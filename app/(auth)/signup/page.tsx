"use client";

import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { signup } from "../actions";

const formSchema = z
  .object({
    emailAdress: z.string().email(),
    password: z.string().min(8).max(50),
    passwordConfirm: z.string().min(8).max(50),
  })
  .refine(
    (data) => {
      return data.password === data.passwordConfirm;
    },
    {
      message: "passwords do not match",
      path: ["passwordConfirm"],
    }
  );

export default function Signup() {
  const router = useRouter();
  const [error, setError] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      emailAdress: "",
      password: "",
      passwordConfirm: "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    const formData = new FormData();
    formData.append("email", values.emailAdress);
    formData.append("password", values.password);

    try {
      await signup(formData);
      router.push("/verify"); // Redirect to verify page after sign-up
    } catch (error) {
      setError("error");
    }
  };

  return (
    <main className="flex h-screen justify-center items-center">
      <div className="flex flex-col h-min size-4/12 ">
        <h2 className="text-2xl font-bold">Sign up</h2>
        <Separator className="my-4" />

        <Form {...form}>
          <form
            className="flex flex-col gap-4"
            onSubmit={form.handleSubmit(handleSubmit)}
          >
            <FormField
              control={form.control}
              name="emailAdress"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Email address</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Email address"
                        type="email"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Password"
                        type="password"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <FormField
              control={form.control}
              name="passwordConfirm"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Confirm Password"
                        type="password"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <Button type="submit" className="w-full">
              Submit
            </Button>
          </form>
        </Form>
        {error && <div className="error">{error}</div>}
        <Link href="/login">Login</Link>
      </div>
    </main>
  );
}
