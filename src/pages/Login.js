import React, { useState } from "react";
import "../style/login.css";
import avatar from "../assets/img/avatar.png";
import wave from "../assets/img/wave.png";
import educationImg from "../assets/img/Education.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { postData } from "../axios/axiosHelper";
import { HOME_URL, LOGIN_URL } from "../utils/constants";
import toastMsg from "../functions/toastMsg";

const Login = () => {
  const navigate = useNavigate();

  const [focusedInputs, setFocusedInputs] = useState({
    email: false,
    password: false
  });

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState(null);

  const handleFocus = (fieldName) => {
    setFocusedInputs({ ...focusedInputs, [fieldName]: true });
  };

  const handleBlur = (fieldName, value) => {
    if (!value) {
      setFocusedInputs({ ...focusedInputs, [fieldName]: false });
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    setError(null);
    await postData(LOGIN_URL, formData, false)
      .then((res) => {
        sessionStorage.setItem("token", res.data.token);
        sessionStorage.setItem("user", JSON.stringify(res.data.data));
        navigate(HOME_URL);
      })
      .catch((err) => {
        toastMsg(err.response.data.message);
      });
  };

  return (
    // Main login page container
    <div className="login-page">
      {/* Wave background image */}
      <img className="wave" src={wave} alt="Wave" />
      <div className="container">
        {/* Left side education image */}
        <div className="img">
          <img src={educationImg} alt="Education" />
        </div>
        {/* Right side login form content */}
        <div className="login-content">
          <form onSubmit={handleLogin}>
            {/* Avatar and welcome message */}
            <img src={avatar} alt="Avatar" />
            <h2 className="title">Welcome</h2>
            {/* Error message display */}
            {error && (
              <p style={{ color: "red", textAlign: "center" }}>{error}</p>
            )}
            {/* Email input field */}
            <div
              className={`input-div one ${focusedInputs.email ? "focus" : ""}`}
            >
              <div className="i">
                <FontAwesomeIcon icon={faUser} />
              </div>
              <div className="div">
                <h5>Email</h5>
                <input
                  type="email"
                  name="email"
                  className="input"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => handleFocus("email")}
                  onBlur={(e) => handleBlur("email", e.target.value)}
                />
              </div>
            </div>
            {/* Password input field */}
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
                  name="password"
                  className="input"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  onFocus={() => handleFocus("password")}
                  onBlur={(e) => handleBlur("password", e.target.value)}
                />
              </div>
            </div>
            {/* Login button */}
            <input type="submit" className="btn" value="Login" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
