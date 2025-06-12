// src/pages/Login.js
import React from "react";
import "../style/login.css";
import avatar from "../assets/img/avatar.png";
import wave from "../assets/img/wave.png";
import educationImg from "../assets/img/Education.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import Spinner from "../shared/Spinner";
import LoginHook from "../hooks/LoginHook";
import { Link } from "react-router-dom";

const Login = () => {
  const {
    focusedInputs,
    formData,
    error,
    isLoading,
    handleFocus,
    handleBlur,
    handleChange,
    handleLogin
  } = LoginHook();

  return (
    <>
      {isLoading && <Spinner />}
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
              {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
              <div className={`input-div one ${focusedInputs.email ? "focus" : ""}`}>
                <div className="i"><FontAwesomeIcon icon={faUser} /></div>
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
              <div className={`input-div pass ${focusedInputs.password ? "focus" : ""}`}>
                <div className="i"><FontAwesomeIcon icon={faLock} /></div>
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
              <input type="submit" className="btn" value="Login" />
              <div className="forgot-link">
                <Link to="/forgot-password">Forgot Password?</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
