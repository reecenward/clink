"use client";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import VideoPlayer from "@/app/components/VideoPlayer";


type Props = {}

export default function ChangeVideo({}: Props) {
  return (
    <Dialog>
    <DialogTrigger asChild>
      <Button
        className="flex flex-col w-48 h-30 p-4 mr-2 border-2 border-gray-600 hover:outline outline-4 outline-blue-500/[.33] cursor-pointer hover:border-blue-500"
        variant="outline"
        onClick={fetchUserDataAndVideos}
      >
        <PlusIcon className="mr-2 h-8" />
        Change Video
      </Button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle> Choose from video library</DialogTitle>
      </DialogHeader>
      <pre className="p-5">
        {JSON.stringify(selectedChangeVid?.id, null, 2)}
      </pre>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-3 gap-10 justify-center">
          {userVideos?.map((video, index) => (
            <div
              onClick={() => setSelectedChangeVid(video)}
              className="rounded border-2 border-gray-600 hover:outline outline-4 outline-blue-500/[.33] cursor-pointer hover:border-blue-500"
              key={index}
            >
              <VideoPlayer
                video={video}
                publicUrl={video.publicUrl.publicUrl}
              />
              <h1>{video.name}</h1>
            </div>
          ))}
        </div>
      </div>
      <DialogFooter>
        {/* <Button onClick={handleChangeVideo} type="submit">
        Select video
      </Button> */}
      </DialogFooter>
    </DialogContent>
  </Dialog>
  )
}