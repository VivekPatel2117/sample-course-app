import { Routes, Route } from "react-router-dom";
import Listing from "./pages/listing"; 
import CourseDetails from "./pages/courseDetails";
import Dashboard from "./pages/dashboard";
import { Navbar } from "./components/Navbar";
function App() {
  return (
    <div>
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/courses" element={<Listing />} />
      <Route path="/courses/:id" element={<CourseDetails />} />
    </Routes>
    </div>
  );
}

export default App;
