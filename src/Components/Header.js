import { Link } from "react-router-dom";
export default function Header(props) {
  return (
    <>
      <header className="mainHeader">
        <div className="Header">
          <h3 className="Quizati">{props.name}</h3>
          <br></br>
          {/* <h4 className='studentName'>student name</h4> */}
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
              <a href>Logout</a>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
