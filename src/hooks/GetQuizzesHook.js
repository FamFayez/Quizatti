import { useState, useEffect } from "react";
import { getData } from "../axios/axiosHelper";
import toastMsg from "../functions/toastMsg";
import { QUIZ_API_URL } from "../utils/constants";

const GetQuizzesHook = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getData(QUIZ_API_URL)
      .then((res) => {
        setQuizzes(res.data.data);
      })
      .catch((err) => {
        toastMsg(msg, "error");
      })
      .finally(() => setIsLoading(false));
  }, []);

  return { quizzes, isLoading };
};

export default GetQuizzesHook;
