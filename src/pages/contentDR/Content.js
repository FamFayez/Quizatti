import { useState } from "react";
import sectionData from "../../core/data/sectionData";
import "../../style/SectionPage.css";
import ImageBackground from "../../Components/ImageBackground";
import Learning from "../../assets/img/Learning.png";
import "../../style/Container.css";
import SectionTask from "../../Components/sectionTask";
import UploadFile from "../../Components/UploadFile";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const userRole = "doctor";

const SectionPage = () => {
  const [lectures, setLectures] = useState(sectionData.lectures);

  // ✅ Handle file upload
  const handleDelete = (index) => {
    const updatedLectures = [...lectures];
    updatedLectures.splice(index, 1);
    setLectures(updatedLectures);
    toast.info(" File removed successfully!");
  };

  const handleUpdate = (index, updatedLecture) => {
    const updatedLectures = [...lectures];
    updatedLectures[index] = updatedLecture;
    setLectures(updatedLectures);
    toast.success("✅ Lecture updated successfully!");
  };

  // ✅ Handle removing all files
  const handleRemoveAll = () => {
    setLectures([]); // Clear all lectures
    toast.info("🗑️ All files removed successfully!");
  };

  return (
    <div className="section-container">
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Lecture Grid */}
      <div className="section-page-layout">
        <SectionTask
          lectures={lectures}
          userRole={userRole}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
        />
      </div>

      {/* Right Section */}
      <div className="right-section">
        <ImageBackground imageSrc={Learning} altText="Learning" />
        {userRole === "doctor" && (
          <>
            <UploadFile
              showNote={true}
              onFileUpload={(newLecture) => {
                setLectures((prevLectures) => [...prevLectures, newLecture]);
                toast.success(
                  `Lecture "${newLecture.title}" uploaded successfully!`
                );
              }}
            />

            <button className="remove-all-btn" onClick={handleRemoveAll}>
              Remove All Files
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default SectionPage;
