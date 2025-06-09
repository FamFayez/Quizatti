export const baseUrl = "https://api.quizatty.com/api/v1";
// export const baseUrl = "http://localhost:8000/api/v1";
export const token = sessionStorage.getItem("token");
export const userData = JSON.parse(sessionStorage.getItem("user"));

// Frontend URLs
export const HOME_URL = "/Home";

// Backend URLs
export const LOGIN_URL = "/user/auth/login";
