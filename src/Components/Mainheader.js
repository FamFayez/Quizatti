import { Link } from "react-router-dom";
import "../style/stylee.css";
import { useProvider } from "../app/AppContext";
import { HOME_URL, LOGIN_URL, PROFILE_URL } from "../utils/constants";
// import Quizati from "../assets/img/Quizatti Logo with Lightbulb-Brain Icon.png";

export default function Mainheader() {
  const { logout } = useProvider();

  return (
    <nav
      class="navbar navbar-expand-lg mb-4"
      style={{ boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}
    >
      <div class="container-fluid">
        <Link class="navbar-brand text-white fs-3 fw-bold" to={"/"}>
          Quizatty
        </Link>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse flex-grow-0 fs-5" id="navbarNav">
          <ul class="navbar-nav gap-3">
            <li class="nav-item">
              <a
                class="nav-link active text-white"
                aria-current="page"
                href={HOME_URL}
              >
                Home
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link text-white" href={PROFILE_URL}>
                Profile
              </a>
            </li>
            <li class="nav-item" onClick={logout}>
              <a class="nav-link text-white" onClick={logout} href={LOGIN_URL}>
                Logout{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="logout-icon"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"
                  />
                  <path
                    fillRule="evenodd"
                    d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"
                  />
                </svg>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    // <header className="mainHeader">
    //   <div className="Header">
    //     <img src={Quizati} alt="" className="logo" />
    //   </div>
    //   <nav className="headerButtoms">
    //     <ul>
    //       <li>
    //         <Link to="/">Home</Link>
    //       </li>
    //       <li>
    //         <Link to="/Profile">Profile</Link>
    //       </li>
    //       <li onClick={logout}>
    //         <Link to="/login" className="logout">
    //           Logout{" "}
    //           <svg
    //             xmlns="http://www.w3.org/2000/svg"
    //             width="16"
    //             height="16"
    //             fill="currentColor"
    //             className="logout-icon"
    //             viewBox="0 0 16 16"
    //           >
    //             <path
    //               fillRule="evenodd"
    //               d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"
    //             />
    //             <path
    //               fillRule="evenodd"
    //               d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"
    //             />
    //           </svg>
    //         </Link>
    //       </li>
    //     </ul>
    //   </nav>
    // </header>
  );
}
