
import { useState } from "react";
import { postData } from "../axios/axiosHelper";
import toastMsg from "../functions/toastMsg";
import "../style/Reset.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return toastMsg("Email is required", "error");

    try {
      setLoading(true);
      await postData("/user/auth/forgotPassword", { email });
      toastMsg("Reset link sent to your email", "success");
    } catch (err) {
      toastMsg(err.response?.data?.message || "Request failed", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="reset-container">
      <form onSubmit={handleSubmit} className="reset-form">
        <h2>Forgot Password</h2>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Sending..." : "Send Reset Link"}
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
