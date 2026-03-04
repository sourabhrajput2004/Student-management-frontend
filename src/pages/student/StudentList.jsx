import { useState, useEffect } from "react";
import "./studentlist.css";
import axios from "axios";
import { deleteStudent, updateStudent } from "../../services/studentService";
import bgImage from "../../assets/add-student.png";

const StudentList = () => {

  const [students, setStudents] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const pageSize = 5;

  const [editingId, setEditingId] = useState(null);
  const [editedStudent, setEditedStudent] = useState({});

  // 🔥 Fetch Students (Server-side Pagination)
  const fetchStudents = async (page) => {
    const response = await axios.get(
      `https://student-management-backend-mxll.onrender.com/api/students?page=${page}&size=${pageSize}`
    );
    console.log(response.data);
    setStudents(response.data.content || []);
    setTotalPages(response.data.totalPages);
  };

  useEffect(() => {
    fetchStudents(currentPage);
  }, [currentPage]);

  const editStudent = (student) => {
    setEditingId(student.id);
    setEditedStudent({ ...student });
  };

  const handleDelete = async (id) => {
    await deleteStudent(id);
    fetchStudents(currentPage);
  };

  const saveStudent = async () => {
    await updateStudent(editedStudent);
    setEditingId(null);
    setEditedStudent({});
    fetchStudents(currentPage);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditedStudent({});
  };

  return (
    <div
      className="list-container"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="card">
        {/* <h2 className="title">Update Student</h2> */}

        <div className="table-container">

          {/* Header */}
          <table className="table-header">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Course</th>
                <th>Action</th>
              </tr>
            </thead>
          </table>

          {/* Body */}
          <div className="table-body-wrapper">
            <table className="table-body">
              <tbody>
                {students.map((s) => (
                  <tr key={s.id}>
                    <td>{s.id}</td>

                    <td>
                      {editingId === s.id ? (
                        <input
                          value={editedStudent.name}
                          onChange={(e) =>
                            setEditedStudent({
                              ...editedStudent,
                              name: e.target.value,
                            })
                          }
                        />
                      ) : (
                        s.name
                      )}
                    </td>

                    <td>
                      {editingId === s.id ? (
                        <input
                          value={editedStudent.email}
                          onChange={(e) =>
                            setEditedStudent({
                              ...editedStudent,
                              email: e.target.value,
                            })
                          }
                        />
                      ) : (
                        s.email
                      )}
                    </td>

                    <td>
                      {editingId === s.id ? (
                        <input
                          value={editedStudent.course}
                          onChange={(e) =>
                            setEditedStudent({
                              ...editedStudent,
                              course: e.target.value,
                            })
                          }
                        />
                      ) : (
                        s.course
                      )}
                    </td>

                    <td>
                      {editingId === s.id ? (
                        <>
                          <button className="save-btn" onClick={saveStudent}>Save</button>
                          <button className="cancel-btn" onClick={cancelEdit}>Cancel</button>
                        </>
                      ) : (
                        <>
                          <button className="edit-btn" onClick={() => editStudent(s)}>Edit</button>
                          <button className="delete-btn" onClick={() => handleDelete(s.id)}>
                            Delete
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 🔥 Pagination Buttons */}
          <div className="pagination">
            <button
              disabled={currentPage === 0}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Prev
            </button>

            <span>
              Page {currentPage + 1} of {totalPages}
            </span>

            <button
              disabled={currentPage === totalPages - 1}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Next
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default StudentList;