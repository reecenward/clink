"use server"
import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
const supabase = createClient()

export async function uploadVideo(formData: FormData) {
//idk if i can do this with server actions?????? cuz i need to stream or something large files over from client
}

export async function renameVideo(formData: FormData) {

    // Update the video name in the database
    const { data: updatedVideo, error } = await supabase
      .from("videos")
      .update({ name: videoNewName })
      .eq("id", videoId);

    if (error) {
      console.error("Error renaming video:", error.message);
      return;
    }
    revalidatePath('/library')
}

export async function deleteVideo(videoId) {

  const {
    data: { user },
  } = await supabase.auth.getUser();

     // Update the video name in the database
     const { data: deletedVideo, error } = await supabase
     .from("videos")
     .delete()
     .eq("id", videoId)
     .eq("owner", `${user?.id}`);
 
   if (error) {
     console.error("Error renaming video:", error.message);
     return;
   }
 
   const { data: deletedVideo2, error2 } = await supabase.storage
     .from("videos")
     .remove([`${user?.id}/${videoId}.mp4`])
 
   if (error) {
     console.error("Error renaming video:", error2.message);
     return;
   }
   revalidatePath('/library')
}