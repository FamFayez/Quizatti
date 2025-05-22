import Header from "../../Components/Header";
import QuizzesList from "../../Components/QuizzesList";
export default function QuizzesPage() {
  return (
    <div className="Quizzes">
      <Header name="Subject" />
      <QuizzesList className="Quslist" />
    </div>
  );
}
