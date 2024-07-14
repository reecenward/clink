"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusIcon } from "@radix-ui/react-icons";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { supabase } from "../../../../lib/supabase";
import VideoPlayer from "@/app/components/VideoPlayer";
import PartCard from "./part";
import PartNav from "./partNav";
import EditorNav from "./editorNav";

type Props = {
  combinedData: any;
};

const Part: React.FC<Props> = ({ combinedData }) => {
  const [projects, setProjects] = useState([]);
  const [types, setTypes] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedVid, setSelectedVid] = useState(null);
  const [links, setLinks] = useState([]);
  const [linkName, setLinkName] = useState("");
  const [linkToPart, setLinkToPart] = useState("");
  const [linkType, setLinkType] = useState("");
  const [newPartName, setNewPartName] = useState("");
  const [newCaption, setNewCaption] = useState("");
  const [userVideos, setUserVideos] = useState([]);
  const [selectedChangeVid, setSelectedChangeVid] = useState(null);
  const [CTA, setCTA] = useState("");
  const [videoFile, setVideoFile] = useState(null);

  useEffect(() => {
    setProjects(combinedData.projectData);
    async function fetchTypes() {
      const { data: types, error: projectError } = await supabase
        .from("types")
        .select("*");
      if (projectError) {
        console.error("Error fetching project data:", projectError.message);
        return;
      }
      setTypes(types);
      console.log("types data:", types);
    }
    fetchTypes();
  }, [combinedData]);

  const handleProjectSelect = async (project: any, index: number) => {
    setSelectedProject(project);
    setSelectedVid(projects[index]);
    console.log(project.id);
    const { data: projectData, error: projectError } = await supabase
      .from("links")
      .select("*")
      .eq("part", `${project.id}`);
    if (projectError) {
      console.error("Error fetching links:", projectError.message);
      return;
    }
    console.log("links: ", projectData);
    setLinks(projectData);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setVideoFile(file);
  };

  const fetchUserDataAndVideos = async () => {
    try {
      const { data: user } = await supabase.auth.getUser();

      const { data: videos, error } = await supabase
        .from("videos")
        .select("*")
        .eq("owner", `${user.user.id}`);

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
            .getPublicUrl(`/${user.user.id}/${video.id}.mp4`);
          return { ...video, publicUrl: publicUrlData };
        })
      );

      console.log(videosWithUrls);

      setUserVideos(videosWithUrls);
    } catch (error) {
      console.error("Error fetching user data:", error.message);
    }
  };

  return (
    <div className="w-full bg-slate-100">
      <EditorNav/>
      <div className="p-5">
        <h2 className="text-2xl font-bold ml-2">Parts</h2>
        <div className="flex overflow-x-scroll max-w-screen-lg no-scrollbar">
          <PartNav />
          {projects?.map((project, index) => (
            <PartCard
              key={project.id}
              project={project}
              displayVideo={project.publicUrl}
              onClick={() => handleProjectSelect(project, index)}
            />
          ))}
        </div>
      </div>

      {selectedProject ? (
        <div className="p-5">
          <h2 className="text-2xl font-bold ml-2">
            Current part: {selectedProject ? selectedProject?.name : "none"}
          </h2>
          <div className="flex">
            <div>
            
              {/* <Dialog>
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
                     <Button onClick={handleChangeVideo} type="submit">
                    Select video
                  </Button> 
                  </DialogFooter>
                </DialogContent>
              </Dialog> */}

              <Label htmlFor="name">Name</Label>
              <Input
                placeholder={selectedProject ? selectedProject.name : ""}
                id="newPartName"
                value={newPartName}
                onChange={(e) => setNewPartName(e.target.value)}
                className="col-span-3"
              />
              <Label htmlFor="caption">Caption</Label>
              <Input
                placeholder={selectedProject ? selectedProject.caption : ""}
                id="caption"
                value={newCaption}
                onChange={(e) => setNewCaption(e.target.value)}
                className="col-span-3"
              />
              <Label htmlFor="link">Link to part</Label>
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
                          {types.map((type, index) => (
                            <SelectItem key={index} value={type.id}>
                              {type.name}
                            </SelectItem>
                          ))}
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
                          {projects
                            ?.filter((part) => part.id !== selectedProject?.id)
                            .map((part, index) => (
                              <SelectItem key={index} value={part.id}>
                                {part.name}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DialogFooter>
                    {/* <Button onClick={handleCreateLink}>Create link</Button> */}
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <h1>links:</h1>
              {links.map((part, index) => (
                <div key={index} value={part.id}>
                  {part.name}-{part.part_link}-{part.cta}
                </div>
              ))}
              <div className="flex items-center">
                <h1 className="p-1">Publish</h1>
                <Switch />
              </div>
              <div className="flex items-center">
                <h1 className="p-1">Is First</h1>
                <Switch />
              </div>
              {/* <Button onClick={handleSave}>Save</Button> */}
              <AlertDialog>
                <AlertDialogTrigger>
                  {" "}
                  <Button>Delete</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      this parts and remove your data from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction>
                      {/* <Button onClick={handleDelete}>Delete</Button> */}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
            <div>
              {selectedVid && (
                <div>
                  <div className="relative w-64">
                    <VideoPlayer
                      video={selectedVid}
                      publicUrl={selectedVid.publicUrl}
                    />
                    <div className="absolute bottom-0 h-3/6 w-full flex flex-col items-center justify-center">
                      <h1 className="text-white">{selectedProject.caption}</h1>
                      <div className="flex flex-col overflow-scroll w-full p-10">
                        {links.map((link, index) => (
                         
                            <Button
                              className="m-1 "
                              onClick={() => selectedProject(link.part_link)}
                            >
                              {link.cta}
                            </Button>
                          
                        ))}
                       

                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-96">
          <h2 className="text-2xl font-bold py-32 px-52 rounded border-2 border-dashed border-slate-300">
            No part selected
          </h2>
        </div>
      )}
    </div>
  );
};

export default Part;
