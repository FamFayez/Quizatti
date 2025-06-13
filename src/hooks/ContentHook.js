import { useEffect, useState } from "react";
import { getData } from "../axios/axiosHelper";
import { Content_API_URL } from "../utils/constants";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const ContentHook = () => {
  const [lectures, setLectures] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { courseId } = useParams();

  useEffect(() => {
    if (!courseId) return;
    setIsLoading(true);

    getData(`${Content_API_URL}${courseId}/lectures`)
      .then((res) => setLectures(res.data.data))
      .catch((err) =>
        toast.error(
          err.response?.data?.message || "Failed to fetch lectures"
        )
      )
      .finally(() => setIsLoading(false));
  }, [courseId]);

  return { lectures, isLoading };
};

export default ContentHook;
