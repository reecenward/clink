import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {

  const cookieStore = cookies()
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore })

  const  {data, error} = await supabase.from("videos").select("*").eq("owner", "41bf3527-6b17-4588-a8fa-88e7e887a486")

  return NextResponse.json({data, error})
}