
"use client";
import { Button } from "@/components/ui/button";
type Props = {}

export default function EditorNav({}: Props) {
  return (
    <div className="w-full bg-slate-200 p-2 h-16 flex justify-end items-center sticky top-0">
    <Button>Save</Button>
  </div>
  )
}