import "../style/SectionPage.css";
import content from "../assets/img/content.png";
import ImageBackground from "../Components/ImageBackground";
import ContentListComponent from "../Components/ContentListComponent"; // ✅ Updated import
import UploadFile from "../Components/UploadFile";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ContentHook from "../hooks/ContentHook";

// Get user role from localStorage or auth provider
const userRole = localStorage.getItem("role") || "student"; // teacher | assistant | student

const Content = () => {
  const { lectures, isLoading } = ContentHook();

  const handleDelete = (lectureId) => {
    if (userRole !== "teacher") return;
    // TODO: Add delete API call
    toast.info("File removed successfully!");
  };

  const handleUpdate = (lectureId, updatedLecture) => {
    if (userRole !== "teacher") return;
    // TODO: Add update API call
    toast.success("Lecture updated successfully!");
  };

  const handleUpload = (newLecture) => {
    if (userRole !== "teacher") return;
    // TODO: Add upload API call
    toast.success(`Lecture "${newLecture.title}" uploaded successfully!`);
  };

  return (
    <div className="container">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="contentDR">
        {isLoading ? (
          <p>Loading lectures...</p>
        ) : (
          <ContentListComponent
            lectures={lectures}
            userRole={userRole}
            onDelete={userRole === "teacher" ? handleDelete : undefined}
            onUpdate={userRole === "teacher" ? handleUpdate : undefined}
          />
        )}

        {userRole === "teacher" && (
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
