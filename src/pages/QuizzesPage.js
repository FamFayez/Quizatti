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

export default function QuizzesPage() {
  const { quizzes, isLoading, startQuiz } = QuizzesHook();
  const { courseId } = useParams();

  return (
    <>
      {isLoading && <Spinner />}
      <div className="container d-flex flex-column justify-content-start align-items-start w-100">
        <div className="d-flex justify-content-between align-items-center w-100">
          <h1 className="text-center text-white">Quizzes</h1>
          <Link to={`/course/${courseId}/quiz-setup-page`}>
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
                      className="section-button w-50"
                      onClick={() => startQuiz(item._id)}
                    >
                      {item.name}
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
