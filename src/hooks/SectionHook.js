import { useEffect, useState } from "react";
import { getData } from "../axios/axiosHelper";
import { Content_API_URL } from "../utils/constants";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const SectionHook = () => {
  const [secslides, setSecslides] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { courseId } = useParams(); // get courseId from URL

  useEffect(() => {
    if (!courseId) return;
    setIsLoading(true);

    getData(`${Content_API_URL}${courseId}/sections`)
      .then((res) => setSecslides(res.data.data))
      .catch((err) =>
        toast.error(
          err.response?.data?.message || "Failed to fetch section slides"
        )
      )
      .finally(() => setIsLoading(false));
  }, [courseId]);

  return { secslides, isLoading };
};

export default SectionHook;
