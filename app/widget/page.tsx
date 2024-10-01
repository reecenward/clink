import Navbar from "../components/Navbar";
import Nav from "./nav";
import { createClient } from "@/lib/supabase/server";
import Widget from "./widget";

const App = async () => {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: widgets, error: widgetsError } = await supabase
    .from("widgets")
    .select("*")
    .eq("owner", `${user?.id}`);

  if (widgetsError) {
    console.error("Error uploading video:", widgetsError.message);
    return;
  }

  return (
    <div className="flex bg-slate-100">
      <Navbar />
      <div className="w-full bg-slate-100">
        <Nav />
        <div className="p-10">
          {widgets?.length === 0 ? (
            <h1>No widgets available. Please create a widget.</h1>
          ) : (
            <div className="grid grid-cols-5 gap-10 justify-center">
              {widgets.map((widget) => (
                <div key={widget.id}>
                  <Widget widgetName={widget.name} widgetId={widget.id} />
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
