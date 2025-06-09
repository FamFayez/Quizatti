import { useState } from "react";
import lecturesData from "../core/data/lecturesData";
import "../style/sectionPage.css";
import content from "../assets/img/content.png";
import ImageBackground from "../Components/ImageBackground";
import LectureList from "../Components/LectureList";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UploadFile from "../Components/UploadFile";

const userRole = "ta";

const Content = () => {
  const [lectures, setLectures] = useState(lecturesData.lectures);

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

  const handleRemoveAll = () => {
    setLectures([]);
    toast.info(" All files removed successfully!");
  };

  return (
    <div className="container">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="contentDR">
        <LectureList
          lectures={lectures}
          userRole={userRole}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
        />

        {userRole === "ta" && (
          <div className="upload-section">
            <UploadFile
              showNote={false}
              onFileUpload={(newLecture) => {
                setLectures([...lectures, newLecture]);
                toast.success(
                  `Lecture "${newLecture.title}" uploaded successfully!`
                );
              }}
            />
          </div>
        )}

        {userRole === "ta" && lectures.length > 0 && (
          <button className="remove-all-btn" onClick={handleRemoveAll}>
            Remove All Files
          </button>
        )}
      </div>

      <div className="image-container">
        <ImageBackground imageSrc={content} altText="content" />
      </div>
    </div>
  );
};

export default Content;