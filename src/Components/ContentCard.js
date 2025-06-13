import { Link, useParams } from "react-router-dom";
import "./../style/Card.css";
import {
  CONTENT_URL,
  SECTION_URL,
  QUIZZES_URL,
  QUESTION_BANK_URL,
  QUIZ_SETUP_URL,
  TASK_URL,
} from "../utils/constants";

export default function Card() {
  const userRole = localStorage.getItem("role") || "student"; // Default to 'student' if role is not set
  const { id: courseId } = useParams();

  const getTeacherCards = () => [
    { id: 1, name: "Content", path: CONTENT_URL },
    { id: 2, name: "Section", path: SECTION_URL },
    { id: 3, name: "Quiz", path: QUIZZES_URL },
    { id: 4, name: "Question Bank", path: QUESTION_BANK_URL },
    { id: 5, name: "Create Quiz", path: QUIZ_SETUP_URL },
    { id: 6, name: "Task", path: TASK_URL },
  ];

  const getAssistantCards = () => [
    { id: 1, name: "Content", path: CONTENT_URL },
    { id: 2, name: "Section", path: SECTION_URL },
    { id: 3, name: "Quiz", path: QUIZZES_URL },
    { id: 4, name: "Create Quiz", path: QUIZ_SETUP_URL },
    { id: 5, name: "Task", path: TASK_URL },
  ];

  const getStudentCards = () => [
    { id: 1, name: "Content", path: CONTENT_URL },
    { id: 2, name: "Section", path: SECTION_URL },
    { id: 3, name: "Quiz", path: QUIZZES_URL },
    { id: 4, name: "Task", path: TASK_URL },
  ];

  const cards =
    userRole === "Teacher"
      ? getTeacherCards()
      : userRole === "Assistant"
      ? getAssistantCards()
      : getStudentCards();

  return (
    <section className="leftSection">
      {cards.map((card) => (
        <Link
          key={card.id}
          to={card.path.replace(":courseId", courseId)}
          className="card-link"
        >
          <div className="card">
            <h3>{card.name}</h3>
          </div>
        </Link>
      ))}
    </section>
  );
}
