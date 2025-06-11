import { useEffect, useState } from "react";
import { getData } from "../axios/axiosHelper";
import toastMsg from "../functions/toastMsg";
import { Section_API_URL } from "../utils/constants";

const SectionHook = () => {
  const [secslides, setSecslides] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getData(Section_API_URL)
      .then((res) => {
        setSecslides(res.data.data);
      })
      .catch((err) => {
        toastMsg(err.response?.data?.message || "Failed to fetch slides", "error");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return { secslides, isLoading };
};

export default SectionHook;

