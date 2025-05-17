import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Mca from "./pages/Mca";
import PageNotFound from "./pages/PageNotFound";
import Contact from "./pages/Contact";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import SubjectPage from "./pages/subjectPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import AdminDashboard from "./pages/AdminDashboard";
import Pyq from "./pages/Pyq";
import Placement from "./pages/Placement";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/mca" element={<Mca />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/pyq" element={<Pyq />} />
        <Route path="/placement" element={<Placement />} />
        <Route path="/mca/:semester/:subject" element={<SubjectPage />} />

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
