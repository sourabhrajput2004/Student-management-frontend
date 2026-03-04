import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { getStudents } from "../../services/studentService";

const StudentPage = () => {
  const [students, setStudents] = useState([]);

  const loadStudents = async () => {
    const res = await getStudents();
    setStudents(res.data.content || []);

  };

  useEffect(() => {
    loadStudents();
  }, []);

  const addStudentToList = (newStudent) => {
    setStudents((prev) => [...prev, newStudent]);
  };

  return (
    <>
      <Outlet context={{ students, refresh: loadStudents, addStudentToList }} />
    </>
  );
};

export default StudentPage;
