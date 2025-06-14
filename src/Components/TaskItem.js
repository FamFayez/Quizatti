import React, { useState } from "react";
import EditTaskModal from "./EditTaskModal";
import SubmitTaskModal from "./SubmitTaskModal";

const TaskItem = ({ task, index, userRole, onDelete, onUpdate, onSubmit }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);

  const handleEdit = () => {
    setIsEditModalOpen(true);
  };

  const handleSubmit = () => {
    setIsSubmitModalOpen(true);
  };

  const handleSave = (updatedData) => {
    onUpdate({
      ...updatedData,
      id: task._id,
    });
  };

  const handleFileSubmit = (file) => {
    onSubmit(file, task._id);
  };

  // const isExternalLink = task.isLink && task.file;

  return (
    <article className="section-block">
      <div className="lecture-block container w-100">
        {/* <h2> */}
        <div className="row justify-content-center text-center">
          <a
            href={task.file}
            target="_blank"
            rel="noopener noreferrer"
            className="pdf-link"
          >
            <i class="bi bi-file-earmark-pdf text-danger"></i> {task.name}
          </a>
        </div>
        {task.solutionFile && (
          <>
            <div className="row justify-content-center text-center ">
              <a
                href={task.solutionFile}
                target="_blank"
                rel="noopener noreferrer"
                className="pdf-link"
              >
                <i class="bi bi-file-earmark-pdf text-success"></i> Solution
              </a>
            </div>
          </>
        )}
        {(userRole === "Teacher" || userRole === "Assistant") && (
          <>
            <div className="row justify-content-center ">
              <div className="col-6 text-center">
                <button
                  className="btn btn-primary"
                  onClick={handleEdit}
                  title="Edit Task"
                >
                  <i class="bi bi-pencil-fill"></i>
                </button>
              </div>
              <div className="col-6 text-center">
                <button
                  className="btn btn-danger"
                  onClick={() => onDelete(index, task._id)}
                  title="Delete Task"
                >
                  <i class="bi bi-trash-fill"></i>
                </button>
              </div>
            </div>
          </>
        )}
        {userRole === "Student" && (
          <>
            <div className="row justify-content-center ">
              <div className="col-6 text-center">
                <button
                  className="btn btn-primary"
                  onClick={handleSubmit}
                  title="Submit Solution"
                >
                  <i className="bi bi-send-fill"></i>
                </button>
              </div>
            </div>
          </>
        )}
        {/* </h2> */}
      </div>
      <EditTaskModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSave}
        initialData={task}
      />
      <SubmitTaskModal
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
        onSubmit={handleFileSubmit}
      />
    </article>
  );
};

export default TaskItem;
