import Navbar from "../components/Navbar";
import Nav from "./nav";
import { createClient } from "@/lib/supabase/server";
import Widget from "./widget";

const App = async () => {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: projectData, error: projectError } = await supabase
    .from("widgets")
    .select("*")
    .eq("owner", `${user?.id}`);

  if (projectError) {
    console.error("Error uploading video:", projectError.message);
    return;
  }

  return (
    <div className="flex bg-slate-100">
      <Navbar />
      <div className="w-full bg-slate-100">
        <Nav />
        <div className="p-10">
          {projectData?.length === 0 ? (
            <h1>No projects available. Please upload some projects.</h1>
          ) : (
            <div className="grid grid-cols-5 gap-10 justify-center">
              {projectData.map((project) => (
                <div key={project.id}>
                  <Widget widgetName={project.name} widgetId={project.id} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
