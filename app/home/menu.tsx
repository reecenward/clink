"use client";
import Image from "next/image";
import Photo from "../../public/photo.jpg";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";

export default function Menu() {
  return (
    <div className="w-full p-5 bg-slate-100 flex flex-col justify-center items-center">
      <h1 className="text-2xl font-bold p-10">Get started with Clink</h1>
      <div className="flex">
        <a href="/widget" className="group/item">
          <Card className="w-80 h-auto  mr-5 border-2 border-gray-600  hover:outline outline-4 outline-blue-500/[.33] cursor-pointer hover:border-blue-500">
            <div className="p-5 flex justify-between items-center">
              <div className="">
                <CardTitle className="mb-1">Create</CardTitle>
                <CardDescription className="mb-2">
                  Create a new video
                </CardDescription>
              </div>
              <div>
                <ArrowRightIcon className="h-8  w-8 stroke-blue-500 invisible group-hover/item:visible" />
              </div>
            </div>
            <Image
              className="rounded-b-sm"
              src={Photo}
              width={500}
              height={500}
              alt="Picture of the author"
            />
          </Card>
        </a>
        <a href="/widget" className="group/item">
          <Card className="w-80  h-auto   border-2 border-gray-600  hover:outline outline-4 outline-blue-500/[.33] cursor-pointer hover:border-blue-500">
            <div className="p-5 flex justify-between items-center">
              <div className="">
                <CardTitle className="mb-1">Learn</CardTitle>
                <CardDescription className="mb-2">
                  Learn how to create a video
                </CardDescription>
              </div>
              <div>
                <ArrowRightIcon className="h-8  w-8 stroke-blue-500 invisible group-hover/item:visible" />
              </div>
            </div>
            <Image
              className="rounded-b-sm"
              src={Photo}
              width={500}
              height={500}
              alt="Picture of the author"
            />
          </Card>
        </a>
      </div>
    </div>
  );
}
