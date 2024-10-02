"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
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
import FirstSwitch from "./editor/IsFirst";
import PublishSwitch from "./editor/Publish";
import { supabase } from "../../../../lib/supabase";
import VideoPlayer from "@/app/components/VideoPlayer";
import PartCard from "./part";
import PartNav from "./partNav";
import EditorNav from "./editorNav";
import { useRouter } from 'next/navigation'
import EditName from './editor/EditName'
import EditCaption from "./editor/EditCaption";
import ChangeVideo from "./editor/ChangeVideo";
import CreateLink from "./editor/CreateLink";
import { link } from "fs";
import { handleDelete } from "../actions";

type TypeItem = {
  id: string; // or number depending on your schema
  name: string;
  // Add any other properties your types have
};

type LinkItem = {
  id: string; // or number depending on your schema
  cta: string;
  external_link?: string; // Optional if it may not be present
  part_link?: string; // Optional if it may not be present
};

interface Project {
  id: string; // or number, based on your actual data type
  name: string; // Add other properties based on your project structure
  publicUrl: string; // Include any other properties you are accessing
  caption?: string;
}


type Props = {
  combinedData: any;
};

const Part: React.FC<Props> = ({ combinedData }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [types, setTypes] = useState<TypeItem[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null); 
  const [links, setLinks] = useState<LinkItem[]>([]);
  const [selectedVid, setSelectedVid] = useState<Project | null>(null);
  const router = useRouter()

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
    const { data: links, error: linksError } = await supabase
      .from("links")
      .select("*")
      .eq("part", `${project.id}`);
    if (linksError) {
      console.error("Error fetching links:", linksError.message);
      return;
    }
    console.log("links: ", links);
    setLinks(links);
  };

  const handleSave = async () => {};

  const handleDeleteClick = async () => {
    if (!selectedProject) {
      console.error("No project selected.");
      return; // Exit if selectedProject is null
    }
  
    try {
      const formData = new FormData();
      formData.append("projectId", selectedProject.id); // Safe to access id now
  
      const response = await handleDelete(formData);
  
      if (response.success) {
        setSelectedProject(null);
        router.refresh(); // Refresh the page or fetch updated data
      }
    } catch (error) {
      console.error("Failed to delete the part:", error instanceof Error ? error.message : "Unknown error");
    }
  };

  return (
    <div className="w-full bg-slate-100">
      <EditorNav />
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
          <div className="flex justify-between">
            <div>
              <ChangeVideo/>
            <EditName partID={ selectedProject}/>
<EditCaption partID={selectedProject}/>
{/* <CreateLink links={links} projects={projects} types={types}/> */}


             
           < FirstSwitch partID={ selectedProject}/>
           < PublishSwitch partID={ selectedProject}/>
             
              <Button onClick={handleSave}>Save</Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button>Delete</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      this part and remove your data from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDeleteClick}>
                      Delete
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
                        {links.map((link, index) =>
                          link.external_link ? (
                            <Button
                              asChild
                              variant={"secondary"}
                              key={index}
                              className="m-1"
                            >
                              <Link target="_blank" href={link.external_link}>
                                {link.cta}
                              </Link>
                            </Button>
                          ) : (
                            <Button
  key={index}
  className="m-1"
  onClick={() => {
    if (link.part_link) { // Check if part_link is defined
      const projectToSelect = projects.find(p => p.id === link.part_link); // Find the project by ID
      setSelectedProject(projectToSelect || null); // Set it or null if not found
    }
  }}
>
  {link.cta}
</Button>

                          )
                        )}
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
