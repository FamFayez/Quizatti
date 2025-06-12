
import { useState } from "react";
import { postData } from "../axios/axiosHelper";
import toastMsg from "../functions/toastMsg";

const useForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleForgotPassword = async () => {
    if (!email) {
      toastMsg("Email is required", "error");
      return;
    }

    setIsSending(true);
    try {
      await postData("/user/auth/forgotPassword", { email });
      toastMsg("Check your email for a reset link", "success");
    } catch (err) {
      toastMsg(err.response?.data?.message || "Failed to send reset link", "error");
    } finally {
      setIsSending(false);
    }
  };

  return {
    email,
    setEmail,
    isSending,
    handleForgotPassword,
  };
};

export default useForgotPassword;
