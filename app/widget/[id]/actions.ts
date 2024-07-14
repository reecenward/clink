// const handlePublish = async () => {
//     console.log(isPublished)
  //   const { data: partData, error: paraError } = await supabase
  //   .from("parts")
  //   .update({
  //     publish: ``,
  //   }).eq("id", `${selectedProject?.id}`)

  // if (paraError) {
  //   console.error("Error uploading video:", paraError.message);
  //   return;
  // }
//   };

  // const handleIsFirst = async () => {
  //   const { data: partData, error: paraError } = await supabase
  //   .from("parts")
  //   .update({
  //     publish: ``,
  //   }).eq("id", `${selectedProject?.id}`)

  // if (paraError) {
  //   console.error("Error uploading video:", paraError.message);
  //   return;
  // }
  // };
  'use server'
import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
const supabase = createClient()

export async function createPart(formData: FormData) {

    const { data: partData, error: paraError } = await supabase
      .from("parts")
      .insert({
        name: `${partName}`,
        owner: `${user.user.id}`,
        widget: `${params.id}`,
      });

    if (paraError) {
      console.error("Error uploading video:", paraError.message);
      return;
    }
    revalidatePath('/widget/:id')
  };


export async function handleCreateLink(formData: FormData) {

    const { data: partData, error: paraError } = await supabase
      .from("links")
      .insert({
        part: `${selectedProject.id}`,
        owner: `${user.user.id}`,
        part_link: `${linkToPart}`,
        name: `${linkName}`,
        cta: `${CTA}`,
        type: `${linkType}`,
      });

    if (paraError) {
      console.error("Error uploading video:", paraError.message);
      return;
    }
  };



  const handleChangeVideo = async () => {
    console.log(
      "selected vid",
      selectedChangeVid.id,
      "selected project",
      selectedProject.id
    );
    const { data: partData, error: paraError } = await supabase
      .from("parts")
      .update({
        video: `${selectedChangeVid.id}`,
      })
      .eq("id", selectedProject.id);

    if (paraError) {
      console.error("Error uploading video:", paraError.message);
      return;
    }
  };

  const handleSave = async () => {
    const { data: partData, error: paraError } = await supabase
    .from("parts")
    .update({
      name: `${newPartName}`,
      caption: `${newCaption}`,

    }).eq("id", `${selectedProject?.id}`)

  if (paraError) {
    console.error("Error uploading video:", paraError.message);
    return;
  }
  };


  const handleDelete = async () => {
    const { data: user } = await supabase.auth.getUser();
    setUser(user);

    const { data: parts, error } = await supabase
      .from("parts")
      .delete()
      .eq("owner", `${user.user.id}`)
      .eq("id", `${selectedProject.id}`);

    if (error) {
      console.error("Error fetching user videos:", error.message);
      return;
    }

    setSelectedProject(null);
  };