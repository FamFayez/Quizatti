import { useEffect, useState } from "react";
import { getData } from "../axios/axiosHelper";
import { Content_API_URL } from "../utils/constants";

const ContentHook = (courseId) => {
  const [lectures, setLectures] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLectures = async () => {
      try {
        const result = await getData(`${Content_API_URL}?courseId=${courseId}`);
        setLectures(result);
      } catch (err) {
        console.error("Error fetching content", err);
      } finally {
        setIsLoading(false);
      }
    };

    if (courseId) fetchLectures();
  }, [courseId]);

  return { lectures, isLoading };
};

export default ContentHook;
