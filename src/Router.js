import { createBrowserRouter } from "react-router-dom";
import HomeTA from "./pages/homeTA/HomeTA.js";
import MaterialTA from "./pages/materialTa/MaterialTA.js";
import App from "./App";
import HomeDr from "./pages/homeDoctor/HomeDR";
import SectionTA from "./pages/section/SectionTA";
import MaterialsDR from "./pages/materialsDoctor/MaterialsDR";
import QuizDR from "./pages/Quiz/QuizDR";
import ChaptersDR from "./pages/chapterDR/ChaptersDR";
import Error from "./pages/notFound/Error";
import QuizSetupPage from "./pages/createQuiz/QuizSetupPage.js";
import Login from "./pages/login/Login.js";
import SectionPage from "./pages/contentTA/SectionPage .js";
import Content from "./pages/contentDR/Content.js";
import TaskPage from "./pages/task/taskPage.js";
import ChooseBook from "./pages/chooseBook/chooseBook.js";
import Profile from "./pages/Profile/ProfilePage.js";
import HomePage from "./pages/Home/HomePage";
import QuizzesPage from "./pages/Quizzes/QuizzesPage.js";
import QuizPage from "./pages/QuizP/QuizPage";

import SubjPage from "./pages/Subjects/SubjPage";
export const router = createBrowserRouter([
  {
    path: "login",
    element: <Login />,
  },

  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomeDr />,
      },
      {
        path: "MaterialsDR",
        element: <MaterialsDR />,
      },
      {
        path: "QuizDR",
        element: <QuizDR />,
      },
      {
        path: "Chapter",
        element: <ChaptersDR />,
      },
      {
        path: "QuizSetupPage",
        element: <QuizSetupPage />,
      },

      {
        path: "chooseBook",
        element: <ChooseBook />,
      },

      {
        path: "HomeTA",
        element: <HomeTA />,
      },
      {
        path: "MaterialTA",
        element: <MaterialTA />,
      },
      {
        path: "SectionTA",
        element: <SectionTA />,
      },
      {
        path: "Content",
        element: <Content />,
      },
      {
        path: "TaskPage",
        element: <TaskPage />,
      },
      {
        path: "SectionPage",
        element: <SectionPage />,
      },
      {
        path: "Profile",
        element: <Profile />,
      },

      {
        path: "/Home",
        element: <HomePage />,
      },

      {
        path: "/Quiz",
        element: <QuizPage />,
      },
      {
        path: "/quizzes",
        element: <QuizzesPage />,
      },
      {
        path: "/Subject/:id",
        element: <SubjPage />,
      },
      {
        path: "*",
        element: <Error />,
      },
    ],
  },
]);
