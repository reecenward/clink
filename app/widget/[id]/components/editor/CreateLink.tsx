"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";

const formSchema = z.object({
  name: z.string().min(1).max(20),
});

export default function CreateLink(links:any, projects:any, types:any) {
  const [error, setError] = useState("");

  const [linkName, setLinkName] = useState("");
  const [linkToPart, setLinkToPart] = useState("");
  const [linkType, setLinkType] = useState("");


  const [CTA, setCTA] = useState("");
  
  console.log(links)



  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
    },
  });

  // const handleSubmit = async (values: z.infer<typeof formSchema>) => {
  //   const formData = new FormData();
  //   formData.append("name", values.name);
  //   formData.append("part", part.id);

  //   try {
  //     await createPart(formData);
  //   } catch (error) {
  //     // Type assertion here to treat error as Error
  //     if (error instanceof Error) {
  //       setError(error.message);
  //     } else {
  //       setError("An unexpected error occurred");
  //     }
  //   }
  // };

  return (
    <div>
                {/* Create Link */}
                <Dialog>
           <DialogTrigger asChild>
             <Button variant="outline">Create new link</Button>
           </DialogTrigger>
           <DialogContent className="sm:max-w-[425px]">
             
             <div className="grid gap-4 py-4">
               <div className="grid grid-cols-4 items-center gap-4">
                 <Label htmlFor="name" className="text-right">
                   Name:
                 </Label>
                 <Input
                   id="name"
                   value={linkName}
                   onChange={(e) => setLinkName(e.target.value)}
                   className="col-span-3"
                 />
               </div>
               <div className="grid grid-cols-4 items-center gap-4">
                 <Label htmlFor="name" className="text-right">
                   CTA:
                 </Label>
                 <Input
                   id="name"
                   value={CTA}
                   onChange={(e) => setCTA(e.target.value)}
                   className="col-span-3"
                 />
               </div>
             </div>
             <div className="grid gap-4 py-4">
               <div className="grid grid-cols-4 items-center gap-4">
                 <Label htmlFor="name" className="text-right">
                   Link type:
                 </Label>
                 <Select onValueChange={(value) => setLinkType(value)}>
                   <SelectTrigger className="w-[180px]">
                     <SelectValue placeholder="None" />
                   </SelectTrigger>
                   <SelectContent>
                   {/* {types (
                     {types.map((type, index) => (
                       <SelectItem key={index} value={type.id}>
                         {type.name}
                       </SelectItem>
                     ))}
                    ) : ""} */}
                   </SelectContent>
                 </Select>
               </div>
             </div>
             <div className="grid gap-4 py-4">
               <div className="grid grid-cols-4 items-center gap-4">
                 <Label htmlFor="name" className="text-right">
                   Link to:
                 </Label>
                 <Select onValueChange={(value) => setLinkToPart(value)}>
                   <SelectTrigger className="w-[180px]">
                     <SelectValue placeholder="None" />
                   </SelectTrigger>
                   <SelectContent>
                     {/* {projects.projects
                       ?.filter((part) => part.id !== selectedProject?.id)
                       .map((part, index) => (
                         <SelectItem key={index} value={part.id}>
                           {part.name}
                         </SelectItem>
                       ))} */}
                   </SelectContent>
                 </Select>
               </div>
             </div>
             <DialogFooter>
               <Button>Create link</Button>
             </DialogFooter>
           </DialogContent>
         </Dialog>

         <h1>links:</h1>
              {/* {links.links.map((part, index) => (
                <div key={index} value={part.id}>
                  {part.name}-{part.part_link}-{part.external_link}-{part.cta}
                </div>
              ))} */}
    </div>
  );
}
