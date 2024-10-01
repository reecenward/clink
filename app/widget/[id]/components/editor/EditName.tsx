"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { updateName } from "../../actions";

const formSchema = z.object({
  name: z.string().min(1).max(20),
});



export default function EditName(partID:any) {
  const [error, setError] = useState("");
  const [newPartName, setNewPartName] = useState("");

  console.log(partID.partID)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("part", partID.partID.id);

    try {
      await updateName(formData);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <Form {...form}>
        <form
          className="flex items-end gap-4"
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
                    <Input placeholder={partID.partID.name} type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <Button type="submit" className="">
            Save
          </Button>
        </form>
      </Form>
    </div>
  );
}
