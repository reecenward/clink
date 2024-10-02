"use server";
import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
const supabase = createClient();

export async function uploadVideo(formData: FormData) {
  try {
    const videoFile = formData.get('videoFile') as File;
    const videoId = formData.get('videoId') as string; // Ensure you pass this in the form
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError) {
      throw new Error("User not authenticated");
    }

    // Upload video file to Supabase storage
    const { error: uploadError } = await supabase.storage
      .from("videos")
      .upload(`${user?.id}/${videoId}.mp4`, videoFile);

    if (uploadError) {
      console.error("Error uploading video:", uploadError.message);
      return;
    }

    // You might want to also add or update the video information in your "videos" table here
    await supabase.from("videos").insert([{ id: videoId, owner: user?.id, name: videoFile.name }]);

    revalidatePath('/library'); // Refresh the library path
  } catch (error) {
    // Use type assertion to specify that error is of type Error
    const errorMessage = (error as Error).message;
    console.error("Error uploading video:", errorMessage);
  }
  
}

export async function renameVideo(formData: FormData) {
  const videoId = formData.get('videoId') as string;
  const videoNewName = formData.get('videoNewName') as string;

  // Update the video name in the database
  const { data: updatedVideo, error } = await supabase
    .from("videos")
    .update({ name: videoNewName })
    .eq("id", videoId);

  if (error) {
    console.error("Error renaming video:", error.message);
    return;
  }

  revalidatePath('/library');
}

export async function deleteVideo(videoId: string) {
  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (userError) {
    console.error("Error fetching user:", userError.message);
    return;
  }

  // Delete the video from the database
  const { error } = await supabase
    .from("videos")
    .delete()
    .eq("id", videoId)
    .eq("owner", `${user?.id}`);

  if (error) {
    console.error("Error deleting video from database:", error.message);
    return;
  }

  // Remove the video from storage
  const { error: storageError } = await supabase.storage
    .from("videos")
    .remove([`${user?.id}/${videoId}.mp4`]);

  if (storageError) {
    console.error("Error removing video from storage:", storageError.message);
    return;
  }

  revalidatePath('/library');
}
