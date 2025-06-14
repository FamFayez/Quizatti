import "../style/content.css";
import content from "../assets/img/content.png";
import ImageBackground from "../Components/ImageBackground";
import ContentListComponent from "../Components/ContentListComponent";
import UploadFile from "../Components/UploadFile";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { deleteDataToken, postData } from "../axios/axiosHelper";
import ContentHook from "../hooks/ContentHook";
import { Content_API_URL } from "../utils/constants";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Spinner from "../shared/Spinner";

// Normalize role
const rawRole = localStorage.getItem("role") || "student";
const userRole = rawRole.toLowerCase(); // ensures lowercase: "teacher", "assistant", "student"

const Content = () => {
  const { courseId } = useParams();
  const { lectures, isLoading } = ContentHook(courseId);
  const [localLectures, setLocalLectures] = useState([]);

  useEffect(() => {
    setLocalLectures(lectures);
  }, [lectures]);

  const handleUpdate = (index, updatedLecture) => {
    const updatedLectures = [...localLectures];
    updatedLectures[index] = updatedLecture;
    setLocalLectures(updatedLectures);
    toast.success("✏️ Lecture updated successfully!");
  };

  const handleDelete = async (lectureId) => {
    if (userRole !== "teacher") return; // ✅ now only teachers can delete

    const confirm = window.confirm(
      "Are you sure you want to delete this file?"
    );
    if (!confirm) return;

    try {
      await deleteDataToken(`${Content_API_URL}/${lectureId}`);
      toast.success("Lecture deleted successfully.");
      window.location.reload();
    } catch (err) {
      toast.error(err.response?.data?.message || "Error deleting lecture.");
    }
  };

  const handleUpload = async ({ file, title, chapterNo }) => {
    if (userRole !== "teacher") return;

    const formData = new FormData();
    formData.append("name", title); // Slide title
    formData.append("chapterNo", 5); // Slide chapter
    formData.append("course", courseId); // Course ID
    formData.append("file", file); // Slide file (MUST be a File object)

    try {
      await postData(`${Content_API_URL}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
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
          <Spinner />
        ) : (
          <ContentListComponent
            contentItems={localLectures}
            userRole={userRole}
            onRemoveFile={userRole === "teacher" ? handleDelete : undefined} // ✅ only teacher sees "delete"
            onUpdate={handleUpdate}
          />
        )}
        {localLectures?.length === 0 && (
          <div className="w-100">
            <p className="text-white text-center fs-4">No Lectures Uploaded</p>
          </div>
        )}
        {userRole === "teacher" && (
          <div className="upload-section">
            <UploadFile showNote={false} onFileUpload={handleUpload} />
          </div>
        )}
      </div>
    </div>
  );
};
export default Content;
