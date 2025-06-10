import { useEffect, useState } from "react";
import { getData } from "../axios/axiosHelper";
import toastMsg from "../functions/toastMsg";
import { QUESTION_Bank_API_URL } from "../utils/constants";

const QUESTIONBankHook = () => {
  const [Questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getData(QUESTION_Bank_API_URL)
      .then((res) => {
        setQuestions(res.data.data);
      })
      .catch((err) => {
        toastMsg(err.response.data.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return { Questions, isLoading };
};

export default QUESTIONBankHook;
