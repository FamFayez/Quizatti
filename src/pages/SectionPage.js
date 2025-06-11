import { useState, useEffect } from "react";
import "../style/content.css";
import "../style/Container.css";
import ImageBackground from "../Components/ImageBackground";
import UploadFile from "../Components/UploadFile";
import SectionTask from "../Components/sectionTask";
import Learning from "../assets/img/Learning.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SectionHook from "../hooks/SectionHook";

const userRole = localStorage.getItem("role") || "student"; // 'assistant', 'doctor', or 'student'

const SectionPage = () => {
  const { secslides, isLoading } = SectionHook();
  const [lectures, setLectures] = useState([]);

  useEffect(() => {
    setLectures(secslides);
  }, [secslides]);

  const handleDelete = (lectureId) => {
    if (userRole !== "assistant") return;
    // TODO: Call DELETE API
    setLectures((prev) => prev.filter((lec) => lec._id !== lectureId));
    toast.info("File removed successfully!");
  };

  const handleUpdate = (lectureId, updatedLecture) => {
    if (userRole !== "assistant") return;
    // TODO: Call PUT/PATCH API
    setLectures((prev) =>
      prev.map((lec) => (lec._id === lectureId ? updatedLecture : lec))
    );
    toast.success("Lecture updated successfully!");
  };

  const handleUpload = (newLecture) => {
    if (userRole !== "assistant") return;
    // TODO: Call POST API
    setLectures((prev) => [...prev, newLecture]);
    toast.success(`Lecture "${newLecture.title}" uploaded successfully!`);
  };

  const handleRemoveAll = () => {
    if (userRole !== "assistant") return;
    // TODO: Bulk delete API if available
    setLectures([]);
    toast.info("All files removed successfully!");
  };

  return (
    <div className="section-container">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="section-page-layout">
        {isLoading ? (
          <p>Loading section slides...</p>
        ) : (
          <SectionTask
            lectures={lectures}
            userRole={userRole}
            onDelete={userRole === "assistant" ? handleDelete : undefined}
            onUpdate={userRole === "assistant" ? handleUpdate : undefined}
          />
        )}
      </div>

      <div className="right-section">
        <ImageBackground imageSrc={Learning} altText="Learning" />
        {userRole === "assistant" && (
          <>
            <UploadFile showNote={true} onFileUpload={handleUpload} />
            {lectures.length > 0 && (
              <button className="remove-all" onClick={handleRemoveAll}>
                Remove All Files
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SectionPage;
