import { useState, useEffect } from "react";
import "../style/Container.css";
import "../style/taskPage.css";
import taskImage from "../assets/img/task.png";
import ImageBackground from "../Components/ImageBackground";
import TaskList from "../Components/TaskList";
import TaskUpload from "../Components/taskUpload";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AssignmentHook from "../hooks/AssignmentHook";

const userRole = (localStorage.getItem("role") || "student").toLowerCase();
console.log("Role:", userRole);

const TaskPage = () => {
  const { assignments, isLoading } = AssignmentHook();
  const [tasks, setTasks] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [textPreview, setTextPreview] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [manualTaskText, setManualTaskText] = useState("");

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
      isLink: type === "link",
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
    const fileExtension = file.name.split(".").pop().toLowerCase();

    const isText = fileType === "text/plain";
    const isPDF = fileType === "application/pdf";
    const isPPT = fileExtension === "ppt" || fileExtension === "pptx";

    if (isPDF || isPPT) {
      const newTask = {
        title: file.name,
        file: URL.createObjectURL(file),
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
          file: null,
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

  const handleDelete = (index) => {
    const updatedTasks = [...tasks];
    const deletedTask = updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
    toast.info(`🗑️ "${deletedTask[0].title}" deleted`);
  };

  const handleUpdate = (index, updatedTask) => {
    const updatedTasks = [...tasks];
    updatedTasks[index] = updatedTask;
    setTasks(updatedTasks);
    toast.success("✏️ Task updated successfully!");
  };

  const handleRemoveAll = () => {
    setTasks([]);
    toast.info("🧹 All tasks removed successfully!");
  };

  return (
    <div className="container">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="contentTA">
        <TaskList
          tasks={tasks}
          userRole={userRole}
          onDelete={userRole === "Assistant" ? handleDelete : null}
          onUpdate={userRole === "Assistant" ? handleUpdate : null}
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
          />
        )}
        {userRole === "Assistant" && tasks.length > 0 && (
          <button className="remove-all-btn" onClick={handleRemoveAll}>
            Remove All Tasks
          </button>
        )}
      </div>
      <div className="image-container">
        <ImageBackground imageSrc={taskImage} altText="tasks" />
      </div>
    </div>
  );
};

export default TaskPage;
