import Widget from "./widget";
import Navbar from "../components/Navbar";
import { createClient } from "@/lib/supabase/server";

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
    throw new Error(projectError.message);
  }

  return (
    <div className="flex bg-slate-100">
      <Navbar />
      <div className="w-full bg-slate-100">
        <div className="w-full bg-slate-200 p-2 h-16 flex justify-end items-center sticky top-0"></div>
        <div className="p-10">
          {projectData.length === 0 ? (
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
