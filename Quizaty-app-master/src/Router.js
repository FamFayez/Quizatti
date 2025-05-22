import { createBrowserRouter } from "react-router";
import "./App.css";
import "./stylee.css";
import SubjPage from "./pages/Subjects/SubjPage";
import QuizzesPage from "../../src/pages/chooseBook/Quizzes/QuizzesPage";
import Section from "./pages/Section/Section";
import QuizPage from "../../src/pages/Components/Quiz/QuizPage";
import "./profile.css";

export const router = createBrowserRouter([
  {
    path: "/Subject/:id",
    element: <SubjPage />,
  },
  {
    path: "/quizzes",
    element: <QuizzesPage />,
  },
  {},
  {
    path: "/Section",
    element: <Section />,
  },
  {
    path: "/Quiz",
    element: <QuizPage />,
  },
]);

//nesting routs
//path:   , element: , children:[{}]
