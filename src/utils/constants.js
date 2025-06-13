// export const baseUrl = "https://api.quizatty.com/api/v1";
export const baseUrl = "http://localhost:8000/api/v1";
export const token = sessionStorage.getItem("token");
export const userData = JSON.parse(sessionStorage.getItem("user"));

// Frontend URLs

export const HOME_URL = "/";
export const LOGIN_URL = "/Login";
export const MATERIALS_DR_URL = "/materials-teacher";
export const MATERIAL_TA_URL = "/material-assistant";
export const QUESTION_BANK_URL = "/question-bank/:courseId";
export const CHAPTER_URL = "/chapter";
export const QUIZ_SETUP_URL = "/course/:courseId/quiz-setup-page";
export const CHOOSE_BOOK_URL = "/choose-book";
export const SECTION_URL = "/course/:courseId/section";
export const SECTION_TA_URL = "/section-assistant";
export const CONTENT_URL = "/course";
export const TASK_URL = "/taskPage";
export const PROFILE_URL = "/profile";
export const QUIZ_DR_URL = "/quiz-teacher";
export const QUIZ_URL = "/quiz";
export const QUIZZES_URL = "/course/:courseId/quizzes";
export const COURSE_URL = "/course";
export const FORGOT_PASSWORD_URL = "/forgot-password";
export const RESET_PASSWORD_URL = "/reset-password/:token"; // dynamic token param

// Backend URLs
export const LOGIN_API_URL = "/user/auth/login";
export const COURSE_API_URL = "/course";
export const QUIZ_API_URL = "/quiz";
export const QUESTION_Bank_API_URL = "/question";
export const Content_API_URL = "/slide/";
export const Section_API_URL = "/slide/";