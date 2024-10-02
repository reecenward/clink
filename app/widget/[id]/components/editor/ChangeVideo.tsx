"use client";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import VideoPlayer from "@/app/components/VideoPlayer";
import { handleChangeVideo } from "../../actions";
import { supabase } from "../../../../../lib/supabase";



interface Video {
  id: string;
  name: string;
  publicUrl: { publicUrl: string };
}


type Props = {}
export default function ChangeVideo({}: Props) {
  const [userVideos, setUserVideos] = useState<Video[]>([]);
  const [selectedChangeVid, setSelectedChangeVid] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);


  

  const fetchUserDataAndVideos = async () => {
    try {
      const { data: user } = await supabase.auth.getUser();
  
      const { data: videos, error } = await supabase
        .from("videos")
        .select("*")
        .eq("owner", `${user.user?.id}`);
  
      if (error) {
        console.error("Error fetching user videos:", error.message);
        return;
      }
      console.log(videos);
      // Retrieve public URLs for each video
      const videosWithUrls = await Promise.all(
        videos.map(async (video) => {
          const { data: publicUrlData } = await supabase.storage
            .from("videos")
            .getPublicUrl(`/${user.user?.id}/${video.id}.mp4`);
          return { ...video, publicUrl: publicUrlData };
        })
      );
  
      console.log(videosWithUrls);
  
      setUserVideos(videosWithUrls);
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error fetching user data:", error.message);
      } else {
        console.error("Unknown error:", error);
      }
    }
  };
  
  // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files ? e.target.files[0] : null;
  //   setVideoFile(file);
  // };
  
  
  // const handleChangeVideoc = async () => {
  //   try {
  //     if (selectedChangeVid && selectedProject) {
  //       const response = await handleChangeVideo(selectedChangeVid.id, selectedProject.id);
     
  //     if (response.success) {
  //       setSelectedChangeVid(null);
  //       // router.refresh(); // Refresh the page or fetch updated data
  //     }
  //   }
  // } catch (error) {
  //   if (error instanceof Error) {
  //     console.error("Failed to change video:", error.message);
  //   } else {
  //     console.error("Unknown error:", error);
  //   }
  //   }
  // };


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
      
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-3 gap-10 justify-center">
        {userVideos?.map((video: Video, index) => (
  <div
    // onClick={() => setSelectedChangeVid(video)}
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
        {/* <Button onClick={handleChangeVideoc} type="submit">
          Select video
        </Button> */}
      </DialogFooter>
    </DialogContent>
  </Dialog>
  )
}