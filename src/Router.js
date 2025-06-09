import { createBrowserRouter } from "react-router-dom";
import HomeTA from "./pages/HomeTA.js";
import MaterialTA from "./pages/MaterialTA.js";
import App from "./App";
import HomeDr from "./pages/HomeDR";
import SectionTA from "./pages/SectionTA";
import MaterialsDR from "./pages/MaterialsDR";
import QuizDR from "./pages/QuizDR";
import ChaptersDR from "./pages/ChaptersDR";
import Error from "./pages/Error";
import QuizSetupPage from "./pages/QuizSetupPage.js";
import Login from "./pages/Login.js";
import SectionPage from "./pages/SectionPage .js";
import Content from "./pages/Content.js";
import TaskPage from "./pages/TaskPage.js";
import ChooseBook from "./pages/chooseBook.js";
import Profile from "./pages/ProfilePage.js";
import HomePage from "./pages/HomePage";
import QuizzesPage from "./pages/QuizzesPage.js";
import QuizPage from "./pages/QuizPage";
import SubjPage from "./pages/SubjPage";
import QuestionBankPage from "./pages/QuestionBankPage.js";
export const router = createBrowserRouter([
  {
    path: "login",
    element: <Login />
  },

  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomeDr />
      },
      {
        path: "MaterialsDR",
        element: <MaterialsDR />
      },
      {
        path: "QuizDR",
        element: <QuizDR />
      },
      {
        path: "/QuestionBank",
        element: <QuestionBankPage />
      },
      {
        path: "Chapter",
        element: <ChaptersDR />
      },
      {
        path: "QuizSetupPage",
        element: <QuizSetupPage />
      },

      {
        path: "chooseBook",
        element: <ChooseBook />
      },

      {
        path: "HomeTA",
        element: <HomeTA />
      },
      {
        path: "MaterialTA",
        element: <MaterialTA />
      },
      {
        path: "SectionTA",
        element: <SectionTA />
      },
      {
        path: "Content",
        element: <Content />
      },
      {
        path: "TaskPage",
        element: <TaskPage />
      },
      {
        path: "SectionPage",
        element: <SectionPage />
      },
      {
        path: "Profile",
        element: <Profile />
      },

      {
        path: "/Home",
        element: <HomePage />
      },

      {
        path: "/Quiz",
        element: <QuizPage />
      },
      {
        path: "/quizzes",
        element: <QuizzesPage />
      },
      {
        path: "/Subject/:id",
        element: <SubjPage />
      },
      {
        path: "*",
        element: <Error />
      }
    ]
  }
]);
