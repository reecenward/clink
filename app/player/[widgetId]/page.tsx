"use client";
import { useState, useEffect } from "react";
import { supabase } from "../../../lib/supabase";
import VideoPlayer from "@/app/components/VideoPlayer";
import { Button } from "@/components/ui/button";
import Link from "next/link";


interface Project {
  id: string;
  name: string;
  // Add other relevant fields from your 'widgets' table
}

interface Part {
  id: string;
  caption: string;
  video: string;
  owner: string;
  // Add other fields if necessary
}

interface LinkData {
  cta: string;
  external_link?: string;
  part_link?: string;
}

interface VideoData {
  id: string;
  name: string;
  // Other video fields if needed
}

const App = ({ params }: { params: { widgetId: string } }) => {
  const [projects, setProjects] = useState<Project[] | null>(null);
  const [firstPart, setFirstPart] = useState<Part[] | null>(null); // Expecting array of Part objects
  const [video, setVideo] = useState<VideoData[] | null>(null); // Expecting array of VideoData objects
  const [links, setLinks] = useState<LinkData[]>([]); // Links should be an array
  const [videoURL, setVideoURL] = useState<string | null>(null); // Video URL is a string


  useEffect(() => {
    const fetchProjects = async () => {
      const { data: projectData, error: projectError } = await supabase
        .from("widgets")
        .select("*")
        .eq("id", `${params.widgetId}`);
 
      if (projectError) {
        console.error("Error fetching projects:", projectError.message);
        return;
      }
      console.log(projectData);
      setProjects(projectData);
    };
    fetchProjects();
  }, [params.widgetId]);

  useEffect(() => {
    fetchPartDataByWidgetId(params.widgetId);
  }, [params.widgetId]);

  const fetchPartDataByWidgetId = async (widgetId: string) => {
    const { data: firstPartData, error: firstPartError } = await supabase
      .from("parts")
      .select()
      .eq("widget", widgetId)
      .eq("first", true);

    if (firstPartError) {
      console.error("Error fetching first part:", firstPartError.message);
      return;
    }
    if (firstPartData.length > 0) {
      fetchPartData(firstPartData[0].id);
    }
  };

  const fetchPartData = async (partId: string) => {
    const { data: partData, error: partError } = await supabase
      .from("parts")
      .select()
      .eq("id", partId);
  
    if (partError) {
      console.error("Error fetching part data:", partError.message);
      return;
    }
    setFirstPart(partData);
  
    const { data: linksData, error: linksError } = await supabase
      .from("links")
      .select()
      .eq("part", partId);
  
    if (linksError) {
      console.error("Error fetching links:", linksError.message);
      return;
    }
    setLinks(linksData);
  
    const { data: videoData, error: videoError } = await supabase
      .from("videos")
      .select()
      .eq("id", partData[0].video);
  
    if (videoError) {
      console.error("Error fetching video:", videoError.message);
      return;
    }
    setVideo(videoData);
  
    const { data: publicUrlData } = await supabase.storage
      .from("videos")
      .getPublicUrl(`${partData[0].owner}/${videoData[0].id}.mp4`);
  
    setVideoURL(publicUrlData.publicUrl); // Extract publicUrl here and pass it to setVideoURL
  };
  

  const selectedProject = (partId: string) => {
    fetchPartData(partId);
  };

  return (
    <div className="w-full h-lvh  bg-slate-100 justify-center items-center">
      {firstPart && (
        <div className="h-128 w-80 relative">
{video && videoURL && (
  <VideoPlayer video={video[0]} publicUrl={videoURL} />
)}


          <div className="absolute bottom-0 h-3/6 w-full flex flex-col items-center justify-center">
            <h1 className="text-white">{firstPart[0].caption}</h1>
            <div className="flex flex-col overflow-scroll w-full p-10">
              {links.map((link, index) => (
                link.external_link ? (
                  <Button
                    asChild
                    variant={"secondary"}
                    key={index}
                    className="m-1"
                  >
                    <Link target="_blank" href={link.external_link}>{link.cta}</Link>
                  </Button>
                ) : (
                  <Button
  key={index}
  className="m-1"
  onClick={() => link.part_link && selectedProject(link.part_link)} // Ensure it's not undefined
>
  {link.cta}
</Button>

                )
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
