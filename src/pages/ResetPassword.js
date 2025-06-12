
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../style/Reset.css";

import useResetPassword from "../hooks/ResetPasswordHook";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const {
    newPassword,
    confirmPassword,
    setNewPassword,
    setConfirmPassword,
    isSubmitting,
    handleResetPassword,
  } = useResetPassword(token, navigate);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleResetPassword();
  };

  return (
    <div className="reset-container">
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="New password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
