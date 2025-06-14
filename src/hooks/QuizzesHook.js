import { useEffect, useState } from "react";
import { getData, postData } from "../axios/axiosHelper";
import toastMsg from "../functions/toastMsg";
import { QUIZ_API_URL } from "../utils/constants";
import { useNavigate, useParams } from "react-router-dom";

const QuizzesHook = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState([]);
  const [quizResults, setQuizResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showQuizResults, setShowQuizResults] = useState(null);

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

  const startQuiz = async (id) => {
    setIsLoading(true);
    await postData(`${QUIZ_API_URL}/${id}/start`, {}, true)
      .then(() => {
        navigate(`/quiz/${id}`);
      })
      .catch((err) => {
        toastMsg(err.response.data.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (showQuizResults) {
      setIsLoading(true);
      getData(QUIZ_API_URL + "/" + showQuizResults + "/history")
        .then((res) => {
          setQuizResults(res.data.data);
        })
        .catch((err) => toastMsg(err.response.data.message, "error"))
        .finally(() => setIsLoading(false));
    }
  }, [showQuizResults]);

  return {
    quizzes,
    isLoading,
    courseId,
    startQuiz,
    showQuizResults,
    setShowQuizResults,
    quizResults
  };
};

export default QuizzesHook;
