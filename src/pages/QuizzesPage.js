// import Header from "../../Components/Header";
// import { QizzesData } from "../core/data/Quizzes";
import quiz from "../assets/img/quiz.png";
import ImageBackground from "../Components/ImageBackground";
// import Button from "../Components/Button";
import "../style/Container.css";
import "../style/Button.css";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import QuizzesHook from "../hooks/QuizzesHook";
import Spinner from "../shared/Spinner";
import { Link, useParams } from "react-router-dom";
import { useProvider } from "../app/AppContext";

export default function QuizzesPage() {
  const { userType } = useProvider();
  const {
    quizzes,
    isLoading,
    startQuiz,
    showQuizResults,
    setShowQuizResults,
    quizResults
  } = QuizzesHook();
  const { courseId } = useParams();

  const handleClose = () => setShowQuizResults(false);

  return (
    <>
      {isLoading && <Spinner />}
      <div className="container d-flex flex-column justify-content-start align-items-start w-100">
        <div className="d-flex justify-content-between align-items-center w-100">
          <h1 className="text-center text-white">Quizzes</h1>
          <Link
            to={`/course/${courseId}/quiz-setup-page`}
            className={userType === "Student" ? "invisible" : ""}
          >
            <button className="btn btn-primary">Create Quiz</button>
          </Link>
        </div>
        <div className="d-flex flex-column justify-content-center align-items-center w-100">
          {quizzes?.length === 0 ? (
            <ImageBackground imageSrc={quiz} altText="Material" />
          ) : (
            <>
              <div className="d-flex flex justify-content-center align-items-center w-100">
                <div className="d-flex flex-column gap-3 justify-content-center align-items-center w-100">
                  {quizzes.map((item) => (
                    <div
                      key={item._id}
                      className="quiz-card"
                      onClick={() =>
                        userType === "Student"
                          ? startQuiz(item._id)
                          : setShowQuizResults(item._id)
                      }
                    >
                      <h5 className="quiz-title">{item.name}</h5>
                      <p className="quiz-info">
                        <strong>Duration:</strong> {item.duration} mins
                      </p>
                      <p className="quiz-info">
                        <strong>Questions:</strong> {item.numberOfQuestions}
                      </p>
                      <p className="quiz-info">
                        <p className="quiz-info">
                          <strong>Chapters:</strong> {item.chapters.join(", ")}
                        </p>
                      </p>
                      {userType === "Student" && (
                        <p className="quiz-info">
                          <p className="quiz-info">
                            <strong>Mark:</strong>
                            {" ("}
                            {item?.quizAttempt?.correctAnswers || "-"}/{" "}
                            {item.numberOfQuestions}
                            {") "}
                            {item?.quizAttempt?.durationTaken &&
                              ` in ${item?.quizAttempt?.durationTaken} min`}
                          </p>
                        </p>
                      )}
                    </div>
                  ))}
                </div>
                <ImageBackground imageSrc={quiz} altText="Material" />
              </div>
            </>
          )}
        </div>
      </div>

      {/* Quiz Results Modal */}
      {showQuizResults && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog">
          {/* <div className="modal-backdrop fade show"></div> */}
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header bg-light">
                <h5 className="modal-title fw-bold">Student Results</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleClose}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body bg-white">
                {quizResults ? (
                  <div className="">
                    <div className="table-responsive">
                      <table className="table table-hover">
                        <thead className="table-light">
                          <tr>
                            <th scope="col">Student</th>
                            <th scope="col">Correct Answers</th>
                            <th scope="col">Skipped</th>
                            <th scope="col">Duration</th>
                          </tr>
                        </thead>
                        <tbody>
                          {quizResults.map((result, index) => (
                            <tr key={result._id}>
                              <td>{result.student.fullName}</td>
                              <td>
                                <span className="badge bg-success">
                                  {result.correctAnswers}
                                </span>
                              </td>
                              <td>
                                <span className="badge bg-warning">
                                  {result.skippedAnswers}
                                </span>
                              </td>
                              <td>
                                {result.durationTaken
                                  ? `${result.durationTaken} min`
                                  : "-"}
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
                  onClick={handleClose}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
