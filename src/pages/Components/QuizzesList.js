import { QizzesData } from "../../core/data/Quizzes";
import { Link } from "react-router-dom";
import NewCard from "./NewCard";
export default function QuizzesList() {
  const QData = QizzesData;
  return (
    <>
      <div>
        {QData.map((item) => {
          return (
            <Link to="/Quiz">
              <NewCard key={item.id} name={item.QuizName} />
            </Link>
          );
        })}
      </div>
    </>
  );
}
