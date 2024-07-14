"use client";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  ContainerIcon,
  VideoIcon,
  HomeIcon,
  PersonIcon,
  PlayIcon,
  Pencil2Icon,
} from "@radix-ui/react-icons";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 flex flex-col h-lvh w-64 p-2.5 bg-white ">
      <h1 className="flex text-xl font-bold  h-16 justify-start mb-1 p-2 pt-5">
        Clink
      </h1>
      <Button
        asChild
        variant="ghost"
        className={`flex  h-16 justify-start mb-1 ${
          pathname === "/home" ? "bg-slate-200" : ""
        }`}
      >
        
        <Link href="/home">
          <HomeIcon className="mr-2 h-5 w-5" />
          Home
        </Link>
      </Button>
      <Button
        asChild
        variant="ghost"
        className={`flex h-16 justify-start mb-1 ${
          pathname.match(/^\/widget($|\/.*)/) ? "bg-slate-200" : ""
        }`}
      >
        <Link href="/widget">
          <ContainerIcon className="mr-2 h-5 w-5" />
          Widgets
        </Link>
      </Button>
      <Button
        asChild
        variant="ghost"
        className={`flex h-16 justify-start mb-1 ${
          pathname === "/library" ? "bg-slate-200" : ""
        }`}
      >
        <Link href="/library">
          <VideoIcon className="mr-2 h-5 w-5" />
          Library
        </Link>
      </Button>
      <Button
        asChild
        variant="ghost"
        className={`flex h-16 justify-start mb-1 ${
          pathname === "/player" ? "bg-slate-200" : ""
        }`}
      >
        <Link href="/player">
          <PlayIcon className="mr-2 h-5 w-5" />
          Player
        </Link>
      </Button>
      <Button
        asChild
        variant="ghost"
        className={`flex h-16 justify-start mb-1 ${
          pathname === "/learn" ? "bg-slate-200" : ""
        }`}
      >
        <Link href="/learn">
          <Pencil2Icon className="mr-2 h-5 w-5" />
          Learn
        </Link>
      </Button>
      <Button
        asChild
        variant="ghost"
        className={`flex h-16 justify-start mb-1 ${
          pathname === "/account" ? "bg-slate-200" : ""
        }`}
      >
        <Link href="/account">
          <PersonIcon className="mr-2 h-5 w-5" />
          Account
        </Link>
      </Button>
    </nav>
  );
}
