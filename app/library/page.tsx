import { createClient } from "@/lib/supabase/server";
import Navbar from "../components/Navbar";
import VideoSettings from "./components/Video";

export default async function Library() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: videos, error } = await supabase
    .from("videos")
    .select("*")
    .eq("owner", `${user?.id}`);

  if (error) {
    console.error("Error fetching user videos:", error.message);
    return;
  }

  const videosWithUrls = await Promise.all(
    videos.map(async (video) => {
      const { data: publicUrlData } = await supabase.storage
        .from("videos")
        .getPublicUrl(`/${user?.id}/${video.id}.mp4`);
      return { ...video, publicUrl: publicUrlData };
    })
  );

  return (
    <main className="flex bg-slate-100">
      <Navbar />
      <VideoSettings videos={videosWithUrls} />
    </main>
  );
}