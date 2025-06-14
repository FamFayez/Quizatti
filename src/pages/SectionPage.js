import { useState, useEffect } from "react";
import "../style/content.css";
import "../style/Container.css";
// import SectionTask from "../Components/sectionTask";
// import Learning from "../assets/img/Learning.png";
// import ImageBackground from "../Components/ImageBackground";
import UploadFile from "../Components/UploadFile";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SectionHook from "../hooks/SectionHook";
import { useParams } from "react-router-dom";
import { Section_API_URL } from "../utils/constants";
import SectionListComponent from "../Components/SectionListComponent";
import { deleteDataToken, postData } from "../axios/axiosHelper";

const rawRole = localStorage.getItem("role") || "student"; // 'Assistant', 'Teacher', or 'student'
const userRole = rawRole.toLowerCase(); // ensures lowercase: "teacher", "assistant", "student"

const SectionPage = () => {
  const { courseId } = useParams();
  const { secslides, isLoading } = SectionHook(courseId);
  const [localsecslides, setlocalsecslides] = useState([]);

  useEffect(() => {
    setlocalsecslides(secslides);
  }, [secslides]);

  const handleUpdate = (index, updatedLecture) => {
    const updatedLectures = [...localsecslides];
    updatedLectures[index] = updatedLecture;
    setlocalsecslides(updatedLectures);
    toast.success("✏️ Lecture updated successfully!");
  };

  const handleDelete = async (lectureId) => {
    if (userRole !== "assistant") return; // ✅ now only assistant can delete

    const confirm = window.confirm(
      "Are you sure you want to delete this file?"
    );
    if (!confirm) return;

    try {
      await deleteDataToken(`${Section_API_URL}/${lectureId}`);
      toast.success("Lecture deleted successfully.");
      window.location.reload();
    } catch (err) {
      toast.error(err.response?.data?.message || "Error deleting lecture.");
    }
  };

  const handleUpload = async ({ file, title, chapterNo }) => {
    if (userRole !== "assistant") return;

    const formData = new FormData();
    formData.append("name", title); // Slide title
    formData.append("chapterNo", 5); // Slide chapter
    formData.append("course", courseId); // Course ID
    formData.append("file", file); // Slide file (MUST be a File object)

    try {
      await postData(`${Section_API_URL}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success(`Lecture "${title}" uploaded successfully!`);
      window.location.reload();
    } catch (err) {
      toast.error(err.response?.data?.message || "Error uploading lecture.");
    }
  };

  return (
    <div className="container">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="contentDR">
        {isLoading ? (
          <p>Loading lectures...</p>
        ) : (
          <SectionListComponent
            contentItems={localsecslides}
            userRole={userRole}
            onRemoveFile={userRole === "assistant" ? handleDelete : undefined} // ✅ only teacher sees "delete"
            onUpdate={handleUpdate}
          />
        )}

        {userRole === "assistant" && (
          <div className="upload-section">
            <UploadFile showNote={false} onFileUpload={handleUpload} />
          </div>
        )}
      </div>
    </div>
  );
};
export default SectionPage;
