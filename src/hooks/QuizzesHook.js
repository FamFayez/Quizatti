import { useEffect, useState } from "react";
import { getData } from "../axios/axiosHelper";
import toastMsg from "../functions/toastMsg";
import { QUIZ_API_URL } from "../utils/constants";
import { useParams } from "react-router-dom";

const QuizzesHook = () => {
  const { courseId } = useParams();
  const [quizzes, setQuizzes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getData(QUIZ_API_URL + `/${courseId}`)
      .then((res) => {
        setQuizzes(res.data.data);
      })
      .catch((err) => {
        toastMsg(err.response.data.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return { quizzes, isLoading, courseId };
};

export default QuizzesHook;
