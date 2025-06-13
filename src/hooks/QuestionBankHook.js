import { useEffect, useState } from "react";
import { getData } from "../axios/axiosHelper";
import toastMsg from "../functions/toastMsg";
import { QUESTION_Bank_API_URL } from "../utils/constants";
import { useParams } from "react-router-dom";

const QUESTIONBankHook = () => {
  const { courseId } = useParams();
  const [Questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    setIsLoading(true);
    getData(
      QUESTION_Bank_API_URL + "?perPage=20&course=" + courseId + "&page=" + page
    )
      .then((res) => {
        setQuestions(res.data.data);
        setTotalPages(res.data.pagination.totalPages);
      })
      .catch((err) => {
        toastMsg(err.response.data.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [page]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return { Questions, isLoading, courseId, handlePageChange, page, totalPages };
};

export default QUESTIONBankHook;
