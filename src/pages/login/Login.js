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
    email: false,
    password: false,
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
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    setError(null);

    try {
      const response = await fetch("http://localhost:3001/user/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Login failed");
      }

      // Save token in localStorage or context
      localStorage.setItem("token", result.token);
      localStorage.setItem("user", JSON.stringify(result.data));

      // Navigate to home page or dashboard
      navigate("/");

    } catch (err) {
      setError(err.message);
    }
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

            {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

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

            <div
              className={`input-div pass ${focusedInputs.password ? "focus" : ""}`}
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

            <input type="submit" className="btn" value="Login" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
