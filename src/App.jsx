import StudentPage from "./pages/student/StudentPage";
import StudentForm from "./pages/student/StudentForm";
import StudentList from "./pages/student/StudentList";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import "./index.css";   // global css
import SearchStudent from "./pages/student/SearchStudent";

export default function App() {
  return (
    <>
      <Navbar />

      <div className="app-content">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/students" element={<StudentPage />}>
            <Route path="add" element={<StudentForm />} />
            <Route path="list" element={<StudentList />} />
            <Route path="search" element={<SearchStudent/>} />
          </Route>
        </Routes>
      </div>
    </>
  );
}
