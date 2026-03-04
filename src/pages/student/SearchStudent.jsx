import { useState } from "react";
import "./SearchStudent.css";
import bgImage from "../../assets/search-student.png";
import { searchStudents } from "../../services/searchStudent";

const SearchStudent = () => {
  const [searchType, setSearchType] = useState("name");
  const [keyword, setKeyword] = useState("");
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!keyword.trim()) {
      setError("Please enter search keyword");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await searchStudents(searchType, keyword);
      setStudents(res.data);
    } catch (err) {
      setError("Failed to fetch students");
      setStudents([]);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setKeyword("");
    setStudents([]);
    setError("");
  };

  return (
    <div
      className="search-container"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="search-card">
        {/* <h2 className="search-title">Search Students</h2> */}

        <div className="search-bar">
          <select
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
          >
            <option value="name">Search by Name</option>
            <option value="course">Search by Course</option>
          </select>

          <input
            type="text"
            placeholder="Enter keyword"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />

          <button onClick={handleSearch} disabled={loading}>
            {loading ? "Searching..." : "Search"}
          </button>

          <button className="clear-btn" onClick={handleClear}>
            Clear
          </button>
        </div>

        {error && <p className="error">{error}</p>}

        {!loading && students.length > 0 && (
          <table className="result-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Course</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s) => (
                <tr key={s.id}>
                  <td>{s.id}</td>
                  <td>{s.name}</td>
                  <td>{s.email}</td>
                  <td>{s.course}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {!loading && students.length === 0 && keyword && !error && (
          <p className="no-result">No students found</p>
        )}
      </div>
    </div>
  );
};

export default SearchStudent;