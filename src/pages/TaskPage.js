import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../style/Container.css";
import "../style/taskPage.css";
import taskImage from "../assets/img/task.png";
import ImageBackground from "../Components/ImageBackground";
import TaskList from "../Components/TaskList";
import TaskUpload from "../Components/taskUpload";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AssignmentHook from "../hooks/AssignmentHook";
import { Task_API_URL } from "../utils/constants";
import {
  deleteDataToken,
  patchDataToken,
  postData
} from "../axios/axiosHelper";
import toastMsg from "../functions/toastMsg";

const userRole = localStorage.getItem("role") || "student";
console.log("Role:", userRole);

const TaskPage = () => {
  const { courseId } = useParams();
  const { assignments, isLoading } = AssignmentHook();
  const [tasks, setTasks] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [textPreview, setTextPreview] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [manualTaskText, setManualTaskText] = useState("");
  const [loading, setLoading] = useState(false);
  // Sync hook result with local state once loaded
  useEffect(() => {
    if (!isLoading && assignments.length) {
      setTasks(assignments);
    }
  }, [assignments, isLoading]);

  const handleTextTaskSubmit = (type) => {
    if (manualTaskText.trim() === "") return;
    const newTask = {
      title: manualTaskText,
      file: type === "link" ? manualTaskText : null,
      isLink: type === "link"
    };
    setTasks([...tasks, newTask]);
    setManualTaskText("");
    toast.success(
      `✔️ ${type === "link" ? "Link" : "Text"} task added successfully!`
    );
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const fileType = file.type;
    const fileExtension = file.name.split(".").pop().toUpperCase();

    const isText = fileType === "text/plain";
    const isPDF = fileType === "application/pdf";
    const isPPT = fileExtension === "ppt" || fileExtension === "pptx";

    if (isPDF || isPPT) {
      const newTask = {
        title: file.name,
        file: URL.createObjectURL(file)
      };
      setTasks([...tasks, newTask]);
      setSelectedFile(file);
      setTextPreview("");
      setErrorMessage("");
      toast.success(`✔️ File "${file.name}" uploaded successfully!`);
    } else if (isText) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newTask = {
          title: file.name,
          file: null
        };
        setTasks([...tasks, newTask]);
        setSelectedFile(file);
        setTextPreview(e.target.result);
        setErrorMessage("");
        toast.success(`✔️ Text file "${file.name}" uploaded successfully!`);
      };
      reader.onerror = () => {
        setErrorMessage("❌ Failed to read the text file.");
        toast.error("❌ Failed to read the text file.");
      };
      reader.readAsText(file);
    } else {
      setErrorMessage("❌ Only PDF, TXT, and PowerPoint files are allowed.");
      setSelectedFile(null);
      setTextPreview("");
      toast.error("❌ Only PDF, TXT, and PowerPoint files are allowed.");
    }
  };

  const handleDelete = async (index, id) => {
    const confirmDelete = window.confirm(
      "You really want to remove that task?"
    );
    if (!confirmDelete) return;
    setLoading(true);
    await deleteDataToken(`${Task_API_URL}/${id}`, true)
      .then((res) => {
        let updatedTasks = [...tasks];
        updatedTasks = updatedTasks.filter((task) => task._id !== id);
        setTasks(updatedTasks);
        toastMsg(res.data.message, "success");
      })
      .catch((err) => {
        toastMsg(
          err.response?.data?.message || "Error deleting task.",
          "error"
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleUpdate = async ({ name, solutionFile, deadline, id }) => {
    if (userRole !== "Assistant") return;

    // Update task in frontend state
    const taskIndex = tasks.findIndex((task) => task.id === id);
    if (taskIndex !== -1) {
      const updatedTasks = [...tasks];
      updatedTasks[taskIndex] = {
        ...updatedTasks[taskIndex],
        name: name || updatedTasks[taskIndex].name,
        solutionFile: solutionFile || updatedTasks[taskIndex].solutionFile,
        deadline: deadline || updatedTasks[taskIndex].deadline
      };
      setTasks(updatedTasks);
    }

    // Update in backend
    const formData = new FormData();
    if (name) formData.append("name", name);
    if (solutionFile) formData.append("solutionFile", solutionFile);
    if (deadline) formData.append("deadline", deadline);
    setLoading(true);
    await patchDataToken(`${Task_API_URL}/${id}`, formData, true)
      .then((res) => {
        toastMsg(res.data.message, "success");
      })
      .catch((err) => {
        toastMsg(
          err.response?.data?.message || "Error updating task.",
          "error"
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleUpload = async ({ name, file, solutionFile, deadline }) => {
    if (userRole !== "Assistant") return;
    const formData = new FormData();
    formData.append("name", name);
    formData.append("file", file);
    if (solutionFile) formData.append("solutionFile", solutionFile);
    formData.append("course", courseId);
    formData.append("deadline", deadline);
    setLoading(true);
    await postData(`${Task_API_URL}`, formData, true)
      .then((res) => {
        setTasks([res.data.task, ...tasks]);
        toastMsg(res.data.message, "success");
      })
      .catch((err) => {
        toastMsg(
          err.response?.data?.message || "Error uploading task.",
          "error"
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="container">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="contentTA">
        <TaskList
          tasks={tasks}
          userRole={userRole}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
        />
        {userRole === "Assistant" && (
          <TaskUpload
            userRole={userRole}
            selectedFile={selectedFile}
            textPreview={textPreview}
            errorMessage={errorMessage}
            onFileChange={handleFileChange}
            manualTaskText={manualTaskText}
            setManualTaskText={setManualTaskText}
            onTextTaskSubmit={handleTextTaskSubmit}
            onUpload={handleUpload}
          />
        )}
      </div>
      <div className="image-container">
        <ImageBackground imageSrc={taskImage} altText="tasks" />
      </div>
    </div>
  );
};

export default TaskPage;
