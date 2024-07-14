"use client";

import { Button } from "@/components/ui/button";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Card, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "@/components/ui/use-toast";
import { renameWidget, deleteWidget } from "./actions";

type Props = {
  widgetName: string;
  widgetId: string;
};

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  // projectId: z.string().min(1, "Name is required"),
});

const Widget: React.FC<Props> = ({ widgetName, widgetId }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const id = widgetId

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("widgetId", id);
  console.log(formData.get('name') as string)

    try {
      await renameWidget(formData); // Call the server-side action with form data
      toast({
        title: "Success",
        description: "Project renamed successfully!",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "An error occurred",
      });
    }
  };

  return (
    <div>
      <Badge className="bg-slate-400">Draft</Badge>

      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button variant="outline" size="icon">
            <DotsVerticalIcon className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Settings</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <Dialog >
            <DialogTrigger asChild>
              <Button>Rename</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="w-full p-10"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel>Rename your project</FormLabel>
                          <FormControl>
                            <Input type="text" {...field} />
                          </FormControl>
                          <FormMessage>
                            {form.formState.errors.name?.message}
                          </FormMessage>
                        </FormItem>
                      );
                    }}
                  />
                  <DialogFooter>
                    <Button type="submit">Rename Project</Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
          <a href={`player/${widgetId}`}>
            <DropdownMenuItem>View</DropdownMenuItem>
          </a>
          <DropdownMenuSub></DropdownMenuSub>
          <a href={`widget/${widgetId}`}>
            <DropdownMenuItem>Edit</DropdownMenuItem>
          </a>

          <AlertDialog>
            <AlertDialogTrigger>
              <Button>Delete</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>
            
                  <Button onClick={() => deleteWidget(widgetId)}>
                    Delete
                  </Button>
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </DropdownMenuContent>
      </DropdownMenu>

      <a href={`widget/${widgetId}`}>
        <Card className="h-80 w-50 p-4 border-2 border-gray-600  hover:outline outline-4 outline-blue-500/[.33] cursor-pointer hover:border-blue-500">
          <CardTitle className="">{widgetName}</CardTitle>
        </Card>
      </a>
    </div>
  );
};

export default Widget;
