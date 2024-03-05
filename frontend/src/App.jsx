import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import MainContainer from "./MainContainer";

function App() {
  return (
    <div className="font-f1-r">
    <Router>
      <Routes>
        <Route path="/" element={<MainContainer/>}>

        </Route>
      </Routes>
    </Router>
    </div>
  )
}

export default App