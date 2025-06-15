import { useEffect, useState } from "react";
import { postData } from "../axios/axiosHelper";
import toastMsg from "../functions/toastMsg";
import { useProvider } from "../app/AppContext";
import "../style/Reset.css";
import { useNavigate, useParams } from "react-router-dom";
import { HOME_URL } from "../utils/constants";

const Verify = () => {
  const { token } = useParams();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser, setToken } = useProvider();
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.password || !formData.confirmPassword) {
      return toastMsg("All fields are required", "error");
    }

    if (formData.password !== formData.confirmPassword) {
      return toastMsg("Passwords do not match", "error");
    }

    if (formData.password.length < 6) {
      return toastMsg("Password must be at least 6 characters long", "error");
    }

    try {
      setLoading(true);
      const response = await postData(
        "/user/auth/verifyAccount",
        {
          password: formData.password,
          confirmPassword: formData.confirmPassword
        },
        token
      );

      const { token: newToken, data } = response.data;

      // Store in both sessionStorage and localStorage
      sessionStorage.setItem("token", newToken);
      sessionStorage.setItem("user", JSON.stringify(response.data.data));
      sessionStorage.setItem("userType", response.data.data.userType);

      localStorage.setItem("token", newToken);
      localStorage.setItem("user", JSON.stringify(response.data.data));
      localStorage.setItem("role", response.data.data.userType);

      setUser(data);
      setToken(newToken);
      toastMsg(response.data.message, "success");
      navigate(HOME_URL);
    } catch (err) {
      toastMsg(err.response?.data?.message || "Verification failed", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="reset-container">
      <form className="reset-form" onSubmit={handleSubmit}>
        <h2>Verify Account</h2>
        <div className="form-group">
          <input
            type="password"
            name="password"
            placeholder="New Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Verifying..." : "Verify Account"}
        </button>
      </form>
    </div>
  );
};

export default Verify;
