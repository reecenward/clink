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

  const name = formData.get('name');
  const widget = formData.get('widget');
  const {
    data: { user },
  } = await supabase.auth.getUser();

    const { data: partData, error: paraError } = await supabase
      .from("parts")
      .insert({
        name: `${name}`,
        owner: `${user?.id}`,
        widget: `${widget}`,
      });

    if (paraError) {
      console.error("Error uploading video:", paraError.message);
      return;
    }
    revalidatePath('/widget/:id')
  };


// export async function handleCreateLink(formData: FormData) {

//   const selectedPartID = formData.get("selectedPartID");

//   const {
//     data: { user },
//   } = await supabase.auth.getUser();

//   if (type == "1"){
//     const { data: partData, error: paraError } = await supabase
//       .from("links")
//       .insert({
//         part: `${selectedPartID}`,
//         owner: `${user?.id}`,
//         part_link: `${linkToPart}`,
//         name: `${linkName}`,
//         cta: `${CTA}`,
//         type: `${linkType}`,
//       });

//     if (paraError) {
//       console.error("Error uploading video:", paraError.message);
//       return;
//     }

//   }else{
//     const { data: partData, error: paraError } = await supabase
//     .from("links")
//     .insert({
//       part: `${selectedPartID}`,
//       owner: `${user?.id}`,
//       name: `${linkName}`,
//       cta: `${CTA}`,
//       type: `${linkType}`,
//     });

//   if (paraError) {
//     console.error("Error uploading video:", paraError.message);
//     return;
//   }
//   }
//   };


  export async function updateName (formData: FormData)  {
    const { data: user } = await supabase.auth.getUser();
    const { data: partData, error: paraError } = await supabase
    .from("parts")
    .update({
      name: formData.get("name"),

    }).eq("id", formData.get("part"))
    .eq("owner", user.user?.id)

  if (paraError) {
    console.error("Error updating name:", paraError.message);
    return;
  }
  };
  export async function updateCaption (formData: FormData)  {
    const { data: user } = await supabase.auth.getUser();
    const { data: partData, error: paraError } = await supabase
    .from("parts")
    .update({
      caption: formData.get("name"),

    }).eq("id", formData.get("part"))
    .eq("owner", user.user?.id)

  if (paraError) {
    console.error("Error updating caption:", paraError.message);
    return;
  }
  };



  export async function handleChangeVideo  (selectedChangeVid: any, selectedProject: any)  {
    const { data: user } = await supabase.auth.getUser();
    const { data: partData, error: paraError } = await supabase
      .from("parts")
      .update({
        video: `${selectedChangeVid}`,
      })
      .eq("owner", user.user?.id)
      .eq("id", selectedProject);

    if (paraError) {
      console.error("Error uploading video:", paraError.message);
      throw new Error(paraError.message);
    }
    
    return { success: true };
  };


  export async function handleDelete(formData: FormData) {
    const { data: user } = await supabase.auth.getUser();
  
    const { data: parts, error } = await supabase
      .from("parts")
      .delete()
      .eq("owner", user.user?.id)
      .eq("id", formData.get("projectId"));
  
    if (error) {
      console.error("Error deleting part:", error.message);
      throw new Error(error.message);
    }
  
    return { success: true };
  }