"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";
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
import { login } from "../actions";

const formSchema = z.object({
  emailAdress: z.string().email(),
  password: z.string().min(8).max(50),
});

export default function Login() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      emailAdress: "",
      password: "",
    },
  });

  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    const formData = new FormData();
    formData.append('email', values.emailAdress);
    formData.append('password', values.password);
  
    try {
      await login(formData);
      router.push("/account");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <main className="flex h-screen justify-center items-center">
      <div className="flex flex-col h-min size-4/12 ">
        <h2 className="text-2xl font-bold">Log In</h2>
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

            <Button type="submit" className="w-full">
              Submit
            </Button>
          </form>
        </Form>

        {error && <div className="error">{error}</div>}
        <Link href="/signup">Sign up</Link>
      </div>
    </main>
  );
}
