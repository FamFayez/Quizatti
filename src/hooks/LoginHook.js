import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postData } from "../axios/axiosHelper";
import { HOME_URL, LOGIN_URL } from "../utils/constants";
import toastMsg from "../functions/toastMsg";
import { useProvider } from "../app/AppContext";

const LoginHook = () => {
  const navigate = useNavigate();
  const { setUser, setToken } = useProvider();

  const [focusedInputs, setFocusedInputs] = useState({
    email: false,
    password: false
  });

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
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
    setIsLoading(true);
    await postData(LOGIN_URL, formData, false)
      .then((res) => {
        sessionStorage.setItem("token", res.data.token);
        sessionStorage.setItem("user", JSON.stringify(res.data.data));
        sessionStorage.setItem("userType", res.data.data.userType);
        setUser(res.data.data);
        setToken(res.data.token);
        toastMsg(res.data.message, "success");
        navigate(HOME_URL);
      })
      .catch((err) => {
        toastMsg(err.response.data.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return {
    focusedInputs,
    setFocusedInputs,
    formData,
    setFormData,
    error,
    setError,
    isLoading,
    setIsLoading,
    handleFocus,
    handleBlur,
    handleChange,
    handleLogin
  };
};

export default LoginHook;
