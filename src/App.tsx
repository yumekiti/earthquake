import { useEffect } from "react";
import Time from "./components/organisms/Time";
import Log from "./components/pages/Log";
import ReactGA from "react-ga4";

function App() {
  useEffect(() => {
    ReactGA.initialize("G-2NSMMX8MLH");
    ReactGA.send({
      hitType: "pageview",
      page: window.location.pathname,
    });
  }, []);

  return (
    <div className="bg-slate-100">
      <Time />
      <Log />
    </div>
  );
}

export default App;
