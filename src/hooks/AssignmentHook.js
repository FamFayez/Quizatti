// src/hooks/AssignmentHook.js
import { useEffect, useState } from "react";
import { getData } from "../axios/axiosHelper";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const AssignmentHook = () => {
  const [assignments, setAssignments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { courseId } = useParams();

  useEffect(() => {
    if (!courseId) return;
    setIsLoading(true);

    getData(`/assignment/all/${courseId}`)
      .then((res) => setAssignments(res.data.data))
      .catch((err) =>
        toast.error(
          err.response?.data?.message || "❌ Failed to fetch assignments"
        )
      )
      .finally(() => setIsLoading(false));
  }, [courseId]);

  return { assignments, isLoading };
};

export default AssignmentHook; // ✅ Make sure it's a default export
