import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Login from "./pages/Login.js";
import ForgotPassword from "./pages/ForgetPassword.js";
import ResetPassword from "./pages/ResetPassword";

import MaterialTA from "./pages/MaterialTA.js";
import SectionTA from "./pages/SectionTA";
import MaterialsDR from "./pages/MaterialsDR";
import QuizDR from "./pages/QuizDR";
import ChaptersDR from "./pages/ChaptersDR";
import QuizSetupPage from "./pages/QuizSetupPage.js";
import SectionPage from "./pages/SectionPage.js";
import Content from "./pages/ContentPage.js";
import TaskPage from "./pages/TaskPage.js";
import ChooseBook from "./pages/chooseBook.js";
import Profile from "./pages/ProfilePage.js";
import HomePage from "./pages/HomePage";
import QuizzesPage from "./pages/QuizzesPage.js";
import QuizPage from "./pages/QuizPage";
import SubjPage from "./pages/SubjPage";
import QuestionBankPage from "./pages/QuestionBankPage.js";
import Error from "./pages/Error";

import {
  HOME_URL,
  LOGIN_URL,
  MATERIALS_DR_URL,
  QUIZ_DR_URL,
  QUESTION_BANK_URL,
  CHAPTER_URL,
  QUIZ_SETUP_URL,
  CHOOSE_BOOK_URL,
  MATERIAL_TA_URL,
  SECTION_TA_URL,
  CONTENT_URL,
  TASK_URL,
  SECTION_URL,
  PROFILE_URL,
  QUIZ_URL,
  QUIZZES_URL,
  COURSE_URL,
  FORGOT_PASSWORD_URL,
  RESET_PASSWORD_URL, // Note: This should be "/reset-password/:token"
} from "./utils/constants";

export const router = createBrowserRouter([
  {
    path: LOGIN_URL,
    element: <Login />,
  },
  {
    path: FORGOT_PASSWORD_URL, // e.g., "/forgot-password"
    element: <ForgotPassword />,
  },
  {
    path: RESET_PASSWORD_URL, // e.g., "/reset-password/:token"
    element: <ResetPassword />,
  },
  {
    path: HOME_URL,
    element: <App />,
    children: [
      { path: HOME_URL, element: <HomePage /> },
      { path: MATERIALS_DR_URL, element: <MaterialsDR /> },
      { path: QUIZ_DR_URL, element: <QuizDR /> },
      { path: QUESTION_BANK_URL, element: <QuestionBankPage /> },
      { path: CHAPTER_URL, element: <ChaptersDR /> },
      { path: QUIZ_SETUP_URL, element: <QuizSetupPage /> },
      { path: CHOOSE_BOOK_URL, element: <ChooseBook /> },
      { path: MATERIAL_TA_URL, element: <MaterialTA /> },
      { path: SECTION_TA_URL, element: <SectionTA /> },
      { path: `${CONTENT_URL}/:courseId`, element: <Content /> },
      { path: TASK_URL, element: <TaskPage /> },
      { path: SECTION_URL, element: <SectionPage /> },
      { path: PROFILE_URL, element: <Profile /> },
      { path: QUIZ_URL, element: <QuizPage /> },
      { path: QUIZZES_URL, element: <QuizzesPage /> },
      { path: `${COURSE_URL}/:id`, element: <SubjPage /> },
      { path: "*", element: <Error /> },
    ],
  },
]);
