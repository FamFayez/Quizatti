import React, { useState } from "react";
import EditTaskModal from "./EditTaskModal";
import SubmitTaskModal from "./SubmitTaskModal";
import { patchDataToken } from "../axios/axiosHelper";

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
      id: task._id
    });
    // patchDataToken()
  };

  const handleFileSubmit = (file) => {
    onSubmit(file, task._id);
  };

  // const isExternalLink = task.isLink && task.file;

  return (
    <article className="section-block">
      <div className="lecture-block h-100 w-100 d-flex flex-column justify-content-between">
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
          <div className="row justify-content-center text-center">
            <a
              href={task.solutionFile}
              target="_blank"
              rel="noopener noreferrer"
              className="pdf-link"
            >
              <i class="bi bi-file-earmark-pdf text-success"></i> Solution
            </a>
          </div>
        )}
        <p className=" text-center">
          Deadline: {new Date(task.deadline).toISOString().split("T")[0]}
        </p>
        {(userRole === "Teacher" || userRole === "Assistant") && (
          <div className="row justify-content-center ">
            {userRole === "Assistant" && (
              <div className="col-6 text-center">
                <button
                  className="btn btn-primary w-50"
                  onClick={handleEdit}
                  title="Edit Task"
                >
                  <i class="bi bi-pencil-fill"></i>
                </button>
              </div>
            )}
            <div className="col-6 text-center">
              <button
                className="btn btn-danger w-50"
                onClick={() => onDelete(index, task._id)}
                title="Delete Task"
              >
                <i class="bi bi-trash-fill"></i>
              </button>
            </div>
          </div>
        )}
        {userRole === "Student" && (
          <div className="row justify-content-center ">
            <div className="col-6 text-center">
              <button
                className="btn btn-primary w-100"
                onClick={handleSubmit}
                title="Submit Solution"
              >
                <i className="bi bi-send-fill"></i>
              </button>
            </div>
          </div>
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
        taskId={task._id}
      />
    </article>
  );
};

export default TaskItem;
