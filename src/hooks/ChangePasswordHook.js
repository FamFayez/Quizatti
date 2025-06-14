import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Change_Password_API_URL, LOGIN_URL } from "../utils/constants";
import { patchDataToken, postData } from "../axios/axiosHelper";
import toastMsg from "../functions/toastMsg";
import { useNavigate } from "react-router-dom";

const useChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error("Please fill in all fields");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("New password and confirmation do not match");
      return;
    }
    try {
      setLoading(true);
      const response = await patchDataToken(
        Change_Password_API_URL,
        {
          currentPassword,
          newPassword,
          confirmPassword
        },
        true
      );
      toastMsg(
        response.data.message || "Password changed successfully",
        "success"
      );
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      navigate(LOGIN_URL);
    } catch (error) {
      toastMsg(
        error.response?.data?.message || "Failed to change password",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    currentPassword,
    setCurrentPassword,
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    handleChangePassword,
    loading,
    showChangePassword,
    setShowChangePassword
  };
};

export default useChangePassword;
