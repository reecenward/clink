"use client";
import Image from "next/image";
import Photo from "../../public/photo.jpg";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";

export default function Menu() {
  return (
    <div className="w-full p-5 bg-slate-100 flex flex-col justify-center items-center">
      <div className="flex">
        <a href="/learn" className="group/item">
          <Card className="w-80 h-auto  mr-5 border-2 border-gray-600  hover:outline outline-4 outline-blue-500/[.33] cursor-pointer hover:border-blue-500">
            <div className="p-5 flex justify-between items-center">
              <div className="">
                <CardTitle className="mb-1">Widgets</CardTitle>
                <CardDescription className="mb-2">
                  Lets create a widget together
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
        <a href="/learn" className="group/item">
          <Card className="w-80 h-auto  mr-5 border-2 border-gray-600  hover:outline outline-4 outline-blue-500/[.33] cursor-pointer hover:border-blue-500">
            <div className="p-5 flex justify-between items-center">
              <div className="">
                <CardTitle className="mb-1">Library</CardTitle>
                <CardDescription className="mb-2">
                  Upload and manage your videos
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
        <a href="/learn" className="group/item">
          <Card className="w-80  h-auto   border-2 border-gray-600  hover:outline outline-4 outline-blue-500/[.33] cursor-pointer hover:border-blue-500">
            <div className="p-5 flex justify-between items-center">
              <div className="">
                <CardTitle className="mb-1">Account</CardTitle>
                <CardDescription className="mb-2">
                Edit or uprage your account
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
