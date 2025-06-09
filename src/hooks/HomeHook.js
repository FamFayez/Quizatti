import { useEffect, useState } from "react";
import { getData } from "../axios/axiosHelper";
import toastMsg from "../functions/toastMsg";
import { COURSE_URL } from "../utils/constants";

const HomeHook = () => {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getData(COURSE_URL)
      .then((res) => {
        setCourses(res.data.data);
      })
      .catch((err) => {
        toastMsg(err.response.data.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return { courses, isLoading };
};

export default HomeHook;
