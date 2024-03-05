import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

import MainContainer from "./MainContainer";
import Home from "./pages/home/Home";
import LiveTiming from "./pages/live-timing/LiveTiming";
import Schedule from "./pages/schedule/Schedule";
import Results from "./pages/results/Results";
import Drivers from "./pages/drivers/Drivers";
import Teams from "./pages/teams/Teams";

const App = () => {
  return (
    <div className="font-f1-r">
    <Router>
      <Routes>

        <Route path="/" element={<MainContainer/>}>

          <Route path="" element={<Home/>} />
          <Route path="live-timing" element={<LiveTiming/>} />
          <Route path="schedule" element={<Schedule/>} />
          <Route path="results" element={<Results/>} />
          <Route path="drivers" element={<Drivers/>} />
          <Route path="teams" element={<Teams/>} />

        </Route>

      </Routes>
    </Router>
    </div>
  );
}

export default App;