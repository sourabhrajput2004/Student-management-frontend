import "./home.css";
import heroImage from "../assets/student-home.png";

const Home = () => {
  return (
    <div
      className="home"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      <div className="overlay">
      </div>
    </div>
  );
};

export default Home;