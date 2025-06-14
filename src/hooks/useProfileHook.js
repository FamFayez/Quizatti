import { useEffect, useState } from "react";
import { getData } from "../axios/axiosHelper";
import toastMsg from "../functions/toastMsg";

const PROFILE_API_URL = "/user/auth/getMe"; // or your actual endpoint

const useProfile = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getData(PROFILE_API_URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        lang: "en",
      },
    })
      .then((res) => {
        setUser(res.data.data);
      })
      .catch((err) => {
        toastMsg(err.response?.data?.message || "Failed to load profile.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return { user, isLoading };
};

export default useProfile;
