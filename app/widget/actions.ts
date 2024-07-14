'use server'
import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
const supabase = createClient()

export async function createWidget(formData: FormData) {
  const {
    data: { user },
  } = await supabase.auth.getUser();


  const data = {
    name: formData.get('name') as string, 
  }

  const { data: projectData, error: projectError } = await supabase
    .from("widgets")
    .insert({ name: `${data.name}`, owner: `${user?.id}` });

  if (projectError) {
    console.error("Error creating widget:", projectError.message);
    throw new Error("Failed to create widget");
  }
  revalidatePath('/widget')
}

export async function deleteWidget(widgetId: string) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

    const { data: deletedVideo, error } = await supabase
    .from("widgets")
    .delete()
    .eq("id", widgetId)
    .eq("owner", user?.id)

  if (error) {
    console.error("Error deleting video:", error.message);
    throw new Error("Failed to delete widget");
  }
  revalidatePath('/widget')
}


export async function renameWidget(formData: FormData) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const data = {
    projectId: formData.get('widgetId') as string,
    name: formData.get('name') as string,  
  }

    const { data: updatedWidget, error } = await supabase
      .from("widgets")
      .update({ name: `${data.name}` })
      .eq("id", data.projectId)
      .eq("owner", user?.id)

    if (error) {
      console.error("Error renaming video:", error.message);
      return;
    }
    revalidatePath('/widget')
}

