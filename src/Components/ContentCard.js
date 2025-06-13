import { Link } from "react-router-dom";
import "./../style/Card.css";
import {
  CONTENT_URL,
  SECTION_URL,
  QUIZZES_URL,
  QUESTION_BANK_URL,
  QUIZ_SETUP_URL,
  TASK_URL,
  COURSE_URL,
} from "../utils/constants";

export default function Card({ items, loading, userRole = "student" }) {
  // 1. Teacher Cards (all cards)
  const getTeacherCards = () => [
    { id: 1, name: "Content", path: CONTENT_URL },
    { id: 2, name: "Section", path: SECTION_URL },
    { id: 3, name: "Quiz", path: QUIZZES_URL },
    { id: 4, name: "Question Bank", path: QUESTION_BANK_URL },
    { id: 5, name: "create quiz", path: QUIZ_SETUP_URL },
  ];

  // 2. Assistant Cards
  const getAssistantCards = () => [
    { id: 1, name: "Content", path: CONTENT_URL },
    { id: 2, name: "Section", path: SECTION_URL },
    { id: 3, name: "Quiz", path: QUIZZES_URL },
  ];

  // 3. Student Cards
  const getStudentCards = () => [
    { id: 1, name: "Content", path: CONTENT_URL },
    { id: 2, name: "Section", path: SECTION_URL },
    { id: 3, name: "Quiz", path: QUIZZES_URL },
    { id: 4, name: "Question Bank", path: QUESTION_BANK_URL },
    { id: 5, name: "create quiz", path: QUIZ_SETUP_URL },
    { id: 6, name: "Task", path: TASK_URL },
  ];

  // Select cards based on role
  const getRoleSpecificCards = () => {
    switch (userRole) {
      case "teacher":
        return getTeacherCards();
      case "assistant":
        return getAssistantCards();
      case "student":
      default:
        return getStudentCards();
    }
  };

  const cardsToRender = items || getRoleSpecificCards();

  return (
    <section className="leftSection">
      {cardsToRender.map((item) => (
        <Link to={item.path} key={item.id} className="card-link">
          <div className="card">
            <h3>{item.name}</h3>
          </div>
        </Link>
      ))}
    </section>
  );
}
