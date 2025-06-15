import React, { useState } from "react";
import EditTaskModal from "./EditTaskModal";
import SubmitTaskModal from "./SubmitTaskModal";
import { getData, patchDataToken } from "../axios/axiosHelper";
import { Link } from "react-router-dom";
import { Task_API_URL } from "../utils/constants";
import toastMsg from "../functions/toastMsg";
import Spinner from "../shared/Spinner";

const TaskItem = ({ task, index, userRole, onDelete, onUpdate, onSubmit }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [isSubmissionsModalOpen, setIsSubmissionsModalOpen] = useState(false);
  const [submissions, setSubmissions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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

  const handleViewSubmissions = async () => {
    setIsLoading(true);
    setIsSubmissionsModalOpen(true);
    await getData(Task_API_URL + "/" + task._id + "/submissions", true)
      .then((res) => setSubmissions(res.data.data))
      .catch((err) => toastMsg(err.response.data.message, "error"))
      .finally(() => setIsLoading(false));
  };

  // const isExternalLink = task.isLink && task.file;

  return (
    <article className="section-block">
      {isLoading && <Spinner />}
      <div className="lecture-block h-100 w-100 d-flex flex-column justify-content-between">
        {/* <h2> */}
        <div className="row justify-content-center text-center">
          <a
            href={task.file}
            target="_blank"
            rel="noopener noreferrer"
            className="pdf-link"
          >
            <i className="bi bi-file-earmark-pdf text-danger"></i> {task.name}
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
              <i className="bi bi-file-earmark-pdf text-success"></i> Solution
            </a>
          </div>
        )}
        <p className=" text-center">
          Deadline: {new Date(task.deadline).toISOString().split("T")[0]}
        </p>
        {(userRole === "Teacher" || userRole === "Assistant") && (
          <div className="row justify-content-center ">
            <div className="col-6 text-center">
              <button
                className="btn btn-secondary w-50"
                onClick={handleViewSubmissions}
                title="Submissions"
              >
                <i className="bi bi-send-fill"></i>
              </button>
            </div>
            {userRole === "Assistant" && (
              <div className="col-6 text-center">
                <button
                  className="btn btn-primary w-50"
                  onClick={handleEdit}
                  title="Edit Task"
                >
                  <i className="bi bi-pencil-fill"></i>
                </button>
              </div>
            )}
            <div className="col-6 text-center">
              <button
                className="btn btn-danger w-50"
                onClick={() => onDelete(index, task._id)}
                title="Delete Task"
              >
                <i className="bi bi-trash-fill"></i>
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
      {isSubmissionsModalOpen && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header bg-light">
                <h5 className="modal-title fw-bold">Assignment Submissions</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setIsSubmissionsModalOpen(false)}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body bg-white">
                {submissions ? (
                  <div className="">
                    <div className="table-responsive">
                      <table className="table table-hover">
                        <thead className="table-light">
                          <tr>
                            <th scope="col">Student</th>
                            <th scope="col">File</th>
                            <th scope="col">Uploaded At</th>
                          </tr>
                        </thead>
                        <tbody>
                          {submissions.map((result, index) => (
                            <tr key={result._id}>
                              <td>{result.student.fullName}</td>
                              <td>
                                <span className="badge">
                                  <Link to={result.file}>File</Link>
                                </span>
                              </td>
                              <td>
                                <span className="badge bg-warning">
                                  {new Date(
                                    result.createdAt
                                  ).toLocaleDateString() +
                                    " " +
                                    new Date(
                                      result.createdAt
                                    ).toLocaleTimeString()}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ) : (
                  <></>
                )}
              </div>
              <div className="modal-footer bg-light">
                <button
                  type="button"
                  className="btn btn-secondary px-4"
                  onClick={() => setIsSubmissionsModalOpen(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </article>
  );
};

export default TaskItem;
