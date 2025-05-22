import { Link } from "react-router-dom";
import Quizati from "../../assets/img/Quizatti Logo with Lightbulb-Brain Icon.png";
import "../../style/stylee.css";
export default function Mainheader() {
  return (
    <header className="mainHeader">
      <div className="Header">
        <img src={Quizati} alt="" className="logo"></img>
      </div>
      <nav className="headerButtoms">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/Profile">Profile</Link>
          </li>
          <li>
            <Link to="/login">Logout</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
