import "../style/Header.css";
import { Link } from "react-router";

const Header = () => {
  return (
    <header>
      <h1>Quizatti</h1>
      <nav>
        <ul>
          <li>
            <Link to={"/"}>Home </Link>
          </li>
          <li>
            <a href="#about">Profile</a>
          </li>
          <li>
            <Link to={"/login"}>Logout</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
