import { useEffect, useState } from "react";
import { getData } from "../axios/axiosHelper";
import { Content_API_URL } from "../utils/constants";
import { useParams } from "react-router-dom";

const ContentHook = (courseId) => {
  const [lectures, setLectures] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getData(Content_API_URL)
      .then((res) => {
        setLectures(res.data.data);
      })
      .catch((err) => {
        toastMsg(err.response?.data?.message || "Failed to fetch lectures", "error");
      })
      .finally(() => {
        setIsLoading(false);
      }
    };

    if (courseId) fetchLectures();
  }, [courseId]);

  return { lectures, isLoading };
};

export default ContentHook;
