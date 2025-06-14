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
  const { quizzes, isLoading, startQuiz } = QuizzesHook();
  const { courseId } = useParams();

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
  onClick={() => startQuiz(item._id)}
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
</div>

                  ))}
                </div>
                <ImageBackground imageSrc={quiz} altText="Material" />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
