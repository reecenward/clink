import { v4 as uuidv4 } from "uuid";
import { supabase } from "@/lib/supabase";

// const handleVideoUpload = async () => {
//     if (!videoFile || !videoName) return;

//     // Generate UUID for the video
//     const videoUUID = uuidv4();

//     // Upload the video to the user's bucket with UUID as the name
//     const { data: storageData, error: storageError } = await supabase.storage
//       .from("videos")
//       .upload(`${user.user.id}/${videoUUID}.mp4`, videoFile);

//     if (storageError) {
//       console.error("Error uploading video:", storageError.message);
//       return;
//     }

//     // Save video details to the 'videos' table
//     const { data: insertData, error: insertError } = await supabase
//       .from("videos")
//       .insert([{ id: videoUUID, name: videoName, owner: user.user.id }]);

//     if (insertError) {
//       console.error("Error saving video details:", insertError.message);
//       return;
//     }

//     // Clear video file and name after upload
//     setVideoFile(null);
//     setVideoName("");
//   }; 