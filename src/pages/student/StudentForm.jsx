import "./addstudent.css";
import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { addStudent } from "../../services/studentService";
import bgImage from "../../assets/add-student.png";

const StudentForm = () => {
  const { addStudentToList } = useOutletContext();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    course: ""
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setSuccess("");

      const res = await addStudent(formData);
      addStudentToList(res.data);

      setFormData({ name: "", email: "", course: "" });
      setSuccess("Student added successfully");
    } catch (error) {
      console.error("Error adding student:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="form-container"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="form-card">
        {/* <h2 className="form-title">Add Student</h2> */}

        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Course</label>
            <input
              type="text"
              name="course"
              value={formData.course}
              onChange={handleChange}
              required
            />
          </div>

          <button className="btn" type="submit" disabled={loading}>
            {loading ? "Adding..." : "Submit"}
          </button>

          {success && <p className="success">{success}</p>}
        </form>
      </div>
    </div>
  );
};

export default StudentForm;