import Navbar from "@/app/components/Navbar";
import { createClient } from "@/lib/supabase/server";
import Part from "./components/backup";

const App = async ({ params }: { params: { id: string } }) => {
  const supabase = createClient();

  // Fetch user data
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Fetch project data
  const { data: projectData, error: projectError } = await supabase
    .from("parts")
    .select("*")
    .eq("widget", `${params.id}`);

  if (projectError) {
    console.error("Error fetching project data:", projectError.message);
    return;
  }

  // Fetch video URLs
  const videosWithUrls = await Promise.all(
    projectData.map(async (project) => {
      const { data: videos, error } = await supabase
        .from("videos")
        .select()
        .eq("owner", `${user?.id}`)
        .eq("id", `${project.video}`);

      if (error) {
        console.error("Error fetching user videos:", error.message);
        return;
      }

      const { data: publicUrlData } = await supabase.storage
        .from("videos")
        .getPublicUrl(`/${user?.id}/${videos[0].id}.mp4`);

      return {
        ...project,
        videoDetails: videos[0],
        publicUrl: publicUrlData.publicUrl,
      };
    })
  );

  const combinedData = {
    projectData: videosWithUrls,
  };

  console.log("Combined Data:", combinedData);

  return (
    <div className="flex">
      <Navbar />
      <Part combinedData={combinedData}/>
    </div>
  );
};

export default App;
