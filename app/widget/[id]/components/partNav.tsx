"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusIcon } from "@radix-ui/react-icons";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { createPart } from "../actions";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";

const formSchema = z.object({
  name: z.string().min(1).max(20)
});

type Props = {}

export default function PartNav({}: Props) {
  const [error, setError] = useState("");
  const widgetId = useParams<{ id: string; }>()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('widget', widgetId.id);
  
    try {
      await createPart(formData);
    } catch (error) {
      setError(error.message);
    }
  };


  const handleCopy = () => {
    const codeSnippet = `<div style={{ height: "576px", width:"320px",  position:"fixed", right:0, bottom:0, margin:"10px"}}>
  
  <iframe style={{ height: "100%", width: "100%", border: "none" }} allowfullscreen src="http://localhost:3000/player/${widgetId.id}" ></iframe>
</div>`;

    navigator.clipboard.writeText(codeSnippet).then(() => {
      alert("Code snippet copied to clipboard!");
    });
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            className="flex flex-col w-48 h-30 p-4 mr-2 border-2 border-gray-600 hover:outline outline-4 outline-blue-500/[.33] cursor-pointer hover:border-blue-500"
            variant="outline"
          >
            <PlusIcon className="mr-2 h-8" />
            Add Part 
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add a new part</DialogTitle>
            id: {widgetId.id}
          </DialogHeader>
          <Form {...form}>
          <form
            className="flex flex-col gap-4"
            onSubmit={form.handleSubmit(handleSubmit)}
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter a name"
                        type="text"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <Button type="submit" className="w-full">
              Create
            </Button>
          </form>
        </Form>
        </DialogContent>
      </Dialog>
      <Button onClick={handleCopy} className="mt-4">
        Copy Code Snippet
      </Button>
    </div>
  );
}



