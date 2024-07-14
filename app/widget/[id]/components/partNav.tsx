"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusIcon } from "@radix-ui/react-icons";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";


type Props = {}

export default function PartNav({}: Props) {
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
                <DialogTitle> Add a new part</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    // value={partName}
                    // onChange={(e) => setPartName(e.target.value)}
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                {/* <Button onClick={handleCreatePart} type="submit">
                add new part
              </Button> */}
              </DialogFooter>
            </DialogContent>
          </Dialog>
       

          </div>
  )
}