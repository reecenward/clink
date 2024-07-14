import Navbar from "../components/Navbar";
import LogoutButton from "../components/LogoutButton";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from 'next/cache'
import Subscription from "./subscription";

const App = async () => {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  revalidatePath('/account')

  return (
    <div className="flex bg-slate-100">
      <Navbar />
      <div className="flex flex-col w-full p-5 bg-slate-100">
        {user && (
          <span>Hello, {user ? user.email : "user not found"}</span>
        )}
        <LogoutButton />
       <Subscription/>
      </div>
      
    </div>
   
  );
};

export default App;
