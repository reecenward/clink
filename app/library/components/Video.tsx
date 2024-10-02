"use client";

import React, { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
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
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import VideoPlayer from "@/app/components/VideoPlayer";
import { v4 as uuidv4 } from "uuid";
import { deleteVideo, renameVideo } from "../actions";
 
interface Video {
  id: string;
  name: string;
  publicUrl: {
    publicUrl: string;
  };
}

interface VideoSettingsProps {
  videos: Video[];
}


export default function VideoSettings( { videos }: VideoSettingsProps) {
  const [videoName, setVideoName] = useState("");
  const [selectedVideo, setSelectedVideo] = useState("");
  const [videoNewName, setVideoNewName] = useState("");
  const [videoFile, setVideoFile] = useState<File | null>(null);

  const [videoToRename, setVideoToRename] = useState({ id: "", name: "" });

  const handleVideoUpload = async () => {
    if (!videoFile || !videoName) return;

    const { data: user } = await supabase.auth.getUser();


    // Generate UUID for the video
    const videoUUID = uuidv4();

    // Upload the video to the user's bucket with UUID as the name
    const { data: storageData, error: storageError } = await supabase.storage
      .from("videos")
      .upload(`${user.user?.id}/${videoUUID}.mp4`, videoFile);

    if (storageError) {
      console.error("Error uploading video:", storageError.message);
      return;
    }

    // Save video details to the 'videos' table
    const { data: insertData, error: insertError } = await supabase
      .from("videos")
      .insert([{ id: videoUUID, name: videoName, owner: user.user?.id }]);

    if (insertError) {
      console.error("Error saving video details:", insertError.message);
      return;
    }

    setVideoFile(null);
    setVideoName("");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null; // If file is undefined, set it to null
    setVideoFile(file);
  };
  

  return (
    <div className="w-full bg-slate-100 ">
      <div className="w-full z-10 bg-slate-200 p-5 h-16 flex justify-end items-center sticky top-0">
        <Dialog>
          <DialogTrigger asChild>
            <Button>Upload video</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={videoName}
                  onChange={(e) => setVideoName(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="video" className="text-right">
                  Video
                </Label>
                <input
                  id="video"
                  type="file"
                  accept="video/*"
                  onChange={handleFileChange}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleVideoUpload}>Upload Video</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <div className="p-10">
      {videos.length === 0 ? (
          <h1>No videos available. Please upload some videos.</h1>
        ) : (
        <div className="grid grid-cols-5 gap-10 justify-center">
          {videos?.map((video, index) => (
            <div key={index}>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Button variant="outline" size="icon">
                    <DotsVerticalIcon className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="flex flex-col">
                  <DropdownMenuLabel>Settings</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <Dialog>
                    <DialogTrigger asChild>
                    <Button
  onClick={() =>
    setVideoToRename({ id: video.id, name: video.name })
  }
>
  Rename
</Button>

                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="name" className="text-right">
                            Rename
                          </Label>
                          <Input
                            id="name"
                            placeholder={videoToRename.name}
                            value={videoNewName}
                            onChange={(e) => setVideoNewName(e.target.value)}
                            className="col-span-3"
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit">
                          Rename
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        onClick={() =>
                          setSelectedVideo(video.publicUrl.publicUrl)
                        }
                      >
                        view
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <div className="grid gap-4 py-4">
                        {/* <pre className="p-5">{JSON.stringify(selectedVideo, null, 2) }</pre> */}
                        <video className="w-full rounded " controls loop>
                          <source src={selectedVideo} type="video/mp4" />
                        </video>
                      </div>
                    </DialogContent>
                  </Dialog>

                  <AlertDialog>
                    <AlertDialogTrigger>
                      <Button>Delete</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete your account and remove your data from our
                          servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction>
                          {" "}
                          <Button onClick={() => deleteVideo(video.id)}>
                            Delete
                          </Button>
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </DropdownMenuContent>
              </DropdownMenu>
              <VideoPlayer video={video} publicUrl={video.publicUrl.publicUrl} />
              <h1>{video.name}</h1>
            </div>
          ))}
        </div>
         )}
      </div>
    </div>
  );
}
