// import Navbar from "@/app/components/Navbar";
// import { createClient } from "@/lib/supabase/server";
// import PartsSection from "./components/partsSection";
// import Editor from "./components/editor";
// import Part from "./components/backup";

// const App = async ({ params }: { params: { id: string } }) => {
//   const supabase = createClient();

//   // Fetch user data
//   const {
//     data: { user },
//   } = await supabase.auth.getUser();

//   // Fetch project data
//   const { data: projectData, error: projectError } = await supabase
//     .from("parts")
//     .select("*")
//     .eq("widget", `${params.id}`);

//   if (projectError) {
//     console.error("Error fetching project data:", projectError.message);
//     return;
//   }

//   // Fetch video URLs
//   const videoIds = projectData.map((project) => project.video);

//   const videosWithUrls = await Promise.all(
//     videoIds.map(async (id) => {
//       const { data: videos, error } = await supabase
//         .from("videos")
//         .select()
//         .eq("owner", `${user?.id}`)
//         .eq("id", `${id}`);

//       if (error) {
//         console.error("Error fetching user videos:", error.message);
//         return;
//       }

//       return videos;
//     })
//   );

//   const videoUrls = await Promise.all(
//     videosWithUrls.map(async (video) => {
//       const { data: publicUrlData } = await supabase.storage
//         .from("videos")
//         .getPublicUrl(`/${user?.id}/${video[0].id}.mp4`);
//       return { ...video, publicUrl: publicUrlData };
//     })
//   );
//   // Combine all data into one object
//   const combinedData = {
//     // user,
//     projectData,
//     videoUrls,
//     videosWithUrls
//   };

//   console.log("Combined Data:", combinedData);

//   return (
//     <div className="flex">
//       <Navbar />
//       {/* <Part combinedData={combinedData} /> */}
//       {/* <PartsSection parts={combinedData}/> */}
//       {/* <Editor selectedProject={}/> */}
      
//     </div>
//   );
// };



// export default App;


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


  //     const { data: videos, error } = await supabase
  //       .from("videos")
  //       .select("*")
  //       .eq("owner", `${user?.id}`);

  //     if (error) {
  //       console.error("Error fetching user videos:", error.message);
  //       return;
  //     }
  //     console.log(videos);
  //     // Retrieve public URLs for each video
  //     const videosWithUrls = await Promise.all(
  //       videos.map(async (video) => {
  //         const { data: publicUrlData } = await supabase.storage
  //           .from("videos")
  //           .getPublicUrl(`/${user.user.id}/${video.id}.mp4`);
  //         return { ...video, publicUrl: publicUrlData };
  //       })
  //     );

  //     console.log(videosWithUrls);

  //     setUserVideos(videosWithUrls);
  //   } catch (error) {
  //     console.error("Error fetching user data:", error.message);
  //   }
  // };

  const combinedData = {
    projectData: videosWithUrls,
  };

  console.log("Combined Data:", combinedData);

  return (
    <div className="flex">
      <Navbar />
      {/* <pre>{JSON.stringify(combinedData, null, 2)}</pre> */}
      <Part combinedData={combinedData}/>
    </div>
  );
};

export default App;
