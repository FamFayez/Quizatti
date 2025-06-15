import { useState } from "react";
import { postData } from "../axios/axiosHelper";
import toastMsg from "../functions/toastMsg";
import "../style/Reset.css";
import { useParams } from "react-router-dom";

const Verify = () => {
  const { token } = useParams();
  const [verificationCode, setVerificationCode] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!verificationCode)
      return toastMsg("Verification code is required", "error");
    try {
      setLoading(true);
      await postData("/user/auth/verifyAccount", { verificationCode }, token);
      toastMsg("Account verified successfully", "success");
    } catch (err) {
      toastMsg(err.response?.data?.message || "Verification failed", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="reset-container">
      <form onSubmit={handleSubmit} className="reset-form">
        <h2>Verify Account</h2>
        <input
          type="text"
          placeholder="Enter verification code"
          value={verificationCode}
          onChange={(e) => setVerificationCode(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Verifying..." : "Verify Account"}
        </button>
      </form>
    </div>
  );
};

export default Verify;
