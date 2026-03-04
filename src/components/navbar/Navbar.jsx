import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import {
  FaHome,
  FaUserPlus,
  FaEdit,
  FaSearch,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import "./navbar.css";

const Navbar = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="logo">StudentMS</div>

      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>

      <div className={`nav-links ${menuOpen ? "open" : ""}`}>
        <Link
          to="/"
          className={location.pathname === "/" ? "active" : ""}
          onClick={() => setMenuOpen(false)}
        >
          <FaHome /> Home
        </Link>

        <Link
          to="/students/add"
          className={location.pathname === "/students/add" ? "active" : ""}
          onClick={() => setMenuOpen(false)}
        >
          <FaUserPlus /> Add
        </Link>

        <Link
          to="/students/list"
          className={location.pathname === "/students/list" ? "active" : ""}
          onClick={() => setMenuOpen(false)}
        >
          <FaEdit /> Update
        </Link>

        <Link
          to="/students/search"
          className={location.pathname === "/students/search" ? "active" : ""}
          onClick={() => setMenuOpen(false)}
        >
          <FaSearch /> Search
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;