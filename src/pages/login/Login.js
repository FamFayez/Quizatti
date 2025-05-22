import React, { useState } from "react";
import "../../style/login.css";
import avatar from "../../assets/img/avatar.png";
import wave from "../../assets/img/wave.png";
import educationImg from "../../assets/img/Education.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [focusedInputs, setFocusedInputs] = useState({
    username: false,
    password: false,
  });

  const handleFocus = (fieldName) => {
    setFocusedInputs({ ...focusedInputs, [fieldName]: true });
  };

  const handleBlur = (fieldName, value) => {
    if (!value) {
      setFocusedInputs({ ...focusedInputs, [fieldName]: false });
    }
  };

  const handleLogin = (event) => {
    event.preventDefault();
    // TODO: Add actual login logic here
    navigate("/"); // Redirect to home
  };

  return (
    <div className="login-page">
      <img className="wave" src={wave} alt="Wave" />
      <div className="container">
        <div className="img">
          <img src={educationImg} alt="Education" />
        </div>
        <div className="login-content">
          <form onSubmit={handleLogin}>
            <img src={avatar} alt="Avatar" />
            <h2 className="title">Welcome</h2>

            <div
              className={`input-div one ${
                focusedInputs.username ? "focus" : ""
              }`}
            >
              <div className="i">
                <FontAwesomeIcon icon={faUser} />
              </div>
              <div className="div">
                <h5>Username</h5>
                <input
                  type="text"
                  className="input"
                  required
                  onFocus={() => handleFocus("username")}
                  onBlur={(e) => handleBlur("username", e.target.value)}
                />
              </div>
            </div>

            <div
              className={`input-div pass ${
                focusedInputs.password ? "focus" : ""
              }`}
            >
              <div className="i">
                <FontAwesomeIcon icon={faLock} />
              </div>
              <div className="div">
                <h5>Password</h5>
                <input
                  type="password"
                  className="input"
                  required
                  onFocus={() => handleFocus("password")}
                  onBlur={(e) => handleBlur("password", e.target.value)}
                />
              </div>
            </div>

            <input type="submit" className="btn" value="Login" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
