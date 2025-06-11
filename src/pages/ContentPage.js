import "../style/SectionPage.css";
import content from "../assets/img/content.png";
import ImageBackground from "../Components/ImageBackground";
import ContentListComponent from "../Components/ContentListComponent";
import UploadFile from "../Components/UploadFile";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ContentHook from "../hooks/ContentHook";
import { deleteDataToken, postData } from "../axios/axiosHelper";
import { Content_API_URL } from "../utils/constants";

// Get user role
const userRole = localStorage.getItem("role") || "student"; // assistant | teacher | student

const Content = () => {
  const { lectures, isLoading } = ContentHook();

  const handleDelete = async (lectureId) => {
    if (userRole !== "assistant") return;

    const confirm = window.confirm("Are you sure you want to delete this file?");
    if (!confirm) return;

    try {
      await deleteDataToken(`${Content_API_URL}/${lectureId}`);
      toast.success("Lecture deleted successfully.");
      window.location.reload(); // Optional: You can refetch instead
    } catch (err) {
      toast.error(err.response?.data?.message || "Error deleting lecture.");
    }
  };

  const handleUpload = async (newLecture) => {
    if (userRole !== "assistant") return;

    try {
      await postData(Content_API_URL, newLecture);
      toast.success(`Lecture "${newLecture.title}" uploaded successfully!`);
      window.location.reload(); // Optional
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
          <ContentListComponent
            contentItems={lectures}
            userRole={userRole}
            onRemoveFile={userRole === "assistant" ? handleDelete : undefined}
          />
        )}

        {userRole === "assistant" && (
          <div className="upload-section">
            <UploadFile
              showNote={false}
              onFileUpload={handleUpload}
            />
          </div>
        )}
      </div>

      <div className="image-container">
        <ImageBackground imageSrc={content} altText="content" />
      </div>
    </div>
  );
};

export default Content;
