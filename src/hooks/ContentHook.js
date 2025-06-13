import { useEffect, useState } from "react";
import { getData } from "../axios/axiosHelper";
import toastMsg from "../functions/toastMsg";
import { Content_API_URL } from "../utils/constants";
import { useParams } from "react-router-dom";

const ContentHook = () => {
  const [lectures, setLectures] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { courseId } = useParams();
  useEffect(() => {
    setIsLoading(true);
    getData(Content_API_URL + courseId + "/lectures")
      .then((res) => {
        setLectures(res.data.data);
      })
      .catch((err) => {
        toastMsg(
          err.response?.data?.message || "Failed to fetch lectures",
          "error"
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return { lectures, isLoading };
};

export default ContentHook;
