import { useState } from "react";
import { patchDataToken } from "../axios/axiosHelper";
import toastMsg from "../functions/toastMsg";

const useResetPassword = (token, navigate) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      toastMsg("Passwords do not match", "error");
      return;
    }

    try {
      setIsSubmitting(true);
      await patchDataToken(
        `/user/auth/resetPassword`,
        {
          newPassword,
          confirmNewPassword: confirmPassword,
        },
        token
      );
      toastMsg("Password reset successfully", "success");
      navigate("/login");
    } catch (err) {
      toastMsg(err.response?.data?.message || "Reset failed", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    newPassword,
    confirmPassword,
    setNewPassword,
    setConfirmPassword,
    isSubmitting,
    handleResetPassword,
  };
};

export default useResetPassword;
